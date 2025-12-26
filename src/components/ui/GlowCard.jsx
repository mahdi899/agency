import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const GlowCard = ({ 
  children, 
  className = '', 
  glowColor = 'rgba(249,115,22,0.5)',
  hoverScale = 1.02,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: hoverScale }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden group',
        className
      )}
    >
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            width: 300,
            height: 300,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
        />
      )}
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlowCard;
