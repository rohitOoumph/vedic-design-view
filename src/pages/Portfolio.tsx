import Navbar from '@/components/Navbar';
import PortfolioSection from '@/components/PortfolioSection';
import Footer from '@/components/Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <PortfolioSection />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
