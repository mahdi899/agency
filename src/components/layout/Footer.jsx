import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Send, 
  Linkedin, 
  Phone, 
  Mail, 
  MapPin,
  ArrowUp 
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
    { name: 'پکیج‌ها و قیمت‌ها', path: '/pricing' },
    { name: 'بلاگ', path: '/blog' },
    { name: 'تماس با ما', path: '/contact' },
    { name: 'همکاری با ما', path: '/careers' },
  ],
  locations: [
    { name: 'تهران', path: '/locations/tehran' },
    { name: 'پاسداران', path: '/locations/pasdaran' },
    { name: 'فرمانیه', path: '/locations/farmanieh' },
    { name: 'قیطریه', path: '/locations/gheytarieh' },
    { name: 'اندرزگو', path: '/locations/andarzgoo' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'اینستاگرام' },
  { icon: Send, href: 'https://t.me', label: 'تلگرام' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'لینکدین' },
];

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
            <h4 className="text-white font-bold mb-6">مناطق تحت پوشش</h4>
            <ul className="space-y-3">
              {footerLinks.locations.map((link) => (
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

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
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

      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/25 z-40"
        aria-label="بازگشت به بالا"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;
