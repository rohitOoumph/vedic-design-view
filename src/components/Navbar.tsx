import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/vedic-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Function to determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/98 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Vedic Interiors Logo" 
              className="h-12 md:h-20 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
              <>
                <Link to="/" className={`transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Home</Link>
                <Link to="/about" className={`transition-colors ${isActive('/about') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>About</Link>
                <Link to="/services" className={`transition-colors ${isActive('/services') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Services</Link>
                <Link to="/portfolio" className={`transition-colors ${isActive('/portfolio') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Portfolio</Link>
                <Link to="/testimonials" className={`transition-colors ${isActive('/testimonials') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Testimonials</Link>
              </>
            <Link to="/contact">
              <Button className={`${isActive('/contact') ? 'bg-primary/90' : 'bg-primary'} hover:bg-primary/90 text-primary-foreground`}>
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
              <>
                <Link to="/" onClick={() => setIsOpen(false)} className={`block transition-colors ${isActive('/') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Home</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className={`block transition-colors ${isActive('/about') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>About</Link>
                <Link to="/services" onClick={() => setIsOpen(false)} className={`block transition-colors ${isActive('/services') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Services</Link>
                <Link to="/portfolio" onClick={() => setIsOpen(false)} className={`block transition-colors ${isActive('/portfolio') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Portfolio</Link>
                <Link to="/testimonials" onClick={() => setIsOpen(false)} className={`block transition-colors ${isActive('/testimonials') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}>Testimonials</Link>
              </>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button className={`w-full ${isActive('/contact') ? 'bg-primary/90' : 'bg-primary'} hover:bg-primary/90 text-primary-foreground`}>
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
