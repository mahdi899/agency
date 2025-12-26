import { useState } from 'react';
import { motion } from 'framer-motion';

const BlurImage = ({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  aspectRatio = 'aspect-video',
  objectFit = 'object-cover'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${containerClassName}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 bg-dark-800 flex items-center justify-center">
          <span className="text-dark-500 text-sm">خطا در بارگذاری</span>
        </div>
      )}

      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full ${objectFit} ${className}`}
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          filter: isLoaded ? 'blur(0px)' : 'blur(20px)' 
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default BlurImage;
