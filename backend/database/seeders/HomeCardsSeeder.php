<?php

namespace Database\Seeders;

use App\Models\HomeCard;
use Illuminate\Database\Seeder;

class HomeCardsSeeder extends Seeder
{
    public function run(): void
    {
        $cards = [
            [
                'id' => 1,
                'title' => 'استراتژی محتوایی هوشمند',
                'description' => 'با تحلیل داده و هوش مصنوعی، محتوایی تولید می‌کنیم که دقیقاً با نیاز مخاطب شما هماهنگ است.',
                'icon' => 'Brain',
                'color' => 'from-purple-500 to-pink-500',
                'image' => '/storage/home/cards/content-strategy.jpg',
                'button_text' => 'مشاهده خدمات',
                'button_url' => '/services',
                'order' => 1,
                'is_active' => 1,
            ],
            [
                'id' => 2,
                'title' => 'فیلمبرداری حرفه‌ای',
                'description' => 'با تجهیزات پیشرفته و تیم متخصص، ویدیوهای سینمایی و تبلیغاتی با کیفیت 4K تولید می‌کنیم.',
                'icon' => 'Video',
                'color' => 'from-blue-500 to-cyan-500',
                'image' => '/storage/home/cards/videography.jpg',
                'button_text' => 'نمونه کارها',
                'button_url' => '/portfolios',
                'order' => 2,
                'is_active' => 1,
            ],
            [
                'id' => 3,
                'title' => 'رشد ارگانیک واقعی',
                'description' => 'با استراتژی‌های اثبات شده، پیج شما را به رشد پایدار و واقعی در شبکه‌های اجتماعی می‌رسانیم.',
                'icon' => 'TrendingUp',
                'color' => 'from-green-500 to-emerald-500',
                'image' => '/storage/home/cards/organic-growth.jpg',
                'button_text' => 'مشاوره رایگان',
                'button_url' => '/contact',
                'order' => 3,
                'is_active' => 1,
            ],
        ];

        foreach ($cards as $card) {
            HomeCard::create($card);
        }
    }
}
