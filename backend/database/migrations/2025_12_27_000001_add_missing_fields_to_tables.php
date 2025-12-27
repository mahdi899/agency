<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add missing fields to portfolios
        Schema::table('portfolios', function (Blueprint $table) {
            if (!Schema::hasColumn('portfolios', 'cover_image')) {
                $table->string('cover_image')->nullable()->after('thumbnail');
            }
            if (!Schema::hasColumn('portfolios', 'client')) {
                $table->string('client')->nullable()->after('gallery');
            }
            if (!Schema::hasColumn('portfolios', 'services')) {
                $table->json('services')->nullable()->after('growth');
            }
            if (!Schema::hasColumn('portfolios', 'duration')) {
                $table->string('duration')->nullable()->after('tags');
            }
            if (!Schema::hasColumn('portfolios', 'year')) {
                $table->string('year')->nullable()->after('duration');
            }
            if (!Schema::hasColumn('portfolios', 'results')) {
                $table->json('results')->nullable()->after('year');
            }
            if (!Schema::hasColumn('portfolios', 'testimonial')) {
                $table->json('testimonial')->nullable()->after('results');
            }
        });

        // Add missing fields to packages
        Schema::table('packages', function (Blueprint $table) {
            if (!Schema::hasColumn('packages', 'slug')) {
                $table->string('slug')->nullable()->unique()->after('name');
            }
        });

        // Add missing fields to testimonials
        Schema::table('testimonials', function (Blueprint $table) {
            if (!Schema::hasColumn('testimonials', 'results')) {
                $table->string('results')->nullable()->after('industry');
            }
        });

        // Add missing fields to blog_posts
        Schema::table('blog_posts', function (Blueprint $table) {
            if (!Schema::hasColumn('blog_posts', 'author')) {
                $table->string('author')->nullable()->after('category');
            }
            if (!Schema::hasColumn('blog_posts', 'author_avatar')) {
                $table->string('author_avatar')->nullable()->after('author');
            }
        });

        // Make user_id nullable in blog_posts for seeder
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropColumn(['cover_image', 'client', 'services', 'duration', 'year', 'results', 'testimonial']);
        });

        Schema::table('packages', function (Blueprint $table) {
            $table->dropColumn('slug');
        });

        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropColumn('results');
        });

        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropColumn(['author', 'author_avatar']);
        });
    }
};
