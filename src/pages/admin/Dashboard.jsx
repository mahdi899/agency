import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FileVideo, Briefcase, Users, MessageSquare, 
  Package, Star, TrendingUp, Eye, Clock, ArrowLeft, Bell
} from 'lucide-react';
import api from '../../services/api';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-dark-400 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {trend && (
          <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {trend}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);

const RecentContactCard = ({ contact }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
      contact.status === 'new' ? 'bg-primary-500/20 text-primary-400' : 'bg-dark-700 text-dark-400'
    }`}>
      <MessageSquare className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <p className="text-white font-medium truncate">{contact.name}</p>
        <span className={`px-2 py-0.5 rounded-full text-xs ${
          contact.status === 'new' ? 'bg-primary-500/20 text-primary-400' : 'bg-dark-700 text-dark-400'
        }`}>
          {contact.status === 'new' ? 'جدید' : 'خوانده شده'}
        </span>
      </div>
      <p className="text-dark-400 text-sm truncate">{contact.subject}</p>
      <p className="text-dark-500 text-xs mt-1 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {new Date(contact.created_at).toLocaleDateString('fa-IR')}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getDashboard();
        setData(response.data);
      } catch (error) {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { title: 'خدمات', value: data?.services_count || 0, icon: Briefcase, color: 'from-blue-500 to-cyan-500' },
    { title: 'نمونه کارها', value: data?.portfolios_count || 0, icon: FileVideo, color: 'from-purple-500 to-pink-500' },
    { title: 'مشتریان', value: data?.clients_count || 0, icon: Users, color: 'from-green-500 to-emerald-500' },
    { title: 'پیام‌های جدید', value: data?.new_contacts_count || 0, icon: MessageSquare, color: 'from-orange-500 to-red-500' },
    { title: 'پکیج‌ها', value: data?.packages_count || 0, icon: Package, color: 'from-yellow-500 to-amber-500' },
    { title: 'نظرات', value: data?.testimonials_count || 0, icon: Star, color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">داشبورد</h1>
          <p className="text-dark-400">خوش آمدید به پنل مدیریت آژانس خلاق</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-3 rounded-xl bg-white/5 text-dark-400 hover:text-white hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5" />
            {data?.new_contacts_count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {data.new_contacts_count}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">پیام‌های اخیر</h2>
            <Link to="/admin/contacts" className="text-primary-400 text-sm flex items-center gap-1 hover:text-primary-300">
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {data?.recent_contacts?.length > 0 ? (
              data.recent_contacts.map((contact) => (
                <RecentContactCard key={contact.id} contact={contact} />
              ))
            ) : (
              <p className="text-dark-500 text-center py-8">پیامی وجود ندارد</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">نمونه کارهای اخیر</h2>
            <Link to="/admin/portfolios" className="text-primary-400 text-sm flex items-center gap-1 hover:text-primary-300">
              مشاهده همه
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {data?.recent_portfolios?.length > 0 ? (
              data.recent_portfolios.map((portfolio) => (
                <div key={portfolio.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <img
                    src={portfolio.thumbnail}
                    alt={portfolio.title}
                    className="w-16 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{portfolio.title}</p>
                    <p className="text-dark-400 text-sm">{portfolio.category}</p>
                  </div>
                  <div className="text-dark-400 text-sm flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {portfolio.views}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-dark-500 text-center py-8">نمونه کاری وجود ندارد</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
