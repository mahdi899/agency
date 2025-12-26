import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const SectionTitle = ({ 
  title, 
  subtitle, 
  description,
  align = 'center',
  className 
}) => {
  const alignClasses = {
    center: 'text-center',
    right: 'text-right',
    left: 'text-left',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn('mb-16', alignClasses[align], className)}
    >
      {subtitle && (
        <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
        <span className="bg-gradient-to-r from-white via-white to-dark-300 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {description && (
        <p className="text-lg text-dark-400 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
