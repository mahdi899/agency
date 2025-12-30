import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, TrendingUp, ArrowLeft, Play, ExternalLink, Target, Coffee, Sparkles, ShoppingBag, Car, Shirt, Stethoscope, Dumbbell, GraduationCap } from 'lucide-react';
import { SectionTitle, ScrollReveal } from '../ui';
import VideoPlayer from '../ui/VideoPlayer';
import api from '../../services/api';

const categoryIcons = {
  all: Target, cafe: Coffee, beauty: Sparkles, shop: ShoppingBag,
  automotive: Car, fashion: Shirt, medical: Stethoscope, fitness: Dumbbell, education: GraduationCap
};

const defaultCategories = [
  { id: 'all', title: 'همه' },
  { id: 'cafe', title: 'کافه و رستوران' },
  { id: 'beauty', title: 'زیبایی و لاغری' },
  { id: 'shop', title: 'فروشگاهی' },
  { id: 'automotive', title: 'خودرویی' },
  { id: 'fashion', title: 'استایل و لباس' },
];

const PortfolioCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const tags = Array.isArray(item.tags) ? item.tags : [];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/portfolio/${item.slug || item.id}`}>
        <motion.div 
          whileHover={{ y: -8 }}
          className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 group cursor-pointer"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            {item.type === 'video' && item.video_url ? (
              <VideoPlayer
                src={item.video_url}
                poster={item.thumbnail || '/storage/portfolios/default-portfolio.jpg'}
                autoPlay={false}
                muted={true}
                loop={true}
                controls={false}
                className="w-full h-full"
              />
            ) : (
              <motion.img
                src={item.thumbnail || '/storage/portfolios/default-portfolio.jpg'}
                alt={item.title}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            {item.type === 'video' && (
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
            )}
            
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl text-white text-xs flex items-center gap-1.5 font-medium">
                <Eye className="w-3.5 h-3.5" />
                {item.views || '0'}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-green-500/20 backdrop-blur-xl text-green-400 text-xs flex items-center gap-1.5 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                {item.growth || '+0%'}
              </span>
            </div>

            {item.is_featured && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold">
                  ویژه
                </span>
              </div>
            )}
          </div>
          
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                {item.title || 'NO TITLE'}
              </h3>
              <ExternalLink className="w-4 h-4 text-dark-500 group-hover:text-primary-400 transition-colors" />
            </div>
            <p className="text-dark-400 text-sm line-clamp-2 mb-4">
              {item.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white/5 text-dark-300 text-xs border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forceRender, setForceRender] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const params = activeCategory !== 'all' ? { category: activeCategory } : {};
        const response = await api.getPortfolios({...params, _t: Date.now()});
        if (response.success && response.data) {
          // Force update with new data
          const newData = response.data.slice(0, 6);
          
          // Completely reset state
          setPortfolios([]);
          setForceRender(prev => prev + 1);
          
          setTimeout(() => {
            setPortfolios(newData);
            setLastUpdate(Date.now());
            setForceRender(prev => prev + 1);
          }, 100);
        }
      } catch (error) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, [activeCategory]);

  return (
    <section className="section-padding relative overflow-hidden bg-dark-900/50">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
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
            title="پروژه‌های موفق با ویوهای میلیونی"
            description="نتایج واقعی که برای مشتریان‌مان رقم زده‌ایم"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {defaultCategories.map((category) => {
              const IconComponent = categoryIcons[category.id] || Target;
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

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {portfolios.map((item, index) => (
                <PortfolioCard key={`${item.id}-${forceRender}-${lastUpdate}`} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            مشاهده همه نمونه کارها
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
