import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/vedic-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Vedic Interiors Logo" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {isHomePage ? (
              <>
                <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
                <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
                <a href="#portfolio" className="text-foreground hover:text-primary transition-colors">Portfolio</a>
                <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
              </>
            ) : (
              <>
                <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
                <Link to="/services" className="text-foreground hover:text-primary transition-colors">Services</Link>
                <Link to="/portfolio" className="text-foreground hover:text-primary transition-colors">Portfolio</Link>
                <Link to="/testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</Link>
              </>
            )}
            <Link to="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Contact Us
              </Button>
            </Link>
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
            {isHomePage ? (
              <>
                <a href="#home" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary transition-colors">Home</a>
                <a href="#about" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary transition-colors">About</a>
                <a href="#services" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary transition-colors">Services</a>
                <a href="#portfolio" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary transition-colors">Portfolio</a>
                <a href="#testimonials" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary transition-colors">Testimonials</a>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary transition-colors">Home</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary transition-colors">About</Link>
                <Link to="/services" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary transition-colors">Services</Link>
                <Link to="/portfolio" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary transition-colors">Portfolio</Link>
                <Link to="/testimonials" onClick={() => setIsOpen(false)} className="block text-foreground hover:text-primary transition-colors">Testimonials</Link>
              </>
            )}
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Contact Us
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
