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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('order_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('product_id')
                ->constrained()
                ->cascadeOnDelete();

            // Snapshot fields (DO NOT change after purchase)
            $table->string('product_name');

            $table->foreignId('color_id')
                ->constrained()
                ->restrictOnDelete();

            $table->foreignId('size_id')
                ->constrained()
                ->restrictOnDelete();

            $table->string('color_name');
            $table->string('size_name');

            // Money in cents
            $table->integer('qty');
            $table->integer('price');     // unit price at time of purchase
            $table->integer('subtotal');  // price * qty

            $table->timestamps();

            $table->index('order_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
