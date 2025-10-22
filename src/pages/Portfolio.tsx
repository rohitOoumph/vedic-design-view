import Navbar from '@/components/Navbar';
import PortfolioCategoriesSection from '@/components/PortfolioCategoriesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <PortfolioCategoriesSection />
        <PortfolioSection />
        <TestimonialsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
