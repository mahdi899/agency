<?php

namespace App\Services;

use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;

class BlogService
{
    /**
     * Get published blog posts with caching
     */
    public function getPublishedPosts(array $filters = [], int $perPage = 10)
    {
        $cacheKey = 'blog_posts_' . md5(json_encode($filters) . $perPage);
        
        return Cache::remember($cacheKey, 300, function () use ($filters, $perPage) {
            $query = BlogPost::where('is_published', true)
                ->with(['categoryRelation', 'tagsRelation'])
                ->orderBy('is_featured', 'desc')
                ->orderBy('created_at', 'desc');

            if (!empty($filters['category'])) {
                $category = $filters['category'];
                $query->where(function ($q) use ($category) {
                    $q->where('category', $category)
                      ->orWhereHas('categoryRelation', function ($subQuery) use ($category) {
                          $subQuery->where('slug', $category);
                      });
                });
            }

            if (!empty($filters['tag'])) {
                $tag = $filters['tag'];
                $query->whereHas('tagsRelation', function ($subQuery) use ($tag) {
                    $subQuery->where('slug', $tag);
                });
            }

            if (!empty($filters['search'])) {
                $search = $filters['search'];
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('excerpt', 'like', "%{$search}%")
                      ->orWhere('content', 'like', "%{$search}%");
                });
            }

            if (!empty($filters['featured'])) {
                $query->where('is_featured', true);
            }

            return $query->paginate($perPage);
        });
    }

    /**
     * Get a single blog post by slug
     */
    public function getPostBySlug(string $slug): ?BlogPost
    {
        return Cache::remember("blog_post_{$slug}", 300, function () use ($slug) {
            return BlogPost::where('slug', $slug)
                ->where('is_published', true)
                ->with(['categoryRelation', 'tagsRelation'])
                ->first();
        });
    }

    /**
     * Increment view count
     */
    public function incrementViews(BlogPost $post): void
    {
        $post->increment('views');
        Cache::forget("blog_post_{$post->slug}");
    }

    /**
     * Toggle like on a post
     */
    public function toggleLike(BlogPost $post): int
    {
        $post->increment('likes');
        Cache::forget("blog_post_{$post->slug}");
        return $post->likes;
    }

    /**
     * Get related posts
     */
    public function getRelatedPosts(BlogPost $post, int $limit = 3)
    {
        return Cache::remember("blog_related_{$post->id}", 300, function () use ($post, $limit) {
            return BlogPost::where('id', '!=', $post->id)
                ->where('is_published', true)
                ->where('category', $post->category)
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get();
        });
    }

    /**
     * Calculate word count from content
     */
    public function calculateWordCount(string $content): int
    {
        $text = strip_tags($content);
        $text = preg_replace('/\s+/', ' ', $text);
        return str_word_count($text);
    }

    /**
     * Calculate read time based on word count
     */
    public function calculateReadTime(int $wordCount, int $wordsPerMinute = 200): int
    {
        return max(1, (int) ceil($wordCount / $wordsPerMinute));
    }

    /**
     * Generate unique slug
     */
    public function generateUniqueSlug(string $title, ?int $excludeId = null): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while ($this->slugExists($slug, $excludeId)) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    /**
     * Check if slug exists
     */
    protected function slugExists(string $slug, ?int $excludeId = null): bool
    {
        $query = BlogPost::where('slug', $slug);
        
        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->exists();
    }

    /**
     * Clear blog cache
     */
    public function clearCache(?string $slug = null): void
    {
        if ($slug) {
            Cache::forget("blog_post_{$slug}");
        }
        
        // Clear list caches (simplified - in production use tags)
        Cache::flush();
    }
}
