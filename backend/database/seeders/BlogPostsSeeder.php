<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Database\Seeder;

class BlogPostsSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'admin@agency.ir')->first();
        $userId = $user ? $user->id : 1;

        $posts = [
            [
                'title' => 'راهنمای کامل سئو در سال ۱۴۰۳',
                'slug' => 'rahnamay-kamel-syo-dl-sal-1403',
                'excerpt' => 'همه چیز درباره بهینه‌سازی سایت برای موتورهای جستجو در سال جدید',
                'content' => '<p>سئو در سال ۱۴۰۳ با چالش‌ها و فرصت‌های جدیدی همراه است. در این مقاله به بررسی کامل استراتژی‌های سئو می‌پردازیم...</p>',
                'user_id' => $userId,
                'category' => 'سئو',
                'thumbnail' => '/storage/blog/seo-guide-2024.jpg',
                'tags' => json_encode(['سئو', 'SEO', 'بهینه‌سازی سایت', 'گوگل'], JSON_UNESCAPED_UNICODE),
                'read_time' => 8,
                'views' => 1250,
                'is_featured' => 1,
                'is_published' => 1,
                'published_at' => '2024-01-15 10:00:00',
            ],
            [
                'title' => 'استراتژی محتوای موفق در اینستاگرام',
                'slug' => 'astratzhy-mhtoay-mofagh-d-aynstagram',
                'excerpt' => 'چگونه محتوایی تولید کنیم که در اینستاگرام وایرال شود؟',
                'content' => '<p>تولید محتوای جذاب برای اینستاگرام نیازمند استراتژی دقیق و شناخت الگوریتم‌هاست...</p>',
                'user_id' => $userId,
                'category' => 'شبکه‌های اجتماعی',
                'thumbnail' => '/storage/blog/instagram-strategy.jpg',
                'tags' => json_encode(['شبکه‌های اجتماعی', 'اینستاگرام', 'محتوای دیجیتال'], JSON_UNESCAPED_UNICODE),
                'read_time' => 6,
                'views' => 890,
                'is_featured' => 0,
                'is_published' => 1,
                'published_at' => '2024-01-20 14:30:00',
            ],
            [
                'title' => 'برندینگ شخصی برای متخصصان',
                'slug' => 'brndyng-shkhsy-br-mtkhssan',
                'excerpt' => 'چگونه برند شخصی قوی بسازیم و در بازار کار متمایز شویم؟',
                'content' => '<p>برندینگ شخصی به متخصصان کمک می‌کند تا در بازار رقابتی امروز متمایز شوند...</p>',
                'user_id' => $userId,
                'category' => 'برندینگ',
                'thumbnail' => '/storage/blog/personal-branding.jpg',
                'tags' => json_encode(['برندینگ', 'برندسازی', 'هویت برند'], JSON_UNESCAPED_UNICODE),
                'read_time' => 7,
                'views' => 654,
                'is_featured' => 0,
                'is_published' => 1,
                'published_at' => '2024-01-25 09:15:00',
            ],
        ];

        foreach ($posts as $post) {
            BlogPost::create($post);
        }
    }
}
