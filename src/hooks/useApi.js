import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

// Simple toast notification (same as useErrorHandler)
const createToast = (message, type = 'info', duration = 3000) => {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
  
  const colors = {
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    success: 'bg-green-500 text-white',
    info: 'bg-primary-500 text-white'
  };
  
  toast.className += ` ${colors[type] || colors.info}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
  }, 10);
  
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, duration);
};

// Simple error handler
const useErrorHandler = () => {
  const handleError = useCallback((error, options = {}) => {
    const { showToast = true, customMessage = null } = options;
    
    let errorMessage = customMessage;
    
    if (error?.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 401:
          errorMessage = errorMessage || 'لطفاً وارد شوید';
          break;
        case 403:
          errorMessage = errorMessage || 'دسترسی غیرمجاز';
          break;
        case 404:
          errorMessage = errorMessage || 'موردی یافت نشد';
          break;
        case 422:
          errorMessage = errorMessage || data?.message || 'اطلاعات نامعتبر است';
          break;
        case 429:
          errorMessage = errorMessage || 'تعداد درخواست‌ها بیش از حد مجاز است';
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = errorMessage || 'خطای سرور - لطفاً بعداً تلاش کنید';
          break;
        default:
          errorMessage = errorMessage || data?.message || 'خطایی رخ داده است';
      }
    } else {
      errorMessage = errorMessage || error?.message || 'خطای ناشناخته';
    }
    
    if (showToast) {
      createToast(errorMessage, 'error');
    }
    
    return errorMessage;
  }, []);
  
  const withErrorHandling = useCallback(async (fn, options = {}) => {
    try {
      return await fn();
    } catch (error) {
      handleError(error, options);
      throw error;
    }
  }, [handleError]);
  
  return { handleError, withErrorHandling };
};

export const useApi = (initialLoading = false) => {
  const [loading, setLoading] = useState(initialLoading);
  const [data, setData] = useState(null);
  const { handleError, withErrorHandling } = useErrorHandler();

  const execute = useCallback(async (apiCall, options = {}) => {
    setLoading(true);
    try {
      const result = await withErrorHandling(apiCall, options);
      setData(result);
      return result;
    } finally {
      setLoading(false);
    }
  }, [withErrorHandling]);

  return { execute, loading, data };
};

export const useApiQuery = (apiCall, dependencies = []) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { handleError } = useErrorHandler();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err);
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [apiCall, handleError]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

// Example hooks for specific API calls
export const useBlogPosts = (params = {}) => {
  return useApiQuery(() => api.getPublicBlogPosts(params), [JSON.stringify(params)]);
};

export const useBlogPost = (slug) => {
  return useApiQuery(() => api.getBlogPost(slug), [slug]);
};

export const useServices = () => {
  return useApiQuery(() => api.getServices(), []);
};

export const usePortfolios = (params = {}) => {
  return useApiQuery(() => api.getPortfolios(params), [JSON.stringify(params)]);
};

export default useApi;
