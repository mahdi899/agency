import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { services } from '../data/services';
import { SectionTitle, Card } from '../components/ui';

const Services = () => {
  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <SectionTitle
            subtitle="خدمات ما"
            title="خدمات جامع دیجیتال مارکتینگ"
            description="همه چیز برای رشد و موفقیت کسب‌وکار شما در فضای دیجیتال"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/services/${service.id}`}>
                  <Card className="p-8 h-full group cursor-pointer">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-dark-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-white/5 text-dark-400 text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-primary-400 font-medium">
                      <span>اطلاعات بیشتر</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
