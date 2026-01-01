import { Hero, Services, Portfolio, Process, Testimonials, CTA, Clients, Features, Stats, Team, Results, WebProjects, WhyChooseUs } from '../components/home';
import { ReelsShowcase, Newsletter } from '../components/ui';

const Home = () => {
  return (
    <>
      <Hero />
      <Clients />
      <Stats />
      <WhyChooseUs />
      <Services />
      <ReelsShowcase />
      <Portfolio />
      <WebProjects />
      <Results />
      <Features />
      <Team />
      <Process />
      <Testimonials />
      <div className="container-custom mx-auto px-4 md:px-8 py-16">
        <Newsletter />
      </div>
      <CTA />
    </>
  );
};

export default Home;
