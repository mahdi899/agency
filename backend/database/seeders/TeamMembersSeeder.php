<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamMembersSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'id' => 1,
                'name' => 'علی رضایی',
                'role' => 'مدیرعامل و بنیان‌گذار',
                'bio' => 'با بیش از ۱۰ سال تجربه در زمینه دیجیتال مارکتینگ و تولید محتوا، علی رضایی تیم AMONIX را برای ارائه خدمات باکیفیت به کسب‌وکارهای ایرانی تأسیس کرد.',
                'photo' => '/storage/team/ali-rezaei.jpg',
                'social_links' => json_encode([
                    'linkedin' => 'https://linkedin.com/in/ali-rezaei',
                    'instagram' => 'https://instagram.com/ali.rezaei',
                    'twitter' => 'https://twitter.com/ali_rezaei'
                ], JSON_UNESCAPED_UNICODE),
                'skills' => json_encode(['استراتژی دیجیتال', 'برندینگ', 'تولید محتوا'], JSON_UNESCAPED_UNICODE),
                'order' => 1,
                'is_active' => 1,
            ],
            [
                'id' => 2,
                'name' => 'سارا محمدی',
                'role' => 'مدیر تولید محتوا',
                'bio' => 'سارا با تخصص در تولید محتوای خلاقانه و وایرال، تیم محتوای AMONIX را رهبری می‌کند و مسئولیت کیفیت تمام محتوای تولیدی بر عهده اوست.',
                'photo' => '/storage/team/sara-mohammadi.jpg',
                'social_links' => json_encode([
                    'linkedin' => 'https://linkedin.com/in/sara-mohammadi',
                    'instagram' => 'https://instagram.com/sara.mohammadi'
                ], JSON_UNESCAPED_UNICODE),
                'skills' => json_encode(['تولید محتوا', 'کپی‌رایتینگ', 'شبکه‌های اجتماعی'], JSON_UNESCAPED_UNICODE),
                'order' => 2,
                'is_active' => 1,
            ],
            [
                'id' => 3,
                'name' => 'محمد حسینی',
                'role' => 'مدیر فیلمبرداری و تدوین',
                'bio' => 'محمد با تجربه گسترده در فیلمبرداری سینمایی و تدوین حرفه‌ای، مسئولیت تمام پروژه‌های ویدیویی AMONIX را بر عهده دارد.',
                'photo' => '/storage/team/mohammad-hosseini.jpg',
                'social_links' => json_encode([
                    'linkedin' => 'https://linkedin.com/in/mohammad-hosseini',
                    'instagram' => 'https://instagram.com/mohammad.hosseini'
                ], JSON_UNESCAPED_UNICODE),
                'skills' => json_encode(['فیلمبرداری', 'تدوین', 'موشن گرافیک'], JSON_UNESCAPED_UNICODE),
                'order' => 3,
                'is_active' => 1,
            ],
            [
                'id' => 4,
                'name' => 'فاطمه کریمی',
                'role' => 'مدیر عکاسی',
                'bio' => 'فاطمه متخصص عکاسی محصول و پرتره است و با چشم هنری منحصر به فرد، بهترین تصاویر را برای برندهای ایرانی خلق می‌کند.',
                'photo' => '/storage/team/fateme-karimi.jpg',
                'social_links' => json_encode([
                    'linkedin' => 'https://linkedin.com/in/fateme-karimi',
                    'instagram' => 'https://instagram.com/fateme.karimi'
                ], JSON_UNESCAPED_UNICODE),
                'skills' => json_encode(['عکاسی محصول', 'عکاسی پرتره', 'ادیت عکس'], JSON_UNESCAPED_UNICODE),
                'order' => 4,
                'is_active' => 1,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::create($member);
        }
    }
}
