import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, Sparkles } from 'lucide-react';

const Newsletter = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setEmail('');
    
    setTimeout(() => setStatus('idle'), 3000);
  };

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل خود را وارد کنید"
            className="w-full pr-10 pl-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors text-sm"
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={status === 'loading' || status === 'success'}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium disabled:opacity-50"
        >
          {status === 'loading' ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : status === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </form>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden p-8 md:p-12 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border border-white/10"
    >
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          عضو خبرنامه شوید
        </h3>
        <p className="text-dark-300 mb-8">
          جدیدترین مقالات، نکات و ترندهای دیجیتال مارکتینگ را مستقیماً در ایمیل خود دریافت کنید.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید"
              className="w-full pr-12 pl-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
              disabled={status === 'loading' || status === 'success'}
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'loading' || status === 'success'}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium shadow-lg shadow-primary-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                در حال ثبت...
              </>
            ) : status === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5" />
                ثبت شد!
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                عضویت
              </>
            )}
          </motion.button>
        </form>

        <p className="text-dark-500 text-sm mt-4">
          با عضویت، با قوانین و مقررات ما موافقت می‌کنید.
        </p>
      </div>
    </motion.div>
  );
};

export default Newsletter;
