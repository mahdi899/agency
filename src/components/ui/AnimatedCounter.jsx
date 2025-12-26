import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className 
}) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const countRef = useRef(0);

  useEffect(() => {
    if (!inView) return;

    const startTime = Date.now();
    const endValue = parseInt(end.toString().replace(/[^0-9]/g, ''));

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * endValue);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, end, duration]);

  const formatNumber = (num) => {
    return num.toLocaleString('fa-IR');
  };

  return (
    <span ref={ref} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default AnimatedCounter;
