import { motion } from 'framer-motion';
import { Star, ThumbsUp, Users, TrendingUp } from 'lucide-react';

const TestimonialsStatsSection = () => {
  const stats = [
    {
      icon: Star,
      value: '4.9/5',
      label: 'Average Rating',
      description: 'Based on 150+ reviews'
    },
    {
      icon: ThumbsUp,
      value: '98%',
      label: 'Client Satisfaction',
      description: 'Would recommend us'
    },
    {
      icon: Users,
      value: '180+',
      label: 'Happy Clients',
      description: 'Across India'
    },
    {
      icon: TrendingUp,
      value: '85%',
      label: 'Repeat Business',
      description: 'Come back for more'
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
            Trusted by <span className="text-accent">Hundreds</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our clients' satisfaction speaks volumes about our commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-8 bg-card rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-elegant"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <stat.icon className="w-8 h-8 text-accent" />
              </div>
              <div className="text-5xl font-display font-bold text-accent mb-2">
                {stat.value}
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                {stat.label}
              </h3>
              <p className="text-muted-foreground text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStatsSection;
