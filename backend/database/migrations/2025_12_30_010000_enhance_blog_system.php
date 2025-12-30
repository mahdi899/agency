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
        // Create blog categories table
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('color')->default('from-primary-500 to-secondary-500');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Create blog images table for inline images
        Schema::create('blog_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_post_id')->constrained()->onDelete('cascade');
            $table->string('url');
            $table->string('alt_text')->nullable();
            $table->string('title')->nullable();
            $table->text('caption')->nullable();
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->integer('file_size')->nullable();
            $table->string('mime_type')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Create blog tags table
        Schema::create('blog_tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        // Create pivot table for blog posts and tags
        Schema::create('blog_post_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blog_post_id')->constrained()->onDelete('cascade');
            $table->foreignId('blog_tag_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['blog_post_id', 'blog_tag_id']);
        });

        // Add new columns to blog_posts table
        Schema::table('blog_posts', function (Blueprint $table) {
            // SEO fields
            $table->string('meta_title')->nullable()->after('title');
            $table->text('meta_description')->nullable()->after('meta_title');
            $table->string('meta_keywords')->nullable()->after('meta_description');
            $table->string('canonical_url')->nullable()->after('meta_keywords');
            
            // Content structure (JSON for storing structured content with inline images)
            $table->json('content_blocks')->nullable()->after('content');
            
            // Category relationship
            $table->foreignId('category_id')->nullable()->after('category')->constrained('blog_categories')->nullOnDelete();
            
            // Additional fields
            $table->string('featured_image_alt')->nullable()->after('thumbnail');
            $table->string('featured_image_caption')->nullable()->after('featured_image_alt');
            $table->integer('word_count')->default(0)->after('read_time');
            $table->string('status')->default('draft')->after('is_published'); // draft, pending, published, archived
            $table->timestamp('scheduled_at')->nullable()->after('published_at');
            
            // Social sharing
            $table->string('og_image')->nullable();
            $table->string('og_title')->nullable();
            $table->text('og_description')->nullable();
            
            // Engagement
            $table->integer('likes')->default(0);
            $table->integer('shares')->default(0);
            $table->boolean('allow_comments')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('blog_posts', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn([
                'meta_title', 'meta_description', 'meta_keywords', 'canonical_url',
                'content_blocks', 'category_id', 'featured_image_alt', 'featured_image_caption',
                'word_count', 'status', 'scheduled_at', 'og_image', 'og_title', 'og_description',
                'likes', 'shares', 'allow_comments'
            ]);
        });

        Schema::dropIfExists('blog_post_tag');
        Schema::dropIfExists('blog_tags');
        Schema::dropIfExists('blog_images');
        Schema::dropIfExists('blog_categories');
    }
};
