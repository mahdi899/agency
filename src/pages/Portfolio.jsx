import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, TrendingUp, Play, ExternalLink, ArrowLeft, Sparkles, Target, Coffee, ShoppingBag, Car, Shirt } from 'lucide-react';
import { SectionTitle, ScrollReveal } from '../components/ui';
import { WebProjects } from '../components/home';
import api from '../services/api';

const FeaturedProject = ({ item }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div ref={ref} className="mb-20">
      <Link to={`/portfolio/${item.id}`}>
        <div className="relative h-[70vh] min-h-[500px] rounded-3xl overflow-hidden group cursor-pointer">
          <motion.div className="absolute inset-0" style={{ y }}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
          
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                پروژه ویژه
              </span>
              <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
                {item.category}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 group-hover:text-primary-400 transition-colors">
              {item.title}
            </h2>
            
            <p className="text-xl text-dark-300 mb-6 max-w-2xl">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-white">
                <Eye className="w-5 h-5 text-primary-400" />
                <span className="font-bold">{item.views}</span>
                <span className="text-dark-400">ویو</span>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <TrendingUp className="w-5 h-5" />
                <span className="font-bold">{item.growth}</span>
                <span className="text-dark-400">رشد</span>
              </div>
              <motion.div 
                className="flex items-center gap-2 text-primary-400 font-medium"
                whileHover={{ x: -5 }}
              >
                <span>مشاهده پروژه</span>
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
            </div>
          </div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center">
              <Play className="w-10 h-10 text-white mr-[-4px]" fill="white" />
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

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
          className="relative rounded-2xl overflow-hidden group cursor-pointer h-full"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <motion.img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />
            
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center"
              >
                <Play className="w-6 h-6 text-white mr-[-2px]" fill="white" />
              </motion.div>
            </motion.div>
            
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl text-white text-xs flex items-center gap-1.5 font-medium">
                <Eye className="w-3.5 h-3.5" />
                {item.views}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm text-white text-xs">
                  {item.category}
                </span>
                <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {item.views || '0'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

const categories = [
  { id: 'all', title: 'همه', icon: Target },
  { id: 'cafe', title: 'کافه و رستوران', icon: Coffee },
  { id: 'shop', title: 'فروشگاهی', icon: ShoppingBag },
  { id: 'automotive', title: 'خودرویی', icon: Car },
  { id: 'fashion', title: 'استایل و لباس', icon: Shirt },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoSectionRef = useRef(null);
  const digitalSectionRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const response = await api.getPortfolios();
        if (response.success && response.data) {
          setPortfolioItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const featuredItem = portfolioItems.find(item => item.is_featured);
  const regularItems = activeCategory === 'all' 
    ? portfolioItems.filter(item => !item.is_featured)
    : portfolioItems.filter(item => item.category === activeCategory && !item.is_featured);

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

          {/* Navigation Tabs for Video and Digital Sections */}
          <ScrollReveal delay={0.05}>
            <div className="flex justify-center gap-4 mb-12">
              <motion.button
                onClick={() => scrollToSection(videoSectionRef)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                نمونه کار ویدیویی
              </motion.button>
              <motion.button
                onClick={() => scrollToSection(digitalSectionRef)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                نمونه کار دیجیتال
              </motion.button>
            </div>
          </ScrollReveal>

          {activeCategory === 'all' && featuredItem && (
            <ScrollReveal delay={0.1}>
              <FeaturedProject item={featuredItem} />
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.2}>
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

          {/* Video Portfolio Section */}
          <div ref={videoSectionRef} className="scroll-mt-32 mb-20">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">نمونه کار ویدیویی</h2>
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
                {regularItems.map((item, index) => (
                  <PortfolioCard key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Digital Portfolio Section */}
      <div ref={digitalSectionRef} className="scroll-mt-32">
        <WebProjects />
      </div>
    </div>
  );
};

export default Portfolio;
