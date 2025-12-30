import React from 'react';
import { useApi, useBlogPosts } from '../hooks';
import { ComponentLoader, SkeletonLoader } from '../components/ui/LazyLoader';

// Example 1: Using useApi hook for manual API calls
const ExampleComponent = () => {
  const { execute, loading, data } = useApi();

  const handleFetchData = async () => {
    try {
      const result = await execute(() => api.getServices(), {
        showToast: true,
        customMessage: 'در حال دریافت خدمات...'
      });
      console.log('Services:', result);
    } catch (error) {
      // Error is already handled by the hook
    }
  };

  return (
    <div className="p-6">
      <button 
        onClick={handleFetchData}
        disabled={loading}
        className="px-4 py-2 bg-primary-500 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? <ComponentLoader size="sm" /> : 'دریافت خدمات'}
      </button>
      
      {data && (
        <div className="mt-4">
          {data.map(service => (
            <div key={service.id} className="p-3 bg-dark-800 rounded-lg mb-2">
              {service.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Example 2: Using useBlogPosts hook for automatic data fetching
const BlogListExample = () => {
  const { data: posts, loading, error, refetch } = useBlogPosts({ 
    category: 'marketing',
    limit: 5 
  });

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">مقالات بازاریابی</h2>
        <SkeletonLoader lines={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-400">خطا در دریافت مقالات</p>
          <button 
            onClick={refetch}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">مقالات بازاریابی</h2>
      <div className="space-y-4">
        {posts?.data?.map(post => (
          <div key={post.id} className="p-4 bg-dark-800 rounded-lg">
            <h3 className="font-bold text-white">{post.title}</h3>
            <p className="text-dark-400 text-sm mt-1">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example 3: Form submission with error handling
const FormExample = () => {
  const [formData, setFormData] = React.useState({ email: '', message: '' });
  const [submitting, setSubmitting] = React.useState(false);
  const { execute } = useApi();
  
  const withErrorHandling = async (fn, options = {}) => {
    try {
      return await fn();
    } catch (error) {
      // Simple error handling
      console.error('Error:', error);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await withErrorHandling(
        () => api.submitContact(formData),
        {
          showToast: true,
          customMessage: 'در حال ارسال پیام...'
        }
      );
      
      // Success
      window.location.href = '/thank-you';
    } catch (error) {
      // Error is already handled
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md">
      <div className="mb-4">
        <label className="block text-white mb-2">ایمیل</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-3 py-2 bg-dark-800 text-white rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">پیام</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full px-3 py-2 bg-dark-800 text-white rounded-lg"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg disabled:opacity-50"
      >
        {submitting ? 'در حال ارسال...' : 'ارسال پیام'}
      </button>
    </form>
  );
};

export { ExampleComponent, BlogListExample, FormExample };
export default { ExampleComponent, BlogListExample, FormExample };
