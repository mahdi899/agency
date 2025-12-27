<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('home_cards', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('icon')->nullable();
            $table->string('color')->default('from-primary-500 to-secondary-500');
            $table->string('link')->nullable();
            $table->string('section')->default('features'); // features, stats, process
            $table->string('value')->nullable(); // for stats
            $table->string('suffix')->nullable(); // for stats like +, %, M
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('home_cards');
    }
};
