import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Upload, LayoutGrid } from 'lucide-react';
import api from '../../services/api';

const sectionOptions = [
  { value: 'features', label: 'ویژگی‌ها' },
  { value: 'stats', label: 'آمار' },
  { value: 'process', label: 'فرآیند' },
];

const colorOptions = [
  { value: 'from-primary-500 to-secondary-500', label: 'نارنجی-بنفش' },
  { value: 'from-blue-500 to-cyan-500', label: 'آبی' },
  { value: 'from-green-500 to-emerald-500', label: 'سبز' },
  { value: 'from-purple-500 to-pink-500', label: 'بنفش-صورتی' },
  { value: 'from-red-500 to-orange-500', label: 'قرمز-نارنجی' },
  { value: 'from-yellow-500 to-amber-500', label: 'زرد' },
];

const HomeCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [activeSection, setActiveSection] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    icon: '',
    color: 'from-primary-500 to-secondary-500',
    link: '',
    section: 'features',
    value: '',
    suffix: '',
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await api.getHomeCards();
      if (response.success) {
        setCards(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCard) {
        await api.updateHomeCard(editingCard.id, formData);
      } else {
        await api.createHomeCard(formData);
      }
      fetchCards();
      closeModal();
    } catch (error) {
      console.error('Error saving card:', error);
      alert('خطا در ذخیره کارت');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این کارت مطمئن هستید؟')) return;
    try {
      await api.deleteHomeCard(id);
      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      title: card.title || '',
      description: card.description || '',
      image: card.image || '',
      icon: card.icon || '',
      color: card.color || 'from-primary-500 to-secondary-500',
      link: card.link || '',
      section: card.section || 'features',
      value: card.value || '',
      suffix: card.suffix || '',
      order: card.order || 0,
      is_active: card.is_active ?? true,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCard(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      icon: '',
      color: 'from-primary-500 to-secondary-500',
      link: '',
      section: 'features',
      value: '',
      suffix: '',
      order: 0,
      is_active: true,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const response = await api.uploadFile(file, 'home-cards');
      setFormData({ ...formData, image: response.path });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('خطا در آپلود تصویر');
    }
  };

  const filteredCards = activeSection === 'all' 
    ? cards 
    : cards.filter(c => c.section === activeSection);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">مدیریت کارت‌های صفحه اصلی</h1>
          <p className="text-dark-400">مدیریت ویژگی‌ها، آمار و فرآیندها</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          افزودن کارت
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveSection('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeSection === 'all'
              ? 'bg-primary-500 text-white'
              : 'bg-white/5 text-dark-300 hover:bg-white/10'
          }`}
        >
          همه
        </button>
        {sectionOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveSection(opt.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeSection === opt.value
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-dark-300 hover:bg-white/10'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className={`h-32 bg-gradient-to-r ${card.color} flex items-center justify-center`}>
              {card.image ? (
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              ) : card.value ? (
                <div className="text-center">
                  <div className="text-4xl font-black text-white">{card.value}{card.suffix}</div>
                </div>
              ) : (
                <LayoutGrid className="w-12 h-12 text-white/50" />
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-white font-bold">{card.title}</h3>
                  <span className="text-xs text-dark-500">
                    {sectionOptions.find(s => s.value === card.section)?.label || card.section}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  card.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {card.is_active ? 'فعال' : 'غیرفعال'}
                </span>
              </div>
              
              {card.description && (
                <p className="text-dark-400 text-sm line-clamp-2 mb-3">{card.description}</p>
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEdit(card)}
                  className="p-2 rounded-lg bg-white/5 text-dark-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="p-2 rounded-lg bg-white/5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <LayoutGrid className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">کارتی در این بخش وجود ندارد</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-900 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editingCard ? 'ویرایش کارت' : 'افزودن کارت جدید'}
              </h2>
              <button onClick={closeModal} className="text-dark-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-dark-300 text-sm mb-2">عنوان</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">بخش</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                >
                  {sectionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">توضیحات</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              {formData.section === 'stats' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">مقدار</label>
                    <input
                      type="text"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                      placeholder="مثلاً: 150"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">پسوند</label>
                    <input
                      type="text"
                      value={formData.suffix}
                      onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                      placeholder="مثلاً: + یا %"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-dark-300 text-sm mb-2">تصویر</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="card-image-upload"
                  />
                  <label
                    htmlFor="card-image-upload"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-dark-300 hover:text-white cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    آپلود تصویر
                  </label>
                  {formData.image && (
                    <img src={formData.image} alt="preview" className="w-12 h-12 rounded-lg object-cover" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">رنگ</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                >
                  {colorOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">آیکون (نام آیکون Lucide)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  placeholder="مثلاً: Rocket, Star, Award"
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">لینک</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  placeholder="/services"
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">ترتیب</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="card_is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="card_is_active" className="text-dark-300">فعال</label>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  {editingCard ? 'بروزرسانی' : 'ذخیره'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-white/5 text-dark-300 rounded-xl hover:bg-white/10 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HomeCards;
