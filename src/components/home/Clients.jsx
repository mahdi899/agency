import { motion } from 'framer-motion';
import { Coffee, Stethoscope, ShoppingBag, Car, Shirt, UtensilsCrossed, Lightbulb, Sparkles, Building2, Dumbbell, GraduationCap, Plane } from 'lucide-react';

const clients = [
  { 
    name: 'کافه لمیز', 
    icon: Coffee,
    logo: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=100&h=100&fit=crop&q=80',
    color: 'from-amber-500 to-orange-500'
  },
  { 
    name: 'کلینیک رز', 
    icon: Stethoscope,
    logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop&q=80',
    color: 'from-pink-500 to-rose-500'
  },
  { 
    name: 'فروشگاه آریا', 
    icon: ShoppingBag,
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&q=80',
    color: 'from-purple-500 to-violet-500'
  },
  { 
    name: 'نمایشگاه پرشیا', 
    icon: Car,
    logo: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=100&h=100&fit=crop&q=80',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    name: 'بوتیک استایل', 
    icon: Shirt,
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&q=80',
    color: 'from-fuchsia-500 to-pink-500'
  },
  { 
    name: 'رستوران ویوا', 
    icon: UtensilsCrossed,
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop&q=80',
    color: 'from-red-500 to-orange-500'
  },
  { 
    name: 'استارتاپ تک', 
    icon: Lightbulb,
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop&q=80',
    color: 'from-yellow-500 to-amber-500'
  },
  { 
    name: 'برند نوین', 
    icon: Sparkles,
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&q=80',
    color: 'from-emerald-500 to-teal-500'
  },
  { 
    name: 'هلدینگ آسمان', 
    icon: Building2,
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop&q=80',
    color: 'from-slate-500 to-gray-500'
  },
  { 
    name: 'باشگاه فیت', 
    icon: Dumbbell,
    logo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop&q=80',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    name: 'آموزشگاه نخبگان', 
    icon: GraduationCap,
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop&q=80',
    color: 'from-indigo-500 to-blue-500'
  },
  { 
    name: 'آژانس سفر', 
    icon: Plane,
    logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop&q=80',
    color: 'from-sky-500 to-blue-500'
  },
];

const ClientCard = ({ client, index }) => {
  const IconComponent = client.icon;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/10 whitespace-nowrap backdrop-blur-sm group cursor-pointer"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${client.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      <div>
        <span className="text-white font-medium block">{client.name}</span>
        <span className="text-dark-500 text-xs">مشتری فعال</span>
      </div>
    </motion.div>
  );
};

const Clients = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
            مشتریان ما
          </span>
          <h3 className="text-2xl font-bold text-white mb-2">برندهایی که به ما اعتماد کرده‌اند</h3>
          <p className="text-dark-400">بیش از ۵۰ برند معتبر در صنایع مختلف</p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />
          
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 mb-6"
          >
            {[...clients, ...clients].map((client, index) => (
              <ClientCard key={index} client={client} index={index} />
            ))}
          </motion.div>
          
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6"
          >
            {[...clients.slice().reverse(), ...clients.slice().reverse()].map((client, index) => (
              <ClientCard key={index} client={client} index={index} />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 mt-12 pt-8 border-t border-white/5"
        >
          <div className="text-center">
            <div className="text-3xl font-black text-white">۵۰+</div>
            <div className="text-dark-400 text-sm">مشتری فعال</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white">۱۵+</div>
            <div className="text-dark-400 text-sm">صنعت مختلف</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-white">۹۸%</div>
            <div className="text-dark-400 text-sm">رضایت مشتری</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
