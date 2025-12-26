import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({ 
  label,
  error,
  className,
  type = 'text',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark-300 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          'w-full px-4 py-3 rounded-xl',
          'bg-white/5 backdrop-blur-xl border border-white/10',
          'text-white placeholder:text-dark-500',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500',
          'transition-all duration-300',
          error && 'border-red-500 focus:ring-red-500/50',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
