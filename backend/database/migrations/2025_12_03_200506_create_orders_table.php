<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('coupon_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // Money fields (ALL in cents)
            $table->integer('subtotal');        // sum of items before discount
            $table->integer('discount_total');  // discount amount
            $table->integer('total');           // subtotal - discount_total

            $table->string('status')->default('pending'); // pending, paid, shipped
            $table->datetime('delivered_at')->nullable();

            $table->string('payment_intent_id')
                ->nullable()
                ->index();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
