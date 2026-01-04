<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialsSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'id' => 1,
                'author' => 'علی محمدی',
                'role' => 'مدیر کافه لمیز',
                'company' => 'کافه لمیز',
                'content' => 'همکاری با این تیم بهترین تصمیم برای رشد پیج ما بود. ویوهای میلیونی و رشد فالوور واقعی رو تجربه کردیم.',
                'avatar' => '/storage/testimonials/ali-mohammadi.jpg',
                'rating' => 5,
                'industry' => 'کافه و رستوران',
                'results' => '+340% رشد فالوور',
                'is_featured' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 2,
                'author' => 'دکتر سارا احمدی',
                'role' => 'مدیر کلینیک زیبایی',
                'company' => 'کلینیک رز',
                'content' => 'نتایج فوق‌العاده بود. مراجعین ما چند برابر شدند و برند ما در فضای مجازی شناخته شد.',
                'avatar' => '/storage/testimonials/sara-ahmadi.jpg',
                'rating' => 5,
                'industry' => 'زیبایی و سلامت',
                'results' => '+250% افزایش مراجعین',
                'is_featured' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 3,
                'author' => 'محمد رضایی',
                'role' => 'مدیر فروشگاه آریا',
                'company' => 'فروشگاه آریا',
                'content' => 'فروش آنلاین ما ۵ برابر شد! تیم حرفه‌ای و خلاق با درک عمیق از بازار.',
                'avatar' => '/storage/testimonials/mohammad-rezaei.jpg',
                'rating' => 5,
                'industry' => 'مد و پوشاک',
                'results' => '+500% رشد فروش',
                'is_featured' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 4,
                'author' => 'نیلوفر کریمی',
                'role' => 'اینفلوئنسر لایف‌استایل',
                'company' => 'بلاگر لایف‌استایل',
                'content' => 'کیفیت تولید محتوا و ایده‌پردازی این تیم بی‌نظیره. همیشه یک قدم جلوتر از ترندها هستند.',
                'avatar' => '/storage/testimonials/niloofar-karimi.jpg',
                'rating' => 5,
                'industry' => 'اینفلوئنسر مارکتینگ',
                'results' => '+2M ویو در ماه',
                'is_featured' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 5,
                'author' => 'امیر حسینی',
                'role' => 'مدیرعامل دیجی‌استایل',
                'company' => 'دیجی‌استایل',
                'content' => 'از برندینگ تا دیجیتال مارکتینگ، همه چیز رو با کیفیت عالی انجام دادند.',
                'avatar' => '/storage/testimonials/amir-hosseini.jpg',
                'rating' => 5,
                'industry' => 'فروشگاه آنلاین',
                'results' => '+550% رشد فروش',
                'is_featured' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 6,
                'author' => 'رضا کریمی',
                'role' => 'مدیر نمایشگاه پرشیا',
                'company' => 'نمایشگاه پرشیا',
                'content' => 'کیفیت ویدیوها فوق‌العاده بود. مشتریان از دیدن ویدیوها هیجان‌زده می‌شدند.',
                'avatar' => '/storage/testimonials/reza-karimi.jpg',
                'rating' => 5,
                'industry' => 'خودرو',
                'results' => '+120% افزایش لید',
                'is_featured' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 7,
                'author' => 'دکتر فاطمه رحیمی',
                'role' => 'مدیر آکادمی نوآوران',
                'company' => 'آکادمی نوآوران',
                'content' => 'ثبت‌نام دوره‌ها به شدت افزایش یافت. استراتژی محتوایی عالی بود.',
                'avatar' => '/storage/testimonials/fateme-rahimi.jpg',
                'rating' => 5,
                'industry' => 'آموزش',
                'results' => '+220% ثبت‌نام',
                'is_featured' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 8,
                'author' => 'حسین نوری',
                'role' => 'مدیر باشگاه فیت‌لند',
                'company' => 'باشگاه فیت‌لند',
                'content' => 'ثبت‌نام‌های ما به شدت افزایش یافت. محتواها واقعاً انگیزشی بودند.',
                'avatar' => '/storage/testimonials/hossein-noori.jpg',
                'rating' => 5,
                'industry' => 'ورزش و تناسب اندام',
                'results' => '+180% عضویت جدید',
                'is_featured' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
