import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, ArrowLeft } from 'lucide-react';

const timelineSteps = [
  {
    id: 1,
    title: 'مشاوره اولیه',
    description: 'بررسی نیازها و اهداف شما',
    duration: '۱ روز',
    status: 'completed',
  },
  {
    id: 2,
    title: 'تحلیل و استراتژی',
    description: 'تحلیل رقبا و تدوین استراتژی',
    duration: '۳-۵ روز',
    status: 'completed',
  },
  {
    id: 3,
    title: 'طراحی و برنامه‌ریزی',
    description: 'طراحی محتوا و تقویم انتشار',
    duration: '۵-۷ روز',
    status: 'current',
  },
  {
    id: 4,
    title: 'تولید محتوا',
    description: 'فیلمبرداری، عکاسی و تدوین',
    duration: '۷-۱۴ روز',
    status: 'pending',
  },
  {
    id: 5,
    title: 'انتشار و مدیریت',
    description: 'انتشار محتوا و مدیریت پیج',
    duration: 'مداوم',
    status: 'pending',
  },
  {
    id: 6,
    title: 'گزارش‌دهی',
    description: 'ارائه گزارش عملکرد و بهینه‌سازی',
    duration: 'ماهانه',
    status: 'pending',
  },
];

const ProjectTimeline = ({ steps = timelineSteps, variant = 'vertical' }) => {
  if (variant === 'horizontal') {
    return (
      <div className="relative">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10" />
        
        <div className="flex justify-between relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center w-full"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                  step.status === 'completed'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                    : step.status === 'current'
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse'
                    : 'bg-dark-800 border-2 border-white/20'
                }`}
              >
                {step.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : step.status === 'current' ? (
                  <Clock className="w-6 h-6 text-white" />
                ) : (
                  <Circle className="w-6 h-6 text-dark-500" />
                )}
              </div>
              
              <h4 className="text-white font-medium mt-4 text-sm">{step.title}</h4>
              <p className="text-dark-500 text-xs mt-1">{step.duration}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 right-6 w-0.5 bg-white/10" />
      
      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-6"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                step.status === 'completed'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                  : step.status === 'current'
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse'
                  : 'bg-dark-800 border-2 border-white/20'
              }`}
            >
              {step.status === 'completed' ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : step.status === 'current' ? (
                <Clock className="w-6 h-6 text-white" />
              ) : (
                <span className="text-dark-500 font-bold">{step.id}</span>
              )}
            </div>
            
            <div className={`flex-1 p-5 rounded-xl ${
              step.status === 'current' 
                ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20' 
                : 'bg-white/[0.03] border border-white/10'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-bold ${step.status === 'current' ? 'text-primary-400' : 'text-white'}`}>
                  {step.title}
                </h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  step.status === 'completed'
                    ? 'bg-green-500/20 text-green-400'
                    : step.status === 'current'
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'bg-white/5 text-dark-500'
                }`}>
                  {step.duration}
                </span>
              </div>
              <p className="text-dark-400 text-sm">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;
