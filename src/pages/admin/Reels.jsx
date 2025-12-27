import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, Heart, MessageCircle, Upload, X, Video } from 'lucide-react';
import api from '../../services/api';

const gradientOptions = [
  { value: 'from-rose-500 to-pink-600', label: 'صورتی' },
  { value: 'from-violet-500 to-purple-600', label: 'بنفش' },
  { value: 'from-blue-500 to-cyan-600', label: 'آبی' },
  { value: 'from-orange-500 to-amber-600', label: 'نارنجی' },
  { value: 'from-emerald-500 to-teal-600', label: 'سبز' },
  { value: 'from-red-500 to-rose-600', label: 'قرمز' },
];

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReel, setEditingReel] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    video_url: '',
    video_type: 'vertical',
    views: '0',
    likes: '0',
    comments: '0',
    gradient: 'from-rose-500 to-pink-600',
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const response = await api.getReels();
      if (response.success) {
        setReels(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching reels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReel) {
        await api.updateReel(editingReel.id, formData);
      } else {
        await api.createReel(formData);
      }
      fetchReels();
      closeModal();
    } catch (error) {
      console.error('Error saving reel:', error);
      alert('خطا در ذخیره ریلز');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این ریلز مطمئن هستید؟')) return;
    try {
      await api.deleteReel(id);
      fetchReels();
    } catch (error) {
      console.error('Error deleting reel:', error);
    }
  };

  const handleEdit = (reel) => {
    setEditingReel(reel);
    setFormData({
      title: reel.title || '',
      thumbnail: reel.thumbnail || '',
      video_url: reel.video_url || '',
      video_type: reel.video_type || 'vertical',
      views: reel.views || '0',
      likes: reel.likes || '0',
      comments: reel.comments || '0',
      gradient: reel.gradient || 'from-rose-500 to-pink-600',
      order: reel.order || 0,
      is_active: reel.is_active ?? true,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingReel(null);
    setFormData({
      title: '',
      thumbnail: '',
      video_url: '',
      video_type: 'vertical',
      views: '0',
      likes: '0',
      comments: '0',
      gradient: 'from-rose-500 to-pink-600',
      order: 0,
      is_active: true,
    });
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await api.uploadVideo(file, formData.video_type, 'videos');
      setFormData({ ...formData, video_url: response.path });
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('خطا در آپلود ویدیو');
    } finally {
      setUploading(false);
    }
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await api.uploadFile(file, 'reels/thumbnails');
      setFormData({ ...formData, thumbnail: response.path });
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      alert('خطا در آپلود تصویر');
    } finally {
      setUploading(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-white">مدیریت ریلز</h1>
          <p className="text-dark-400">مدیریت ویدیوهای ریلز و افقی</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          افزودن ریلز
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {reels.map((reel) => (
          <motion.div
            key={reel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className={`relative aspect-[9/16] bg-gradient-to-br ${reel.gradient}`}>
              {reel.thumbnail ? (
                <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="w-16 h-16 text-white/30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  reel.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {reel.is_active ? 'فعال' : 'غیرفعال'}
                </span>
              </div>

              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 rounded-full bg-pink-500/20 text-pink-400 text-xs font-medium">
                  {reel.video_type === 'vertical' ? 'ریلز' : 'افقی'}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold mb-2">{reel.title}</h3>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {reel.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {reel.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {reel.comments}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(reel)}
                className="p-2 rounded-lg bg-white/5 text-dark-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(reel.id)}
                className="p-2 rounded-lg bg-white/5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {reels.length === 0 && (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-dark-600 mx-auto mb-4" />
          <p className="text-dark-400">هنوز ریلزی اضافه نشده است</p>
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
                {editingReel ? 'ویرایش ریلز' : 'افزودن ریلز جدید'}
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
                <label className="block text-dark-300 text-sm mb-2">نوع ویدیو</label>
                <select
                  value={formData.video_type}
                  onChange={(e) => setFormData({ ...formData, video_type: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                >
                  <option value="vertical">ریلز (عمودی)</option>
                  <option value="horizontal">افقی</option>
                </select>
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">تصویر پیش‌نمایش</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-dark-300 hover:text-white cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    آپلود تصویر
                  </label>
                  {formData.thumbnail && (
                    <img src={formData.thumbnail} alt="thumbnail" className="w-12 h-12 rounded-lg object-cover" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">آپلود ویدیو</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-dark-300 hover:text-white cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    {uploading ? 'در حال آپلود...' : 'آپلود ویدیو'}
                  </label>
                  {formData.video_url && (
                    <span className="text-green-400 text-sm">ویدیو آپلود شد</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">یا لینک ویدیو</label>
                <input
                  type="text"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-dark-300 text-sm mb-2">رنگ پس‌زمینه</label>
                <select
                  value={formData.gradient}
                  onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                >
                  {gradientOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">بازدید</label>
                  <input
                    type="text"
                    value={formData.views}
                    onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">لایک</label>
                  <input
                    type="text"
                    value={formData.likes}
                    onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">کامنت</label>
                  <input
                    type="text"
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="is_active" className="text-dark-300">فعال</label>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  {editingReel ? 'بروزرسانی' : 'ذخیره'}
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

export default Reels;
