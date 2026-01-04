<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'id' => 1,
                'key' => 'site_title',
                'value' => 'AMONIX - آژانس دیجیتال مارکتینگ و تولید محتوا',
                'type' => 'text',
                'description' => 'عنوان اصلی سایت',
                'is_public' => 1,
            ],
            [
                'id' => 2,
                'key' => 'site_description',
                'value' => 'AMONIX آژانس دیجیتال مارکتینگ تخصصی با خدمات تولید محتوا، فیلمبرداری، عکاسی، برندینگ و بازاریابی دیجیتال برای کسب‌وکارهای ایرانی',
                'type' => 'textarea',
                'description' => 'توضیحات متا سایت',
                'is_public' => 1,
            ],
            [
                'id' => 3,
                'key' => 'site_keywords',
                'value' => 'دیجیتال مارکتینگ,تولید محتوا,فیلمبرداری,عکاسی,برندینگ,سئو,شبکه‌های اجتماعی',
                'type' => 'text',
                'description' => 'کلمات کلیدی سایت',
                'is_public' => 1,
            ],
            [
                'id' => 4,
                'key' => 'contact_email',
                'value' => 'info@amonix.ir',
                'type' => 'email',
                'description' => 'ایمیل تماس',
                'is_public' => 1,
            ],
            [
                'id' => 5,
                'key' => 'contact_phone',
                'value' => '+98 21 1234 5678',
                'type' => 'text',
                'description' => 'شماره تماس',
                'is_public' => 1,
            ],
            [
                'id' => 6,
                'key' => 'social_instagram',
                'value' => 'https://instagram.com/amonix.agency',
                'type' => 'url',
                'description' => 'لینک اینستاگرام',
                'is_public' => 1,
            ],
            [
                'id' => 7,
                'key' => 'social_linkedin',
                'value' => 'https://linkedin.com/company/amonix',
                'type' => 'url',
                'description' => 'لینک لینکدین',
                'is_public' => 1,
            ],
            [
                'id' => 8,
                'key' => 'social_twitter',
                'value' => 'https://twitter.com/amonix_agency',
                'type' => 'url',
                'description' => 'لینک توییتر',
                'is_public' => 1,
            ],
        ];

        foreach ($settings as $setting) {
            SiteSetting::create($setting);
        }
    }
}
