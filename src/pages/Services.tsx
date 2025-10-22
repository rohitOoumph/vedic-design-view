import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import ServiceBenefitsSection from '@/components/ServiceBenefitsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ServicesSection />
      </div>
      <ProcessSection />
      <ServiceBenefitsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Services;
