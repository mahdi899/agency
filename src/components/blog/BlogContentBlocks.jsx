import { motion } from 'framer-motion';
import { 
  Lightbulb, AlertTriangle, Info, CheckCircle, XCircle, 
  Bookmark, Star, Quote, Play, ExternalLink, ChevronRight,
  Check, ArrowLeft, Zap, Target, Heart, MessageCircle
} from 'lucide-react';

// Callout/Alert Component
export const Callout = ({ type = 'info', title, children, icon }) => {
  const styles = {
    tip: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      icon: <Lightbulb className="w-5 h-5 text-emerald-400" />,
      title: 'نکته',
      titleColor: 'text-emerald-400'
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      title: 'هشدار',
      titleColor: 'text-amber-400'
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: <Info className="w-5 h-5 text-blue-400" />,
      title: 'توجه',
      titleColor: 'text-blue-400'
    },
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
      title: 'موفقیت',
      titleColor: 'text-green-400'
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: <XCircle className="w-5 h-5 text-red-400" />,
      title: 'خطا',
      titleColor: 'text-red-400'
    },
    important: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      icon: <Star className="w-5 h-5 text-purple-400" />,
      title: 'مهم',
      titleColor: 'text-purple-400'
    },
    note: {
      bg: 'bg-dark-700/50',
      border: 'border-dark-600',
      icon: <Bookmark className="w-5 h-5 text-dark-300" />,
      title: 'یادداشت',
      titleColor: 'text-dark-300'
    }
  };

  const style = styles[type] || styles.info;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`${style.bg} ${style.border} border-r-4 rounded-xl p-5 my-6`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {icon || style.icon}
        </div>
        <div className="flex-1">
          {(title || style.title) && (
            <h4 className={`font-bold ${style.titleColor} mb-2`}>
              {title || style.title}
            </h4>
          )}
          <div className="text-dark-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Quote Component
export const BlockQuote = ({ children, author, authorTitle, authorAvatar, source, sourceUrl, style = 'default' }) => {
  const styles = {
    default: 'border-r-4 border-primary-500 bg-dark-800/50',
    large: 'border-r-4 border-primary-500 bg-gradient-to-l from-primary-500/10 to-transparent',
    bordered: 'border border-dark-700 bg-dark-800/30',
    highlighted: 'bg-gradient-to-r from-primary-500/20 via-secondary-500/10 to-transparent border-r-4 border-gradient-to-b from-primary-500 to-secondary-500'
  };

  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${styles[style]} rounded-xl p-6 my-8 relative`}
    >
      <Quote className="absolute top-4 left-4 w-8 h-8 text-primary-500/20" />
      <div className={`text-lg md:text-xl text-white leading-relaxed ${style === 'large' ? 'text-2xl font-medium' : ''}`}>
        {children}
      </div>
      {(author || source) && (
        <footer className="mt-4 flex items-center gap-3">
          {authorAvatar && (
            <img src={authorAvatar} alt={author} className="w-10 h-10 rounded-full object-cover" />
          )}
          <div>
            {author && <cite className="text-primary-400 font-medium not-italic">{author}</cite>}
            {authorTitle && <span className="text-dark-400 text-sm block">{authorTitle}</span>}
            {source && (
              <a 
                href={sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-dark-400 text-sm hover:text-primary-400 transition-colors"
              >
                — {source}
              </a>
            )}
          </div>
        </footer>
      )}
    </motion.blockquote>
  );
};

// CTA Component
export const CallToAction = ({ title, description, buttonText, buttonUrl, icon, style = 'gradient' }) => {
  const styles = {
    gradient: 'bg-gradient-to-r from-primary-600 to-secondary-600',
    glass: 'glass-card border border-white/10',
    bordered: 'border-2 border-primary-500 bg-dark-800/50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`${styles[style]} rounded-2xl p-8 my-8 text-center relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-50" />
      <div className="relative z-10">
        {icon && <div className="text-4xl mb-4">{icon}</div>}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
        {description && <p className="text-dark-300 mb-6 max-w-lg mx-auto">{description}</p>}
        <a
          href={buttonUrl}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-dark-900 font-bold rounded-xl hover:bg-primary-100 transition-all transform hover:scale-105"
        >
          {buttonText}
          <ArrowLeft className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  );
};

// Feature Card Component
export const FeatureCard = ({ title, description, icon, image, link, linkText, style = 'glass' }) => {
  const styles = {
    default: 'bg-dark-800 border border-dark-700',
    glass: 'glass-card',
    gradient: 'bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-white/10',
    bordered: 'border-2 border-primary-500/30 bg-dark-800/50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`${styles[style]} rounded-2xl p-6 transition-all`}
    >
      {image && (
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-xl mb-4" />
      )}
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xl mb-4">
          {icon}
        </div>
      )}
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      {description && <p className="text-dark-400 text-sm leading-relaxed mb-4">{description}</p>}
      {link && (
        <a href={link} className="inline-flex items-center gap-1 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors">
          {linkText || 'بیشتر بخوانید'}
          <ChevronRight className="w-4 h-4" />
        </a>
      )}
    </motion.div>
  );
};

