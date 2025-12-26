import { motion } from 'framer-motion';
import { ExternalLink, Handshake, Building2 } from 'lucide-react';
import { partners, mediaPartners } from '../data/partners';
import { SectionTitle, ScrollReveal } from '../components/ui';

const PartnerCard = ({ partner, index }) => {
  return (
    <ScrollReveal delay={index * 0.1} variant="fadeUp">
      <motion.a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -8, scale: 1.02 }}
        className="block relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 p-6 group cursor-pointer"
      >
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-5 h-5 text-primary-400" />
        </div>
        
        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${partner.color} p-0.5`}>
          <div className="w-full h-full rounded-2xl bg-dark-900 flex items-center justify-center overflow-hidden">
            <Building2 className="w-10 h-10 text-white/50" />
          </div>
        </div>
        
        <div className="text-center">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-primary-400 bg-primary-500/10 rounded-full">
            {partner.type}
          </span>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {partner.name}
          </h3>
          <p className="text-dark-400 text-sm">{partner.description}</p>
        </div>
      </motion.a>
    </ScrollReveal>
  );
};

const MediaPartnerCard = ({ partner, index }) => {
  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-dark-400" />
        </div>
        <h4 className="text-white font-bold mb-1">{partner.name}</h4>
        <p className="text-dark-500 text-xs">{partner.type}</p>
      </motion.div>
    </ScrollReveal>
  );
};

const Partners = () => {
  return (
    <div className="pt-24">
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container-custom mx-auto relative">
          <ScrollReveal>
            <SectionTitle
              subtitle="همکاران ما"
              title="شرکای استراتژیک ما"
              description="همکاری با بهترین‌ها برای ارائه بهترین خدمات"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {partners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">شرکای رسانه‌ای</h3>
              <p className="text-dark-400">رسانه‌هایی که با ما همکاری می‌کنند</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {mediaPartners.map((partner, index) => (
              <MediaPartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </div>

          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden p-12 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-white/10">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <Handshake className="w-full h-full text-cyan-500" />
              </motion.div>
              
              <div className="relative z-10 text-center">
                <Handshake className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  می‌خواهید با ما همکاری کنید؟
                </h3>
                <p className="text-dark-300 max-w-2xl mx-auto mb-8">
                  اگر علاقه‌مند به همکاری استراتژیک با ما هستید، با ما تماس بگیرید.
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-lg shadow-cyan-500/25"
                >
                  تماس با ما
                </motion.a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Partners;
