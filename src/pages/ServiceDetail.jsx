import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { getServiceById, services } from '../data/services';
import { portfolioItems } from '../data/portfolio';
import { Button, Card, SectionTitle } from '../components/ui';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = getServiceById(serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">خدمت یافت نشد</h1>
          <Link to="/services">
            <Button>بازگشت به خدمات</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedServices = services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-r ${service.color} opacity-10 rounded-full blur-[150px]`} />
        </div>

        <div className="container-custom mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به خدمات
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                  {service.title}
                </h1>

                <p className="text-xl text-dark-300 mb-8 leading-relaxed">
                  {service.fullDescription}
                </p>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">ویژگی‌ها و خروجی‌ها</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-dark-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">مناسب برای</h2>
                  <div className="flex flex-wrap gap-3">
                    {service.suitableFor.map((item, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-dark-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-32"
              >
                <Card className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    آماده شروع هستید؟
                  </h3>
                  <p className="text-dark-400 mb-6">
                    همین حالا درخواست مشاوره رایگان ثبت کنید.
                  </p>
                  <Link to="/start">
                    <Button className="w-full mb-4" icon={<ArrowLeft className="w-4 h-4" />}>
                      شروع پروژه
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button variant="secondary" className="w-full">
                      مشاهده پکیج‌ها
                    </Button>
                  </Link>
                </Card>

                <Card className="p-6 mt-6">
                  <h4 className="font-bold text-white mb-4">خدمات مرتبط</h4>
                  <div className="space-y-3">
                    {relatedServices.map((s) => (
                      <Link
                        key={s.id}
                        to={`/services/${s.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${s.color} flex items-center justify-center`}>
                          <s.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-dark-300 hover:text-white transition-colors">
                          {s.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
