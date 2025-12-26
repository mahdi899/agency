import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Smile, Paperclip, Phone, Clock } from 'lucide-react';

const quickReplies = [
  'سلام، می‌خوام مشاوره بگیرم',
  'قیمت خدمات چقدره؟',
  'چطور شروع کنم؟',
  'نمونه کار دارید؟',
];

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'سلام! 👋 به آژانس خلاق خوش آمدید. چطور می‌تونم کمکتون کنم؟',
      time: 'الان',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: message,
      time: 'الان',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: 'bot',
          text: 'ممنون از پیامتون! همکاران ما به زودی پاسخ می‌دن. برای پاسخ سریع‌تر می‌تونید با شماره ۰۲۱-۱۲۳۴۵۶۷۸ تماس بگیرید.',
          time: 'الان',
        },
      ]);
    }, 1500);
  };

  const handleQuickReply = (reply) => {
    setMessage(reply);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-dark-950" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-2xl overflow-hidden bg-dark-900 border border-white/10 shadow-2xl"
          >
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">پشتیبانی آنلاین</h4>
                    <div className="flex items-center gap-1 text-white/80 text-xs">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      آنلاین - پاسخ در کمتر از ۵ دقیقه
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-[300px] overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-br-sm'
                        : 'bg-white/10 text-dark-200 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-white/70' : 'text-dark-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-end"
                >
                  <div className="bg-white/10 p-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-3 border-t border-white/10">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 rounded-full bg-white/5 text-dark-300 text-xs hover:bg-white/10 transition-colors border border-white/10"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="پیام خود را بنویسید..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors text-sm"
                  />
                </div>
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <div className="p-3 bg-white/5 border-t border-white/10 flex items-center justify-center gap-4">
              <a href="tel:+982112345678" className="flex items-center gap-2 text-dark-400 text-xs hover:text-primary-400 transition-colors">
                <Phone className="w-4 h-4" />
                ۰۲۱-۱۲۳۴۵۶۷۸
              </a>
              <span className="text-dark-600">|</span>
              <div className="flex items-center gap-2 text-dark-400 text-xs">
                <Clock className="w-4 h-4" />
                ۹ صبح تا ۶ عصر
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;
