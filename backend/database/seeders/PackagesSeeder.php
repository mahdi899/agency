<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackagesSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'id' => 1,
                'name' => 'استارتر',
                'slug' => 'starter',
                'subtitle' => 'شروع حرفه‌ای',
                'price' => '4900000',
                'period' => 'ماهانه',
                'description' => 'مناسب برای کسب‌وکارهای کوچک که تازه شروع کرده‌اند',
                'color' => 'from-slate-500 to-slate-600',
                'features' => json_encode(['۸ پست اینستاگرام', '۴ ریلز ماهانه', '۱۵ استوری', 'تقویم محتوایی', 'گزارش ماهانه'], JSON_UNESCAPED_UNICODE),
                'not_included' => json_encode(['فیلمبرداری حرفه‌ای', 'موشن گرافیک', 'مدیریت تبلیغات'], JSON_UNESCAPED_UNICODE),
                'is_popular' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 2,
                'name' => 'رشد',
                'slug' => 'growth',
                'subtitle' => 'محبوب‌ترین',
                'price' => '9900000',
                'period' => 'ماهانه',
                'description' => 'بهترین انتخاب برای رشد سریع و حرفه‌ای',
                'color' => 'from-primary-500 to-secondary-500',
                'features' => json_encode(['۱۲ پست اینستاگرام', '۸ ریلز ماهانه', '۳۰ استوری', 'تقویم محتوایی', 'گزارش هفتگی', '۱ روز فیلمبرداری', 'موشن گرافیک ساده', 'مدیریت کامنت‌ها'], JSON_UNESCAPED_UNICODE),
                'not_included' => json_encode(['مدیریت تبلیغات'], JSON_UNESCAPED_UNICODE),
                'is_popular' => 1,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 3,
                'name' => 'حرفه‌ای',
                'slug' => 'pro',
                'subtitle' => 'کامل‌ترین',
                'price' => '19900000',
                'period' => 'ماهانه',
                'description' => 'برای برندهایی که می‌خواهند در صدر باشند',
                'color' => 'from-violet-500 to-purple-500',
                'features' => json_encode(['۲۰ پست اینستاگرام', '۱۲ ریلز ماهانه', 'استوری نامحدود', 'تقویم محتوایی', 'گزارش روزانه', '۲ روز فیلمبرداری', 'موشن گرافیک پیشرفته', 'مدیریت کامل پیج', 'مدیریت تبلیغات', 'مشاوره استراتژی'], JSON_UNESCAPED_UNICODE),
                'not_included' => json_encode([], JSON_UNESCAPED_UNICODE),
                'is_popular' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
            [
                'id' => 4,
                'name' => 'سفارشی',
                'slug' => 'custom',
                'subtitle' => 'ویژه شما',
                'price' => '0',
                'period' => 'توافقی',
                'description' => 'پکیج اختصاصی متناسب با نیازهای شما',
                'color' => 'from-amber-500 to-orange-500',
                'features' => json_encode(['تمام خدمات قابل سفارشی‌سازی', 'تیم اختصاصی', 'جلسات حضوری', 'گزارش‌دهی سفارشی', 'پشتیبانی ۲۴/۷'], JSON_UNESCAPED_UNICODE),
                'not_included' => json_encode([], JSON_UNESCAPED_UNICODE),
                'is_popular' => 0,
                'is_active' => 1,
                'order' => 0,
            ],
        ];

        foreach ($packages as $package) {
            Package::create($package);
        }
    }
}
