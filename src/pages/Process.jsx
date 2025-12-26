import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Lightbulb, Film, Rocket, BarChart3, ArrowLeft, Check } from 'lucide-react';
import { SectionTitle, Card, Button } from '../components/ui';

const processSteps = [
  {
    id: 1,
    icon: Search,
    title: 'کشف و تحلیل',
    subtitle: 'Discovery',
    description: 'در این مرحله، کسب‌وکار، رقبا و مخاطبان هدف شما را به دقت بررسی می‌کنیم.',
    details: [
      'جلسه مشاوره اولیه',
      'تحلیل رقبا و بازار',
      'شناخت مخاطبان هدف',
      'بررسی وضعیت فعلی',
    ],
    duration: '۱-۲ روز',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    icon: Lightbulb,
    title: 'استراتژی و ایده',
    subtitle: 'Strategy',
    description: 'بر اساس تحلیل‌ها، استراتژی محتوا و ایده‌های خلاقانه را طراحی می‌کنیم.',
    details: [
      'طراحی استراتژی محتوا',
      'ایده‌پردازی خلاقانه',
      'تقویم محتوایی',
      'تعیین KPIها',
    ],
    duration: '۲-۳ روز',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 3,
    icon: Film,
    title: 'تولید محتوا',
    subtitle: 'Production',
    description: 'تیم خلاق ما محتوای حرفه‌ای و جذاب برای شما تولید می‌کند.',
    details: [
      'فیلمبرداری و عکاسی',
      'تدوین و ادیت',
      'موشن گرافیک',
      'کپشن و هشتگ',
    ],
    duration: '۵-۷ روز',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    icon: Rocket,
    title: 'انتشار و اجرا',
    subtitle: 'Launch',
    description: 'محتوا را در بهترین زمان و با بهترین استراتژی منتشر می‌کنیم.',
    details: [
      'انتشار هوشمند',
      'مدیریت کامنت‌ها',
      'تعامل با مخاطبان',
      'مدیریت تبلیغات',
    ],
    duration: 'مستمر',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    icon: BarChart3,
    title: 'تحلیل و بهینه‌سازی',
    subtitle: 'Optimize',
    description: 'عملکرد را تحلیل کرده و استراتژی را بهینه‌سازی می‌کنیم.',
    details: [
      'گزارش‌دهی دوره‌ای',
      'تحلیل داده‌ها',
      'بهینه‌سازی استراتژی',
      'پیشنهادات بهبود',
    ],
    duration: 'ماهانه',
    color: 'from-red-500 to-rose-500',
  },
];

const Process = () => {
  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <SectionTitle
            subtitle="فرآیند کار"
            title="چطور کار می‌کنیم؟"
            description="مسیر همکاری ما از ایده تا نتیجه، شفاف و حرفه‌ای"
          />

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-1 flex lg:justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl font-black text-white/10">0{step.id}</span>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                          <span className="text-dark-400 text-sm">{step.subtitle}</span>
                        </div>
                      </div>
                      <p className="text-dark-400 mb-4">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.details.map((detail, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-dark-300 text-sm"
                          >
                            <Check className="w-3 h-3 text-primary-400" />
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="lg:col-span-4 lg:text-left">
                      <div className="inline-block px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-dark-400 text-sm">مدت زمان: </span>
                        <span className="text-white font-medium">{step.duration}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="p-8 max-w-3xl mx-auto bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
              <h2 className="text-2xl font-bold text-white mb-4">
                آماده شروع هستید؟
              </h2>
              <p className="text-dark-400 mb-6">
                همین حالا پروژه خود را شروع کنید و از این فرآیند حرفه‌ای بهره‌مند شوید.
              </p>
              <Link to="/start">
                <Button icon={<ArrowLeft className="w-4 h-4" />}>
                  شروع پروژه
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Process;
