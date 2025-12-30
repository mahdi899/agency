import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, CheckCircle, ArrowLeft, Building2, Users, Award, Star, Video, Camera, Palette, TrendingUp } from 'lucide-react';
import { SectionTitle, ScrollReveal } from '../components/ui';

const districts = [
  { name: 'ولنجک', description: 'خدمات تولید محتوا و فیلمبرداری در ولنجک' },
  { name: 'الهیه', description: 'آژانس دیجیتال مارکتینگ الهیه' },
  { name: 'جردن', description: 'تولید محتوای ویدیویی در جردن' },
  { name: 'ونک', description: 'خدمات سوشال مدیا در ونک' },
  { name: 'سعادت‌آباد', description: 'فیلمبرداری حرفه‌ای سعادت‌آباد' },
  { name: 'شهرک غرب', description: 'تولید محتوا در شهرک غرب' },
  { name: 'پونک', description: 'آژانس تبلیغاتی پونک' },
  { name: 'تجریش', description: 'خدمات دیجیتال مارکتینگ تجریش' },
  { name: 'نیاوران', description: 'تولید محتوای ویدیویی نیاوران' },
  { name: 'زعفرانیه', description: 'فیلمبرداری حرفه‌ای زعفرانیه' },
  { name: 'فرمانیه', description: 'آژانس خلاق فرمانیه' },
  { name: 'قیطریه', description: 'خدمات تولید محتوا قیطریه' },
  { name: 'پاسداران', description: 'دیجیتال مارکتینگ پاسداران' },
  { name: 'میرداماد', description: 'تولید ویدیو میرداماد' },
  { name: 'آرژانتین', description: 'آژانس تبلیغاتی آرژانتین' },
  { name: 'یوسف‌آباد', description: 'خدمات سوشال مدیا یوسف‌آباد' },
];

const services = [
  { title: 'تولید محتوای ویدیویی', icon: Video, color: 'from-red-500 to-orange-500', image: 'https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?w=400&h=300&fit=crop' },
  { title: 'فیلمبرداری حرفه‌ای', icon: Camera, color: 'from-purple-500 to-pink-500', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop' },
  { title: 'تدوین و موشن گرافیک', icon: Palette, color: 'from-cyan-500 to-blue-500', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop' },
  { title: 'دیجیتال مارکتینگ', icon: TrendingUp, color: 'from-green-500 to-emerald-500', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
];

const stats = [
  { value: '۵۰+', label: 'مشتری در تهران', icon: Users },
  { value: '۲۰۰+', label: 'پروژه موفق', icon: Award },
  { value: '۵', label: 'سال تجربه', icon: Building2 },
  { value: '۴.۹', label: 'امتیاز مشتریان', icon: Star },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1573164713611-4e6db56b5bfc?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
];

const TehranAgency = () => {
  return (
    <div className="pt-24">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/storage/hero/tehran-agency.jpg"
            alt="تهران"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-dark-950 via-dark-950/90 to-dark-950/70" />
        </div>

        <div className="container-custom mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-primary-400 font-medium">تهران، ایران</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                آژانس دیجیتال مارکتینگ
                <span className="block text-primary-400">تهران</span>
              </h1>
              
              <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                ارائه خدمات تولید محتوا، فیلمبرداری، تدوین و دیجیتال مارکتینگ در تمام مناطق تهران.
                با بیش از ۵ سال تجربه و ۵۰+ مشتری راضی در پایتخت.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/start"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
                >
                  درخواست مشاوره رایگان
                </Link>
                <a
                  href="tel:+982191234567"
                  className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  تماس فوری
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10"
                  >
                    <IconComponent className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                    <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                    <p className="text-dark-400 text-sm">{stat.label}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="خدمات ما در تهران"
              title="خدمات تخصصی دیجیتال مارکتینگ"
              description="تمام خدمات مورد نیاز برای رشد کسب‌وکار شما در فضای دیجیتال"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="relative rounded-2xl overflow-hidden group cursor-pointer h-full"
                  >
                    <div className="aspect-[4/3] relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-3`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Gallery Section */}
      <section className="section-padding bg-dark-900/30">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                نمونه کارهای ما
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                پروژه‌های اجرا شده در تهران
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-xl overflow-hidden aspect-[4/3] group"
                >
                  <img
                    src={image}
                    alt={`پروژه ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <SectionTitle
              subtitle="مناطق تحت پوشش"
              title="خدمات در تمام مناطق تهران"
              description="ما در تمام محلات و مناطق تهران به شما خدمات ارائه می‌دهیم"
            />
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {districts.map((district, index) => (
              <ScrollReveal key={index} delay={index * 0.03}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary-400" />
                    <h3 className="text-white font-medium group-hover:text-primary-400 transition-colors">
                      {district.name}
                    </h3>
                  </div>
                  <p className="text-dark-400 text-xs line-clamp-2">
                    {district.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div>
                <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                  چرا ما؟
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  بهترین آژانس دیجیتال مارکتینگ تهران
                </h2>
                <p className="text-dark-300 mb-6 leading-relaxed">
                  با تیم متخصص و تجهیزات حرفه‌ای، ما بهترین خدمات تولید محتوا و دیجیتال مارکتینگ را در تهران ارائه می‌دهیم. 
                  از فیلمبرداری با دوربین‌های سینمایی گرفته تا مدیریت کامل شبکه‌های اجتماعی.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    'تیم متخصص با بیش از ۵ سال تجربه',
                    'تجهیزات حرفه‌ای و به‌روز',
                    'پشتیبانی ۲۴/۷',
                    'قیمت رقابتی و منصفانه',
                    'تحویل به‌موقع پروژه‌ها',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-dark-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary-400 font-medium hover:gap-3 transition-all"
                >
                  درباره ما بیشتر بدانید
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <img
                  src="/storage/hero/agency-team.jpg"
                  alt="تیم آژانس خلاق"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 shadow-xl">
                  <div className="text-white text-center">
                    <div className="text-3xl font-black">۵+</div>
                    <div className="text-sm opacity-80">سال تجربه</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark-900/50">
        <div className="container-custom mx-auto">
          <ScrollReveal>
            <div className="text-center p-8 md:p-12 rounded-3xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10">
              <Clock className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                ساعات کاری
              </h2>
              <p className="text-dark-300 mb-6">
                شنبه تا پنج‌شنبه: ۹ صبح تا ۶ عصر
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+982191234567"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold"
                >
                  ۰۲۱-۹۱۲۳۴۵۶۷
                </a>
                <a
                  href="https://wa.me/989121234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-green-500/20 text-green-400 font-bold border border-green-500/30"
                >
                  واتساپ
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default TehranAgency;
