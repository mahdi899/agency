import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className, 
  hover = true,
  gradient = false,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-white/5 backdrop-blur-xl border border-white/10',
        gradient && 'before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-r before:from-primary-500 before:via-secondary-500 before:to-accent-500 before:-z-10',
        'transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
