import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const MagneticButton = ({ 
  children, 
  className = '',
  strength = 0.3,
  ...props 
}) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        'relative px-8 py-4 rounded-xl font-bold overflow-hidden group',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
        initial={{ x: '-100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.4 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600" />
    </motion.button>
  );
};

export default MagneticButton;
