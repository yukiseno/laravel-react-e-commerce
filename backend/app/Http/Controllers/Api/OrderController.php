<?php

namespace App\Http\Controllers\Api;

use Stripe\Stripe;
use Stripe\PaymentIntent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Http\Resources\UserResource;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Coupon;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Store order AFTER successful payment
     */
    public function store(Request $request)
    {
        $request->validate([
            'products' => 'required|array|min:1',
            'payment_intent_id' => 'required|string',
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        $intent = PaymentIntent::retrieve($request->payment_intent_id);

        if ($intent->status !== 'succeeded') {
            return response()->json(['error' => 'Payment not completed'], 400);
        }

        if (($intent->metadata['user_id'] ?? null) != $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return DB::transaction(function () use ($request, $intent) {
            $coupon = $this->resolveCoupon($request);

            $subtotal = 0;

            foreach ($request->products as $product) {
                $subtotal += $product['price'] * $product['qty'];
            }

            $discountTotal = $coupon
                ? (int) round($subtotal * ($coupon->discount / 100))
                : 0;

            $total = $subtotal - $discountTotal;
            $expectedAmount = $total;
            $stripeAmount   = $intent->amount_received;
            if ($stripeAmount !== $expectedAmount) {
                return response()->json([
                    'error' => 'Payment amount mismatch'
                ], 400);
            }

            $order = Order::create([
                'user_id' => $request->user()->id,
                'coupon_id' => $coupon?->id,
                'subtotal' => $subtotal,
                'discount_total' => $discountTotal,
                'total' => $total,
                'payment_intent_id' => $request->payment_intent_id,
                'status' => 'paid',
            ]);

            foreach ($request->products as $product) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product['product_id'],
                    'product_name' => $product['name'],

                    'color_id' => $product['color_id'],
                    'size_id' => $product['size_id'],
                    'color_name' => $product['color'],
                    'size_name' => $product['size'],

                    'qty' => $product['qty'],
                    'price' => $product['price'],      // unit price (cents)
                    'subtotal' => $product['price'] * $product['qty'],
                ]);
            }

            return response()->json([
                'message' => 'Order placed successfully',
                'order' => new OrderResource(
                    $order->load(['items'])
                ),
            ]);
        });
    }

    /**
     * Create Stripe PaymentIntent
     */
    public function payOrderByStripe(Request $request)
    {
        $request->validate([
            'cartItems' => 'required|array|min:1',
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        $amount = $this->calculateOrderTotal($request->cartItems);

        $idempotencyKey =
            'checkout-' . $request->user()->id . '-' . md5(json_encode($request->cartItems));

        $intent = PaymentIntent::create(
            [
                'amount' => $amount,
                'currency' => 'usd',
                'description' => 'T-Shirt Store Order',
                'metadata' => [
                    'user_id' => $request->user()->id,
                ],
            ],
            [
                'idempotency_key' => $idempotencyKey,
            ]
        );

        return response()->json([
            'clientSecret' => $intent->client_secret,
            'paymentIntentId' => $intent->id,
        ]);
    }

    /**
     * Update PaymentIntent amount (cart changed)
     */
    public function updatePaymentIntent(Request $request)
    {
        $request->validate([
            'cartItems' => 'required|array|min:1',
            'payment_intent_id' => 'required|string',
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        $intent = PaymentIntent::retrieve($request->payment_intent_id);

        if (($intent->metadata['user_id'] ?? null) != $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if (!in_array($intent->status, [
            'requires_payment_method',
            'requires_confirmation',
        ])) {
            return response()->json(['error' => 'Cannot update intent'], 400);
        }

        $amount = $this->calculateOrderTotal($request->cartItems);

        $intent = PaymentIntent::update($intent->id, [
            'amount' => $amount,
        ]);

        return response()->json([
            'clientSecret' => $intent->client_secret,
        ]);
    }

    /**
     * Calculate cart total (cents)
     */
    private function calculateOrderTotal(array $items): int
    {
        $subtotal = 0;

        foreach ($items as $item) {
            $subtotal += $item['price'] * $item['qty'];
        }

        if (!empty($items[0]['coupon_id'])) {
            $coupon = Coupon::find($items[0]['coupon_id']);

            if ($coupon && $coupon->checkIfValid()) {
                $discount = (int) round($subtotal * ($coupon->discount / 100));
                return $subtotal - $discount;
            }
        }

        return $subtotal;
    }

    /**
     * Resolve coupon once per order
     */
    private function resolveCoupon(Request $request): ?Coupon
    {
        $couponId =
            $request->coupon['id']
            ?? $request->products[0]['coupon_id']
            ?? null;

        if (!$couponId) return null;

        $coupon = Coupon::find($couponId);

        return $coupon && $coupon->checkIfValid() ? $coupon : null;
    }
}
