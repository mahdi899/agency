import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { LoadingScreen } from './components/ui';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
