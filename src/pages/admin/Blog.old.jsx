import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Calendar, Star, Clock } from 'lucide-react';
import api from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';
import RichTextEditor from '../../components/admin/RichTextEditor';

const Blog = () => {
  console.log('Blog component mounted/updated');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const forceUpdateRef = useRef(0);
    const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', thumbnail: '',
    category: '', tags: '', author: '', author_avatar: '', read_time: 5,
    is_published: true, is_featured: false
  });

  useEffect(() => { 
    console.log('useEffect triggered - fetching initial data');
    fetchData(); 
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.getBlogPosts();
      console.log('Fetched from server:', response.data);
      setPosts(response.data || []);
      // Force re-render
      forceUpdateRef.current += 1;
      console.log('Force update triggered:', forceUpdateRef.current);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    try {
      const data = { 
        ...formData, 
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        read_time: parseInt(formData.read_time) || 5
      };
      
      // Remove slug and id from data for updates (only include for new items)
      if (editingItem) {
        delete data.slug;
        delete data.id;
        delete data.user_id;
        delete data.created_at;
        delete data.updated_at;
        delete data.published_at;
        delete data.views;
      } else {
        // Generate slug for new items
        data.slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      }
      
      if (editingItem) {
        console.log('Updating item:', editingItem.id);
        const response = await api.updateBlogPost(editingItem.id, data);
        console.log('Update successful');
        // Update the item in the list directly
        const updatedPosts = posts.map(post => 
          post.id === editingItem.id ? { ...post, ...response.data } : post
        );
        console.log('Fetching fresh data from server after update');
        // Fetch fresh data from server
        await fetchData();
        console.log('Fresh data fetched from server');
      } else {
        const response = await api.createBlogPost(data);
        setPosts([response.data, ...posts]);
      }
      closeModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این مقاله مطمئن هستید؟')) return;
    try {
      await api.deleteBlogPost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ 
        ...item, 
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
        read_time: item.read_time || 5
      });
    } else {
      setEditingItem(null);
      setFormData({ title: '', slug: '', excerpt: '', content: '', thumbnail: '', category: '', tags: '', author: '', author_avatar: '', read_time: 5, is_published: true, is_featured: false });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingItem(null); };

  console.log('Rendering ADMIN Blog, posts length:', posts.length, 'force update:', forceUpdateRef.current);
  console.log('Current URL:', window.location.href);
  console.log('Posts data:', posts);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">مقالات بلاگ</h1>
          <p className="text-dark-400">مدیریت مقالات و محتوا</p>
        </div>
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors">
          <Plus className="w-5 h-5" /> افزودن مقاله
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
              className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover" />}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-dark-400 mb-2">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.created_at).toLocaleDateString('fa-IR')}
                  <span className={`px-2 py-0.5 rounded ${item.is_published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {item.is_published ? 'منتشر شده' : 'پیش‌نویس'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-dark-400 text-sm line-clamp-2 mb-4">{item.excerpt}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => openModal(item)} className="flex-1 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-1">
                    <Edit className="w-4 h-4" /> ویرایش
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-900 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">{editingItem ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-dark-300 text-sm mb-2">عنوان *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" required />
                {!editingItem && (
                  <p className="text-dark-500 text-xs mt-1">اسلاگ به صورت خودکار از عنوان تولید می‌شود</p>
                )}
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">خلاصه</label>
                <textarea value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} rows={2} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
              </div>
              <RichTextEditor
                value={formData.content || ''}
                onChange={(content) => setFormData({...formData, content})}
                label="محتوای مقاله *"
              />
              <ImageUpload
                value={formData.thumbnail || ''}
                onChange={(url) => setFormData({...formData, thumbnail: url})}
                folder="blog"
                label="تصویر شاخص"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">دسته‌بندی</label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500">
                    <option value="">انتخاب کنید...</option>
                    <option value="social-media">سوشال مدیا</option>
                    <option value="content">تولید محتوا</option>
                    <option value="marketing">بازاریابی</option>
                    <option value="seo">سئو</option>
                    <option value="branding">برندینگ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">زمان مطالعه (دقیقه)</label>
                  <input type="number" value={formData.read_time || 5} onChange={(e) => setFormData({...formData, read_time: parseInt(e.target.value) || 5})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-dark-300 text-sm mb-2">نام نویسنده</label>
                  <input type="text" value={formData.author || ''} onChange={(e) => setFormData({...formData, author: e.target.value})} placeholder="تیم محتوا" className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
                </div>
                <div>
                  <label className="block text-dark-300 text-sm mb-2">آواتار نویسنده (URL)</label>
                  <input type="text" value={formData.author_avatar || ''} onChange={(e) => setFormData({...formData, author_avatar: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-dark-300 text-sm mb-2">برچسب‌ها (با کاما جدا کنید)</label>
                <input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" placeholder="سئو, دیجیتال مارکتینگ" />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({...formData, is_published: e.target.checked})} className="w-5 h-5 rounded" />
                  <span className="text-white">منتشر شود</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({...formData, is_featured: e.target.checked})} className="w-5 h-5 rounded" />
                  <span className="text-white">مقاله ویژه</span>
                </label>
              </div>
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

export default Blog;
