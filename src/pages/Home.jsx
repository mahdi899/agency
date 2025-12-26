import { Hero, Services, Portfolio, Process, Testimonials, CTA, Clients, Features, Stats, Team } from '../components/home';
import { ReelsShowcase } from '../components/ui';

const Home = () => {
  return (
    <>
      <Hero />
      <Clients />
      <Stats />
      <Services />
      <ReelsShowcase />
      <Portfolio />
      <Features />
      <Team />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
};

export default Home;
