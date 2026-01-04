<?php

namespace Database\Seeders;

use App\Models\BlogTag;
use Illuminate\Database\Seeder;

class BlogTagsSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            ['id' => 32, 'name' => 'سئو', 'slug' => 'syo'],
            ['id' => 33, 'name' => 'SEO', 'slug' => 'seo'],
            ['id' => 34, 'name' => 'بهینه‌سازی سایت', 'slug' => 'bhynhsazy-sayt'],
            ['id' => 35, 'name' => 'گوگل', 'slug' => 'gogl'],
            ['id' => 36, 'name' => 'ترافیک ارگانیک', 'slug' => 'trafyk-arganyk'],
            ['id' => 37, 'name' => 'رتبه بندی', 'slug' => 'rtbh-bndy'],
            ['id' => 38, 'name' => 'شبکه‌های اجتماعی', 'slug' => 'shbkhhay-agtmaaay'],
            ['id' => 39, 'name' => 'محتوای دیجیتال', 'slug' => 'mhtoay-dygytal'],
            ['id' => 40, 'name' => 'اینستاگرام', 'slug' => 'aynstagram'],
            ['id' => 41, 'name' => 'لینکدین', 'slug' => 'lynkdyn'],
            ['id' => 42, 'name' => 'توییتر', 'slug' => 'toyytr'],
            ['id' => 43, 'name' => 'استراتژی محتوا', 'slug' => 'astratzhy-mhtoa'],
            ['id' => 44, 'name' => 'تولید محتوا', 'slug' => 'tolyd-mhtoa'],
            ['id' => 45, 'name' => 'محتوای ویدیویی', 'slug' => 'mhtoay-oydyoyy'],
            ['id' => 46, 'name' => 'فیلم‌برداری', 'slug' => 'fylmbrdary'],
            ['id' => 47, 'name' => 'تدوین', 'slug' => 'tdoyn'],
            ['id' => 48, 'name' => 'بازاریابی محتوا', 'slug' => 'bazaryaby-mhtoa'],
            ['id' => 49, 'name' => 'برندینگ', 'slug' => 'brndyng'],
            ['id' => 50, 'name' => 'برندسازی', 'slug' => 'brndsazy'],
            ['id' => 51, 'name' => 'هویت برند', 'slug' => 'hoyt-brnd'],
            ['id' => 52, 'name' => 'طراحی لوگو', 'slug' => 'trahy-logo'],
            ['id' => 53, 'name' => 'برند شخصی', 'slug' => 'brnd-shkhsy'],
            ['id' => 54, 'name' => 'بازاریابی دیجیتال', 'slug' => 'bazaryaby-dygytal'],
            ['id' => 55, 'name' => 'کسب‌وکار کوچک', 'slug' => 'ksbokar-kochk'],
            ['id' => 56, 'name' => 'ROI', 'slug' => 'roi'],
            ['id' => 57, 'name' => 'تبلیغات آنلاین', 'slug' => 'tblyghat-anlayn'],
            ['id' => 58, 'name' => 'استراتژی بازاریابی', 'slug' => 'astratzhy-bazaryaby'],
            ['id' => 59, 'name' => 'دیجیتال مارکتینگ', 'slug' => 'dygytal-marktyng'],
            ['id' => 60, 'name' => 'بازاریابی آنلاین', 'slug' => 'bazaryaby-anlayn'],
            ['id' => 61, 'name' => 'وب‌سایت', 'slug' => 'obsayt'],
            ['id' => 62, 'name' => 'آنلاین مارکتینگ', 'slug' => 'anlayn-marktyng'],
        ];

        foreach ($tags as $tag) {
            BlogTag::create($tag);
        }
    }
}
