<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Models\BlogPost;
use App\Models\BlogTag;

Route::get('/test-blog', function() {
    DB::beginTransaction();
    
    try {
        \Log::info('=== Starting blog test ===');
        
        // 1. Create post
        $post = BlogPost::create([
            'title' => 'Test Post ' . time(),
            'slug' => 'test-post-' . time(),
            'content' => 'This is test content for debugging',
            'user_id' => 1,
            'is_published' => false,
        ]);
        
        \Log::info('Post created with ID: ' . $post->id);
        \Log::info('Post exists: ' . ($post->exists ? 'true' : 'false'));
        
        // Refresh to ensure we have latest data
        $post->refresh();
        \Log::info('Post ID after refresh: ' . $post->id);
        
        // 2. Create tag
        $tag = BlogTag::firstOrCreate(
            ['slug' => 'test-tag-' . time()],
            ['name' => 'Test Tag ' . time()]
        );
        
        \Log::info('Tag created with ID: ' . $tag->id);
        
        // 3. Check if we can attach
        if (!$post->id) {
            throw new \Exception('Post ID is null after creation');
        }
        
        if (!$tag->id) {
            throw new \Exception('Tag ID is null after creation');
        }
        
        \Log::info('Attempting to attach tag ' . $tag->id . ' to post ' . $post->id);
        
        // 4. Attach tag
        $post->tagsRelation()->attach($tag->id);
        
        \Log::info('Tag attached successfully');
        
        DB::commit();
        
        return response()->json([
            'success' => true,
            'post_id' => $post->id,
            'tag_id' => $tag->id,
            'tags_count' => $post->tagsRelation()->count(),
            'message' => 'Test completed successfully'
        ]);
        
    } catch (\Exception $e) {
        DB::rollBack();
        \Log::error('Test failed: ' . $e->getMessage());
        \Log::error('Stack trace: ' . $e->getTraceAsString());
        
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});
