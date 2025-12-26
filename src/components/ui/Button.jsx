import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40',
  secondary: 'bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10',
  outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  ghost: 'text-white hover:bg-white/10',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  disabled,
  loading,
  icon,
  iconPosition = 'right',
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && icon}
      {children}
      {icon && iconPosition === 'right' && !loading && icon}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
