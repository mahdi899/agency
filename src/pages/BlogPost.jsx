import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User, Calendar, Share2 } from 'lucide-react';
import { getBlogBySlug, blogPosts } from '../data/blog';
import { Button, Card } from '../components/ui';

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">مقاله یافت نشد</h1>
          <Link to="/blog">
            <Button>بازگشت به بلاگ</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter(p => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-custom mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به بلاگ
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400 mb-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative aspect-video rounded-2xl overflow-hidden mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
                <span className="text-8xl">📝</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none mb-12"
            >
              <p className="text-dark-300 leading-relaxed text-lg">
                {post.excerpt}
              </p>
              
              <h2 className="text-2xl font-bold text-white mt-8 mb-4">مقدمه</h2>
              <p className="text-dark-300 leading-relaxed">
                در دنیای امروز، حضور قوی در فضای دیجیتال برای هر کسب‌وکاری ضروری است. 
                با رشد روزافزون شبکه‌های اجتماعی و تغییر رفتار مصرف‌کنندگان، برندها باید 
                استراتژی‌های جدیدی برای جذب و نگهداشت مخاطبان خود اتخاذ کنند.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">نکات کلیدی</h2>
              <ul className="text-dark-300 space-y-2">
                <li>شناخت دقیق مخاطبان هدف</li>
                <li>تولید محتوای ارزشمند و مرتبط</li>
                <li>استفاده از ترندهای روز</li>
                <li>تعامل مستمر با مخاطبان</li>
                <li>تحلیل و بهینه‌سازی مداوم</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">نتیجه‌گیری</h2>
              <p className="text-dark-300 leading-relaxed">
                موفقیت در فضای دیجیتال نیازمند ترکیبی از خلاقیت، استراتژی و اجرای دقیق است. 
                با پیروی از اصول ذکر شده و تطبیق آن‌ها با نیازهای خاص کسب‌وکار خود، 
                می‌توانید به نتایج چشمگیری دست یابید.
              </p>
            </motion.div>

            <Card className="p-6 mb-12">
              <div className="flex items-center justify-between">
                <span className="text-dark-400">این مقاله را به اشتراک بگذارید:</span>
                <div className="flex gap-3">
                  <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-dark-400 hover:text-white hover:bg-primary-500 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>

            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">مقالات مرتبط</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((p) => (
                    <Link key={p.id} to={`/blog/${p.slug}`}>
                      <Card className="p-4 group">
                        <h3 className="font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                          {p.title}
                        </h3>
                        <p className="text-sm text-dark-400 mt-2">{p.readTime}</p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
