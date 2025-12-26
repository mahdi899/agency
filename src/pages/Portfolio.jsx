import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, TrendingUp, Play, ExternalLink } from 'lucide-react';
import { portfolioItems, categories } from '../data/portfolio';
import { SectionTitle, ScrollReveal } from '../components/ui';

const PortfolioCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/portfolio/${item.id}`}>
        <motion.div 
          whileHover={{ y: -8 }}
          className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 group cursor-pointer h-full"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <motion.img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30"
              >
                <Play className="w-6 h-6 text-white mr-[-2px]" fill="white" />
              </motion.div>
            </motion.div>
            
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl text-white text-xs flex items-center gap-1.5 font-medium">
                <Eye className="w-3.5 h-3.5" />
                {item.views}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-green-500/20 backdrop-blur-xl text-green-400 text-xs flex items-center gap-1.5 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                {item.growth}
              </span>
            </div>

            {item.featured && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold">
                  ویژه
                </span>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                {item.title}
              </h3>
              <ExternalLink className="w-4 h-4 text-dark-500 group-hover:text-primary-400 transition-colors" />
            </div>
            <p className="text-dark-400 mb-4 line-clamp-2">
              {item.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags?.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white/5 text-dark-300 text-xs border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              <div className="text-xs text-dark-400">
                <span className="text-dark-500">مدت:</span> {item.duration}
              </div>
              <div className="text-xs text-dark-400">
                <span className="text-dark-500">صنعت:</span> {item.industry}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

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
              subtitle="نمونه کارها"
              title="پروژه‌های موفق ما"
              description="نتایج واقعی که برای مشتریان‌مان رقم زده‌ایم"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                        : 'bg-white/5 text-dark-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {category.title}
                  </motion.button>
                );
              })}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
