<?php

use App\Models\Order;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $billing = array_keys(Order::$billing);
            $types = array_keys(Order::$types);

            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->enum('billing', $billing)->default(Order::CASH);
            $table->enum('type', $types)->default(Order::CURRENT);
            $table->string('comment')->nullable();

            $table->decimal('total');
            $table->unsignedTinyInteger('qty');
            $table->decimal('weight', 8, 3);
            $table->decimal('volume');

            $table->timestamp('created_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
}
