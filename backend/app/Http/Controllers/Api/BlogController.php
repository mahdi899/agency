<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use App\Models\BlogImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = BlogPost::query()->where('is_published', true);
        
        // Filter by category
        if ($request->category) {
            $query->where('category', $request->category);
        }
        
        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('excerpt', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }
        
        $posts = $query->orderBy('is_featured', 'desc')
                      ->orderBy('created_at', 'desc')
                      ->paginate($request->per_page ?? 12);
        
        return response()->json([
            'success' => true,
            'data' => $posts->items(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
        ]);
    }
    
    public function show(string $slug): JsonResponse
    {
        $post = BlogPost::where('slug', $slug)
                       ->where('is_published', true)
                       ->with(['categoryRelation', 'images', 'tagsRelation'])
                       ->firstOrFail();
        
        // Parse content_blocks if it's a string
        $postData = $post->toArray();
        if (isset($postData['content_blocks']) && is_string($postData['content_blocks'])) {
            $postData['content_blocks'] = json_decode($postData['content_blocks'], true) ?? [];
        }
        
        // Add category name
        $postData['category_name'] = $post->categoryRelation?->name ?? $post->category;
        
        // Add tags array
        $postData['tags'] = $post->tagsRelation->pluck('name')->toArray();
        
        return response()->json([
            'success' => true,
            'data' => $postData,
        ]);
    }
    
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'category' => 'required|string|max:100',
            'author' => 'required|string|max:255',
            'author_avatar' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|string|max:255',
            'read_time' => 'nullable|integer|min:1',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ]);
        
        $validated['slug'] = Str::slug($validated['title']);
        $validated['read_time'] = $validated['read_time'] ?? ceil(str_word_count(strip_tags($validated['content'])) / 200);
        
        // Ensure unique slug
        $originalSlug = $validated['slug'];
        $counter = 1;
        while (BlogPost::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $originalSlug . '-' . $counter;
            $counter++;
        }
        
        $post = BlogPost::create($validated);
        
        return response()->json([
            'success' => true,
            'data' => $post,
            'message' => 'Blog post created successfully',
        ], 201);
    }
    
    public function update(Request $request, BlogPost $post): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'excerpt' => 'sometimes|required|string|max:500',
            'content' => 'sometimes|required|string',
            'category' => 'sometimes|required|string|max:100',
            'author' => 'sometimes|required|string|max:255',
            'author_avatar' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|string|max:255',
            'read_time' => 'nullable|integer|min:1',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'is_published' => 'sometimes|boolean',
            'is_featured' => 'sometimes|boolean',
        ]);
        
        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
            
            // Ensure unique slug (excluding current post)
            $originalSlug = $validated['slug'];
            $counter = 1;
            while (BlogPost::where('slug', $validated['slug'])->where('id', '!=', $post->id)->exists()) {
                $validated['slug'] = $originalSlug . '-' . $counter;
                $counter++;
            }
        }
        
        if (isset($validated['content'])) {
            $validated['read_time'] = ceil(str_word_count(strip_tags($validated['content'])) / 200);
        }
        
        $post->update($validated);
        
        return response()->json([
            'success' => true,
            'data' => $post,
            'message' => 'Blog post updated successfully',
        ]);
    }
    
    public function destroy(BlogPost $post): JsonResponse
    {
        $post->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Blog post deleted successfully',
        ]);
    }
    
    public function adminIndex(Request $request): JsonResponse
    {
        $query = BlogPost::query();
        
        // Filter by category
        if ($request->category) {
            $query->where('category', $request->category);
        }
        
        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('excerpt', 'like', '%' . $request->search . '%');
            });
        }
        
        $posts = $query->orderBy('created_at', 'desc')
                      ->paginate($request->per_page ?? 20);
        
        return response()->json([
            'success' => true,
            'data' => $posts->items(),
            'meta' => [
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
        ]);
    }
    
    public function categories(): JsonResponse
    {
        $categories = BlogCategory::active()->ordered()->get();
        
        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    public function storeCategory(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        
        $category = BlogCategory::create($validated);

        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => 'Category created successfully',
        ], 201);
    }

    public function updateCategory(Request $request, BlogCategory $category): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:100',
            'order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->update($validated);

        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => 'Category updated successfully',
        ]);
    }

    public function destroyCategory(BlogCategory $category): JsonResponse
    {
        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully',
        ]);
    }

    public function tags(): JsonResponse
    {
        $tags = BlogTag::withCount('posts')->orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => $tags,
        ]);
    }

    public function storeTag(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $tag = BlogTag::firstOrCreate(
            ['slug' => $validated['slug']],
            $validated
        );

        return response()->json([
            'success' => true,
            'data' => $tag,
        ]);
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|image|max:5120',
            'blog_post_id' => 'nullable|exists:blog_posts,id',
            'alt_text' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
        ]);

        $file = $request->file('file');
        $path = $file->store('blog/images', 'public');
        $url = '/storage/' . $path;

        $imageData = [
            'url' => $url,
            'alt_text' => $request->alt_text,
            'title' => $request->title,
            'caption' => $request->caption,
            'width' => null,
            'height' => null,
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
        ];

        if ($dimensions = @getimagesize($file->getRealPath())) {
            $imageData['width'] = $dimensions[0];
            $imageData['height'] = $dimensions[1];
        }

        if ($request->blog_post_id) {
            $imageData['blog_post_id'] = $request->blog_post_id;
            $image = BlogImage::create($imageData);
        }

        return response()->json([
            'success' => true,
            'url' => $url,
            'data' => $imageData,
            'message' => 'Image uploaded successfully',
        ]);
    }

    public function updateImage(Request $request, BlogImage $image): JsonResponse
    {
        $validated = $request->validate([
            'alt_text' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $image->update($validated);

        return response()->json([
            'success' => true,
            'data' => $image,
            'message' => 'Image updated successfully',
        ]);
    }

    public function destroyImage(BlogImage $image): JsonResponse
    {
        if ($image->url && str_starts_with($image->url, '/storage/')) {
            $path = str_replace('/storage/', '', $image->url);
            Storage::disk('public')->delete($path);
        }

        $image->delete();

        return response()->json([
            'success' => true,
            'message' => 'Image deleted successfully',
        ]);
    }

    public function getPostImages(BlogPost $post): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $post->images,
        ]);
    }

    public function incrementViews(BlogPost $post): JsonResponse
    {
        $post->increment('views');

        return response()->json([
            'success' => true,
            'views' => $post->views,
        ]);
    }

    public function toggleLike(BlogPost $post): JsonResponse
    {
        $post->increment('likes');

        return response()->json([
            'success' => true,
            'likes' => $post->likes,
        ]);
    }

    public function relatedPosts(BlogPost $post): JsonResponse
    {
        $related = BlogPost::published()
            ->where('id', '!=', $post->id)
            ->where(function ($query) use ($post) {
                $query->where('category', $post->category)
                      ->orWhere('category_id', $post->category_id);
            })
            ->limit(4)
            ->get(['id', 'title', 'slug', 'thumbnail', 'excerpt', 'read_time', 'created_at']);

        return response()->json([
            'success' => true,
            'data' => $related,
        ]);
    }

    public function seoData(string $slug): JsonResponse
    {
        $post = BlogPost::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $post->getSeoData(),
        ]);
    }
}
