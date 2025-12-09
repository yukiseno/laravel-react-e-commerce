<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\OrderItemResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => $this->user,
            'subtotal' => $this->subtotal,
            'discount_total' => $this->discount_total,
            'total' => $this->total,
            'coupon' => $this->coupon,
            'total' => $this->total,
            'qty' => $this->qty,
            'created_at' => $this->created_at,
            'delivered_at' => $this->delivered_at ? $this->delivered_at : null,
            'items' => OrderItemResource::collection($this->items),
        ];
    }
}
