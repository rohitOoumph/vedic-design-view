import { Button } from '@/components/ui/button';
import Hero3D from './Hero3D';
import heroImage from '@/assets/project-coworking-1.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury interior design showcase" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* 3D Elements */}
      <div className="absolute inset-0 z-10">
        <Hero3D />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
            Premium Interiors for{' '}
            <span className="text-accent">Homes & Offices</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Creating inspiring environments through thoughtful design, quality execution, 
            and client-centric solutions since 2015.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
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
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
