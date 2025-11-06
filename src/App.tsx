import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Lazy load admin components
const LoginPage = lazy(() => import("./cms/admin/pages/LoginPage").then(m => ({ default: m.LoginPage })));
const AdminLayout = lazy(() => import("./cms/admin/components/AdminLayout").then(m => ({ default: m.AdminLayout })));
const ProtectedRoute = lazy(() => import("./cms/admin/components/ProtectedRoute").then(m => ({ default: m.ProtectedRoute })));
const DashboardPage = lazy(() => import("./cms/admin/pages/DashboardPage").then(m => ({ default: m.DashboardPage })));
const ServicesPage = lazy(() => import("./cms/admin/pages/ServicesPage").then(m => ({ default: m.ServicesPage })));
const ProjectsPage = lazy(() => import("./cms/admin/pages/ProjectsPage").then(m => ({ default: m.ProjectsPage })));
const TestimonialsPage = lazy(() => import("./cms/admin/pages/TestimonialsPage").then(m => ({ default: m.TestimonialsPage })));
const FAQsPage = lazy(() => import("./cms/admin/pages/FAQsPage").then(m => ({ default: m.FAQsPage })));
const LeadsPage = lazy(() => import("./cms/admin/pages/LeadsPage").then(m => ({ default: m.LeadsPage })));
const NavLinksPage = lazy(() => import("./cms/admin/pages/NavLinksPage").then(m => ({ default: m.NavLinksPage })));
const SettingsPage = lazy(() => import("./cms/admin/pages/SettingsPage").then(m => ({ default: m.SettingsPage })));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      }>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout>
                <DashboardPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/services" element={
            <ProtectedRoute>
              <AdminLayout>
                <ServicesPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/projects" element={
            <ProtectedRoute>
              <AdminLayout>
                <ProjectsPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/testimonials" element={
            <ProtectedRoute>
              <AdminLayout>
                <TestimonialsPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/faqs" element={
            <ProtectedRoute>
              <AdminLayout>
                <FAQsPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/leads" element={
            <ProtectedRoute>
              <AdminLayout>
                <LeadsPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/nav-links" element={
            <ProtectedRoute>
              <AdminLayout>
                <NavLinksPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <AdminLayout>
                <SettingsPage />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
