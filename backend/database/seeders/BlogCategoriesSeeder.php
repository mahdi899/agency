<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Seeder;

class BlogCategoriesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'id' => 6,
                'name' => 'سئو',
                'slug' => 'seo',
                'description' => 'مقالات و آموزش‌های بهینه‌سازی سایت برای موتورهای جستجو',
                'color' => 'from-primary-500 to-secondary-500',
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'id' => 7,
                'name' => 'شبکه‌های اجتماعی',
                'slug' => 'social-media',
                'description' => 'استراتژی‌های محتوایی و بازاریابی در شبکه‌های اجتماعی',
                'color' => 'from-primary-500 to-secondary-500',
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'id' => 8,
                'name' => 'تولید محتوا',
                'slug' => 'content',
                'description' => 'راهنماهای تولید محتوای باکیفیت و جذاب',
                'color' => 'from-primary-500 to-secondary-500',
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'id' => 9,
                'name' => 'برندینگ',
                'slug' => 'branding',
                'description' => 'هویت برند و استراتژی‌های برندسازی',
                'color' => 'from-primary-500 to-secondary-500',
                'order' => 0,
                'is_active' => 1,
            ],
            [
                'id' => 10,
                'name' => 'بازاریابی دیجیتال',
                'slug' => 'marketing',
                'description' => 'استراتژی‌های بازاریابی آنلاین و دیجیتال',
                'color' => 'from-primary-500 to-secondary-500',
                'order' => 0,
                'is_active' => 1,
            ],
        ];

        foreach ($categories as $category) {
            BlogCategory::create($category);
        }
    }
}
