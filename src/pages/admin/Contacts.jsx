import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Filter, Eye, Trash2, Clock, Mail, Phone } from 'lucide-react';
import api from '../../services/api';

const statusColors = {
  new: 'bg-primary-500/20 text-primary-400',
  read: 'bg-blue-500/20 text-blue-400',
  replied: 'bg-green-500/20 text-green-400',
  closed: 'bg-dark-700 text-dark-400',
};

const statusLabels = {
  new: 'جدید',
  read: 'خوانده شده',
  replied: 'پاسخ داده شده',
  closed: 'بسته شده',
};

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const fetchContacts = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await api.getContacts(params);
      setContacts(response.data?.data || []);
    } catch (error) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('آیا از حذف این پیام مطمئن هستید؟')) return;
    try {
      await api.request(`/admin/contacts/${id}`, { method: 'DELETE' });
      setContacts(contacts.filter(c => c.id !== id));
      if (selectedContact?.id === id) setSelectedContact(null);
    } catch (error) {
      // Error handled silently
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">پیام‌ها</h1>
          <p className="text-dark-400">مدیریت درخواست‌های تماس</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {['all', 'new', 'read', 'replied', 'closed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === status
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-dark-400 hover:bg-white/10'
            }`}
          >
            {status === 'all' ? 'همه' : statusLabels[status]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
              <input
                type="text"
                placeholder="جستجو..."
                className="w-full bg-dark-800 border border-white/10 rounded-xl py-2 pr-10 pl-4 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
              </div>
            ) : contacts.length === 0 ? (
              <p className="text-dark-500 text-center py-12">پیامی یافت نشد</p>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-primary-500/10' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-white font-medium truncate">{contact.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[contact.status]}`}>
                      {statusLabels[contact.status]}
                    </span>
                  </div>
                  <p className="text-dark-400 text-sm truncate mb-1">{contact.subject}</p>
                  <p className="text-dark-500 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(contact.created_at).toLocaleDateString('fa-IR')}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedContact ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{selectedContact.subject}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[selectedContact.status]}`}>
                    {statusLabels[selectedContact.status]}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(selectedContact.id)}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02]">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-dark-500 text-sm">نام</p>
                    <p className="text-white">{selectedContact.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02]">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-dark-500 text-sm">ایمیل</p>
                    <p className="text-white">{selectedContact.email}</p>
                  </div>
                </div>
                {selectedContact.phone && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02]">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-dark-500 text-sm">تلفن</p>
                      <p className="text-white">{selectedContact.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] mb-6">
                <p className="text-dark-500 text-sm mb-2">پیام</p>
                <p className="text-white leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
              </div>

              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-medium text-center hover:bg-primary-600 transition-colors"
                >
                  پاسخ با ایمیل
                </a>
                {selectedContact.phone && (
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="flex-1 py-3 rounded-xl bg-white/5 text-white font-medium text-center hover:bg-white/10 transition-colors"
                  >
                    تماس تلفنی
                  </a>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
              <MessageSquare className="w-16 h-16 text-dark-700 mx-auto mb-4" />
              <p className="text-dark-500">یک پیام را انتخاب کنید</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
