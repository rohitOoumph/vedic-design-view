import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-office-interior-with-wooden-furniture-50571-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/75 to-background/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Premium Interiors for{' '}
            <span className="text-accent">Homes & Offices</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Creating inspiring environments through thoughtful design, quality execution, 
            and client-centric solutions since 2015.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book a Free Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-foreground/20 hover:border-accent hover:text-accent transition-all duration-300"
            >
              View Our Portfolio
            </Button>
          </motion.div>

          <motion.div 
            className="mt-12 flex items-center gap-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div>
              <div className="text-3xl font-bold text-accent">200+</div>
              <div>Projects Completed</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="text-3xl font-bold text-accent">9+</div>
              <div>Years Experience</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="text-3xl font-bold text-accent">100%</div>
              <div>Client Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
