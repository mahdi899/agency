<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reels', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('thumbnail')->nullable();
            $table->string('video_url')->nullable();
            $table->string('video_type')->default('vertical'); // vertical (reels), horizontal
            $table->string('views')->default('0');
            $table->string('likes')->default('0');
            $table->string('comments')->default('0');
            $table->string('gradient')->default('from-rose-500 to-pink-600');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reels');
    }
};
