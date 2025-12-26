import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, TrendingUp, Users, Heart, Play, Quote } from 'lucide-react';
import { getPortfolioById, portfolioItems } from '../data/portfolio';
import { Button, Card, SectionTitle } from '../components/ui';

const PortfolioDetail = () => {
  const { portfolioId } = useParams();
  const project = getPortfolioById(portfolioId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">پروژه یافت نشد</h1>
          <Link to="/portfolio">
            <Button>بازگشت به نمونه کارها</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProjects = portfolioItems.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3);

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
              to="/portfolio"
              className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به نمونه کارها
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-dark-400 max-w-3xl">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden mb-12"
          >
            <div className="aspect-video bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center cursor-pointer shadow-lg shadow-primary-500/30"
              >
                <Play className="w-10 h-10 text-white mr-[-4px]" fill="white" />
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Eye, label: 'ویو کل', value: project.results.views },
              { icon: Users, label: 'رشد فالوور', value: project.results.followers },
              { icon: Heart, label: 'نرخ تعامل', value: project.results.engagement },
              { icon: TrendingUp, label: 'رشد', value: project.growth },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-dark-400">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">درباره پروژه</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-dark-300 leading-relaxed mb-6">
                  این پروژه با هدف افزایش آگاهی از برند و جذب مشتریان جدید طراحی و اجرا شد. 
                  با استفاده از استراتژی محتوای هدفمند و تولید ویدیوهای جذاب، توانستیم نتایج 
                  چشمگیری برای این کسب‌وکار رقم بزنیم.
                </p>
                <p className="text-dark-300 leading-relaxed">
                  تیم ما با تحلیل دقیق مخاطبان هدف و رقبا، استراتژی محتوایی متناسب با برند 
                  طراحی کرد و با تولید محتوای خلاقانه و ترند، موفق به جذب میلیون‌ها ویو شد.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">خدمات ارائه شده</h3>
                <div className="flex flex-wrap gap-3">
                  {project.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 text-primary-400"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Card className="p-8">
                <Quote className="w-10 h-10 text-primary-500/30 mb-4" />
                <p className="text-dark-300 leading-relaxed mb-6">
                  "{project.testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                    {project.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{project.testimonial.author}</div>
                  </div>
                </div>
              </Card>

              <div className="mt-6">
                <Link to="/start">
                  <Button className="w-full">
                    همین نتیجه رو می‌خوای؟
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {relatedProjects.length > 0 && (
            <div>
              <SectionTitle
                title="پروژه‌های مشابه"
                align="right"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <Link key={p.id} to={`/portfolio/${p.id}`}>
                    <Card className="overflow-hidden group">
                      <div className="relative aspect-video bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-xl text-white text-xs">
                            {p.views}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white group-hover:text-primary-400 transition-colors">
                          {p.title}
                        </h3>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetail;
