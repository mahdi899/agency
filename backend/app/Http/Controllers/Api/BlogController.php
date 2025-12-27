<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
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
                       ->firstOrFail();
        
        return response()->json([
            'success' => true,
            'data' => $post,
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
        $categories = BlogPost::select('category')
                            ->where('is_published', true)
                            ->distinct()
                            ->pluck('category')
                            ->sort();
        
        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
}
