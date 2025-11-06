import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useServices } from '@/cms/hooks/useContent';
import { Home, Building2, Box, Layout, PackageCheck, Ruler } from 'lucide-react';

// Icon mapping for services
const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-12 h-12" />,
  Building2: <Building2 className="w-12 h-12" />,
  Box: <Box className="w-12 h-12" />,
  Layout: <Layout className="w-12 h-12" />,
  PackageCheck: <PackageCheck className="w-12 h-12" />,
  Ruler: <Ruler className="w-12 h-12" />,
};

const ServicesSection = () => {
  const { data: servicesData, isLoading } = useServices();
  const services = servicesData || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded w-64 mx-auto mb-4" />
              <div className="h-6 bg-muted rounded w-96 mx-auto" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Our Services
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive design and execution services tailored to bring your vision to life
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div 
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className="group h-full hover:shadow-xl transition-all duration-300 border-border hover:border-accent/50 bg-card">
                <CardContent className="p-8">
                  <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon_name && iconMap[service.icon_name] || <Box className="w-12 h-12" />}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.short_desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide -mx-6 px-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="snap-center flex-shrink-0 w-[85vw]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border bg-card">
                <CardContent className="p-6">
                  <div className="text-accent mb-4">
                    {service.icon_name && iconMap[service.icon_name] || <Box className="w-12 h-12" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.short_desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
