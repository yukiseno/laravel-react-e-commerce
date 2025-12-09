<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'product_name' => $this->product_name,
            'price' => $this->price,
            'qty' => $this->qty,
            'color' => $this->color_name,
            'size' => $this->size_name,
        ];
    }
}
