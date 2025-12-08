<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Size;
use App\Models\Color;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Classic Red T-Shirt',
                'price' => 2500, // cents
                'qty' => 100,
                'desc' => 'Classic red cotton T-shirt. Soft, breathable, everyday wear.',
                'thumbnail' => 'images/products/tshirt-red.png',
                'colors' => ['Red'],
                'sizes' => ['S', 'M', 'L', 'XL'],
            ],
            [
                'name' => 'Classic Green T-Shirt',
                'price' => 2500,
                'qty' => 100,
                'desc' => 'Classic green cotton T-shirt. Comfortable and durable.',
                'thumbnail' => 'images/products/tshirt-green.png',
                'colors' => ['Green'],
                'sizes' => ['M', 'L'],
            ],
            [
                'name' => 'Classic Blue T-Shirt',
                'price' => 2500,
                'qty' => 100,
                'desc' => 'Classic blue cotton T-shirt. Minimal and clean style.',
                'thumbnail' => 'images/products/tshirt-blue.png',
                'colors' => ['Blue'],
                'sizes' => ['M', 'L'],
            ],
            [
                'name' => 'T-Shirt',
                'price' => 3000,
                'qty' => 80,
                'desc' => 'White graphic T-shirt with modern design.',
                'thumbnail' => 'images/products/t-shirt.png',
                'colors' => ['Blue', 'Red', 'White'],
                'sizes' => ['M', 'L', 'XL'],
            ],
        ];

        foreach ($products as $data) {
            $product = Product::create([
                'name'         => $data['name'],
                'slug'         => Str::slug($data['name']),
                'qty'          => $data['qty'],
                'price'        => $data['price'],
                'desc'         => $data['desc'],
                'thumbnail'    => $data['thumbnail'],
                'first_image'  => null,
                'second_image' => null,
                'third_image'  => null,
                'status'       => true,
            ]);
            // attach sizes
            $sizeIds = Size::whereIn('name', $data['sizes'])->pluck('id');
            $product->sizes()->attach($sizeIds);

            // attach colors
            $colorIds = Color::whereIn('name', $data['colors'])->pluck('id');
            $product->colors()->attach($colorIds);
        }
    }
}
