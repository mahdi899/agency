import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Star, Quote } from 'lucide-react';

const VideoTestimonial = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10 group cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
        <div className="relative aspect-[9/16] max-h-[400px] overflow-hidden">
          <img
            src={testimonial.thumbnail}
            alt={testimonial.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Play className="w-6 h-6 text-white mr-[-2px]" fill="white" />
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <h4 className="text-white font-bold">{testimonial.name}</h4>
            <p className="text-dark-400 text-sm">{testimonial.role}</p>
            <p className="text-primary-400 text-xs mt-1">{testimonial.company}</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/95 backdrop-blur-xl p-4"
            onClick={() => setIsPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="aspect-[9/16] rounded-2xl overflow-hidden bg-dark-900">
                <video
                  src={testimonial.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  poster={testimonial.thumbnail}
                />
              </div>
              
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <Quote className="w-8 h-8 text-primary-500/50 mb-2" />
                <p className="text-dark-300 text-sm mb-3">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-white font-medium">{testimonial.name}</h5>
                    <p className="text-dark-400 text-xs">{testimonial.role} - {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoTestimonial;
