<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Http\Resources\BlogPostCollection;
use App\Http\Requests\BlogPostRequest;
use App\Services\BlogService;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use App\Models\BlogImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class BlogController extends Controller
{
    protected BlogService $blogService;

    public function __construct(BlogService $blogService)
    {
        $this->blogService = $blogService;
    }

    public function index(Request $request): BlogPostCollection
    {
        $filters = $request->only(['category', 'tag', 'search', 'featured']);
        $perPage = $request->get('per_page', 12);
        
        $posts = $this->blogService->getPublishedPosts($filters, $perPage);
        
        return new BlogPostCollection($posts);
    }
    
    public function show(string $slug): BlogPostResource
    {
        $post = BlogPost::where('slug', $slug)
                       ->where('is_published', true)
                       ->with(['categoryRelation', 'tagsRelation'])
                       ->first();
        
        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'مقاله یافت نشد'
            ], 404);
        }
        
        // Increment views
        $this->blogService->incrementViews($post);
        
        return new BlogPostResource($post);
    }
    
    public function store(BlogPostRequest $request): JsonResponse
    {
        $validated = $request->validated();
        
        // Generate unique slug using service
        $validated['slug'] = $this->blogService->generateUniqueSlug($validated['title']);
        
        // Calculate word count and read time using service
        $wordCount = $this->blogService->calculateWordCount($validated['content']);
        $validated['word_count'] = $wordCount;
        $validated['read_time'] = $validated['read_time'] ?? $this->blogService->calculateReadTime($wordCount);
        
        $post = BlogPost::create($validated);
        
        // Handle tags if provided
        if (!empty($validated['tags'])) {
            $this->syncTags($post, $validated['tags']);
        }
        
        // Clear cache
        $this->blogService->clearCache();
        
        return response()->json([
            'success' => true,
            'data' => new BlogPostResource($post),
            'message' => 'مقاله با موفقیت ایجاد شد',
        ], 201);
    }
    
    public function update(BlogPostRequest $request, BlogPost $post): JsonResponse
    {
        $validated = $request->validated();
        
        // Slug is already provided from frontend, no need to regenerate
        
        if (isset($validated['content'])) {
            $wordCount = $this->blogService->calculateWordCount($validated['content']);
            $validated['word_count'] = $wordCount;
            $validated['read_time'] = $this->blogService->calculateReadTime($wordCount);
        }
        
        $post->update($validated);
        
        // Handle tags if provided
        if (array_key_exists('tags', $validated)) {
            $this->syncTags($post, $validated['tags'] ?? []);
        }
        
        // Clear cache
        $this->blogService->clearCache($post->slug);
        
        return response()->json([
            'success' => true,
            'data' => new BlogPostResource($post),
            'message' => 'مقاله با موفقیت ویرایش شد',
        ]);
    }
    
    /**
     * Sync tags with blog post
     */
    protected function syncTags(BlogPost $post, array $tags): void
    {
        $tagIds = [];
        
        foreach ($tags as $tagName) {
            $tag = BlogTag::firstOrCreate([
                'slug' => Str::slug($tagName)
            ], [
                'name' => $tagName,
                'slug' => Str::slug($tagName),
            ]);
            
            $tagIds[] = $tag->id;
        }
        
        $post->tagsRelation()->sync($tagIds);
    }
    
    public function destroy(BlogPost $post): JsonResponse
    {
        $post->delete();
        
        // Clear cache
        $this->blogService->clearCache($post->slug);
        
        return response()->json([
            'success' => true,
            'message' => 'مقاله با موفقیت حذف شد',
        ]);
    }
    
    /**
     * Increment post views
     */
    public function incrementViews(BlogPost $post): JsonResponse
    {
        $views = $this->blogService->incrementViews($post);
        
        return response()->json([
            'success' => true,
            'data' => [
                'views' => $post->fresh()->views
            ],
            'message' => 'Views incremented successfully',
        ]);
    }
    
    /**
     * Toggle like on post
     */
    public function toggleLike(BlogPost $post): JsonResponse
    {
        $likes = $this->blogService->toggleLike($post);
        
        return response()->json([
            'success' => true,
            'data' => [
                'likes' => $likes,
                'liked' => true
            ],
            'message' => 'Like toggled successfully',
        ]);
    }
    
    /**
     * Get related posts
     */
    public function relatedPosts(BlogPost $post): JsonResponse
    {
        $relatedPosts = $this->blogService->getRelatedPosts($post);
        
        return response()->json([
            'success' => true,
            'data' => BlogPostResource::collection($relatedPosts),
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

    public function seoData(string $slug): JsonResponse
    {
        $post = BlogPost::where('slug', $slug)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $post->getSeoData(),
        ]);
    }
}
