<?php

require __DIR__.'/vendor/autoload.php';

use Illuminate\Support\Facades\DB;
use App\Models\BlogPost;
use App\Models\BlogTag;

try {
    echo "Creating post...\n";
    $post = BlogPost::create([
        'title' => 'Simple Test',
        'slug' => 'simple-test',
        'content' => 'Simple content',
        'user_id' => 1,
    ]);
    
    echo "Post ID: {$post->id}\n";
    
    echo "Creating tag...\n";
    $tag = BlogTag::firstOrCreate([
        'slug' => 'simple-tag',
        'name' => 'Simple Tag'
    ]);
    
    echo "Tag ID: {$tag->id}\n";
    
    echo "Attaching tag...\n";
    $post->tagsRelation()->attach($tag->id);
    
    echo "Success!\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Line: " . $e->getLine() . "\n";
}
