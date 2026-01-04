import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Monitor, Smartphone, Palette, Type, Zap, Shield, Search, Gauge, Layout } from 'lucide-react';

const WebDesignLayout = ({ data }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress to image translation
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 20 });

  // Mock color palette data
  const colorPalette = [
    { name: 'Primary', hex: data.color || '#FF6B35' },
    { name: 'Secondary', hex: '#1E293B' },
    { name: 'Accent', hex: '#3B82F6' },
    { name: 'Light', hex: '#F8FAFC' },
    { name: 'Dark', hex: '#0F172A' }
  ];

  // Mock performance metrics
  const performanceMetrics = [
    { label: 'Performance', value: 98, icon: Gauge },
    { label: 'SEO', value: 100, icon: Search },
    { label: 'Accessibility', value: 95, icon: Shield },
    { label: 'Best Practices', value: 100, icon: Zap }
  ];

  // Extract challenge and solution from description or use defaults
  const challenge = data.challenge || "ایجاد یک تجربه کاربری منحصر به فرد که برند را به صورت دیجیتال به نمایش بگذارد.";
  const solution = data.solution || "طراحی یک رابط کاربری مدرن با تمرکز بر عملکرد، زیبایی و بهینه‌سازی برای موتورهای جستجو.";

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-900 text-white overflow-hidden">
      
      {/* Hero Section: Floating Mockups */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient mesh */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 20% 50%, ${data.color || '#FF6B35'} 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, #3B82F6 0%, transparent 50%),
                          radial-gradient(circle at 40% 20%, #1E293B 0%, transparent 50%)`
            }}
          />
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>

        {/* Floating devices */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 px-6">
          {/* Laptop Frame */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="relative bg-slate-800 rounded-2xl p-3 shadow-2xl">
              <div className="bg-slate-900 rounded-xl p-2">
                <div className="w-[500px] h-72 bg-slate-800 rounded-lg overflow-hidden relative">
                  <img 
                    src={data.thumbnail || data.cover_image} 
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-slate-700 rounded-full" />
                </div>
              </div>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-slate-700 rounded-full" />
            </div>
          </motion.div>

          {/* Mobile Frame */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="relative"
          >
            <div className="relative bg-slate-800 rounded-3xl p-3 shadow-2xl">
              <div className="bg-slate-900 rounded-2xl p-2">
                <div className="w-40 h-64 bg-slate-800 rounded-2xl overflow-hidden relative">
                  <img 
                    src={data.thumbnail || data.cover_image} 
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-14 h-1 bg-slate-700 rounded-full" />
                </div>
              </div>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-slate-700 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-20 left-0 right-0 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl lg:text-7xl font-bold mb-4"
          >
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            {data.short_description || data.description?.substring(0, 150) + '...'}
          </motion.p>
        </div>
      </section>

      {/* Cinematic 3D Interactive Showcase */}
      <section className="relative h-[150vh] bg-slate-900 overflow-hidden">
        {/* 3D Stage with Grid Background */}
        <div className="absolute inset-0 bg-grid-white/[0.05]">
          {/* Radial gradient spotlight that follows mouse */}
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 40%)'
            }}
          />
        </div>

        {/* Main Container */}
        <div className="relative h-full flex items-center justify-center px-6">
          {/* 3D Browser Window */}
          <motion.div
            ref={containerRef}
            className="relative"
            style={{
              perspective: '1000px',
              '--mouse-x': '50%',
              '--mouse-y': '50%'
            }}
          >
            <motion.div
              className="relative"
              initial={{ rotateX: 15, rotateY: 0, scale: 0.9 }}
              whileInView={{ rotateX: 5, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Browser Frame */}
              <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-orange-500/20 border border-slate-700/50 overflow-hidden">
                {/* Glass Header Bar */}
                <div className="bg-slate-900/80 backdrop-blur-md px-6 py-4 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    {/* macOS Style Dots */}
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50" />
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50" />
                    </div>
                    
                    {/* Address Bar */}
                    <div className="flex-1 mx-4 bg-slate-800/50 rounded-lg px-4 py-2 border border-slate-700/30">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-slate-300 text-sm font-medium">
                          {data.link ? new URL(data.link).hostname : 'example.com'}
                        </span>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex gap-2">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Website Preview */}
                <div className="relative w-[600px] h-[400px] bg-slate-900/50 overflow-hidden">
                  <img 
                    src={data.thumbnail || data.cover_image} 
                    alt={data.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Insight Cards */}
              {/* Top Left: Speed Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -100, y: -50 }}
                whileInView={{ opacity: 1, scale: 1, x: -120, y: -80 }}
                transition={{ 
                  delay: 0.3, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15 
                }}
                className="absolute top-0 left-0 bg-slate-800/80 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 shadow-xl shadow-blue-500/10 max-w-xs"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold">سرعت لود زیر ۱ ثانیه</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  بهینه‌سازی پیشرفته برای بارگذاری آنی و تجربه کاربری بی‌نقص
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '95%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-medium">95%</span>
                </div>
              </motion.div>

              {/* Middle Right: Minimal UI Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 100, y: 0 }}
                whileInView={{ opacity: 1, scale: 1, x: 120, y: 20 }}
                transition={{ 
                  delay: 0.5, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15 
                }}
                className="absolute top-1/2 right-0 bg-slate-800/80 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 shadow-xl shadow-purple-500/10 max-w-xs"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Layout className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold">رابط کاربری مینیمال</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  طراحی تمیز و مدرن با تمرکز بر محتوا و تجربه کاربری روان
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 bg-slate-700/50 rounded" />
                  ))}
                </div>
              </motion.div>

              {/* Bottom Left: Responsive Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -100, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, x: -120, y: 100 }}
                transition={{ 
                  delay: 0.7, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15 
                }}
                className="absolute bottom-0 left-0 bg-slate-800/80 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 shadow-xl shadow-green-500/10 max-w-xs"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold">واکنش‌گرا در موبایل</h4>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  طراحی کاملاً واکنش‌گرا برای بهترین تجربه در تمام دستگاه‌ها
                </p>
                <div className="mt-3 flex gap-2">
                  <div className="w-8 h-12 bg-slate-700/50 rounded-lg" />
                  <div className="w-6 h-10 bg-slate-700/50 rounded-lg" />
                  <div className="w-4 h-8 bg-slate-700/50 rounded-lg" />
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-10 -right-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-lg shadow-blue-500/25 text-sm font-semibold"
              >
                3D Interactive
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -2, 2, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-10 -left-10 bg-slate-800/90 backdrop-blur text-white px-4 py-2 rounded-xl border border-slate-700 text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Live Preview</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mouse Tracker Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('mousemove', (e) => {
                const section = e.currentTarget.querySelector('.relative.h-\\[150vh\\]');
                if (section) {
                  const rect = section.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  section.style.setProperty('--mouse-x', x + '%');
                  section.style.setProperty('--mouse-y', y + '%');
                }
              });
            `
          }}
        />
      </section>

      {/* Design System Breakdown */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">سیستم طراحی</h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Color Palette */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-semibold">پالت رنگ</h3>
              </div>
              <div className="space-y-4">
                {colorPalette.map((color, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-xl shadow-lg"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <p className="font-medium">{color.name}</p>
                      <p className="text-slate-400 font-mono">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-6">
                <Type className="w-6 h-6 text-purple-400" />
                <h3 className="text-2xl font-semibold">تایپوگرافی</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-6xl font-bold mb-2">Aa</p>
                  <p className="text-slate-400">فونت اصلی: وزیرمتن</p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">عنوان بولد</p>
                  <p className="text-lg">زیرعنوان منظم</p>
                  <p className="text-base">متن اصلی محتوا</p>
                  <p className="text-sm font-light">متن کپشن سبک</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">داستان پروژه</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
            >
              <h3 className="text-2xl font-semibold mb-4 text-orange-400">چالش</h3>
              <p className="text-slate-300 leading-relaxed">{challenge}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
            >
              <h3 className="text-2xl font-semibold mb-4 text-green-400">راه حل ما</h3>
              <p className="text-slate-300 leading-relaxed">{solution}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">معیارهای عملکرد</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-slate-700"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-green-400"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: metric.value / 100 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{
                          pathLength: 1,
                          pathOffset: 1 - (metric.value / 100),
                          strokeDasharray: `${2 * Math.PI * 56}`,
                          strokeDashoffset: `${2 * Math.PI * 56 * (1 - metric.value / 100)}`
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{metric.value}%</span>
                    </div>
                  </div>
                  <Icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <p className="text-sm font-medium">
                    {metric.label === 'Performance' ? 'عملکرد' :
                     metric.label === 'SEO' ? 'سئو' :
                     metric.label === 'Accessibility' ? 'دسترسی‌پذیری' :
                     metric.label === 'Best Practices' ? 'بهترین شیوه‌ها' : metric.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">تکنولوژی‌های استفاده شده</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'React', icon: '⚛️', level: 95 },
              { name: 'Tailwind CSS', icon: '🎨', level: 90 },
              { name: 'Node.js', icon: '🟢', level: 85 },
              { name: 'MongoDB', icon: '🍃', level: 80 },
              { name: 'Framer Motion', icon: '🎭', level: 88 },
              { name: 'Next.js', icon: '▲', level: 92 },
              { name: 'TypeScript', icon: '📘', level: 87 },
              { name: 'Vite', icon: '⚡', level: 93 }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center"
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{tech.name}</h3>
                <div className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
                <p className="text-sm text-slate-400 mt-2">{tech.level}%</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold mb-4">آماده تجربه هستید؟</h2>
            <p className="text-xl mb-8 opacity-90">وب‌سایت را به صورت آنلاین مشاهده کنید و طراحی را در عمل ببینید</p>
            {data.link ? (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                مشاهده آنلاین وب‌سایت
              </a>
            ) : (
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                تماس برای مشاهده پروژه
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WebDesignLayout;
