import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import { awards, certifications } from '../data/awards';
import { SectionTitle, ScrollReveal } from '../components/ui';

const AwardCard = ({ award, index }) => {
  const IconComponent = award.icon;
  
  return (
    <ScrollReveal delay={index * 0.1} variant="fadeUp">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 group"
      >
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={award.image}
            alt={award.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
          
          <div className={`absolute top-4 right-4 w-14 h-14 rounded-xl bg-gradient-to-r ${award.color} flex items-center justify-center shadow-lg`}>
            <IconComponent className="w-7 h-7 text-white" />
          </div>
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl text-white text-sm font-medium">
              {award.year}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {award.title}
          </h3>
          <p className="text-primary-400 text-sm mb-3">{award.organization}</p>
          <p className="text-dark-400 text-sm">{award.description}</p>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

const CertificationCard = ({ cert, index }) => {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h4 className="text-white font-bold mb-2">{cert.title}</h4>
        <p className="text-dark-400 text-sm">{cert.description}</p>
      </motion.div>
    </ScrollReveal>
  );
};

const Awards = () => {
  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(234,179,8,0.1) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container-custom mx-auto relative">
          <ScrollReveal>
            <SectionTitle
              subtitle="افتخارات و جوایز"
              title="دستاوردهای ما در مسیر موفقیت"
              description="جوایز و گواهی‌نامه‌هایی که نشان‌دهنده کیفیت کار ماست"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {awards.map((award, index) => (
              <AwardCard key={award.id} award={award} index={index} />
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">گواهی‌نامه‌ها و مجوزها</h3>
              <p className="text-dark-400">شریک رسمی بزرگترین پلتفرم‌های تبلیغاتی جهان</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>

          <ScrollReveal>
            <motion.div
              className="relative rounded-2xl overflow-hidden p-12 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(234,179,8,0.1) 0%, rgba(249,115,22,0.1) 100%)',
              }}
            >
              <div className="absolute inset-0 border border-yellow-500/20 rounded-2xl" />
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-10"
              >
                <Award className="w-full h-full text-yellow-500" />
              </motion.div>
              
              <div className="relative z-10">
                <div className="flex justify-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Award className="w-8 h-8 text-yellow-500" />
                    </motion.div>
                  ))}
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">
                  ۱۲ جایزه در ۵ سال
                </h3>
                <p className="text-dark-300 max-w-2xl mx-auto mb-8">
                  افتخار می‌کنیم که در طول ۵ سال فعالیت، ۱۲ جایزه معتبر در حوزه دیجیتال مارکتینگ 
                  و تولید محتوا کسب کرده‌ایم.
                </p>
                
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-black text-yellow-500">۱۲</div>
                    <div className="text-dark-400 text-sm">جایزه</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-yellow-500">۵</div>
                    <div className="text-dark-400 text-sm">سال</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-yellow-500">۳</div>
                    <div className="text-dark-400 text-sm">گواهی‌نامه</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Awards;
