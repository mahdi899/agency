import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from '../components/layout';

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-950">
    <div className="text-center">
      <div className="w-12 h-12 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-dark-400">در حال بارگذاری...</p>
    </div>
  </div>
);

// Lazy loaded pages - Public
const Home = lazy(() => import('../pages/Home'));
const Services = lazy(() => import('../pages/Services'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'));
const Portfolio = lazy(() => import('../pages/Portfolio'));
const PortfolioDetail = lazy(() => import('../pages/PortfolioDetail'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Pricing = lazy(() => import('../pages/Pricing'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogPost = lazy(() => import('../pages/BlogPost'));
const FAQ = lazy(() => import('../pages/FAQ'));
const Location = lazy(() => import('../pages/Location'));
const Start = lazy(() => import('../pages/Start'));
const ThankYou = lazy(() => import('../pages/ThankYou'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Process = lazy(() => import('../pages/Process'));
const CaseStudies = lazy(() => import('../pages/CaseStudies'));
const Partners = lazy(() => import('../pages/Partners'));
const Industries = lazy(() => import('../pages/Industries'));
const Industry = lazy(() => import('../pages/Industry'));
const TehranAgency = lazy(() => import('../pages/TehranAgency'));
const WebProjectDetail = lazy(() => import('../pages/WebProjectDetail'));

// Lazy loaded pages - Admin
const AdminLayout = lazy(() => import('../components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('../pages/admin/Login'));
const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
const AdminServices = lazy(() => import('../pages/admin/Services'));
const AdminPortfolios = lazy(() => import('../pages/admin/Portfolios'));
const AdminContacts = lazy(() => import('../pages/admin/Contacts'));
const AdminBlog = lazy(() => import('../pages/admin/Blog'));
const AdminClients = lazy(() => import('../pages/admin/Clients'));
const AdminIndustries = lazy(() => import('../pages/admin/Industries'));
const AdminPackages = lazy(() => import('../pages/admin/Packages'));
const AdminTestimonials = lazy(() => import('../pages/admin/Testimonials'));
const AdminReels = lazy(() => import('../pages/admin/Reels'));
const AdminHomeCards = lazy(() => import('../pages/admin/HomeCards'));
const AdminWebProjects = lazy(() => import('../pages/admin/WebProjects'));
const AdminTeamMembers = lazy(() => import('../pages/admin/TeamMembers'));

// Suspense wrapper for lazy components
const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: 'services', element: withSuspense(Services) },
      { path: 'services/:slug', element: withSuspense(ServiceDetail) },
      { path: 'portfolio', element: withSuspense(Portfolio) },
      { path: 'portfolio/:portfolioId', element: withSuspense(PortfolioDetail) },
      { path: 'about', element: withSuspense(About) },
      { path: 'contact', element: withSuspense(Contact) },
      { path: 'pricing', element: withSuspense(Pricing) },
      { path: 'blog', element: withSuspense(Blog) },
      { path: 'blog/:slug', element: withSuspense(BlogPost) },
      { path: 'faq', element: withSuspense(FAQ) },
      { path: 'process', element: withSuspense(Process) },
      { path: 'case-studies', element: withSuspense(CaseStudies) },
      { path: 'partners', element: withSuspense(Partners) },
      { path: 'industries', element: withSuspense(Industries) },
      { path: 'industries/:slug', element: withSuspense(Industry) },
      { path: 'tehran', element: withSuspense(TehranAgency) },
      { path: 'locations/:locationSlug', element: withSuspense(Location) },
      { path: 'web-projects/:slug', element: withSuspense(WebProjectDetail) },
      { path: 'start', element: withSuspense(Start) },
      { path: 'thank-you', element: withSuspense(ThankYou) },
      { path: '*', element: withSuspense(NotFound) },
    ],
  },
  {
    path: '/admin/login',
    element: withSuspense(AdminLogin),
  },
  {
    path: '/admin',
    element: withSuspense(AdminLayout),
    children: [
      { path: 'dashboard', element: withSuspense(AdminDashboard) },
      { path: 'services', element: withSuspense(AdminServices) },
      { path: 'home-cards', element: withSuspense(AdminHomeCards) },
      { path: 'web-projects', element: withSuspense(AdminWebProjects) },
      { path: 'portfolios', element: withSuspense(AdminPortfolios) },
      { path: 'contacts', element: withSuspense(AdminContacts) },
      { path: 'blog', element: withSuspense(AdminBlog) },
      { path: 'clients', element: withSuspense(AdminClients) },
      { path: 'industries', element: withSuspense(AdminIndustries) },
      { path: 'packages', element: withSuspense(AdminPackages) },
      { path: 'testimonials', element: withSuspense(AdminTestimonials) },
      { path: 'reels', element: withSuspense(AdminReels) },
      { path: 'team', element: withSuspense(AdminTeamMembers) },
    ],
  },
]);
