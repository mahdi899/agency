<?php

namespace Database\Seeders;

use App\Models\WebProject;
use Illuminate\Database\Seeder;

class WebProjectsSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'id' => 1,
                'title' => 'وب‌سایت کافه لمیز',
                'slug' => 'website-cafe-lamiz',
                'description' => 'طراحی و توسعه وب‌سایت مدرن برای کافه لمیز با قابلیت رزرو آنلاین',
                'full_description' => 'وب‌سایت کافه لمیز با طراحی مدرن و کاربرپسند، امکان رزرو میز آنلاین، مشاهده منو و معرفی فضای کافه را فراهم می‌کند.',
                'thumbnail' => '/storage/web-projects/cafe-lamiz-thumb.jpg',
                'cover_image' => '/storage/web-projects/cafe-lamiz-cover.jpg',
                'url' => 'https://cafelamiz.ir',
                'category' => 'restaurant',
                'technologies' => json_encode(['React', 'Laravel', 'MySQL', 'Tailwind CSS'], JSON_UNESCAPED_UNICODE),
                'client' => 'کافه لمیز',
                'completion_date' => '2024-03-15',
                'duration' => '۲ ماه',
                'team_size' => 4,
                'is_featured' => 1,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 2,
                'title' => 'پلتفرم آموزشی نوآوران',
                'slug' => 'platform-noavaran',
                'description' => 'پلتفرم جامع آموزش آنلاین با قابلیت مدیریت دوره و دانشجویان',
                'full_description' => 'پلتفرم آموزشی نوآوران با امکانات کامل مدیریت دوره‌ها، سیستم آزمون آنلاین، و گواهینامه دیجیتال طراحی شده است.',
                'thumbnail' => '/storage/web-projects/noavaran-thumb.jpg',
                'cover_image' => '/storage/web-projects/noavaran-cover.jpg',
                'url' => 'https://noavaran.ir',
                'category' => 'education',
                'technologies' => json_encode(['Vue.js', 'Laravel', 'PostgreSQL', 'Docker'], JSON_UNESCAPED_UNICODE),
                'client' => 'آکادمی نوآوران',
                'completion_date' => '2024-02-20',
                'duration' => '۳ ماه',
                'team_size' => 6,
                'is_featured' => 1,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 3,
                'title' => 'فروشگاه آنلاین دیجی‌استایل',
                'slug' => 'ecommerce-digi-style',
                'description' => 'فروشگاه مدرن پوشاک با قابلیت مدیریت کامل محصولات و سفارشات',
                'full_description' => 'فروشگاه آنلاین دیجی‌استایل با طراحی جذاب و امکانات کامل ایکامرس، تجربه خرید آنلاین بی‌نظیری را برای کاربران فراهم می‌کند.',
                'thumbnail' => '/storage/web-projects/digi-style-thumb.jpg',
                'cover_image' => '/storage/web-projects/digi-style-cover.jpg',
                'url' => 'https://digistyle.ir',
                'category' => 'ecommerce',
                'technologies' => json_encode(['Next.js', 'Laravel', 'Redis', 'Elasticsearch'], JSON_UNESCAPED_UNICODE),
                'client' => 'دیجی‌استایل',
                'completion_date' => '2024-01-10',
                'duration' => '۴ ماه',
                'team_size' => 8,
                'is_featured' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
        ];

        foreach ($projects as $project) {
            WebProject::create($project);
        }
    }
}
