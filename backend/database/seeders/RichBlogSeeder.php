<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use App\Models\BlogImage;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RichBlogSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        // Clear existing data
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('blog_posts')->truncate();
        DB::table('blog_categories')->truncate();
        DB::table('blog_tags')->truncate();
        DB::table('blog_images')->truncate();
        DB::table('blog_post_tag')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Create categories
        $categories = $this->createCategories();
        
        // Create tags
        $tags = $this->createTags();

        // Create rich blog posts
        $posts = $this->getRichPosts();

        foreach ($posts as $postData) {
            $categorySlug = $postData['category_slug'];
            $category = $categories[$categorySlug] ?? null;

            $post = BlogPost::create([
                'user_id' => $user->id,
                'title' => $postData['title'],
                'slug' => $postData['slug'],
                'excerpt' => $postData['excerpt'],
                'content' => $postData['content'],
                'content_blocks' => json_encode($postData['content_blocks'] ?? []),
                'category' => $categorySlug,
                'category_id' => $category?->id,
                'author' => $postData['author'],
                'author_avatar' => $postData['author_avatar'],
                'thumbnail' => $postData['thumbnail'],
                'featured_image_alt' => $postData['featured_image_alt'],
                'featured_image_caption' => $postData['featured_image_caption'],
                'read_time' => $postData['read_time'],
                'word_count' => $postData['word_count'] ?? 1500,
                'is_published' => true,
                'is_featured' => $postData['is_featured'] ?? false,
                'status' => 'published',
                'published_at' => $postData['published_at'] ?? now(),
                'meta_title' => $postData['meta_title'],
                'meta_description' => $postData['meta_description'],
                'meta_keywords' => $postData['meta_keywords'],
                'canonical_url' => $postData['canonical_url'] ?? null,
                'og_title' => $postData['og_title'] ?? $postData['title'],
                'og_description' => $postData['og_description'] ?? $postData['excerpt'],
                'og_image' => $postData['og_image'] ?? $postData['thumbnail'],
                'views' => rand(500, 10000),
                'likes' => rand(50, 500),
                'shares' => rand(10, 100),
                'allow_comments' => true,
            ]);

            // Attach tags
            $postTags = $postData['tags'] ?? [];
            foreach ($postTags as $tagName) {
                if (isset($tags[$tagName])) {
                    $post->tagsRelation()->attach($tags[$tagName]->id);
                }
            }

            // Create images
            foreach ($postData['images'] ?? [] as $imageData) {
                BlogImage::create([
                    'blog_post_id' => $post->id,
                    'url' => $imageData['url'],
                    'alt_text' => $imageData['alt_text'],
                    'title' => $imageData['title'] ?? null,
                    'caption' => $imageData['caption'] ?? null,
                    'order' => $imageData['order'] ?? 0,
                ]);
            }

            $this->command->info("Created: {$post->title}");
        }

        $this->command->info('');
        $this->command->info('=== Blog Seeding Complete ===');
        $this->command->info('Posts: ' . BlogPost::count());
        $this->command->info('Categories: ' . BlogCategory::count());
        $this->command->info('Tags: ' . BlogTag::count());
        $this->command->info('Images: ' . BlogImage::count());
    }

    private function createCategories(): array
    {
        $categoriesData = [
            ['name' => 'سئو و بهینه‌سازی', 'slug' => 'seo', 'description' => 'آموزش‌های تخصصی سئو و بهینه‌سازی سایت', 'color' => 'from-blue-500 to-cyan-500'],
            ['name' => 'شبکه‌های اجتماعی', 'slug' => 'social-media', 'description' => 'استراتژی‌های بازاریابی در شبکه‌های اجتماعی', 'color' => 'from-pink-500 to-rose-500'],
            ['name' => 'تولید محتوا', 'slug' => 'content', 'description' => 'راهنماهای تولید محتوای حرفه‌ای', 'color' => 'from-purple-500 to-violet-500'],
            ['name' => 'برندینگ', 'slug' => 'branding', 'description' => 'استراتژی‌های برندسازی و هویت بصری', 'color' => 'from-amber-500 to-orange-500'],
            ['name' => 'بازاریابی دیجیتال', 'slug' => 'marketing', 'description' => 'تکنیک‌های بازاریابی آنلاین', 'color' => 'from-emerald-500 to-teal-500'],
            ['name' => 'طراحی وب', 'slug' => 'web-design', 'description' => 'آموزش طراحی وب و UI/UX', 'color' => 'from-indigo-500 to-blue-500'],
        ];

        $categories = [];
        foreach ($categoriesData as $data) {
            $category = BlogCategory::create($data);
            $categories[$category->slug] = $category;
        }

        return $categories;
    }

    private function createTags(): array
    {
        $allTags = [
            'سئو', 'SEO', 'بهینه‌سازی', 'گوگل', 'ترافیک ارگانیک', 'رتبه‌بندی',
            'اینستاگرام', 'لینکدین', 'توییتر', 'تیک‌تاک', 'شبکه‌های اجتماعی',
            'تولید محتوا', 'محتوای ویدیویی', 'کپی‌رایتینگ', 'استوری‌تلینگ',
            'برندینگ', 'هویت بصری', 'لوگو', 'برند شخصی',
            'بازاریابی دیجیتال', 'ایمیل مارکتینگ', 'تبلیغات', 'ROI',
            'طراحی وب', 'UI/UX', 'ریسپانسیو', 'وردپرس', 'ری‌اکت',
            'استراتژی', 'آنالیتیکس', 'تحلیل داده', 'KPI'
        ];

        $tags = [];
        foreach ($allTags as $tagName) {
            $tag = BlogTag::firstOrCreate(
                ['name' => $tagName],
                ['slug' => Str::slug($tagName)]
            );
            $tags[$tagName] = $tag;
        }

        return $tags;
    }

    private function getRichPosts(): array
    {
        return [
            // Post 1: SEO Guide with rich content
            [
                'title' => 'راهنمای جامع سئو در سال ۲۰۲۵: از مبتدی تا حرفه‌ای',
                'slug' => 'complete-seo-guide-2025',
                'excerpt' => 'همه چیز درباره سئو در سال ۲۰۲۵. از اصول پایه تا تکنیک‌های پیشرفته، Core Web Vitals، هوش مصنوعی و آینده جستجو.',
                'content' => $this->getSeoPostContent(),
                'content_blocks' => $this->getSeoContentBlocks(),
                'category_slug' => 'seo',
                'author' => 'علی محمدی',
                'author_avatar' => '/storage/avatars/ali.jpg',
                'author_bio' => 'متخصص سئو با ۱۰ سال تجربه در بهینه‌سازی سایت‌های بزرگ ایرانی و بین‌المللی',
                'thumbnail' => '/storage/blog/seo-guide-2025.jpg',
                'featured_image_alt' => 'راهنمای جامع سئو ۲۰۲۵',
                'featured_image_caption' => 'تمام نکات کلیدی سئو برای موفقیت در سال جدید',
                'read_time' => 15,
                'word_count' => 3500,
                'is_featured' => true,
                'published_at' => now()->subDays(2),
                'meta_title' => 'راهنمای جامع سئو ۲۰۲۵ | آموزش کامل بهینه‌سازی سایت',
                'meta_description' => 'آموزش کامل سئو از صفر تا صد. Core Web Vitals، سئو تکنیکال، محتوا، لینک‌سازی و هوش مصنوعی در سئو.',
                'meta_keywords' => 'سئو, SEO, بهینه‌سازی سایت, گوگل, رتبه‌بندی',
                'table_of_contents' => [
                    ['id' => 'intro', 'title' => 'مقدمه', 'level' => 1],
                    ['id' => 'core-web-vitals', 'title' => 'Core Web Vitals', 'level' => 1],
                    ['id' => 'technical-seo', 'title' => 'سئو تکنیکال', 'level' => 1],
                    ['id' => 'content-seo', 'title' => 'سئو محتوا', 'level' => 1],
                    ['id' => 'link-building', 'title' => 'لینک‌سازی', 'level' => 1],
                    ['id' => 'ai-seo', 'title' => 'هوش مصنوعی در سئو', 'level' => 1],
                ],
                'tags' => ['سئو', 'SEO', 'گوگل', 'بهینه‌سازی', 'ترافیک ارگانیک'],
                'images' => [
                    ['url' => '/storage/blog/seo-chart.jpg', 'alt_text' => 'نمودار رشد سئو', 'caption' => 'رشد ترافیک ارگانیک با سئو', 'order' => 1],
                    ['url' => '/storage/blog/core-web-vitals.jpg', 'alt_text' => 'Core Web Vitals', 'caption' => 'معیارهای کلیدی گوگل', 'order' => 2],
                ],
            ],

            // Post 2: Instagram Marketing
            [
                'title' => 'استراتژی اینستاگرام مارکتینگ: ۲۰ تکنیک طلایی برای رشد فالوور',
                'slug' => 'instagram-marketing-strategies',
                'excerpt' => 'با این ۲۰ تکنیک اثبات‌شده، فالوورهای واقعی جذب کنید و نرخ تعامل خود را چند برابر کنید.',
                'content' => $this->getInstagramPostContent(),
                'content_blocks' => $this->getInstagramContentBlocks(),
                'category_slug' => 'social-media',
                'author' => 'سارا احمدی',
                'author_avatar' => '/storage/avatars/sara.jpg',
                'author_bio' => 'مدیر شبکه‌های اجتماعی با تجربه مدیریت صفحات +۱۰۰K فالوور',
                'thumbnail' => '/storage/blog/instagram-marketing.jpg',
                'featured_image_alt' => 'اینستاگرام مارکتینگ',
                'featured_image_caption' => 'استراتژی‌های رشد در اینستاگرام',
                'read_time' => 12,
                'word_count' => 2800,
                'is_featured' => true,
                'published_at' => now()->subDays(5),
                'meta_title' => 'اینستاگرام مارکتینگ | ۲۰ تکنیک رشد فالوور واقعی',
                'meta_description' => 'آموزش کامل اینستاگرام مارکتینگ. تکنیک‌های افزایش فالوور، نرخ تعامل و فروش از اینستاگرام.',
                'meta_keywords' => 'اینستاگرام, مارکتینگ, فالوور, تعامل, ریلز',
                'table_of_contents' => [
                    ['id' => 'intro', 'title' => 'چرا اینستاگرام؟', 'level' => 1],
                    ['id' => 'content-strategy', 'title' => 'استراتژی محتوا', 'level' => 1],
                    ['id' => 'reels', 'title' => 'قدرت ریلز', 'level' => 1],
                    ['id' => 'engagement', 'title' => 'افزایش تعامل', 'level' => 1],
                    ['id' => 'analytics', 'title' => 'تحلیل و بهینه‌سازی', 'level' => 1],
                ],
                'tags' => ['اینستاگرام', 'شبکه‌های اجتماعی', 'تولید محتوا', 'استراتژی'],
                'images' => [
                    ['url' => '/storage/blog/instagram-stats.jpg', 'alt_text' => 'آمار اینستاگرام', 'caption' => 'آمار رشد اینستاگرام', 'order' => 1],
                ],
            ],

            // Post 3: Video Content Production
            [
                'title' => 'تولید محتوای ویدیویی حرفه‌ای: راهنمای کامل از ایده تا انتشار',
                'slug' => 'professional-video-content-guide',
                'excerpt' => 'از ایده‌پردازی تا تدوین نهایی. همه چیز درباره تولید ویدیوهای حرفه‌ای با بودجه محدود.',
                'content' => $this->getVideoPostContent(),
                'content_blocks' => $this->getVideoContentBlocks(),
                'category_slug' => 'content',
                'author' => 'محمد رضایی',
                'author_avatar' => '/storage/avatars/mohammad.jpg',
                'author_bio' => 'فیلم‌ساز و تولیدکننده محتوای ویدیویی با بیش از ۵۰۰ پروژه موفق',
                'thumbnail' => '/storage/blog/video-production.jpg',
                'featured_image_alt' => 'تولید محتوای ویدیویی',
                'featured_image_caption' => 'راهنمای کامل تولید ویدیو',
                'read_time' => 18,
                'word_count' => 4200,
                'is_featured' => false,
                'published_at' => now()->subDays(7),
                'meta_title' => 'تولید محتوای ویدیویی حرفه‌ای | راهنمای کامل',
                'meta_description' => 'آموزش تولید ویدیو از صفر. سناریونویسی، فیلم‌برداری، تدوین و انتشار ویدیوهای حرفه‌ای.',
                'meta_keywords' => 'تولید ویدیو, محتوای ویدیویی, فیلم‌برداری, تدوین',
                'table_of_contents' => [
                    ['id' => 'planning', 'title' => 'برنامه‌ریزی و ایده‌پردازی', 'level' => 1],
                    ['id' => 'equipment', 'title' => 'تجهیزات مورد نیاز', 'level' => 1],
                    ['id' => 'filming', 'title' => 'اصول فیلم‌برداری', 'level' => 1],
                    ['id' => 'editing', 'title' => 'تدوین حرفه‌ای', 'level' => 1],
                    ['id' => 'publishing', 'title' => 'انتشار و توزیع', 'level' => 1],
                ],
                'tags' => ['محتوای ویدیویی', 'تولید محتوا', 'استوری‌تلینگ'],
                'images' => [
                    ['url' => '/storage/blog/video-setup.jpg', 'alt_text' => 'ست‌آپ فیلم‌برداری', 'caption' => 'تجهیزات حرفه‌ای فیلم‌برداری', 'order' => 1],
                ],
            ],

            // Post 4: Personal Branding
            [
                'title' => 'برندینگ شخصی: چگونه یک برند قدرتمند بسازیم',
                'slug' => 'personal-branding-complete-guide',
                'excerpt' => 'راهنمای کامل ساختن برند شخصی. از کشف هویت تا حضور آنلاین مؤثر.',
                'content' => $this->getBrandingPostContent(),
                'content_blocks' => $this->getBrandingContentBlocks(),
                'category_slug' => 'branding',
                'author' => 'نیلوفر کریمی',
                'author_avatar' => '/storage/avatars/niloofar.jpg',
                'author_bio' => 'مشاور برندینگ و استراتژیست بازاریابی با تجربه همکاری با برندهای بزرگ',
                'thumbnail' => '/storage/blog/personal-branding.jpg',
                'featured_image_alt' => 'برندینگ شخصی',
                'featured_image_caption' => 'ساختن برند شخصی قدرتمند',
                'read_time' => 14,
                'word_count' => 3200,
                'is_featured' => false,
                'published_at' => now()->subDays(10),
                'meta_title' => 'برندینگ شخصی | راهنمای کامل ساختن برند',
                'meta_description' => 'آموزش برندینگ شخصی. کشف هویت، داستان‌سرایی، طراحی بصری و حضور آنلاین مؤثر.',
                'meta_keywords' => 'برندینگ, برند شخصی, هویت بصری, لوگو',
                'table_of_contents' => [
                    ['id' => 'identity', 'title' => 'کشف هویت برند', 'level' => 1],
                    ['id' => 'story', 'title' => 'داستان برند', 'level' => 1],
                    ['id' => 'visual', 'title' => 'هویت بصری', 'level' => 1],
                    ['id' => 'online', 'title' => 'حضور آنلاین', 'level' => 1],
                ],
                'tags' => ['برندینگ', 'برند شخصی', 'هویت بصری', 'استراتژی'],
                'images' => [
                    ['url' => '/storage/blog/brand-identity.jpg', 'alt_text' => 'هویت برند', 'caption' => 'عناصر هویت بصری برند', 'order' => 1],
                ],
            ],

            // Post 5: Digital Marketing for Small Business
            [
                'title' => 'بازاریابی دیجیتال برای کسب‌وکارهای کوچک: استراتژی‌های کم‌هزینه',
                'slug' => 'digital-marketing-small-business',
                'excerpt' => 'چگونه با بودجه محدود، بیشترین بازدهی را از بازاریابی دیجیتال بگیریم.',
                'content' => $this->getMarketingPostContent(),
                'content_blocks' => $this->getMarketingContentBlocks(),
                'category_slug' => 'marketing',
                'author' => 'امیر حسینی',
                'author_avatar' => '/storage/avatars/amir.jpg',
                'author_bio' => 'مشاور بازاریابی دیجیتال با تمرکز بر استارتاپ‌ها و کسب‌وکارهای کوچک',
                'thumbnail' => '/storage/blog/digital-marketing.jpg',
                'featured_image_alt' => 'بازاریابی دیجیتال',
                'featured_image_caption' => 'استراتژی‌های بازاریابی کم‌هزینه',
                'read_time' => 11,
                'word_count' => 2600,
                'is_featured' => true,
                'published_at' => now()->subDays(3),
                'meta_title' => 'بازاریابی دیجیتال کسب‌وکارهای کوچک | استراتژی کم‌هزینه',
                'meta_description' => 'آموزش بازاریابی دیجیتال برای کسب‌وکارهای کوچک. استراتژی‌های کم‌هزینه با بازدهی بالا.',
                'meta_keywords' => 'بازاریابی دیجیتال, کسب‌وکار کوچک, استراتژی, ROI',
                'table_of_contents' => [
                    ['id' => 'challenges', 'title' => 'چالش‌های بازاریابی', 'level' => 1],
                    ['id' => 'content', 'title' => 'بازاریابی محتوایی', 'level' => 1],
                    ['id' => 'social', 'title' => 'شبکه‌های اجتماعی', 'level' => 1],
                    ['id' => 'email', 'title' => 'ایمیل مارکتینگ', 'level' => 1],
                    ['id' => 'analytics', 'title' => 'تحلیل و بهینه‌سازی', 'level' => 1],
                ],
                'tags' => ['بازاریابی دیجیتال', 'استراتژی', 'ROI', 'ایمیل مارکتینگ'],
                'images' => [
                    ['url' => '/storage/blog/marketing-funnel.jpg', 'alt_text' => 'قیف بازاریابی', 'caption' => 'مراحل قیف بازاریابی', 'order' => 1],
                ],
            ],

            // Post 6: Web Design Trends
            [
                'title' => 'ترندهای طراحی وب در سال ۲۰۲۵: آینده UI/UX',
                'slug' => 'web-design-trends-2025',
                'excerpt' => 'جدیدترین ترندهای طراحی وب و UI/UX که باید بشناسید. از گلس‌مورفیسم تا هوش مصنوعی.',
                'content' => $this->getWebDesignPostContent(),
                'content_blocks' => $this->getWebDesignContentBlocks(),
                'category_slug' => 'web-design',
                'author' => 'مریم نوری',
                'author_avatar' => '/storage/avatars/maryam.jpg',
                'author_bio' => 'طراح UI/UX با تجربه طراحی بیش از ۲۰۰ وب‌سایت و اپلیکیشن',
                'thumbnail' => '/storage/blog/web-design-trends.jpg',
                'featured_image_alt' => 'ترندهای طراحی وب',
                'featured_image_caption' => 'آینده طراحی وب در ۲۰۲۵',
                'read_time' => 10,
                'word_count' => 2400,
                'is_featured' => false,
                'published_at' => now()->subDays(1),
                'meta_title' => 'ترندهای طراحی وب ۲۰۲۵ | آینده UI/UX',
                'meta_description' => 'جدیدترین ترندهای طراحی وب و UI/UX در سال ۲۰۲۵. گلس‌مورفیسم، دارک مود، انیمیشن و هوش مصنوعی.',
                'meta_keywords' => 'طراحی وب, UI/UX, ترند, گلس‌مورفیسم',
                'table_of_contents' => [
                    ['id' => 'glassmorphism', 'title' => 'گلس‌مورفیسم', 'level' => 1],
                    ['id' => 'dark-mode', 'title' => 'دارک مود', 'level' => 1],
                    ['id' => 'animations', 'title' => 'انیمیشن‌های پیشرفته', 'level' => 1],
                    ['id' => 'ai-design', 'title' => 'هوش مصنوعی در طراحی', 'level' => 1],
                ],
                'tags' => ['طراحی وب', 'UI/UX', 'ریسپانسیو', 'ری‌اکت'],
                'images' => [
                    ['url' => '/storage/blog/ui-examples.jpg', 'alt_text' => 'نمونه‌های UI', 'caption' => 'نمونه‌های طراحی مدرن', 'order' => 1],
                ],
            ],
        ];
    }

    // Content generation methods
    private function getSeoPostContent(): string
    {
        return '<h2 id="intro">مقدمه</h2>
<p>سئو یا بهینه‌سازی موتور جستجو، یکی از مهم‌ترین مهارت‌های دیجیتال مارکتینگ است. در سال ۲۰۲۵، با پیشرفت هوش مصنوعی و تغییرات الگوریتم‌های گوگل، سئو پیچیده‌تر و در عین حال هیجان‌انگیزتر شده است.</p>

<h2 id="core-web-vitals">Core Web Vitals: معیارهای کلیدی گوگل</h2>
<p>Core Web Vitals شامل سه معیار اصلی است که گوگل برای ارزیابی تجربه کاربری استفاده می‌کند:</p>
<ul>
<li><strong>LCP (Largest Contentful Paint):</strong> زمان بارگذاری بزرگ‌ترین عنصر صفحه</li>
<li><strong>FID (First Input Delay):</strong> زمان پاسخ‌گویی به اولین تعامل کاربر</li>
<li><strong>CLS (Cumulative Layout Shift):</strong> میزان جابجایی غیرمنتظره عناصر صفحه</li>
</ul>

<h2 id="technical-seo">سئو تکنیکال</h2>
<p>سئو تکنیکال شامل بهینه‌سازی‌های فنی سایت است که به موتورهای جستجو کمک می‌کند محتوای شما را بهتر درک کنند.</p>

<h3>ساختار URL</h3>
<p>URLهای کوتاه، توصیفی و خوانا داشته باشید. از کلمات کلیدی مهم در URL استفاده کنید.</p>

<h3>سرعت سایت</h3>
<p>سرعت بارگذاری یکی از مهم‌ترین فاکتورهای رتبه‌بندی است. از CDN استفاده کنید، تصاویر را بهینه کنید و کدها را فشرده نمایید.</p>

<h2 id="content-seo">سئو محتوا</h2>
<p>محتوای باکیفیت و جامع، کلید موفقیت در سئو است. محتوایی تولید کنید که واقعاً به کاربران کمک کند.</p>

<h2 id="link-building">لینک‌سازی</h2>
<p>بک‌لینک‌های باکیفیت از سایت‌های معتبر، یکی از مهم‌ترین فاکتورهای رتبه‌بندی هستند.</p>

<h2 id="ai-seo">هوش مصنوعی در سئو</h2>
<p>با ظهور ChatGPT و سایر ابزارهای هوش مصنوعی، نحوه جستجوی کاربران در حال تغییر است. باید محتوای خود را برای این تغییرات آماده کنید.</p>';
    }

    private function getSeoContentBlocks(): array
    {
        return [
            [
                'type' => 'callout',
                'callout_type' => 'tip',
                'title' => 'نکته طلایی',
                'content' => 'همیشه ابتدا برای کاربر بنویسید، سپس برای موتورهای جستجو بهینه‌سازی کنید. محتوای باکیفیت همیشه برنده است.',
                'order' => 1
            ],
            [
                'type' => 'quote',
                'content' => 'بهترین سئو، سئویی است که کاربر متوجه آن نشود.',
                'author' => 'جان مولر',
                'author_title' => 'تحلیلگر ارشد گوگل',
                'style' => 'large',
                'order' => 2
            ],
            [
                'type' => 'list',
                'title' => 'چک‌لیست سئو تکنیکال',
                'list_type' => 'check',
                'style' => 'cards',
                'items' => [
                    ['title' => 'SSL فعال باشد', 'description' => 'HTTPS برای امنیت و رتبه‌بندی ضروری است'],
                    ['title' => 'سایت‌مپ XML', 'description' => 'به گوگل کمک می‌کند صفحات را پیدا کند'],
                    ['title' => 'Robots.txt', 'description' => 'کنترل دسترسی ربات‌ها به صفحات'],
                    ['title' => 'موبایل فرندلی', 'description' => 'طراحی ریسپانسیو ضروری است'],
                ],
                'order' => 3
            ],
            [
                'type' => 'callout',
                'callout_type' => 'warning',
                'title' => 'هشدار مهم',
                'content' => 'از تکنیک‌های Black Hat SEO مانند خرید لینک و Keyword Stuffing خودداری کنید. گوگل این موارد را شناسایی و جریمه می‌کند.',
                'order' => 4
            ],
            [
                'type' => 'cta',
                'title' => 'نیاز به مشاوره سئو دارید؟',
                'description' => 'تیم متخصص ما آماده کمک به شما برای بهبود رتبه سایتتان است.',
                'button_text' => 'درخواست مشاوره رایگان',
                'button_url' => '/contact',
                'style' => 'gradient',
                'order' => 5
            ],
        ];
    }

    private function getInstagramPostContent(): string
    {
        return '<h2 id="intro">چرا اینستاگرام؟</h2>
<p>اینستاگرام با بیش از ۲ میلیارد کاربر فعال، یکی از قدرتمندترین پلتفرم‌های بازاریابی است. در ایران، اینستاگرام محبوب‌ترین شبکه اجتماعی است.</p>

<h2 id="content-strategy">استراتژی محتوا</h2>
<p>موفقیت در اینستاگرام نیازمند یک استراتژی محتوایی منسجم است. باید بدانید چه محتوایی، چه زمانی و برای چه مخاطبی تولید کنید.</p>

<h3>انواع محتوا</h3>
<ul>
<li><strong>پست‌های آموزشی:</strong> ارزش واقعی به مخاطب بدهید</li>
<li><strong>پشت صحنه:</strong> اعتماد بسازید</li>
<li><strong>محتوای تعاملی:</strong> نظرسنجی، سوال و پاسخ</li>
<li><strong>ریلز:</strong> بیشترین ریچ را دارد</li>
</ul>

<h2 id="reels">قدرت ریلز</h2>
<p>ریلز در حال حاضر بیشترین ریچ ارگانیک را در اینستاگرام دارد. ویدیوهای کوتاه و جذاب بسازید.</p>

<h2 id="engagement">افزایش تعامل</h2>
<p>تعامل کلید رشد در اینستاگرام است. به کامنت‌ها پاسخ دهید، با مخاطبان ارتباط برقرار کنید.</p>

<h2 id="analytics">تحلیل و بهینه‌سازی</h2>
<p>از Insights اینستاگرام استفاده کنید تا بفهمید چه محتوایی بهتر عمل می‌کند.</p>';
    }

    private function getInstagramContentBlocks(): array
    {
        return [
            [
                'type' => 'callout',
                'callout_type' => 'info',
                'title' => 'آمار جالب',
                'content' => '۹۰٪ کاربران اینستاگرام حداقل یک برند را دنبال می‌کنند. این یعنی فرصت بزرگی برای کسب‌وکارها وجود دارد.',
                'order' => 1
            ],
            [
                'type' => 'list',
                'title' => 'بهترین زمان‌های پست گذاشتن',
                'list_type' => 'star',
                'style' => 'timeline',
                'items' => [
                    ['title' => 'صبح ۸ تا ۱۰', 'description' => 'شروع روز کاری'],
                    ['title' => 'ظهر ۱۲ تا ۱۴', 'description' => 'استراحت ناهار'],
                    ['title' => 'عصر ۱۷ تا ۱۹', 'description' => 'پایان کار'],
                    ['title' => 'شب ۲۱ تا ۲۳', 'description' => 'زمان استراحت'],
                ],
                'order' => 2
            ],
            [
                'type' => 'quote',
                'content' => 'در اینستاگرام، اصالت مهم‌تر از کمال است. مردم می‌خواهند انسان واقعی پشت برند را ببینند.',
                'author' => 'گری وینرچاک',
                'author_title' => 'کارآفرین و متخصص شبکه‌های اجتماعی',
                'style' => 'highlighted',
                'order' => 3
            ],
            [
                'type' => 'callout',
                'callout_type' => 'important',
                'title' => 'نکته مهم',
                'content' => 'الگوریتم اینستاگرام به تعامل اولیه اهمیت زیادی می‌دهد. ۳۰ دقیقه اول پس از پست بسیار مهم است.',
                'order' => 4
            ],
        ];
    }

    private function getVideoPostContent(): string
    {
        return '<h2 id="planning">برنامه‌ریزی و ایده‌پردازی</h2>
<p>قبل از شروع فیلم‌برداری، باید ایده واضحی داشته باشید. مخاطب هدف، پیام اصلی و فرمت ویدیو را مشخص کنید.</p>

<h2 id="equipment">تجهیزات مورد نیاز</h2>
<p>نیازی به تجهیزات گران‌قیمت ندارید. یک گوشی هوشمند باکیفیت، میکروفون ساده و نورپردازی مناسب برای شروع کافی است.</p>

<h2 id="filming">اصول فیلم‌برداری</h2>
<p>قوانین ترکیب‌بندی، نورپردازی سه‌نقطه‌ای و صداگذاری باکیفیت را یاد بگیرید.</p>

<h2 id="editing">تدوین حرفه‌ای</h2>
<p>با نرم‌افزارهای تدوین مانند Adobe Premiere Pro یا DaVinci Resolve آشنا شوید.</p>

<h2 id="publishing">انتشار و توزیع</h2>
<p>پلتفرم مناسب را انتخاب کنید. عنوان جذاب، توضیحات کامل و تگ‌های مناسب اضافه کنید.</p>';
    }

    private function getVideoContentBlocks(): array
    {
        return [
            [
                'type' => 'list',
                'title' => 'تجهیزات پیشنهادی برای شروع',
                'list_type' => 'check',
                'style' => 'cards',
                'items' => [
                    ['title' => 'گوشی هوشمند', 'description' => 'iPhone یا Samsung Galaxy با دوربین خوب'],
                    ['title' => 'میکروفون یقه‌ای', 'description' => 'برای صدای واضح و حرفه‌ای'],
                    ['title' => 'رینگ لایت', 'description' => 'نورپردازی یکنواخت صورت'],
                    ['title' => 'سه‌پایه', 'description' => 'ثبات تصویر'],
                ],
                'order' => 1
            ],
            [
                'type' => 'callout',
                'callout_type' => 'tip',
                'title' => 'نکته حرفه‌ای',
                'content' => 'همیشه چند ثانیه قبل و بعد از هر برش، فیلم بگیرید. این به شما در تدوین کمک می‌کند.',
                'order' => 2
            ],
        ];
    }

    private function getBrandingPostContent(): string
    {
        return '<h2 id="identity">کشف هویت برند</h2>
<p>اولین قدم شناخت خودتان است. چه ارزش‌هایی دارید؟ چه مهارت‌هایی برجسته هستند؟</p>

<h2 id="story">داستان برند</h2>
<p>هر برند خوبی یک داستان دارد. داستان شما باید اصیل، الهام‌بخش و به یاد ماندنی باشد.</p>

<h2 id="visual">هویت بصری</h2>
<p>لوگو، رنگ‌ها و فونت‌های شما باید هویت برندتان را منعکس کنند.</p>

<h2 id="online">حضور آنلاین</h2>
<p>وب‌سایت شخصی، پروفایل لینکدین و فعالیت در شبکه‌های اجتماعی به ساختن برند شما کمک می‌کند.</p>';
    }

    private function getBrandingContentBlocks(): array
    {
        return [
            [
                'type' => 'quote',
                'content' => 'برند شما چیزی است که مردم درباره شما می‌گویند وقتی در اتاق نیستید.',
                'author' => 'جف بزوس',
                'author_title' => 'بنیان‌گذار آمازون',
                'style' => 'large',
                'order' => 1
            ],
            [
                'type' => 'list',
                'title' => 'عناصر کلیدی برند شخصی',
                'list_type' => 'zap',
                'style' => 'default',
                'items' => [
                    ['title' => 'ارزش‌های اصلی', 'description' => 'چه چیزی برایتان مهم است؟'],
                    ['title' => 'تخصص منحصر به فرد', 'description' => 'در چه زمینه‌ای بهترین هستید؟'],
                    ['title' => 'داستان شخصی', 'description' => 'چه مسیری را طی کرده‌اید؟'],
                    ['title' => 'صدای برند', 'description' => 'چگونه صحبت می‌کنید؟'],
                ],
                'order' => 2
            ],
        ];
    }

    private function getMarketingPostContent(): string
    {
        return '<h2 id="challenges">چالش‌های بازاریابی</h2>
<p>کسب‌وکارهای کوچک معمولاً با محدودیت بودجه و منابع روبرو هستند. اما با استراتژی درست، می‌توانند نتایج عالی کسب کنند.</p>

<h2 id="content">بازاریابی محتوایی</h2>
<p>محتوای باکیفیت و مفید تولید کنید که به مشکلات مخاطبان شما حل می‌کند.</p>

<h2 id="social">شبکه‌های اجتماعی</h2>
<p>پلتفرم‌هایی را انتخاب کنید که مخاطبان شما در آن‌ها فعال هستند.</p>

<h2 id="email">ایمیل مارکتینگ</h2>
<p>لیست ایمیل بسازید و با مشتریان فعلی و بالقوه در ارتباط باشید.</p>

<h2 id="analytics">تحلیل و بهینه‌سازی</h2>
<p>همیشه عملکرد کمپین‌ها را تحلیل کنید و استراتژی خود را بهینه کنید.</p>';
    }

    private function getMarketingContentBlocks(): array
    {
        return [
            [
                'type' => 'callout',
                'callout_type' => 'success',
                'title' => 'خبر خوب',
                'content' => 'بازاریابی دیجیتال نیازی به بودجه‌های کلان ندارد. با استراتژی درست و محتوای باکیفیت، می‌توانید با هزینه کم نتایج عالی بگیرید.',
                'order' => 1
            ],
            [
                'type' => 'list',
                'title' => 'کانال‌های بازاریابی کم‌هزینه',
                'list_type' => 'target',
                'style' => 'cards',
                'items' => [
                    ['title' => 'سئو', 'description' => 'ترافیک رایگان و پایدار'],
                    ['title' => 'شبکه‌های اجتماعی', 'description' => 'ارتباط مستقیم با مخاطب'],
                    ['title' => 'ایمیل مارکتینگ', 'description' => 'بالاترین ROI'],
                    ['title' => 'بازاریابی محتوایی', 'description' => 'ساختن اعتماد'],
                ],
                'order' => 2
            ],
            [
                'type' => 'cta',
                'title' => 'آماده شروع هستید؟',
                'description' => 'با یک جلسه مشاوره رایگان، استراتژی بازاریابی کسب‌وکارتان را طراحی کنید.',
                'button_text' => 'رزرو مشاوره رایگان',
                'button_url' => '/contact',
                'style' => 'gradient',
                'order' => 3
            ],
        ];
    }

    private function getWebDesignPostContent(): string
    {
        return '<h2 id="glassmorphism">گلس‌مورفیسم</h2>
<p>گلس‌مورفیسم یکی از محبوب‌ترین ترندهای طراحی است. با استفاده از شفافیت و بلور، المان‌های زیبا و مدرن بسازید.</p>

<h2 id="dark-mode">دارک مود</h2>
<p>دارک مود دیگر یک گزینه نیست، بلکه یک ضرورت است. کاربران انتظار دارند بتوانند بین حالت روشن و تاریک سوییچ کنند.</p>

<h2 id="animations">انیمیشن‌های پیشرفته</h2>
<p>انیمیشن‌های ظریف و هدفمند، تجربه کاربری را بهبود می‌بخشند.</p>

<h2 id="ai-design">هوش مصنوعی در طراحی</h2>
<p>ابزارهای AI مانند Figma AI و Adobe Firefly، فرآیند طراحی را متحول کرده‌اند.</p>';
    }

    private function getWebDesignContentBlocks(): array
    {
        return [
            [
                'type' => 'callout',
                'callout_type' => 'info',
                'title' => 'ترند ۲۰۲۵',
                'content' => 'طراحی‌های مینیمال با تمرکز بر تجربه کاربری، همچنان محبوب‌ترین رویکرد هستند.',
                'order' => 1
            ],
            [
                'type' => 'list',
                'title' => 'ابزارهای طراحی پیشنهادی',
                'list_type' => 'star',
                'style' => 'default',
                'items' => [
                    ['title' => 'Figma', 'description' => 'طراحی و پروتوتایپ'],
                    ['title' => 'Framer', 'description' => 'انیمیشن و تعامل'],
                    ['title' => 'Webflow', 'description' => 'طراحی بدون کد'],
                    ['title' => 'Spline', 'description' => 'طراحی ۳D'],
                ],
                'order' => 2
            ],
        ];
    }
}
