<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserCanSeeStocksTable extends Migration
{
    public function up(): void
    {
        Schema::create('user_can_view_stocks', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained('goods_categories')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_can_view_stocks');
    }
}
