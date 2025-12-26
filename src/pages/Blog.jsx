import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowLeft } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blog';
import { SectionTitle, Card } from '../components/ui';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <SectionTitle
            subtitle="بلاگ"
            title="مقالات و آموزش‌ها"
            description="جدیدترین مطالب در حوزه دیجیتال مارکتینگ و تولید محتوا"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    : 'bg-white/5 text-dark-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden group cursor-pointer h-full">
                    <div className="relative aspect-video bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-50">📝</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-dark-400 mb-3">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-dark-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-md bg-white/5 text-dark-400 text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-primary-400 font-medium">
                        <span>ادامه مطلب</span>
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
                      </div>
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

export default Blog;
