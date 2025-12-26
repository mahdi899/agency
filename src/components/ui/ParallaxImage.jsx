import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

const ParallaxImage = ({ 
  src, 
  alt = '', 
  className = '',
  speed = 0.5,
  scale = 1.2,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, scale]);

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        style={{ y, scale: scaleValue }}
        className="w-full h-full"
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-500/30 to-secondary-500/30 flex items-center justify-center">
            <span className="text-6xl opacity-50">🖼️</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
