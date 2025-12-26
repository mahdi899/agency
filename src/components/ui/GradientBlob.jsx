import { cn } from '../../utils/cn';

const GradientBlob = ({ 
  className,
  color = 'primary',
  size = 'lg',
  blur = 'blur-3xl',
  animate = true,
}) => {
  const colors = {
    primary: 'bg-primary-500/30',
    secondary: 'bg-secondary-500/30',
    accent: 'bg-accent-500/30',
    mixed: 'bg-gradient-to-r from-primary-500/30 via-secondary-500/30 to-accent-500/30',
  };

  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[500px] h-[500px]',
    '2xl': 'w-[700px] h-[700px]',
  };

  return (
    <div
      className={cn(
        'absolute rounded-full opacity-50',
        colors[color],
        sizes[size],
        blur,
        animate && 'animate-blob',
        className
      )}
    />
  );
};

export default GradientBlob;
