import { useState, useEffect } from 'react';

// Custom hook for real-time blog updates
export const useRealtimeBlog = () => {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const triggerRefresh = () => {
    setLastUpdate(Date.now());
  };

  // Listen for storage events (cross-tab communication)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'blog_updated') {
        triggerRefresh();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { lastUpdate, triggerRefresh };
};
