import { motion } from 'framer-motion';
import { Heart, Target, Users2, Zap } from 'lucide-react';

const ValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do and it shows in every project we undertake.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality in every aspect of our work.'
    },
    {
      icon: Users2,
      title: 'Collaboration',
      description: 'Working closely with clients to turn their dreams into reality.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving with the latest design trends and technologies.'
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
            Our Core <span className="text-accent">Values</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="text-center p-8 bg-card rounded-lg border border-border hover:border-accent/50 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <value.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
