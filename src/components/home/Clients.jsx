import { motion } from 'framer-motion';
import { SectionTitle } from '../ui';

const clients = [
  { name: 'کافه لمیز', logo: '☕' },
  { name: 'کلینیک رز', logo: '🌹' },
  { name: 'فروشگاه آریا', logo: '👗' },
  { name: 'نمایشگاه پرشیا', logo: '🚗' },
  { name: 'دیجی‌استایل', logo: '🛍️' },
  { name: 'رستوران ویوا', logo: '🍝' },
  { name: 'استارتاپ تک', logo: '💡' },
  { name: 'برند نوین', logo: '✨' },
];

const Clients = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container-custom mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-dark-500 mb-8"
        >
          برندهایی که به ما اعتماد کرده‌اند
        </motion.p>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-950 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-950 to-transparent z-10" />
          
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="flex gap-12"
          >
            {[...clients, ...clients].map((client, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/5 whitespace-nowrap"
              >
                <span className="text-2xl">{client.logo}</span>
                <span className="text-dark-300 font-medium">{client.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
