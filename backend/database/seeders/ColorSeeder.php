<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            'Black',
            'White',
            'Red',
            'Blue',
            'Green',
            'Gray',
            'Navy',
        ];

        foreach ($colors as $color) {
            Color::firstOrCreate(['name' => $color]);
        }
    }
}
