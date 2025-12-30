import { useState, useCallback } from 'react';

// Custom error types
export class AppError extends Error {
  constructor(message, code = 'APP_ERROR', statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class ValidationError extends AppError {
  constructor(message, errors = {}) {
    super(message, 'VALIDATION_ERROR', 422);
    this.errors = errors;
  }
}

export class NetworkError extends AppError {
  constructor(message = 'خطا در اتصال به سرور') {
    super(message, 'NETWORK_ERROR', 0);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'لطفاً وارد شوید') {
    super(message, 'AUTH_ERROR', 401);
  }
}

// Simple toast notification system
const createToast = (message, type = 'info', duration = 3000) => {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
  
  // Set color based on type
  const colors = {
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    success: 'bg-green-500 text-white',
    info: 'bg-primary-500 text-white'
  };
  
  toast.className += ` ${colors[type] || colors.info}`;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-x-full');
  }, 10);
  
  // Remove after duration
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 300);
  }, duration);
};

export const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((error, options = {}) => {
    const {
      showToast = true,
      logError = true,
      customMessage = null,
      redirectTo = null
    } = options;

    let errorMessage = customMessage;
    let errorCode = 'UNKNOWN_ERROR';

    if (error instanceof AppError) {
      errorMessage = errorMessage || error.message;
      errorCode = error.code;
    } else if (error?.response) {
      // API Error
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 401:
          errorMessage = errorMessage || 'لطفاً وارد شوید';
          errorCode = 'UNAUTHORIZED';
          break;
        case 403:
          errorMessage = errorMessage || 'دسترسی غیرمجاز';
          errorCode = 'FORBIDDEN';
          break;
        case 404:
          errorMessage = errorMessage || 'موردی یافت نشد';
          errorCode = 'NOT_FOUND';
          break;
        case 422:
          errorMessage = errorMessage || data?.message || 'اطلاعات نامعتبر است';
          errorCode = 'VALIDATION_ERROR';
          break;
        case 429:
          errorMessage = errorMessage || 'تعداد درخواست‌ها بیش از حد مجاز است';
          errorCode = 'RATE_LIMITED';
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = errorMessage || 'خطای سرور - لطفاً بعداً تلاش کنید';
          errorCode = 'SERVER_ERROR';
          break;
        default:
          errorMessage = errorMessage || data?.message || 'خطایی رخ داده است';
          errorCode = 'API_ERROR';
      }
    } else if (error instanceof TypeError) {
      errorMessage = errorMessage || 'خطا در اجرای عملیات';
      errorCode = 'TYPE_ERROR';
    } else if (error instanceof SyntaxError) {
      errorMessage = errorMessage || 'پاسخ نامعتبر از سرور';
      errorCode = 'SYNTAX_ERROR';
    } else {
      errorMessage = errorMessage || error?.message || 'خطای ناشناخته';
    }

    // Log error for debugging
    if (logError && process.env.NODE_ENV === 'development') {
      console.error('Error:', {
        message: error.message,
        code: errorCode,
        stack: error.stack,
        error
      });
    }

    // Set error state
    setError({
      message: errorMessage,
      code: errorCode,
      originalError: error
    });

    // Show toast notification
    if (showToast) {
      const toastType = errorCode === 'NETWORK_ERROR' ? 'error' : 
                       errorCode === 'VALIDATION_ERROR' ? 'warning' : 'error';
      
      createToast(errorMessage, toastType, errorCode === 'NETWORK_ERROR' ? 5000 : 3000);
    }

    // Handle redirect
    if (redirectTo) {
      if (typeof redirectTo === 'function') {
        redirectTo();
      } else {
        window.location.href = redirectTo;
      }
    }

    return { errorMessage, errorCode };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const withErrorHandling = useCallback(async (fn, options = {}) => {
    try {
      return await fn();
    } catch (error) {
      handleError(error, options);
      throw error;
    }
  }, [handleError]);

  return {
    error,
    handleError,
    clearError,
    withErrorHandling
  };
};

// Utility function for global error handling
export const handleGlobalError = (error, fallbackMessage = 'خطایی رخ داده است') => {
  console.error('Global Error:', error);
  
  // Show user-friendly message
  if (error?.message) {
    createToast(error.message, 'error');
  } else {
    createToast(fallbackMessage, 'error');
  }
};

export default useErrorHandler;
