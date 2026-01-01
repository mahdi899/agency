import { motion } from 'framer-motion';
import { Zap, Shield, Clock, Users, BarChart3, Headphones } from 'lucide-react';
import { ScrollReveal, SectionTitle } from '../ui';

const features = [
  {
    icon: Zap,
    title: 'سرعت بالا',
    description: 'تحویل پروژه‌ها در کمترین زمان ممکن با کیفیت بالا',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Shield,
    title: 'کیفیت تضمینی',
    description: 'تضمین کیفیت و رضایت ۱۰۰٪ در تمام پروژه‌ها',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Clock,
    title: 'پشتیبانی ۲۴/۷',
    description: 'تیم پشتیبانی همیشه در دسترس برای پاسخگویی',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'تیم حرفه‌ای',
    description: 'متخصصین با تجربه در حوزه دیجیتال مارکتینگ',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'گزارش‌دهی دقیق',
    description: 'گزارش‌های شفاف و دقیق از عملکرد کمپین‌ها',
    color: 'from-rose-500 to-red-500',
  },
  {
    icon: Headphones,
    title: 'مشاوره رایگان',
    description: 'جلسه مشاوره رایگان برای بررسی نیازهای شما',
    color: 'from-indigo-500 to-violet-500',
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <ScrollReveal delay={index * 0.1} variant="scale">
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} blur-3xl opacity-30`} />
        </div>

        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
        >
          <feature.icon className="w-7 h-7 text-white" />
        </motion.div>

        <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
        <p className="text-dark-400 text-sm leading-relaxed">{feature.description}</p>
      </motion.div>
    </ScrollReveal>
  );
};

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="container-custom mx-auto relative">
        <ScrollReveal>
          <SectionTitle
            subtitle="چرا ما؟"
            title="مزایای همکاری با amonix"
            description="دلایلی که ما را از رقبا متمایز می‌کند"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