// Point/Bullet List Component
export const PointList = ({ title, items, type = 'check', style = 'default' }) => {
  const icons = {
    check: <Check className="w-5 h-5 text-emerald-400" />,
    star: <Star className="w-5 h-5 text-amber-400" />,
    zap: <Zap className="w-5 h-5 text-primary-400" />,
    target: <Target className="w-5 h-5 text-secondary-400" />,
    heart: <Heart className="w-5 h-5 text-red-400" />
  };

  const listStyles = {
    default: '',
    cards: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    timeline: 'relative pr-8 border-r-2 border-primary-500/30'
  };

  if (style === 'cards') {
    return (
      <div className="my-6">
        {title && <h4 className="text-xl font-bold text-white mb-4">{title}</h4>}
        <div className={listStyles[style]}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 rounded-xl flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                {icons[type]}
              </div>
              <div>
                <span className="text-white font-medium">{item.title || item}</span>
                {item.description && (
                  <p className="text-dark-400 text-sm mt-1">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (style === 'timeline') {
    return (
      <div className="my-6">
        {title && <h4 className="text-xl font-bold text-white mb-4">{title}</h4>}
        <div className={listStyles[style]}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pb-6 last:pb-0"
            >
              <div className="absolute -right-[17px] top-0 w-8 h-8 rounded-full bg-dark-900 border-2 border-primary-500 flex items-center justify-center text-primary-400 text-sm font-bold">
                {index + 1}
              </div>
              <div className="pr-6">
                <span className="text-white font-medium">{item.title || item}</span>
                {item.description && (
                  <p className="text-dark-400 text-sm mt-1">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-6">
      {title && <h4 className="text-xl font-bold text-white mb-4">{title}</h4>}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3"
          >
            <div className="flex-shrink-0 mt-1">{icons[type]}</div>
            <div>
              <span className="text-dark-200">{item.title || item}</span>
              {item.description && (
                <p className="text-dark-400 text-sm mt-1">{item.description}</p>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

// Full Width Image Component
export const FullWidthImage = ({ src, alt, caption, parallax = false }) => {
  return (
    <motion.figure
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="my-10 -mx-4 md:-mx-8 lg:-mx-16"
    >
      <div className={`relative overflow-hidden rounded-2xl ${parallax ? 'h-[400px]' : ''}`}>
        <img
          src={src}
          alt={alt}
          className={`w-full ${parallax ? 'h-[120%] object-cover absolute top-0' : 'object-cover'}`}
          style={parallax ? { transform: 'translateY(-10%)' } : {}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
      </div>
      {caption && (
        <figcaption className="text-center text-dark-400 text-sm mt-3 px-4">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
};

// Gallery Component
export const ImageGallery = ({ images, layout = 'grid', columns = 3 }) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  };

  if (layout === 'masonry') {
    return (
      <div className="my-8 columns-2 md:columns-3 gap-4 space-y-4">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="break-inside-avoid"
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full rounded-xl hover:scale-105 transition-transform cursor-pointer"
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`my-8 grid ${gridCols[columns]} gap-4`}>
      {images.map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative group overflow-hidden rounded-xl"
        >
          <img
            src={img.url}
            alt={img.alt}
            className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {img.caption && (
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white text-sm">{img.caption}</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Video Embed Component
export const VideoEmbed = ({ type, videoId, url, thumbnail, title, autoplay = false }) => {
  const getEmbedUrl = () => {
    switch (type) {
      case 'youtube':
        return `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`;
      case 'vimeo':
        return `https://player.vimeo.com/video/${videoId}`;
      case 'aparat':
        return `https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame`;
      default:
        return url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8"
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-dark-800">
        <iframe
          src={getEmbedUrl()}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {title && (
        <p className="text-center text-dark-400 text-sm mt-3">{title}</p>
      )}
    </motion.div>
  );
};

// Reels/Short Video Component
export const ReelsEmbed = ({ reels }) => {
  return (
    <div className="my-8">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {reels.map((reel, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[200px] relative group cursor-pointer"
          >
            <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-dark-800 relative">
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-medium line-clamp-2">{reel.title}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-dark-300">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" /> {reel.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> {reel.comments}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Code Block Component
export const CodeBlock = ({ code, language = 'javascript', title, showLineNumbers = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-6 rounded-xl overflow-hidden bg-dark-900 border border-dark-700"
    >
      {title && (
        <div className="px-4 py-2 bg-dark-800 border-b border-dark-700 flex items-center justify-between">
          <span className="text-dark-400 text-sm">{title}</span>
          <span className="text-xs text-primary-400 bg-primary-500/10 px-2 py-1 rounded">{language}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language} text-sm text-dark-200`}>
          {code}
        </code>
      </pre>
    </motion.div>
  );
};

// Divider Component
export const Divider = ({ style = 'default', icon }) => {
  const styles = {
    default: 'border-t border-dark-700',
    gradient: 'h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent',
    dots: 'flex items-center justify-center gap-2',
    icon: 'flex items-center justify-center'
  };

  if (style === 'dots') {
    return (
      <div className={`my-10 ${styles[style]}`}>
        <span className="w-2 h-2 rounded-full bg-primary-500" />
        <span className="w-2 h-2 rounded-full bg-primary-500/60" />
        <span className="w-2 h-2 rounded-full bg-primary-500/30" />
      </div>
    );
  }

  if (style === 'icon') {
    return (
      <div className={`my-10 ${styles[style]}`}>
        <div className="w-12 h-12 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-primary-400">
          {icon || <Star className="w-5 h-5" />}
        </div>
      </div>
    );
  }

  return <div className={`my-10 ${styles[style]}`} />;
};

// Table of Contents Component
export const TableOfContents = ({ items }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="my-8 p-6 rounded-2xl bg-dark-800/50 border border-dark-700"
    >
      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Bookmark className="w-5 h-5 text-primary-400" />
        فهرست مطالب
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className={`${item.level === 2 ? 'pr-4' : ''}`}>
            <a
              href={`#${item.id}`}
              className="text-dark-300 hover:text-primary-400 transition-colors flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4" />
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default {
  Callout,
  BlockQuote,
  CallToAction,
  FeatureCard,
  PointList,
  FullWidthImage,
  ImageGallery,
  VideoEmbed,
  ReelsEmbed,
  CodeBlock,
  Divider,
  TableOfContents
};
