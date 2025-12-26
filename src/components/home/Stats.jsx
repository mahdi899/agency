import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Eye, Star, Calendar } from 'lucide-react';
import { AnimatedCounter, ScrollReveal } from '../ui';

const stats = [
  { value: 150, suffix: '+', label: 'پروژه موفق', icon: Rocket, color: 'from-orange-500 to-red-500' },
  { value: 50, suffix: 'M+', label: 'ویو کل', icon: Eye, color: 'from-blue-500 to-cyan-500' },
  { value: 98, suffix: '%', label: 'رضایت مشتری', icon: Star, color: 'from-yellow-500 to-amber-500' },
  { value: 5, suffix: '+', label: 'سال تجربه', icon: Calendar, color: 'from-purple-500 to-pink-500' },
];

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
          }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container-custom mx-auto relative" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 0.1} variant="scaleUp">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10"
              >
                <motion.div
                  className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}
                  animate={isInView ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-black text-white mb-2">
                  {isInView && <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
                </div>
                <div className="text-dark-400 text-sm">{stat.label}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
