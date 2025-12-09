<?php

namespace App\Http\Controllers\Api;

use Stripe\Stripe;
use App\Models\Order;
use Stripe\PaymentIntent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Coupon;
use ErrorException;

class OrderController extends Controller
{
    /**
     * Store new order
     */
    public function store(Request $request)
    {
        $couponId = null;
        if ($request->has('coupon') && !empty($request->coupon['id'])) {
            $couponId = $request->coupon['id'];
        } elseif (isset($request->products[0]['coupon_id']) && !empty($request->products[0]['coupon_id'])) {
            $couponId = $request->products[0]['coupon_id'];
        }

        foreach ($request->products as $product) {
            $order = Order::create([
                'qty' => $product['qty'],
                'user_id' => $request->user()->id,
                'coupon_id' => $couponId,
                'total' => $this->calculateTotal($product['price'], $product['qty'], $product['coupon_id']),
            ]);
            $order->products()->attach($product['product_id']);
        }
        return response()->json([
            'user' => UserResource::make($request->user())
        ]);
    }

    /**
     * Pay order using stripe
     */
    public function payOrderByStripe(Request $request)
    {
        if (empty($request->cartItems)) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }
        Stripe::setApiKey(config('services.stripe.secret'));
        try {
            $idempotencyKey = 'checkout-' . $request->user()->id . '-' . md5(json_encode($request->cartItems));

            $paymentIntent = PaymentIntent::create(
                [
                    'amount' => $this->calculateOrderTotal($request->cartItems),
                    'currency' => 'usd',
                    'description' => 'React T-shirts Store',
                    'metadata' => [
                        'user_id' => $request->user()->id,
                    ],
                ],
                [
                    'idempotency_key' => $idempotencyKey,
                ]
            );
            //generate the client secret
            $output = [
                'clientSecret' => $paymentIntent->client_secret,
                'paymentIntentId' => $paymentIntent->id,
            ];
            //send the client secret to the front end
            return response()->json($output);
        } catch (ErrorException $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }
    public function updatePaymentIntent(Request $request)
    {
        if (empty($request->cartItems)) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }
        Stripe::setApiKey(config('services.stripe.secret'));

        $intent = PaymentIntent::retrieve($request->payment_intent_id);

        if (($intent->metadata['user_id'] ?? null) != $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if (!in_array($intent->status, ['requires_payment_method', 'requires_confirmation'])) {
            return response()->json([
                'error' => 'PaymentIntent cannot be updated'
            ], 400);
        }


        $amount = $this->calculateOrderTotal($request->cartItems);

        $intent = PaymentIntent::update(
            $intent->id,
            ['amount' => $amount]
        );

        return response()->json([
            'clientSecret' => $intent->client_secret,
        ]);
    }


    public function calculateOrderTotal($items)
    {
        $total = 0;
        foreach ($items as $item) {
            $total += $this->calculateTotal($item['price'], $item['qty'], $item['coupon_id']);
        }
        return $total * 100;
    }

    public function calculateTotal($price, $qty, $coupon_id)
    {
        $discount = 0;
        $total = $price * $qty;
        $coupon = Coupon::find($coupon_id);
        if ($coupon) {
            if ($coupon->checkIfValid()) {
                $discount = $total * $coupon->discount / 100;
            }
        }
        return $total - $discount;
    }
}
