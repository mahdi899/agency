import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Eye, Heart, Twitter, Linkedin, Send, Copy, Check } from 'lucide-react';
import { Card } from '../ui';

// Share Buttons Component
export const ShareButtons = ({ onShare, copied, variant = 'default' }) => {
  const buttonClass = variant === 'compact' 
    ? 'flex-1 h-10 rounded-xl bg-dark-700 text-dark-300 hover:text-white transition-all flex items-center justify-center'
    : 'w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-dark-700 text-dark-300 hover:text-white transition-all flex items-center justify-center';

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => onShare('twitter')}
        className={`${buttonClass} hover:bg-[#1DA1F2]`}
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button 
        onClick={() => onShare('linkedin')}
        className={`${buttonClass} hover:bg-[#0A66C2]`}
      >
        <Linkedin className="w-4 h-4" />
      </button>
      <button 
        onClick={() => onShare('telegram')}
        className={`${buttonClass} hover:bg-[#0088cc]`}
      >
        <Send className="w-4 h-4" />
      </button>
      {variant !== 'compact' && (
        <button 
          onClick={() => onShare('copy')}
          className={`${buttonClass} hover:bg-primary-500`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
};

// Author Meta Component
export const AuthorMeta = ({ author, authorAvatar, date }) => (
  <div className="flex items-center gap-3">
    {authorAvatar ? (
      <img src={authorAvatar} alt={author} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-primary-500/30" />
    ) : (
      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
        {author?.charAt(0)}
      </div>
    )}
    <div className="text-right">
      <span className="text-white font-medium block text-sm lg:text-base">{author}</span>
      <span className="text-xs lg:text-sm text-dark-400">{date}</span>
    </div>
  </div>
);

// Post Stats Component
export const PostStats = ({ readTime, views }) => (
  <div className="flex items-center gap-4 text-xs lg:text-sm text-dark-400">
    <span className="flex items-center gap-1">
      <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
      {readTime} دقیقه
    </span>
    <span className="flex items-center gap-1">
      <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
      {views.toLocaleString('fa-IR')} بازدید
    </span>
  </div>
);

// Author Box Component
export const AuthorBox = ({ author, authorAvatar, authorBio }) => (
  <Card className="p-6 mt-8">
    <div className="flex items-start gap-4">
      {authorAvatar ? (
        <img src={authorAvatar} alt={author} className="w-16 h-16 rounded-2xl object-cover" />
      ) : (
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold">
          {author?.charAt(0)}
        </div>
      )}
      <div className="flex-1">
        <h4 className="text-lg font-bold text-white">{author}</h4>
        {authorBio && (
          <p className="text-dark-400 text-sm mt-1">{authorBio}</p>
        )}
      </div>
    </div>
  </Card>
);

// Quick Stats Widget Component
export const QuickStatsWidget = ({ readTime, wordCount, views }) => (
  <Card className="p-4">
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-dark-400">زمان مطالعه</span>
        <span className="text-white">{readTime} دقیقه</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-dark-400">تعداد کلمات</span>
        <span className="text-white">{(wordCount || 0).toLocaleString('fa-IR')}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-dark-400">بازدید</span>
        <span className="text-white">{views.toLocaleString('fa-IR')}</span>
      </div>
    </div>
  </Card>
);

// Share Widget Component
export const ShareWidget = ({ onShare, copied }) => (
  <Card className="p-4">
    <h4 className="text-sm font-bold text-white mb-3">اشتراک‌گذاری</h4>
    <ShareButtons onShare={onShare} copied={copied} variant="compact" />
  </Card>
);

// Engagement Bar Component
export const EngagementBar = ({ post, liked, onLike, onShare, copied }) => (
  <Card className="p-4 lg:p-6 mb-8 lg:mb-12">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4 lg:gap-6">
        <button 
          onClick={onLike}
          className={`flex items-center gap-2 px-3 py-2 lg:px-4 rounded-xl transition-all ${
            liked 
              ? 'bg-red-500/20 text-red-400' 
              : 'bg-dark-700 text-dark-300 hover:bg-red-500/20 hover:text-red-400'
          }`}
        >
          <Heart className={`w-4 h-4 lg:w-5 lg:h-5 ${liked ? 'fill-red-400' : ''}`} />
          <span className="text-sm lg:text-base">{post.likes.toLocaleString('fa-IR')}</span>
        </button>
        <span className="flex items-center gap-2 text-dark-400 text-sm lg:text-base">
          <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
          {post.views.toLocaleString('fa-IR')} بازدید
        </span>
      </div>
      <ShareButtons onShare={onShare} copied={copied} />
    </div>
  </Card>
);

// Related Post Card Component
export const RelatedPostCard = ({ post }) => (
  <Link to={`/blog/${post.slug}`}>
    <Card className="p-0 overflow-hidden group h-full">
      <div className="aspect-video relative overflow-hidden">
        {post.thumbnail ? (
          <img 
            src={post.thumbnail} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 mt-3 text-xs text-dark-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.read_time || 5} دقیقه
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {(post.views || 0).toLocaleString('fa-IR')}
          </span>
        </div>
      </div>
    </Card>
  </Link>
);

// Related Posts Section Component
export const RelatedPostsSection = ({ posts }) => {
  if (!posts || posts.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 pt-12 border-t border-dark-700"
    >
      <h2 className="text-2xl font-bold text-white mb-8">مقالات مرتبط</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <RelatedPostCard key={p.id} post={p} />
        ))}
      </div>
    </motion.div>
  );
};

// Tags Section Component
export const TagsSection = ({ tags }) => (
  <div className="mt-12 pt-8 border-t border-dark-700">
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <Link
          key={i}
          to={`/blog?tag=${tag}`}
          className="px-4 py-2 rounded-full bg-dark-800 text-dark-300 hover:bg-primary-500/20 hover:text-primary-400 transition-all text-sm"
        >
          #{tag}
        </Link>
      ))}
    </div>
  </div>
);

// Featured Image Component
export const FeaturedImage = ({ thumbnail, thumbnailAlt, thumbnailCaption }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="relative rounded-2xl lg:rounded-3xl overflow-hidden mb-8 lg:mb-12 shadow-2xl"
  >
    {thumbnail ? (
      <figure>
        <img 
          src={thumbnail} 
          alt={thumbnailAlt}
          className="w-full aspect-[16/9] lg:aspect-[21/9] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
        {thumbnailCaption && (
          <figcaption className="absolute bottom-2 lg:bottom-4 left-4 right-4 text-center text-white/80 text-xs lg:text-sm">
            {thumbnailCaption}
          </figcaption>
        )}
      </figure>
    ) : (
      <div className="aspect-[16/9] lg:aspect-[21/9] bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
        <span className="text-6xl lg:text-9xl">📝</span>
      </div>
    )}
  </motion.div>
);

// Breadcrumb Component
export const Breadcrumb = ({ categoryName }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    <nav className="flex items-center gap-2 text-sm text-dark-400">
      <Link to="/" className="hover:text-white transition-colors">خانه</Link>
      <span>/</span>
      <Link to="/blog" className="hover:text-white transition-colors">بلاگ</Link>
      <span>/</span>
      <span className="text-primary-400">{categoryName}</span>
    </nav>
  </motion.div>
);
