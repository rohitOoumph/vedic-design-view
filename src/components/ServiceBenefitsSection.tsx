import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const ServiceBenefitsSection = () => {
  const benefits = [
    'Customized design solutions tailored to your needs',
    'Transparent pricing with no hidden costs',
    '3D visualization before project execution',
    'Premium quality materials from trusted suppliers',
    'Dedicated project manager for each client',
    'On-time delivery guaranteed',
    'Post-installation support and warranty',
    'Flexible payment plans available'
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              Why Our Services <span className="text-accent">Stand Out</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              We go above and beyond to ensure your complete satisfaction with every project we undertake.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop"
              alt="Service benefits"
              className="rounded-lg shadow-elegant"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-lg -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBenefitsSection;
