<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            'title' => $this->title,
            'body' => $this->body,
            'rating' => $this->rating,
            'approved' => $this->approved,
            'user_id' => $this->user_id,
            'product_id' => $this->product_id,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'profile_image' => $this->user->profile_image,
                'image_path' => $this->user->image_path,
            ],
            'created_at' => $this->created_at,
        ];
    }
}
