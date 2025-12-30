import { motion } from 'framer-motion';

export const PageLoader = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className={`${sizes[size]} border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4`} />
        <p className="text-dark-400 text-sm">در حال بارگذاری...</p>
      </motion.div>
    </div>
  );
};

export const ComponentLoader = ({ size = 'sm' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizes[size]} border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin`} />
    </div>
  );
};

export const SkeletonLoader = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-dark-800 rounded animate-pulse"
        style={{ width: `${Math.random() * 40 + 60}%` }}
      />
    ))}
  </div>
);

export default PageLoader;
