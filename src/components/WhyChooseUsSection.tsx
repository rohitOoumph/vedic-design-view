import { motion } from 'framer-motion';
import { Award, Clock, Users, Shield, Sparkles, TrendingUp } from 'lucide-react';

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: Award,
      title: 'Award-Winning Design',
      description: 'Recognized for excellence in interior design with multiple industry awards and certifications.'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'We pride ourselves on completing projects on time without compromising on quality.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our team consists of highly skilled designers, architects, and craftsmen.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Rigorous quality checks at every stage ensure flawless execution and lasting results.'
    },
    {
      icon: Sparkles,
      title: 'Custom Solutions',
      description: 'Every project is unique, tailored to your specific needs, style, and budget.'
    },
    {
      icon: TrendingUp,
      title: 'Value for Money',
      description: 'Premium quality interiors at competitive prices with transparent pricing.'
    }
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            Why Choose <span className="text-accent">Vedic Interiors</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine creativity, craftsmanship, and commitment to deliver exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="p-8 bg-card rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-elegant"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <reason.icon className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
