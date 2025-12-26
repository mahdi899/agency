import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqItems } from '../data/faq';
import { SectionTitle, Card } from '../components/ui';

const FAQItem = ({ item, isOpen, onClick }) => {
  return (
    <Card className="overflow-hidden">
      <button
        onClick={onClick}
        className="w-full p-6 flex items-center justify-between text-right"
      >
        <span className="text-lg font-medium text-white pr-4">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-primary-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-dark-400 leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState(1);

  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-500/10 to-transparent rounded-full" />
        </div>

        <div className="container-custom mx-auto relative">
          <SectionTitle
            subtitle="سوالات متداول"
            title="پاسخ سوالات شما"
            description="پاسخ سوالات رایج درباره خدمات و همکاری با ما"
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <FAQItem
                  item={item}
                  isOpen={openId === item.id}
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Card className="p-8 max-w-2xl mx-auto">
              <HelpCircle className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                سوال دیگری دارید؟
              </h3>
              <p className="text-dark-400 mb-4">
                اگر پاسخ سوال خود را پیدا نکردید، با ما تماس بگیرید.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium"
              >
                تماس با ما
              </a>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
