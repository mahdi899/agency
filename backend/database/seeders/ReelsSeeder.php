<?php

namespace Database\Seeders;

use App\Models\Reel;
use Illuminate\Database\Seeder;

class ReelsSeeder extends Seeder
{
    public function run(): void
    {
        $reels = [
            [
                'title' => 'پشت صحنه فیلمبرداری کافه لمیز',
                'thumbnail' => '/storage/reels/cafe-lamiz-thumb.jpg',
                'video_url' => '/storage/reels/cafe-lamiz-behind-scene.mp4',
                'video_type' => 'vertical',
                'views' => '125000',
                'likes' => '8900',
                'comments' => '234',
                'gradient' => 'from-rose-500 to-pink-600',
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'title' => 'موشن گرافیک برند دیجی‌استایل',
                'thumbnail' => '/storage/reels/digi-style-thumb.jpg',
                'video_url' => '/storage/reels/digi-style-motion.mp4',
                'video_type' => 'vertical',
                'views' => '89000',
                'likes' => '5600',
                'comments' => '123',
                'gradient' => 'from-purple-500 to-pink-600',
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'title' => 'عکاسی محصول برای کلینیک رز',
                'thumbnail' => '/storage/reels/clinic-rose-thumb.jpg',
                'video_url' => '/storage/reels/clinic-rose-photo.mp4',
                'video_type' => 'vertical',
                'views' => '67000',
                'likes' => '3400',
                'comments' => '89',
                'gradient' => 'from-blue-500 to-cyan-500',
                'order' => 0,
                'is_active' => 1,
            ],
        ];

        foreach ($reels as $reel) {
            Reel::create($reel);
        }
    }
}
