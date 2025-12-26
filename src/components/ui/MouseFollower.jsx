import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mousePosition.x, springConfig);
  const y = useSpring(mousePosition.y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      
      if (target.closest('a') || target.closest('button') || target.closest('[data-cursor="pointer"]')) {
        setIsHovering(true);
      }
      
      if (target.closest('[data-cursor-text]')) {
        setCursorText(target.closest('[data-cursor-text]').getAttribute('data-cursor-text'));
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.closest('a') || target.closest('button') || target.closest('[data-cursor="pointer"]')) {
        setIsHovering(false);
      }
      if (target.closest('[data-cursor-text]')) {
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ x, y }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            width: isHovering ? 80 : cursorText ? 100 : 20,
            height: isHovering ? 80 : cursorText ? 100 : 20,
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            marginLeft: isHovering ? -40 : cursorText ? -50 : -10,
            marginTop: isHovering ? -40 : cursorText ? -50 : -10,
          }}
        >
          <div 
            className={`absolute inset-0 rounded-full ${
              isHovering || cursorText ? 'bg-white' : 'bg-white'
            }`}
          />
          {cursorText && (
            <span className="relative z-10 text-dark-950 text-xs font-bold">
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-primary-500 pointer-events-none z-[9998] hidden lg:block"
        style={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
      />
    </>
  );
};

export default MouseFollower;
