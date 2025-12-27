<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reel;
use App\Models\HomeCard;
use App\Models\SiteSetting;

class ReelsSeeder extends Seeder
{
    public function run(): void
    {
        // Reels
        Reel::truncate();
        $reels = [
            ['title' => 'معرفی محصول جدید', 'thumbnail' => '/storage/reels/reel1.jpg', 'video_url' => '/storage/videos/reels/reel1.mp4', 'video_type' => 'vertical', 'views' => '۱۲.۵K', 'likes' => '۲.۳K', 'comments' => '۱۵۶', 'gradient' => 'from-rose-500 to-pink-600', 'order' => 1, 'is_active' => true],
            ['title' => 'پشت صحنه تولید محتوا', 'thumbnail' => '/storage/reels/reel2.jpg', 'video_url' => '/storage/videos/reels/reel2.mp4', 'video_type' => 'vertical', 'views' => '۸.۲K', 'likes' => '۱.۸K', 'comments' => '۸۹', 'gradient' => 'from-violet-500 to-purple-600', 'order' => 2, 'is_active' => true],
            ['title' => 'نکات طلایی اینستاگرام', 'thumbnail' => '/storage/reels/reel3.jpg', 'video_url' => '/storage/videos/reels/reel3.mp4', 'video_type' => 'vertical', 'views' => '۲۵.۱K', 'likes' => '۵.۴K', 'comments' => '۳۲۱', 'gradient' => 'from-blue-500 to-cyan-600', 'order' => 3, 'is_active' => true],
            ['title' => 'ترند جدید ریلز', 'thumbnail' => '/storage/reels/reel4.jpg', 'video_url' => '/storage/videos/reels/reel4.mp4', 'video_type' => 'vertical', 'views' => '۱۸.۷K', 'likes' => '۴.۱K', 'comments' => '۲۱۸', 'gradient' => 'from-orange-500 to-amber-600', 'order' => 4, 'is_active' => true],
            ['title' => 'آموزش ادیت حرفه‌ای', 'thumbnail' => '/storage/reels/reel5.jpg', 'video_url' => '/storage/videos/reels/reel5.mp4', 'video_type' => 'vertical', 'views' => '۱۵.۳K', 'likes' => '۳.۲K', 'comments' => '۱۷۴', 'gradient' => 'from-emerald-500 to-teal-600', 'order' => 5, 'is_active' => true],
        ];
        foreach ($reels as $reel) {
            Reel::create($reel);
        }

        // Home Cards - Stats
        HomeCard::truncate();
        $statsCards = [
            ['title' => 'پروژه موفق', 'section' => 'stats', 'value' => '150', 'suffix' => '+', 'icon' => 'Rocket', 'color' => 'from-orange-500 to-red-500', 'order' => 1, 'is_active' => true],
            ['title' => 'ویو کل', 'section' => 'stats', 'value' => '50', 'suffix' => 'M+', 'icon' => 'Eye', 'color' => 'from-blue-500 to-cyan-500', 'order' => 2, 'is_active' => true],
            ['title' => 'رضایت مشتری', 'section' => 'stats', 'value' => '98', 'suffix' => '%', 'icon' => 'Award', 'color' => 'from-yellow-500 to-amber-500', 'order' => 3, 'is_active' => true],
        ];
        foreach ($statsCards as $card) {
            HomeCard::create($card);
        }

        // Site Settings
        SiteSetting::truncate();
        $settings = [
            ['key' => 'hero_title', 'value' => 'خلاقیت را با نتیجه ترکیب می‌کنیم', 'type' => 'text', 'group' => 'hero'],
            ['key' => 'hero_subtitle', 'value' => 'آژانس خلاق دیجیتال در تهران', 'type' => 'text', 'group' => 'hero'],
            ['key' => 'hero_description', 'value' => 'تولید محتوای ویدیویی با ویوهای میلیونی، رشد ارگانیک پیج و استراتژی‌های دیجیتال مارکتینگ که نتیجه می‌دهند.', 'type' => 'text', 'group' => 'hero'],
            ['key' => 'hero_video', 'value' => '/storage/videos/hero.mp4', 'type' => 'video', 'group' => 'hero'],
            ['key' => 'hero_image', 'value' => '/storage/hero/hero-bg.jpg', 'type' => 'image', 'group' => 'hero'],
            ['key' => 'site_name', 'value' => 'آژانس خلاق', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_description', 'value' => 'آژانس تولید محتوا و دیجیتال مارکتینگ در تهران', 'type' => 'text', 'group' => 'general'],
            ['key' => 'contact_phone', 'value' => '۰۲۱-۱۲۳۴۵۶۷۸', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_email', 'value' => 'info@agency.ir', 'type' => 'text', 'group' => 'contact'],
            ['key' => 'contact_address', 'value' => 'تهران، خیابان ولیعصر', 'type' => 'text', 'group' => 'contact'],
        ];
        foreach ($settings as $setting) {
            SiteSetting::create($setting);
        }
    }
}
