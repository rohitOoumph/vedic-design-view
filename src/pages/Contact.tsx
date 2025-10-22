import Navbar from '@/components/Navbar';
import ContactSection from '@/components/ContactSection';
import ContactInfoSection from '@/components/ContactInfoSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ContactSection />
        <ContactInfoSection />
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
