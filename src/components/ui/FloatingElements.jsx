import { motion } from 'framer-motion';

const FloatingElements = () => {
  const elements = [
    { size: 60, x: '10%', y: '20%', delay: 0, color: 'from-primary-500/20 to-primary-500/5' },
    { size: 40, x: '80%', y: '15%', delay: 0.5, color: 'from-secondary-500/20 to-secondary-500/5' },
    { size: 80, x: '70%', y: '60%', delay: 1, color: 'from-accent-500/20 to-accent-500/5' },
    { size: 50, x: '20%', y: '70%', delay: 1.5, color: 'from-primary-500/15 to-secondary-500/5' },
    { size: 35, x: '50%', y: '30%', delay: 2, color: 'from-secondary-500/15 to-accent-500/5' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${el.color} backdrop-blur-3xl`}
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: el.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
