<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Dummy users
        User::factory()->count(10)->create();

        // One known test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@test.com',
        ]);
    }
}
