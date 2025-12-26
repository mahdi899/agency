import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { ScrollReveal } from '../ui';

const CTA = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(217,70,239,0.15) 50%, rgba(6,182,212,0.15) 100%)',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(249,115,22,0.2) 0%, transparent 50%)',
            filter: 'blur(60px)',
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container-custom mx-auto relative">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary-500/30"
            >
              <MessageCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              آماده شروع پروژه‌تان هستید؟
            </h2>
            
            <p className="text-lg text-dark-300 mb-10 max-w-2xl mx-auto">
              همین حالا با ما تماس بگیرید یا درخواست مشاوره رایگان ثبت کنید.
              تیم ما آماده کمک به رشد کسب‌وکار شماست.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/start">
                <Button size="lg" icon={<ArrowLeft className="w-5 h-5" />}>
                  شروع پروژه
                </Button>
              </Link>
              <a href="tel:+982112345678">
                <Button variant="secondary" size="lg" icon={<Phone className="w-5 h-5" />} iconPosition="left">
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </Button>
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-dark-400"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm">پاسخگویی سریع</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm">مشاوره رایگان</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm">تضمین کیفیت</span>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
