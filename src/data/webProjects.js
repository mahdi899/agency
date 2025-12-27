import { Globe, Smartphone, Search, ShoppingCart, Palette, Code } from 'lucide-react';

export const webProjects = [
  {
    id: 'cafe-lamiz-website',
    title: 'وب‌سایت کافه لمیز',
    type: 'website',
    category: 'طراحی سایت',
    icon: Globe,
    color: 'from-amber-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80',
    mockupImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
    description: 'طراحی وب‌سایت مدرن و ریسپانسیو برای کافه لمیز با سیستم رزرو آنلاین',
    client: 'کافه لمیز',
    industry: 'کافه و رستوران',
    year: '۱۴۰۲',
    technologies: ['React', 'Node.js', 'MongoDB'],
    features: ['رزرو آنلاین', 'منوی دیجیتال', 'پنل مدیریت', 'سئو بهینه'],
    results: {
      traffic: '+350%',
      conversion: '+180%',
      ranking: 'صفحه اول گوگل'
    },
    link: 'https://example.com',
    testimonial: 'وب‌سایت جدید باعث شد رزروهای آنلاین ما ۳ برابر بشه!'
  },
  {
    id: 'persia-motors-app',
    title: 'اپلیکیشن نمایشگاه پرشیا',
    type: 'app',
    category: 'طراحی اپلیکیشن',
    icon: Smartphone,
    color: 'from-blue-500 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
    mockupImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop&q=80',
    description: 'اپلیکیشن موبایل برای نمایشگاه خودرو با امکان مشاهده موجودی و قیمت‌گذاری آنلاین',
    client: 'نمایشگاه پرشیا',
    industry: 'خودرو',
    year: '۱۴۰۳',
    technologies: ['React Native', 'Firebase', 'Redux'],
    features: ['کاتالوگ خودرو', 'مقایسه قیمت', 'چت آنلاین', 'نوتیفیکیشن'],
    results: {
      downloads: '۱۵,۰۰۰+',
      rating: '۴.۸/۵',
      sales: '+200%'
    },
    link: null,
    testimonial: 'اپلیکیشن فروش ما رو متحول کرد!'
  },
  {
    id: 'dersa-clinic-seo',
    title: 'سئو کلینیک درسا',
    type: 'seo',
    category: 'سئو و بهینه‌سازی',
    icon: Search,
    color: 'from-green-500 to-emerald-500',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    mockupImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=800&fit=crop&q=80',
    description: 'بهینه‌سازی سئو و رتبه‌بندی سایت کلینیک زیبایی درسا در گوگل',
    client: 'کلینیک درسا',
    industry: 'زیبایی و سلامت',
    year: '۱۴۰۲',
    technologies: ['Technical SEO', 'Content Marketing', 'Link Building'],
    features: ['سئو تکنیکال', 'تولید محتوا', 'لینک‌سازی', 'گزارش‌دهی'],
    results: {
      ranking: 'رتبه ۱ گوگل',
      traffic: '+500%',
      leads: '+300%'
    },
    link: 'https://example.com',
    testimonial: 'الان برای کلمات کلیدی اصلی رتبه ۱ گوگل هستیم!'
  },
  {
    id: 'rose-boutique-shop',
    title: 'فروشگاه آنلاین بوتیک رز',
    type: 'ecommerce',
    category: 'فروشگاه آنلاین',
    icon: ShoppingCart,
    color: 'from-pink-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80',
    mockupImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&q=80',
    description: 'طراحی و توسعه فروشگاه آنلاین پوشاک با درگاه پرداخت و سیستم موجودی',
    client: 'بوتیک رز',
    industry: 'مد و پوشاک',
    year: '۱۴۰۳',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
    features: ['سبد خرید', 'درگاه پرداخت', 'مدیریت موجودی', 'گزارش فروش'],
    results: {
      sales: '+400%',
      orders: '۲,۵۰۰+ سفارش',
      conversion: '+250%'
    },
    link: 'https://example.com',
    testimonial: 'فروش آنلاین ما از صفر به ماهی ۵۰۰ میلیون رسید!'
  },
  {
    id: 'iron-gym-website',
    title: 'وب‌سایت باشگاه آیرون',
    type: 'website',
    category: 'طراحی سایت',
    icon: Globe,
    color: 'from-purple-500 to-violet-500',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80',
    mockupImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop&q=80',
    description: 'وب‌سایت باشگاه ورزشی با سیستم ثبت‌نام آنلاین و برنامه تمرینی',
    client: 'باشگاه آیرون',
    industry: 'ورزش و فیتنس',
    year: '۱۴۰۲',
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    features: ['ثبت‌نام آنلاین', 'برنامه تمرینی', 'پنل مربی', 'پرداخت آنلاین'],
    results: {
      members: '+180%',
      online: '۶۰% ثبت‌نام آنلاین',
      satisfaction: '۹۵%'
    },
    link: 'https://example.com',
    testimonial: 'سیستم آنلاین کار ما رو خیلی راحت کرد!'
  },
  {
    id: 'medical-portal',
    title: 'پورتال نوبت‌دهی پزشکی',
    type: 'webapp',
    category: 'وب اپلیکیشن',
    icon: Code,
    color: 'from-cyan-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80',
    mockupImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop&q=80',
    description: 'سیستم نوبت‌دهی آنلاین برای کلینیک‌ها و مطب‌های پزشکی',
    client: 'کلینیک سلامت',
    industry: 'پزشکی',
    year: '۱۴۰۳',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    features: ['نوبت‌دهی آنلاین', 'یادآور SMS', 'پرونده الکترونیک', 'گزارش‌گیری'],
    results: {
      appointments: '۱۰,۰۰۰+',
      noshow: '-70%',
      efficiency: '+200%'
    },
    link: null,
    testimonial: 'نوبت‌دهی آنلاین وقت ما رو آزاد کرد!'
  }
];

export const projectTypes = [
  { id: 'all', title: 'همه', icon: Palette },
  { id: 'website', title: 'وب‌سایت', icon: Globe },
  { id: 'app', title: 'اپلیکیشن', icon: Smartphone },
  { id: 'ecommerce', title: 'فروشگاه', icon: ShoppingCart },
  { id: 'seo', title: 'سئو', icon: Search },
  { id: 'webapp', title: 'وب اپ', icon: Code },
];
