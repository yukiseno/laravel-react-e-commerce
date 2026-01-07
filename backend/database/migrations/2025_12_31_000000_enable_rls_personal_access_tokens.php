<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Enable RLS on personal_access_tokens table (PostgreSQL only)
        // Note: personal_access_tokens is managed by Laravel Sanctum, not exposed to authenticated users via PostgREST
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE personal_access_tokens ENABLE ROW LEVEL SECURITY;');

            // Create a permissive policy since this table is backend-only (Sanctum tokens)
            // These tokens are accessed through Laravel API, not directly via PostgREST
            DB::statement('
                CREATE POLICY "Allow all for backend access"
                ON personal_access_tokens
                FOR ALL
                USING (true);
            ');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the policy (PostgreSQL only)
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('DROP POLICY IF EXISTS "Allow all for backend access" ON personal_access_tokens;');

            // Disable RLS
            DB::statement('ALTER TABLE personal_access_tokens DISABLE ROW LEVEL SECURITY;');
        }
    }
};
