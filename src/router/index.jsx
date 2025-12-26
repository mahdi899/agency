import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout';
import {
  Home,
  Services,
  ServiceDetail,
  Portfolio,
  PortfolioDetail,
  About,
  Contact,
  Pricing,
  Blog,
  BlogPost,
  FAQ,
  Location,
  Start,
  ThankYou,
  NotFound,
  Process,
} from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:serviceId', element: <ServiceDetail /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/:portfolioId', element: <PortfolioDetail /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'process', element: <Process /> },
      { path: 'locations/:locationSlug', element: <Location /> },
      { path: 'start', element: <Start /> },
      { path: 'thank-you', element: <ThankYou /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
