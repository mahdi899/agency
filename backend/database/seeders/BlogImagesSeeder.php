<?php

namespace Database\Seeders;

use App\Models\BlogImage;
use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogImagesSeeder extends Seeder
{
    public function run(): void
    {
        $posts = BlogPost::all();
        
        foreach ($posts as $post) {
            BlogImage::create([
                'blog_post_id' => $post->id,
                'url' => $post->thumbnail,
                'alt_text' => $post->title,
                'title' => $post->title,
                'caption' => 'تصویر اصلی مقاله',
                'order' => 0,
            ]);
        }
    }
}
