import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Calendar, Star, Clock, Eye, Search, Filter, ChevronDown, Settings, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';
import ImageUpload from '../../components/admin/ImageUpload';
import TipTapEditor from '../../components/admin/TipTapEditor';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    thumbnail: '',
    featured_image_alt: '',
    featured_image_caption: '',
    category: '',
    category_id: null,
    tags: '',
    author: '',
    author_avatar: '',
    read_time: 5,
    is_published: true,
    is_featured: false,
    allow_comments: true,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    canonical_url: '',
    og_title: '',
    og_description: '',
    og_image: '',
    status: 'draft',
    scheduled_at: '',
  });

  useEffect(() => { 
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setPosts([]);
        setLoading(false);
        return;
      }
      
      const response = await api.getBlogPosts();
      setPosts(response.data || []);
    } catch (error) {
      // If unauthorized, clear token and redirect to login
      if (error.message === 'Unauthenticated' || error.message.includes('401')) {
        localStorage.removeItem('auth_token');
        window.location.href = '/admin/login';
        return;
      }
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.request('/blog/categories');
      if (response.success) {
        setCategories(response.data || []);
      }
    } catch (error) {
      // Error handled silently
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { 
        ...formData, 
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        read_time: parseInt(formData.read_time) || 5
      };
      
      if (editingItem) {
        delete data.slug;
        delete data.id;
        delete data.user_id;
        delete data.created_at;
        delete data.updated_at;
        delete data.published_at;
        delete data.views;
        delete data.likes;
        delete data.shares;
        
        await api.updateBlogPost(editingItem.id, data);
        await fetchData();
      } else {
        data.slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
        const response = await api.createBlogPost(data);
        setPosts([response.data, ...posts]);
      }
      closeModal();
    } catch (error) {
      alert('خطا در ذخیره مقاله');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این مقاله مطمئن هستید؟')) return;
    try {
      await api.deleteBlogPost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      // Error handled silently
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ 
        ...item, 
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
        read_time: item.read_time || 5,
        meta_title: item.meta_title || '',
        meta_description: item.meta_description || '',
        meta_keywords: item.meta_keywords || '',
        canonical_url: item.canonical_url || '',
        og_title: item.og_title || '',
        og_description: item.og_description || '',
        og_image: item.og_image || '',
        featured_image_alt: item.featured_image_alt || '',
        featured_image_caption: item.featured_image_caption || '',
        status: item.status || 'draft',
        scheduled_at: item.scheduled_at || '',
        allow_comments: item.allow_comments !== false,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '', slug: '', excerpt: '', content: '', thumbnail: '',
        featured_image_alt: '', featured_image_caption: '',
        category: '', category_id: null, tags: '', author: '', author_avatar: '',
        read_time: 5, is_published: true, is_featured: false, allow_comments: true,
        meta_title: '', meta_description: '', meta_keywords: '', canonical_url: '',
        og_title: '', og_description: '', og_image: '', status: 'draft', scheduled_at: ''
      });
    }
    setActiveTab('content');
    setShowModal(true);
  };

  const closeModal = () => { 
    setShowModal(false); 
    setEditingItem(null); 
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (post) => {
    if (post.is_published) {
      return <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs">منتشر شده</span>;
    }
    if (post.status === 'scheduled') {
      return <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs">زمان‌بندی شده</span>;
    }
    return <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-xs">پیش‌نویس</span>;
  };

  const token = localStorage.getItem('auth_token');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">مقالات بلاگ</h1>
          <p className="text-dark-400">مدیریت مقالات و محتوا</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-5 h-5" /> افزودن مقاله
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در مقالات..."
              className="w-full bg-dark-800 border border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-white focus:outline-none focus:border-primary-500"
            />
          </div>
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-dark-800 border border-white/10 rounded-xl py-2.5 px-4 text-white focus:outline-none focus:border-primary-500"
        >
          <option value="">همه دسته‌ها</option>
          <option value="social-media">سوشال مدیا</option>
          <option value="content">تولید محتوا</option>
          <option value="marketing">بازاریابی</option>
          <option value="seo">سئو</option>
          <option value="branding">برندینگ</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : !token ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">احراز هویت لازم است</h1>
            <p className="text-dark-400 mb-6">برای دسترسی به مدیریت بلاگ، باید وارد شوید.</p>
            <a
              href="/admin/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              ورود به پنل مدیریت
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.05 }}
              className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group"
            >
              <div className="relative">
                {item.thumbnail ? (
                  <img src={item.thumbnail} alt={item.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-dark-500" />
                  </div>
                )}
                {item.is_featured && (
                  <div className="absolute top-2 left-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-dark-400 mb-2">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.created_at).toLocaleDateString('fa-IR')}
                  {getStatusBadge(item)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-dark-400 text-sm line-clamp-2 mb-3">{item.excerpt}</p>
                
                <div className="flex items-center gap-4 text-xs text-dark-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.read_time || 5} دقیقه
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openModal(item)} 
                    className="flex-1 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" /> ویرایش
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-dark-900 border border-white/10 rounded-2xl"
          >
            <div className="sticky top-0 z-10 bg-dark-900 border-b border-white/10 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">
                  {editingItem ? 'ویرایش مقاله' : 'افزودن مقاله جدید'}
                </h2>
                <button onClick={closeModal} className="text-dark-400 hover:text-white">
                  ✕
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-2">
                {[
                  { id: 'content', label: 'محتوا' },
                  { id: 'media', label: 'رسانه' },
                  { id: 'seo', label: 'سئو' },
                  { id: 'settings', label: 'تنظیمات' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white/5 text-dark-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">عنوان مقاله *</label>
                    <input 
                      type="text" 
                      value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">خلاصه مقاله</label>
                    <textarea 
                      value={formData.excerpt} 
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
                      rows={3} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      placeholder="خلاصه‌ای کوتاه از مقاله که در لیست مقالات نمایش داده می‌شود..."
                    />
                  </div>
                  
                  <TipTapEditor
                    value={formData.content || ''}
                    onChange={(content) => setFormData({...formData, content})}
                    label="محتوای مقاله *"
                    placeholder="محتوای مقاله را اینجا بنویسید... می‌توانید تصاویر را با کشیدن و رها کردن اضافه کنید."
                  />
                </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">تصویر شاخص</h3>
                    <ImageUpload
                      value={formData.thumbnail || ''}
                      onChange={(url) => setFormData({...formData, thumbnail: url})}
                      folder="blog"
                      label="تصویر شاخص مقاله"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-dark-300 text-sm mb-2">متن جایگزین (Alt Text)</label>
                        <input 
                          type="text" 
                          value={formData.featured_image_alt || ''} 
                          onChange={(e) => setFormData({...formData, featured_image_alt: e.target.value})} 
                          className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                          placeholder="توضیح تصویر برای سئو"
                        />
                      </div>
                      <div>
                        <label className="block text-dark-300 text-sm mb-2">کپشن تصویر</label>
                        <input 
                          type="text" 
                          value={formData.featured_image_caption || ''} 
                          onChange={(e) => setFormData({...formData, featured_image_caption: e.target.value})} 
                          className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                          placeholder="توضیح زیر تصویر"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <h4 className="text-blue-400 font-medium mb-2">راهنمای سئو</h4>
                    <p className="text-dark-400 text-sm">
                      عنوان متا باید بین ۵۰ تا ۶۰ کاراکتر و توضیحات متا بین ۱۵۰ تا ۱۶۰ کاراکتر باشد.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">
                      عنوان متا (Meta Title)
                      <span className="text-dark-500 mr-2">
                        {(formData.meta_title || formData.title || '').length}/60
                      </span>
                    </label>
                    <input 
                      type="text" 
                      value={formData.meta_title || ''} 
                      onChange={(e) => setFormData({...formData, meta_title: e.target.value})} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      placeholder={formData.title || 'عنوان صفحه در نتایج جستجو'}
                      maxLength={70}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">
                      توضیحات متا (Meta Description)
                      <span className="text-dark-500 mr-2">
                        {(formData.meta_description || formData.excerpt || '').length}/160
                      </span>
                    </label>
                    <textarea 
                      value={formData.meta_description || ''} 
                      onChange={(e) => setFormData({...formData, meta_description: e.target.value})} 
                      rows={3} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      placeholder={formData.excerpt || 'توضیح کوتاه برای نتایج جستجو'}
                      maxLength={170}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">کلمات کلیدی (Meta Keywords)</label>
                    <input 
                      type="text" 
                      value={formData.meta_keywords || ''} 
                      onChange={(e) => setFormData({...formData, meta_keywords: e.target.value})} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      placeholder="کلمه۱, کلمه۲, کلمه۳"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">آدرس کانونیکال (Canonical URL)</label>
                    <input 
                      type="url" 
                      value={formData.canonical_url || ''} 
                      onChange={(e) => setFormData({...formData, canonical_url: e.target.value})} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      placeholder="https://example.com/blog/post-slug"
                    />
                  </div>
                  
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="text-white font-medium mb-4">تنظیمات Open Graph (شبکه‌های اجتماعی)</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-dark-300 text-sm mb-2">عنوان OG</label>
                        <input 
                          type="text" 
                          value={formData.og_title || ''} 
                          onChange={(e) => setFormData({...formData, og_title: e.target.value})} 
                          className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                          placeholder={formData.title || 'عنوان برای اشتراک‌گذاری'}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-dark-300 text-sm mb-2">توضیحات OG</label>
                        <textarea 
                          value={formData.og_description || ''} 
                          onChange={(e) => setFormData({...formData, og_description: e.target.value})} 
                          rows={2} 
                          className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                          placeholder={formData.excerpt || 'توضیح برای اشتراک‌گذاری'}
                        />
                      </div>
                      
                      <ImageUpload
                        value={formData.og_image || ''}
                        onChange={(url) => setFormData({...formData, og_image: url})}
                        folder="blog/og"
                        label="تصویر OG (1200x630 پیکسل)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">دسته‌بندی</label>
                      <select 
                        value={formData.category} 
                        onChange={(e) => setFormData({...formData, category: e.target.value})} 
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500"
                      >
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
                      <input 
                        type="number" 
                        value={formData.read_time || 5} 
                        onChange={(e) => setFormData({...formData, read_time: parseInt(e.target.value) || 5})} 
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">نام نویسنده</label>
                      <input 
                        type="text" 
                        value={formData.author || ''} 
                        onChange={(e) => setFormData({...formData, author: e.target.value})} 
                        placeholder="تیم محتوا" 
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-dark-300 text-sm mb-2">آواتار نویسنده (URL)</label>
                      <input 
                        type="text" 
                        value={formData.author_avatar || ''} 
                        onChange={(e) => setFormData({...formData, author_avatar: e.target.value})} 
                        className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-dark-300 text-sm mb-2">برچسب‌ها (با کاما جدا کنید)</label>
                    <input 
                      type="text" 
                      value={formData.tags} 
                      onChange={(e) => setFormData({...formData, tags: e.target.value})} 
                      className="w-full bg-dark-800 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary-500" 
                      placeholder="سئو, دیجیتال مارکتینگ, تولید محتوا" 
                    />
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.is_published} 
                        onChange={(e) => setFormData({...formData, is_published: e.target.checked})} 
                        className="w-5 h-5 rounded" 
                      />
                      <span className="text-white">منتشر شود</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.is_featured} 
                        onChange={(e) => setFormData({...formData, is_featured: e.target.checked})} 
                        className="w-5 h-5 rounded" 
                      />
                      <span className="text-white">مقاله ویژه</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.allow_comments} 
                        onChange={(e) => setFormData({...formData, allow_comments: e.target.checked})} 
                        className="w-5 h-5 rounded" 
                      />
                      <span className="text-white">اجازه نظرات</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <button 
                  type="submit" 
                  className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
                >
                  {editingItem ? 'بروزرسانی مقاله' : 'انتشار مقاله'}
                </button>
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="px-6 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors"
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

export default Blog;
