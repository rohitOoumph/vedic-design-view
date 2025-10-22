import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TeamSection from '@/components/TeamSection';
import ValuesSection from '@/components/ValuesSection';
import AchievementsSection from '@/components/AchievementsSection';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <AboutSection />
      </div>
      <WhyChooseUsSection />
      <TeamSection />
      <ValuesSection />
      <AchievementsSection />
      <Footer />
    </div>
  );
};

export default About;
