import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // In production, send to error monitoring service
      console.error('Error Boundary caught:', { error, errorInfo });
    } else {
      // In development, log to console
      console.error('Error Boundary caught:', { error, errorInfo });
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      // Max retries reached
      if (this.state.retryCount >= 3) {
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center bg-dark-950 p-4"
          >
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">خطای غیرمنتظره</h2>
              <p className="text-dark-400 mb-6">
                متأسفانه خطایی رخ داده است. لطفاً صفحه را رفرش کنید یا بعداً تلاش کنید.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
                >
                  رفرش صفحه
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="w-full px-4 py-3 bg-dark-800 text-white rounded-xl hover:bg-dark-700 transition-colors"
                >
                  بازگشت
                </button>
              </div>
            </div>
          </motion.div>
        );
      }

      // Show error with retry option
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="min-h-screen flex items-center justify-center bg-dark-950 p-4"
        >
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">خطایی رخ داد</h2>
            <p className="text-dark-400 mb-6">
              خطایی در اجرای این بخش رخ داده است. می‌توانید دوباره تلاش کنید.
            </p>
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
              >
                تلاش مجدد ({this.state.retryCount + 1}/3)
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-3 bg-dark-800 text-white rounded-xl hover:bg-dark-700 transition-colors"
              >
                رفرش صفحه
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-right">
                <summary className="cursor-pointer text-sm text-dark-400 hover:text-white">
                  نمایش خطا (Development)
                </summary>
                <pre className="mt-2 p-3 bg-dark-900 rounded-lg text-xs text-red-400 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
