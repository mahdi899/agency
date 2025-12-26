import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

const BeforeAfterSlider = ({ 
  beforeImage, 
  afterImage, 
  beforeLabel = 'قبل', 
  afterLabel = 'بعد',
  className = '' 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl cursor-ew-resize select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
    >
      <div className="relative aspect-[4/3]">
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
              maxWidth: 'none'
            }}
            draggable={false}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftRight className="w-5 h-5 text-dark-900" />
          </motion.div>
        </div>

        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-red-500/80 backdrop-blur-sm text-white text-sm font-medium">
          {beforeLabel}
        </div>
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-green-500/80 backdrop-blur-sm text-white text-sm font-medium">
          {afterLabel}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
