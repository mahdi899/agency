import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Globe } from 'lucide-react';
import api from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', logo: '', website: '', industry: '', is_active: true });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const response = await api.getClients();
      setClients(response.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.updateClient(editingItem.id, formData);
      } else {
        await api.createClient(formData);
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این مشتری مطمئن هستید؟')) return;
    try {
      await api.deleteClient(id);
      setClients(clients.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: '', logo: '', website: '', industry: '', is_active: true });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingItem(null); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">مشتریان</h1>
          <p className="text-dark-400">مدیریت لوگو و اطلاعات مشتریان</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">
          <Plus className="w-5 h-5" /> افزودن مشتری
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {clients.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
              className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center group">
              <div className="w-20 h-20 mx-auto mb-3 bg-white/5 rounded-xl flex items-center justify-center overflow-hidden">
                {item.logo ? <img src={item.logo} alt={item.name} className="w-full h-full object-contain p-2" /> : <Globe className="w-8 h-8 text-dark-400" />}
              </div>
              <h3 className="text-white font-medium mb-1">{item.name}</h3>
              <p className="text-dark-400 text-xs mb-3">{item.industry || 'بدون دسته‌بندی'}</p>
              <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openModal(item)} className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-dark-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">{editingItem ? 'ویرایش مشتری' : 'افزودن مشتری جدید'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-dark-300 text-sm mb-2">نام مشتری *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" required />
              </div>
              <ImageUpload
                value={formData.logo || ''}
                onChange={(url) => setFormData({...formData, logo: url})}
                folder="clients"
                label="لوگو مشتری"
              />
              <div>
                <label className="block text-dark-300 text-sm mb-2">وب‌سایت</label>
                <input type="url" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">صنعت</label>
                <input type="text" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 rounded" />
                <span className="text-white">فعال</span>
              </label>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">{editingItem ? 'بروزرسانی' : 'ایجاد'}</button>
                <button type="button" onClick={closeModal} className="px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors">انصراف</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Clients;
