import { motion } from 'framer-motion';
import { TrendingUp, Users, Eye, Award, Target, Zap } from 'lucide-react';
import { SectionTitle, ScrollReveal, AnimatedCounter } from '../ui';

const metrics = [
  {
    icon: Eye,
    value: 50,
    suffix: 'M+',
    label: 'ویو کل',
    description: 'بیش از ۵۰ میلیون ویو در پلتفرم‌های مختلف',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    value: 340,
    suffix: '%',
    label: 'میانگین رشد',
    description: 'میانگین رشد فالوور مشتریان ما',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    value: 150,
    suffix: '+',
    label: 'پروژه موفق',
    description: 'پروژه‌های تکمیل شده با رضایت کامل',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Award,
    value: 98,
    suffix: '%',
    label: 'رضایت مشتری',
    description: 'نرخ رضایت مشتریان از خدمات ما',
    color: 'from-yellow-500 to-amber-500',
  },
];

const caseHighlights = [
  {
    client: 'کافه لمیز',
    metric: '+1600%',
    label: 'رشد فالوور',
    image: '/storage/clients/cafe-lamiz.jpg',
  },
  {
    client: 'نمایشگاه پرشیا',
    metric: '+400%',
    label: 'رشد فروش',
    image: '/storage/clients/auto-persia.jpg',
  },
  {
    client: 'بوتیک رز',
    metric: '65K',
    label: 'فالوور از صفر',
    image: '/storage/clients/clinic-rose.jpg',
  },
  {
    client: 'کلینیک درسا',
    metric: '+300%',
    label: 'رشد نوبت‌دهی',
    image: '/storage/clients/fashion-aria.jpg',
  },
];

const Results = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="container-custom mx-auto relative">
        <ScrollReveal>
          <SectionTitle
            subtitle="نتایج واقعی"
            title="اعداد دروغ نمی‌گویند"
            description="نتایجی که برای مشتریان‌مان رقم زده‌ایم"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <ScrollReveal key={index} delay={index * 0.1} variant="scaleUp">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden group h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} blur-3xl opacity-30`} />
                </div>

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <metric.icon className="w-7 h-7 text-white" />
                </div>

                <div className="text-3xl font-black text-white mb-1">
                  <AnimatedCounter end={metric.value} suffix={metric.suffix} />
                </div>
                <h4 className="text-white font-bold mb-2">{metric.label}</h4>
                <p className="text-dark-400 text-sm">{metric.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="p-8 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                  <Target className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">نمونه‌های موفقیت</h3>
                </div>
                <p className="text-dark-300 mb-6">
                  برخی از نتایج چشمگیری که برای مشتریان‌مان رقم زده‌ایم
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {caseHighlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <img
                      src={item.image}
                      alt={item.client}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="text-lg font-bold text-green-400">{item.metric}</div>
                      <div className="text-xs text-dark-400">{item.client}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Results;
