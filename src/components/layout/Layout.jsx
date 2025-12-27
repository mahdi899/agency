import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { LiveChat, ScrollProgress, FloatingActions, SocialProofPopup, MouseFollower } from '../ui';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col mobile-overflow-hidden">
      <MouseFollower />
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow mobile-overflow-hidden">
        <Outlet />
      </main>
      <Footer />
      <LiveChat />
      <FloatingActions />
      <SocialProofPopup />
    </div>
  );
};

export default Layout;
