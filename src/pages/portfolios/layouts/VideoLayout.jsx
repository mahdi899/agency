import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart, Eye, Share2, Camera, Lightbulb, Monitor, Instagram, Youtube, Target, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const VideoLayout = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const timelineProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  
  // Determine video type
  const videoType = data.video_type || (data.aspect_ratio === '9:16' ? 'vertical' : 'horizontal');
  const isVertical = videoType === 'vertical';
  
  // Dynamic gradient based on type
  const gradientClass = isVertical 
    ? 'from-pink-600/20 via-purple-600/20 to-indigo-600/20'
    : 'from-blue-600/20 via-orange-600/20 to-red-600/20';

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Animated counter
  const AnimatedCounter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      setIsVisible(true);
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }, [target]);

    return (
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        className="font-bold"
      >
        {count >= 1000000 ? `${(count / 1000000).toFixed(1)}M` : 
         count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count}{suffix}
      </motion.span>
    );
  };

  // Timeline markers
  const timelineMarkers = [
    { time: '00:03', label: 'The Hook', persian: 'جذب مخاطب در ۳ ثانیه', position: 10 },
    { time: '00:15', label: 'The Value', persian: 'ارائه ارزش', position: 40 },
    { time: data.duration || '00:30', label: 'The CTA', persian: 'دعوت به اقدام', position: 100 }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {data.video_url ? (
          <video
            className="w-full h-full object-cover opacity-30"
            src={data.video_url}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-600/20 via-purple-600/20 to-indigo-600/20" />
        )}
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          style={{
            rotateX: mousePosition.y * 10,
            rotateY: mousePosition.x * 10,
            transformPerspective: 1000,
          }}
          className="relative"
        >
          {isVertical ? (
            /* Vertical/Phone Mode */
            <div className="relative mx-auto">
              {/* 3D iPhone Frame */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-80 h-[700px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl"
                style={{
                  boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.8), 0 30px 60px -30px rgba(0, 0, 0, 0.9)',
                }}
              >
                {/* Phone screen */}
                <div className="relative w-full h-full bg-black rounded-[2rem] overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black rounded-b-2xl z-20" />
                  
                  {/* Video Player */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src={data.video_url}
                    loop
                    playsInline
                    muted={isMuted}
                    onClick={togglePlay}
                  />
                  
                  {/* Controls Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Horizontal/Cinema Mode */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Ambilight glow effect */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 100px 20px rgba(59, 130, 246, 0.5)',
                    '0 0 120px 30px rgba(239, 68, 68, 0.3)',
                    '0 0 100px 20px rgba(59, 130, 246, 0.5)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-red-500/20 blur-3xl"
              />
              
              {/* Glass Cinema Container */}
              <div className="relative w-[800px] h-[450px] bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src={data.video_url}
                  loop
                  playsInline
                  muted={isMuted}
                  onClick={togglePlay}
                />
                
                {/* Controls */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Viral Metrics */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 space-y-4 hidden lg:block">
        {[
          { icon: Eye, value: 1200000, label: 'Views' },
          { icon: Heart, value: 50000, label: 'Likes' },
          { icon: Share2, value: 10000, label: 'Shares' },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-3 border border-white/20"
          >
            <metric.icon className="w-5 h-5 text-cyan-400" />
            <div className="text-white">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                <AnimatedCounter target={metric.value} />
              </div>
              <div className="text-xs text-gray-400">{metric.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="relative z-10 py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            The Hook & Strategy
          </h2>
          
          {/* Timeline Bar */}
          <div className="relative h-2 bg-white/20 rounded-full overflow-hidden mb-8">
            <motion.div
              style={{ scaleX: timelineProgress }}
              initial={{ scaleX: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 origin-left"
            />
          </div>
          
          {/* Timeline Markers */}
          <div className="relative flex justify-between">
            {timelineMarkers.map((marker, index) => (
              <motion.div
                key={marker.time}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
                style={{ left: `${marker.position}%`, position: 'absolute', transform: 'translateX(-50%)' }}
              >
                <div className="w-4 h-4 bg-cyan-400 rounded-full mb-2 mx-auto" />
                <div className="text-white font-bold">{marker.time}</div>
                <div className="text-cyan-400 text-sm">{marker.label}</div>
                <div className="text-gray-400 text-xs">{marker.persian}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Behind the Scenes */}
      <div className="relative z-10 py-20 px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Behind the Scenes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Equipment */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6 text-purple-400" />
                Equipment
              </h3>
              <div className="space-y-4">
                {['Sony A7S III', 'LED Lighting', 'Gimbal Stabilizer'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Platform */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Monitor className="w-6 h-6 text-blue-400" />
                Platform
              </h3>
              <div className="flex gap-4">
                {data.platform === 'instagram' ? (
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Goal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-400" />
                Goal
              </h3>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full border border-green-400/30">
                <span className="text-green-400 font-bold">{data.goal || 'Brand Awareness'}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Sticky Play Button */}
      <AnimatePresence>
        {showPlayButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={togglePlay}
            className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-2xl z-50 hover:scale-110 transition-transform"
          >
            <Play size={24} fill="white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoLayout;
