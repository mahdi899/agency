import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <section className="section-padding relative overflow-hidden w-full">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-500/10 to-transparent rounded-full" />
        </div>

        <div className="container-custom mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-[150px] md:text-[200px] font-black leading-none mb-4"
            >
              <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                ۴۰۴
              </span>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              صفحه مورد نظر یافت نشد!
            </h1>

            <p className="text-xl text-dark-400 mb-8">
              متأسفانه صفحه‌ای که دنبال آن هستید وجود ندارد یا منتقل شده است.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <Button icon={<Home className="w-4 h-4" />} iconPosition="left">
                  بازگشت به خانه
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
                  مشاهده خدمات
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <p className="text-dark-500 mb-4">یا می‌توانید این صفحات را ببینید:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/portfolio" className="text-primary-400 hover:text-primary-300 transition-colors">
                  نمونه کارها
                </Link>
                <Link to="/pricing" className="text-primary-400 hover:text-primary-300 transition-colors">
                  پکیج‌ها
                </Link>
                <Link to="/blog" className="text-primary-400 hover:text-primary-300 transition-colors">
                  بلاگ
                </Link>
                <Link to="/contact" className="text-primary-400 hover:text-primary-300 transition-colors">
                  تماس با ما
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
