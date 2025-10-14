import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/vedic-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Vedic Interiors Logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#portfolio" className="text-foreground hover:text-primary transition-colors">Portfolio</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="#home" className="block text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#about" className="block text-foreground hover:text-primary transition-colors">About</a>
            <a href="#services" className="block text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#portfolio" className="block text-foreground hover:text-primary transition-colors">Portfolio</a>
            <a href="#testimonials" className="block text-foreground hover:text-primary transition-colors">Testimonials</a>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Contact Us
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
