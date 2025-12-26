import { motion } from 'framer-motion';

const AnimatedBackground = ({ variant = 'default' }) => {
  const variants = {
    default: (
      <>
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </>
    ),
    hero: (
      <>
        <motion.div
          className="absolute top-[-200px] right-[-200px] w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0.1) 30%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-300px] left-[-200px] w-[900px] h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217,70,239,0.3) 0%, rgba(217,70,239,0.1) 30%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </>
    ),
    glow: (
      <>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
          style={{
            background: 'linear-gradient(90deg, rgba(249,115,22,0.3), rgba(217,70,239,0.3), rgba(6,182,212,0.3))',
            filter: 'blur(100px)',
            borderRadius: '50%',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </>
    ),
    mesh: (
      <>
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.15) 0%, transparent 50%)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </>
    ),
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {variants[variant]}
    </div>
  );
};

export default AnimatedBackground;
