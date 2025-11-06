import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderKanban, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  Menu,
  LogOut,
  Users,
  Image,
  Shield
} from "lucide-react";
import { signOut } from "@/cms/hooks/useAuth";
import { toast } from "sonner";
import logo from "@/assets/vedic-logo.png";
import { useState } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/media", label: "Media Library", icon: Image },
  { href: "/admin/roles", label: "User Roles", icon: Shield },
  { href: "/admin/nav-links", label: "Navigation", icon: Menu },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/admin/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b bg-card">
        <div className="flex h-16 items-center gap-4 px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logo} alt="Vedic Interiors" className="h-10 w-auto" />
            <span className="font-semibold hidden sm:inline">Admin Panel</span>
          </Link>

          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 border-r bg-card min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <aside className="fixed left-0 top-0 bottom-0 w-64 border-r bg-card">
              <div className="p-4 border-b">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link 
                      key={item.href} 
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
