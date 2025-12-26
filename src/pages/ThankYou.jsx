import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Phone, Instagram } from 'lucide-react';
import { Button, Card } from '../components/ui';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12">
      <section className="section-padding relative overflow-hidden w-full">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-green-500/10 to-transparent rounded-full" />
        </div>

        <div className="container-custom mx-auto relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              درخواست شما ثبت شد!
            </h1>

            <p className="text-xl text-dark-400 mb-8">
              تیم ما در کمتر از ۲۴ ساعت با شما تماس خواهد گرفت.
            </p>

            <Card className="p-8 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">قدم‌های بعدی</h2>
              <div className="space-y-4 text-right">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-400 font-bold">۱</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">بررسی درخواست</h3>
                    <p className="text-dark-400 text-sm">تیم ما درخواست شما را بررسی می‌کند</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-400 font-bold">۲</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">تماس تلفنی</h3>
                    <p className="text-dark-400 text-sm">برای هماهنگی جلسه مشاوره با شما تماس می‌گیریم</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary-400 font-bold">۳</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">جلسه مشاوره رایگان</h3>
                    <p className="text-dark-400 text-sm">در جلسه مشاوره، نیازهای شما را دقیق‌تر بررسی می‌کنیم</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/">
                <Button icon={<ArrowLeft className="w-4 h-4" />}>
                  بازگشت به خانه
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="secondary">
                  مشاهده نمونه کارها
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-dark-400">
              <a href="tel:+982112345678" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Phone className="w-5 h-5" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
                <span>اینستاگرام</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ThankYou;
