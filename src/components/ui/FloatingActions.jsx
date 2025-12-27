import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Phone, MessageCircle, Instagram, Send, Calendar } from 'lucide-react';

const actions = [
  {
    id: 'phone',
    icon: Phone,
    label: 'تماس',
    href: 'tel:+982112345678',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'واتساپ',
    href: 'https://wa.me/989123456789',
    color: 'from-green-400 to-green-600',
  },
  {
    id: 'telegram',
    icon: Send,
    label: 'تلگرام',
    href: 'https://t.me/agency',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 'instagram',
    icon: Instagram,
    label: 'اینستاگرام',
    href: 'https://instagram.com/agency',
    color: 'from-pink-500 to-purple-500',
  },
  {
    id: 'booking',
    icon: Calendar,
    label: 'رزرو مشاوره',
    href: '/start',
    color: 'from-primary-500 to-secondary-500',
  },
];

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 lg:left-24">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 left-0 flex flex-col gap-3 items-start"
          >
            {actions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.a
                  key={action.id}
                  href={action.href}
                  target={action.href.startsWith('http') ? '_blank' : undefined}
                  rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                >
                  <span className="px-3 py-1.5 rounded-lg bg-dark-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {action.label}
                  </span>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingActions;
