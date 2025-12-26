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
    <div className="min-h-screen flex flex-col cursor-none lg:cursor-none">
      <MouseFollower />
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow">
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
