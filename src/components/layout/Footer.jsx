import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Send, 
  Linkedin, 
  Phone, 
  Mail, 
  MapPin,
  ArrowUp,
  Sparkles,
  CheckCircle
} from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'فیلمبرداری', path: '/services/video-production' },
    { name: 'تدوین ویدیو', path: '/services/video-editing' },
    { name: 'موشن گرافیک', path: '/services/motion-graphics' },
    { name: 'تولید محتوا', path: '/services/content-creation' },
    { name: 'سوشال مدیا', path: '/services/social-media' },
    { name: 'دیجیتال مارکتینگ', path: '/services/digital-marketing' },
  ],
  company: [
    { name: 'درباره ما', path: '/about' },
    { name: 'نمونه کارها', path: '/portfolio' },
    { name: 'داستان موفقیت', path: '/case-studies' },
    { name: 'جوایز و افتخارات', path: '/awards' },
    { name: 'همکاران ما', path: '/partners' },
    { name: 'پکیج‌ها و قیمت‌ها', path: '/pricing' },
  ],
  support: [
    { name: 'بلاگ', path: '/blog' },
    { name: 'سوالات متداول', path: '/faq' },
    { name: 'تماس با ما', path: '/contact' },
    { name: 'فرآیند کار', path: '/process' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'اینستاگرام' },
  { icon: Send, href: 'https://t.me', label: 'تلگرام' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'لینکدین' },
];

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
      <div className="relative flex-1 md:w-64">
        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل شما"
          className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors text-sm"
          disabled={status === 'loading' || status === 'success'}
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={status === 'loading' || status === 'success'}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium disabled:opacity-50 flex items-center gap-2"
      >
        {status === 'loading' ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : status === 'success' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </motion.button>
    </form>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-950 border-t border-white/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container-custom mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-black text-2xl">آ</span>
              </div>
              <span className="text-2xl font-black text-white">آژانس خلاق</span>
            </Link>
            <p className="text-dark-400 mb-6 leading-relaxed">
              ما یک آژانس خلاق در تهران هستیم که با ترکیب خلاقیت، دیتا و اجرای حرفه‌ای، 
              به کسب‌وکارها کمک می‌کنیم تا در فضای دیجیتال بدرخشند.
            </p>
            
            <div className="space-y-3 mb-6">
              <a href="tel:+982112345678" className="flex items-center gap-3 text-dark-400 hover:text-primary-400 transition-colors">
                <Phone className="w-5 h-5" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </a>
              <a href="mailto:info@agency.ir" className="flex items-center gap-3 text-dark-400 hover:text-primary-400 transition-colors">
                <Mail className="w-5 h-5" />
                <span>info@agency.ir</span>
              </a>
              <div className="flex items-center gap-3 text-dark-400">
                <MapPin className="w-5 h-5" />
                <span>تهران، پاسداران</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-dark-400 hover:text-white hover:bg-primary-500 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">خدمات</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">شرکت</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">پشتیبانی</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary-400" />
                <h4 className="text-white font-bold">عضو خبرنامه شوید</h4>
              </div>
              <p className="text-dark-400 text-sm">جدیدترین مقالات و ترندها را دریافت کنید</p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-500 text-sm">
            © ۱۴۰۳ آژانس خلاق. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-dark-500 hover:text-dark-300 text-sm transition-colors">
              حریم خصوصی
            </Link>
            <Link to="/terms" className="text-dark-500 hover:text-dark-300 text-sm transition-colors">
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
