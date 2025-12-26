import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Phone, ArrowLeft } from 'lucide-react';
import { getLocationBySlug, locations } from '../data/locations';
import { services } from '../data/services';
import { Button, Card, SectionTitle } from '../components/ui';

const Location = () => {
  const { locationSlug } = useParams();
  const location = getLocationBySlug(locationSlug);

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">منطقه یافت نشد</h1>
          <Link to="/">
            <Button>بازگشت به خانه</Button>
          </Link>
        </div>
      </div>
    );
  }

  const featuredServices = services.slice(0, 6);
  const otherLocations = locations.filter(l => l.slug !== location.slug);

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به خانه
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-primary-400 font-medium">خدمات در {location.name}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              {location.title}
            </h1>

            <p className="text-xl text-dark-400 leading-relaxed">
              {location.fullDescription}
            </p>
          </motion.div>

          <div className="mb-16">
            <SectionTitle
              title="خدمات ما در این منطقه"
              align="right"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/services/${service.id}`}>
                    <Card className="p-6 group">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {service.title} در {location.name}
                      </h3>
                      <p className="text-dark-400 text-sm">
                        {service.description}
                      </p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card className="p-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    آماده شروع هستید؟
                  </h2>
                  <p className="text-dark-400 mb-6">
                    همین حالا با ما تماس بگیرید و از خدمات حرفه‌ای ما در {location.name} بهره‌مند شوید.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/start">
                      <Button icon={<ArrowLeft className="w-4 h-4" />}>
                        شروع پروژه
                      </Button>
                    </Link>
                    <a href="tel:+982112345678">
                      <Button variant="secondary" icon={<Phone className="w-4 h-4" />} iconPosition="left">
                        تماس سریع
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mx-auto text-6xl">
                    📍
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <div>
            <SectionTitle
              title="سایر مناطق تحت پوشش"
              align="right"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {otherLocations.map((loc) => (
                <Link key={loc.slug} to={`/locations/${loc.slug}`}>
                  <Card className="p-4 text-center group">
                    <MapPin className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                    <span className="text-white group-hover:text-primary-400 transition-colors">
                      {loc.name}
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;
