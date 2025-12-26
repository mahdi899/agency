import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { services } from '../../data/services';
import { SectionTitle, ScrollReveal } from '../ui';

const featuredServices = services.slice(0, 6);

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 0.1} variant="fadeUp">
      <Link to={`/services/${service.id}`}>
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="relative h-[400px] rounded-2xl overflow-hidden group cursor-pointer"
        >
          <div className="absolute inset-0">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
          </div>

          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <motion.div 
              className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 shadow-lg`}
              animate={{ y: isHovered ? -5 : 0 }}
            >
              <service.icon className="w-7 h-7 text-white" />
            </motion.div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
              {service.title}
            </h3>
            
            <p className="text-dark-300 text-sm leading-relaxed mb-4 line-clamp-2">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {service.features.slice(0, 3).map((feature, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-white/10 text-white text-xs">
                  {feature}
                </span>
              ))}
            </div>
            
            <motion.div 
              className="flex items-center gap-2 text-primary-400 font-medium"
              animate={{ x: isHovered ? -5 : 0 }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
