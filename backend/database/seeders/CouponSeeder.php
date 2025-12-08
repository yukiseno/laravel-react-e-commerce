<?php

namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Coupon::firstOrCreate(
            ['name' => 'WELCOME10'],
            [
                'discount' => 10,
                'valid_until' => Carbon::now()->addMonth()->toDateString(),
            ]
        );

        Coupon::firstOrCreate(
            ['name' => 'SUMMER20'],
            [
                'discount' => 20,
                'valid_until' => Carbon::now()->addMonths(2)->toDateString(),
            ]
        );
    }
}
