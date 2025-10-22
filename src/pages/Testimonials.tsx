import Navbar from '@/components/Navbar';
import TestimonialsStatsSection from '@/components/TestimonialsStatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PortfolioSection from '@/components/PortfolioSection';
import Footer from '@/components/Footer';

const Testimonials = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <TestimonialsStatsSection />
        <TestimonialsSection />
        <PortfolioSection />
      </div>
      <Footer />
    </div>
  );
};

export default Testimonials;
