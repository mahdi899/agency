export const blogCategories = [
  { id: 'all', name: 'همه مقالات' },
  { id: 'social-media', name: 'سوشال مدیا' },
  { id: 'content', name: 'تولید محتوا' },
  { id: 'marketing', name: 'بازاریابی' },
  { id: 'seo', name: 'سئو' },
  { id: 'branding', name: 'برندینگ' },
];

export const blogPosts = [
  {
    id: 1,
    slug: 'instagram-reels-tips-2025',
    title: '۱۰ نکته طلایی برای ساخت ریلز وایرال در ۲۰۲۵',
    excerpt: 'یاد بگیرید چگونه ریلز‌هایی بسازید که میلیون‌ها ویو بگیرند و فالوورهای واقعی جذب کنند.',
    content: '',
    category: 'social-media',
    author: 'تیم محتوا',
    date: '۱۴۰۳/۱۰/۰۵',
    readTime: '۸ دقیقه',
    thumbnail: '/images/blog/reels-tips.jpg',
    tags: ['ریلز', 'اینستاگرام', 'وایرال'],
  },
  {
    id: 2,
    slug: 'content-calendar-guide',
    title: 'راهنمای کامل ساخت تقویم محتوایی',
    excerpt: 'چگونه یک تقویم محتوایی حرفه‌ای بسازیم که به رشد پیج کمک کند.',
    content: '',
    category: 'content',
    author: 'تیم استراتژی',
    date: '۱۴۰۳/۱۰/۰۱',
    readTime: '۱۲ دقیقه',
    thumbnail: '/images/blog/content-calendar.jpg',
    tags: ['تقویم محتوا', 'استراتژی', 'برنامه‌ریزی'],
  },
  {
    id: 3,
    slug: 'local-seo-tehran',
    title: 'سئو محلی: چگونه در گوگل تهران دیده شویم',
    excerpt: 'استراتژی‌های سئو محلی برای کسب‌وکارهای تهرانی.',
    content: '',
    category: 'seo',
    author: 'تیم سئو',
    date: '۱۴۰۳/۰۹/۲۵',
    readTime: '۱۰ دقیقه',
    thumbnail: '/images/blog/local-seo.jpg',
    tags: ['سئو', 'سئو محلی', 'گوگل'],
  },
  {
    id: 4,
    slug: 'brand-identity-importance',
    title: 'چرا هویت برند مهم است؟',
    excerpt: 'اهمیت برندینگ حرفه‌ای و تأثیر آن بر موفقیت کسب‌وکار.',
    content: '',
    category: 'branding',
    author: 'تیم برندینگ',
    date: '۱۴۰۳/۰۹/۲۰',
    readTime: '۷ دقیقه',
    thumbnail: '/images/blog/branding.jpg',
    tags: ['برندینگ', 'هویت بصری', 'لوگو'],
  },
  {
    id: 5,
    slug: 'digital-marketing-trends-2025',
    title: 'ترندهای دیجیتال مارکتینگ در ۲۰۲۵',
    excerpt: 'مهم‌ترین ترندهای بازاریابی دیجیتال که باید بدانید.',
    content: '',
    category: 'marketing',
    author: 'تیم مارکتینگ',
    date: '۱۴۰۳/۰۹/۱۵',
    readTime: '۱۵ دقیقه',
    thumbnail: '/images/blog/marketing-trends.jpg',
    tags: ['دیجیتال مارکتینگ', 'ترند', '۲۰۲۵'],
  },
];

export const getBlogBySlug = (slug) => blogPosts.find(post => post.slug === slug);
export const getBlogsByCategory = (category) => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};
