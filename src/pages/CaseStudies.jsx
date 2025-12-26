import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, Users, Eye } from 'lucide-react';
import { caseStudies, industries } from '../data/caseStudies';
import { SectionTitle, ScrollReveal } from '../components/ui';

const CaseStudyCard = ({ study, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/case-studies/${study.slug}`}>
        <motion.div 
          whileHover={{ y: -8 }}
          className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 group cursor-pointer h-full"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
              src={study.thumbnail}
              alt={study.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
            
            <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-r ${study.color} flex items-center justify-center shadow-lg`}>
              {industries.find(i => i.id === study.industry)?.icon && (
                <span className="text-white">
                  {(() => {
                    const IconComponent = industries.find(i => i.id === study.industry)?.icon;
                    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
                  })()}
                </span>
              )}
            </div>

            {study.featured && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold">
                  ویژه
                </span>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
              <p className="text-dark-300 text-sm line-clamp-2">{study.challenge}</p>
            </div>
          </div>
          
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-lg font-bold text-primary-400">{study.results.followers.growth}</div>
                <div className="text-xs text-dark-400">رشد فالوور</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5">
                <div className="text-lg font-bold text-green-400">{study.results.sales.growth}</div>
                <div className="text-xs text-dark-400">رشد فروش</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-dark-400 text-sm">
                <Clock className="w-4 h-4" />
                {study.timeline}
              </div>
              <div className="flex items-center gap-2 text-primary-400 font-medium text-sm group-hover:gap-3 transition-all">
                مشاهده جزئیات
                <ArrowLeft className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const CaseStudies = () => {
  const [activeIndustry, setActiveIndustry] = useState('all');

  const filteredStudies = activeIndustry === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === activeIndustry);

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container-custom mx-auto relative">
          <ScrollReveal>
            <SectionTitle
              subtitle="نمونه کارهای موفق"
              title="داستان موفقیت مشتریان ما"
              description="ببینید چگونه به کسب‌وکارها کمک کردیم تا رشد کنند"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {industries.map((industry) => {
                const IconComponent = industry.icon;
                return (
                  <motion.button
                    key={industry.id}
                    onClick={() => setActiveIndustry(industry.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeIndustry === industry.id
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                        : 'bg-white/5 text-dark-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {industry.title}
                  </motion.button>
                );
              })}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredStudies.map((study, index) => (
                <CaseStudyCard key={study.id} study={study} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredStudies.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-dark-400">هنوز نمونه کاری در این صنعت ثبت نشده است.</p>
            </motion.div>
          )}

          <ScrollReveal delay={0.3}>
            <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                می‌خواهید داستان موفقیت شما هم اینجا باشد؟
              </h3>
              <p className="text-dark-300 mb-6 max-w-2xl mx-auto">
                با ما تماس بگیرید تا ببینیم چگونه می‌توانیم به رشد کسب‌وکار شما کمک کنیم.
              </p>
              <Link to="/start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium shadow-lg shadow-primary-500/25"
                >
                  شروع پروژه
                </motion.button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
