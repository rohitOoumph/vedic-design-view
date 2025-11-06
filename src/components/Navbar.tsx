import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/vedic-logo.png';
import { useNavLinks, useSettings } from '@/cms/hooks/useContent';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { data: navLinks } = useNavLinks();
  const { data: settings } = useSettings();
  
  const links = navLinks || [];
  const brandName = settings?.brand_name || 'Vedic Interiors';
  
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
              alt={`${brandName} Logo`}
              className="h-12 md:h-20 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.id}
                to={link.href} 
                className={`transition-colors ${isActive(link.href) ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
              >
                {link.label}
              </Link>
            ))}
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
            {links.map((link) => (
              <Link 
                key={link.id}
                to={link.href} 
                onClick={() => setIsOpen(false)} 
                className={`block transition-colors ${isActive(link.href) ? 'text-primary font-medium' : 'text-foreground hover:text-primary'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
