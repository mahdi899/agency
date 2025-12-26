import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

const navLinks = [
  { name: 'خانه', path: '/' },
  { 
    name: 'خدمات', 
    path: '/services',
    submenu: [
      { name: 'فیلمبرداری', path: '/services/video-production' },
      { name: 'تدوین ویدیو', path: '/services/video-editing' },
      { name: 'موشن گرافیک', path: '/services/motion-graphics' },
      { name: 'تولید محتوا', path: '/services/content-creation' },
      { name: 'سوشال مدیا', path: '/services/social-media' },
      { name: 'دیجیتال مارکتینگ', path: '/services/digital-marketing' },
    ]
  },
  { name: 'نمونه کارها', path: '/portfolio' },
  { 
    name: 'صنایع', 
    path: '/industries',
    submenu: [
      { name: 'کافه و رستوران', path: '/industries/cafe-restaurant' },
      { name: 'خودرو', path: '/industries/automotive' },
      { name: 'زیبایی و سلامت', path: '/industries/beauty-clinic' },
      { name: 'مد و پوشاک', path: '/industries/fashion' },
      { name: 'همه صنایع', path: '/industries' },
    ]
  },
  { 
    name: 'موفقیت‌ها', 
    path: '/case-studies',
    submenu: [
      { name: 'داستان موفقیت', path: '/case-studies' },
      { name: 'جوایز و افتخارات', path: '/awards' },
      { name: 'همکاران ما', path: '/partners' },
    ]
  },
  { name: 'پکیج‌ها', path: '/pricing' },
  { name: 'درباره ما', path: '/about' },
  { name: 'بلاگ', path: '/blog' },
  { name: 'تماس', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled 
          ? 'bg-dark-950/80 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-white font-black text-xl">آ</span>
            </div>
            <span className="text-xl font-black text-white">آژانس خلاق</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.submenu && setActiveSubmenu(link.path)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1',
                    location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                      ? 'text-primary-400'
                      : 'text-dark-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.name}
                  {link.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>

                <AnimatePresence>
                  {link.submenu && activeSubmenu === link.path && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-56 py-2 bg-dark-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl"
                    >
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.path}
                          to={sublink.path}
                          className="block px-4 py-2 text-sm text-dark-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/start">
              <Button size="sm">
                شروع پروژه
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark-950/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="container-custom mx-auto px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-all',
                      location.pathname === link.path
                        ? 'text-primary-400 bg-primary-500/10'
                        : 'text-dark-300 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.name}
                  </Link>
                  {link.submenu && (
                    <div className="mr-4 mt-1 space-y-1">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.path}
                          to={sublink.path}
                          className="block px-4 py-2 text-sm text-dark-400 hover:text-white transition-colors"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Link to="/start" className="block">
                  <Button className="w-full">شروع پروژه</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
