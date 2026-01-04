<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Seeder;

class PortfoliosSeeder extends Seeder
{
    public function run(): void
    {
        $portfolios = [
            [
                'id' => 1,
                'title' => 'کافه لمیز',
                'slug' => 'cafe-lamiz',
                'category' => 'cafe',
                'description' => 'تولید محتوای ویدیویی برای کافه لمیز با تمرکز بر فضای دنج و منوی خاص',
                'full_description' => 'کافه لمیز یکی از محبوب‌ترین کافه‌های تهران است که با همکاری ما توانست حضور دیجیتال خود را به طور چشمگیری افزایش دهد.',
                'thumbnail' => '/storage/portfolios/cafe-lamiz.jpg',
                'cover_image' => '/storage/portfolios/cafe-lamiz-cover.jpg',
                'views' => '2.5M',
                'growth' => '+340%',
                'services' => json_encode(['فیلمبرداری', 'تدوین', 'تولید محتوا', 'سوشال مدیا'], JSON_UNESCAPED_UNICODE),
                'tags' => json_encode(['کافه', 'رستوران', 'ریلز'], JSON_UNESCAPED_UNICODE),
                'duration' => '۳ ماه',
                'year' => '۱۴۰۲',
                'client' => 'کافه لمیز',
                'industry' => 'کافه و رستوران',
                'results' => json_encode(['views' => '2,500,000+', 'followers' => '+15,000', 'engagement' => '8.5%'], JSON_UNESCAPED_UNICODE),
                'is_active' => 1,
                'is_featured' => 1,
                'order' => 0,
            ],
            [
                'id' => 2,
                'title' => 'کلینیک زیبایی رز',
                'slug' => 'clinic-rose',
                'category' => 'beauty',
                'description' => 'کمپین محتوایی برای کلینیک زیبایی با تمرکز بر نتایج واقعی',
                'full_description' => 'کلینیک زیبایی رز با هدف افزایش اعتماد مشتریان و نمایش نتایج واقعی خدمات، با ما همکاری کرد.',
                'thumbnail' => '/storage/portfolios/clinic-rose.jpg',
                'cover_image' => '/storage/portfolios/clinic-rose-cover.jpg',
                'views' => '1.8M',
                'growth' => '+280%',
                'services' => json_encode(['عکاسی', 'تولید محتوا', 'سوشال مدیا', 'برندینگ'], JSON_UNESCAPED_UNICODE),
                'tags' => json_encode(['زیبایی', 'کلینیک', 'پزشکی'], JSON_UNESCAPED_UNICODE),
                'duration' => '۶ ماه',
                'year' => '۱۴۰۲',
                'client' => 'کلینیک رز',
                'industry' => 'زیبایی و سلامت',
                'results' => json_encode(['views' => '1,800,000+', 'followers' => '+22,000', 'engagement' => '12%'], JSON_UNESCAPED_UNICODE),
                'is_active' => 1,
                'is_featured' => 1,
                'order' => 0,
            ],
            [
                'id' => 3,
                'title' => 'فروشگاه مد آریا',
                'slug' => 'fashion-aria',
                'category' => 'fashion',
                'description' => 'تولید ریلز‌های وایرال برای فروشگاه پوشاک با استایل مدرن',
                'full_description' => 'فروشگاه مد آریا با هدف افزایش فروش آنلاین و شناخت برند، پروژه تولید محتوا را به ما سپرد.',
                'thumbnail' => '/storage/portfolios/fashion-aria.jpg',
                'cover_image' => '/storage/portfolios/fashion-aria-cover.jpg',
                'views' => '3.2M',
                'growth' => '+420%',
                'services' => json_encode(['فیلمبرداری', 'موشن گرافیک', 'تولید محتوا', 'اینفلوئنسر مارکتینگ'], JSON_UNESCAPED_UNICODE),
                'tags' => json_encode(['فشن', 'پوشاک', 'ریلز'], JSON_UNESCAPED_UNICODE),
                'duration' => '۴ ماه',
                'year' => '۱۴۰۳',
                'client' => 'فروشگاه آریا',
                'industry' => 'مد و پوشاک',
                'results' => json_encode(['views' => '3,200,000+', 'followers' => '+45,000', 'engagement' => '15%'], JSON_UNESCAPED_UNICODE),
                'is_active' => 1,
                'is_featured' => 1,
                'order' => 0,
            ],
        ];

        foreach ($portfolios as $portfolio) {
            Portfolio::create($portfolio);
        }
    }
}
