import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCards } from 'swiper/modules';
import { testimonials } from '../../data/testimonials';
import { SectionTitle, ScrollReveal } from '../ui';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative p-6 h-full rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-3xl" />
    </div>

    <motion.div
      initial={{ rotate: 0 }}
      whileHover={{ rotate: 12, scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <Quote className="w-10 h-10 text-primary-500/50 mb-4" />
    </motion.div>
    
    <p className="text-dark-300 leading-relaxed mb-6 relative z-10">
      "{testimonial.text}"
    </p>
    
    <div className="flex items-center gap-1 mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        </motion.div>
      ))}
    </div>
    
    <div className="flex items-center gap-3 relative z-10">
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-primary-500/30"
      >
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div>
        <h4 className="font-bold text-white">{testimonial.name}</h4>
        <p className="text-sm text-dark-400">{testimonial.role}</p>
        {testimonial.results && (
          <p className="text-xs text-primary-400 mt-1">{testimonial.results}</p>
        )}
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-dark-900/50">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container-custom mx-auto relative">
        <ScrollReveal>
          <SectionTitle
            subtitle="نظرات مشتریان"
            title="مشتریان درباره ما چه می‌گویند؟"
            description="تجربه همکاری با ما از زبان مشتریان"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
