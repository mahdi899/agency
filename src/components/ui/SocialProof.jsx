import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ShoppingBag, Star, TrendingUp, Clock, MapPin } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'purchase',
    icon: ShoppingBag,
    title: 'سفارش جدید',
    message: 'کافه لمیز پکیج حرفه‌ای را خریداری کرد',
    time: '۲ دقیقه پیش',
    location: 'تهران',
  },
  {
    id: 2,
    type: 'review',
    icon: Star,
    title: 'نظر جدید',
    message: 'علی محمدی امتیاز ۵ ستاره داد',
    time: '۵ دقیقه پیش',
    location: 'اصفهان',
  },
  {
    id: 3,
    type: 'signup',
    icon: Users,
    title: 'عضویت جدید',
    message: 'یک کسب‌وکار جدید ثبت‌نام کرد',
    time: '۸ دقیقه پیش',
    location: 'مشهد',
  },
  {
    id: 4,
    type: 'growth',
    icon: TrendingUp,
    title: 'رشد فالوور',
    message: 'بوتیک رز به ۱۰۰K فالوور رسید',
    time: '۱۵ دقیقه پیش',
    location: 'تهران',
  },
];

const SocialProofPopup = () => {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setCurrentNotification(notifications[randomIndex]);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    const initialDelay = setTimeout(showNotification, 3000);
    
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  if (!currentNotification) return null;

  const IconComponent = currentNotification.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-24 left-6 z-30 max-w-xs sm:max-w-sm"
        >
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{currentNotification.title}</p>
                <p className="text-dark-300 text-xs mt-0.5">{currentNotification.message}</p>
                <div className="flex items-center gap-3 mt-2 text-dark-500 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentNotification.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {currentNotification.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LiveVisitors = () => {
  const [visitors, setVisitors] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitors(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <span className="text-green-400 text-sm font-medium">
        {visitors} نفر آنلاین
      </span>
    </motion.div>
  );
};

const TrustBadges = () => {
  const badges = [
    { icon: Star, label: '۹۸% رضایت', color: 'from-yellow-500 to-amber-500' },
    { icon: Users, label: '۵۰+ مشتری', color: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, label: '۵۰M+ ویو', color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
        >
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${badge.color} flex items-center justify-center`}>
            <badge.icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-white text-sm font-medium">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export { SocialProofPopup, LiveVisitors, TrustBadges };
export default SocialProofPopup;
