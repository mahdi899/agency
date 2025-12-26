import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { services } from '../../data/services';
import { SectionTitle, ScrollReveal } from '../ui';

const featuredServices = services.slice(0, 8);

const ServiceCard = ({ service, index }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <ScrollReveal delay={index * 0.1} variant="fadeUp">
      <Link to={`/services/${service.id}`}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative p-6 h-full rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden group cursor-pointer"
        >
          {isHovered && (
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: mousePosition.x - 100,
                top: mousePosition.y - 100,
                width: 200,
                height: 200,
                background: `radial-gradient(circle, ${service.color.includes('primary') ? 'rgba(249,115,22,0.3)' : service.color.includes('secondary') ? 'rgba(217,70,239,0.3)' : 'rgba(6,182,212,0.3)'} 0%, transparent 70%)`,
                filter: 'blur(30px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div 
              className="absolute inset-0"
              style={{
                background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
              }}
            />
          </div>

          <div className="relative z-10">
            <motion.div 
              className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 shadow-lg`}
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <service.icon className="w-7 h-7 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
              {service.title}
            </h3>
            <p className="text-dark-400 text-sm leading-relaxed">
              {service.description}
            </p>
            
            <motion.div 
              className="mt-4 flex items-center gap-2 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              <span className="text-sm">بیشتر بدانید</span>
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </ScrollReveal>
  );
};

const Services = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="container-custom mx-auto relative">
        <ScrollReveal>
          <SectionTitle
            subtitle="خدمات ما"
            title="همه چیز برای رشد دیجیتال شما"
            description="از ایده تا اجرا، تمام خدمات مورد نیاز برای موفقیت در فضای دیجیتال"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <ScrollReveal delay={0.5}>
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-primary-400 hover:bg-primary-500/10 hover:border-primary-500/30 font-medium transition-all duration-300"
            >
              مشاهده همه خدمات
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;
