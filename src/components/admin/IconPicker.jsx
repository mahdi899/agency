import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const popularIcons = [
  'Video', 'Globe', 'Target', 'Search', 'Palette', 'Share2', 'Heart', 'ShoppingCart',
  'GraduationCap', 'Plane', 'UtensilsCrossed', 'Building2', 'Briefcase', 'Camera',
  'Code', 'Database', 'FileText', 'Image', 'Mail', 'MessageSquare', 'Phone', 'Settings',
  'Star', 'Users', 'Zap', 'Award', 'BarChart', 'Bell', 'Bookmark', 'Calendar',
  'Check', 'Clock', 'Cloud', 'Coffee', 'Compass', 'CreditCard', 'Download', 'Edit',
  'Eye', 'Filter', 'Flag', 'Folder', 'Gift', 'Grid', 'Headphones', 'Home', 'Info',
  'Key', 'Layers', 'Layout', 'Link', 'List', 'Lock', 'Map', 'Menu', 'Mic', 'Monitor',
  'Moon', 'Music', 'Package', 'Paperclip', 'Percent', 'PieChart', 'Play', 'Plus',
  'Power', 'Printer', 'Radio', 'RefreshCw', 'Rocket', 'Save', 'Send', 'Server',
  'Shield', 'Smartphone', 'Speaker', 'Sun', 'Tag', 'Terminal', 'ThumbsUp', 'Tool',
  'Trash', 'TrendingUp', 'Truck', 'Tv', 'Twitter', 'Umbrella', 'Upload', 'User',
  'Volume2', 'Wifi', 'Wind', 'Youtube', 'Instagram', 'Facebook', 'Linkedin'
];

const IconPicker = ({ value, onChange, label = 'آیکون' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIcons = searchTerm
    ? popularIcons.filter(icon => icon.toLowerCase().includes(searchTerm.toLowerCase()))
    : popularIcons;

  const SelectedIcon = value && LucideIcons[value] ? LucideIcons[value] : null;

  const handleSelect = (iconName) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div>
      <label className="block text-dark-300 text-sm mb-2">{label}</label>
      
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-3 bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white hover:border-primary-500/50 transition-colors"
      >
        {SelectedIcon ? (
          <>
            <SelectedIcon className="w-5 h-5 text-primary-400" />
            <span>{value}</span>
          </>
        ) : (
          <span className="text-dark-400">انتخاب آیکون...</span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl max-h-[80vh] bg-dark-900 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">انتخاب آیکون</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-dark-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 border-b border-white/10">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="جستجوی آیکون..."
                    className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 pr-10 pl-4 text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="p-4 overflow-y-auto max-h-[50vh]">
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {filteredIcons.map((iconName) => {
                    const Icon = LucideIcons[iconName];
                    if (!Icon) return null;
                    
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => handleSelect(iconName)}
                        className={`p-3 rounded-xl flex items-center justify-center transition-colors ${
                          value === iconName
                            ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                            : 'bg-white/5 text-dark-300 hover:bg-white/10 hover:text-white border border-transparent'
                        }`}
                        title={iconName}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    );
                  })}
                </div>
                
                {filteredIcons.length === 0 && (
                  <p className="text-center text-dark-400 py-8">آیکونی یافت نشد</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IconPicker;
