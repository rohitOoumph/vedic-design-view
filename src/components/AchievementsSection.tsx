import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal } from 'lucide-react';

const AchievementsSection = () => {
  const achievements = [
    {
      icon: Award,
      year: '2023',
      title: 'Best Interior Design Firm',
      organization: 'Design Excellence Awards'
    },
    {
      icon: Trophy,
      year: '2022',
      title: 'Residential Project of the Year',
      organization: 'Indian Interior Design Awards'
    },
    {
      icon: Star,
      year: '2021',
      title: 'Innovation in Design',
      organization: 'Architecture Digest India'
    },
    {
      icon: Medal,
      year: '2020',
      title: 'Sustainability Champion',
      organization: 'Green Building Council'
    }
  ];

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
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            Awards & <span className="text-accent">Recognition</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating excellence in design and execution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="relative p-8 bg-card rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-elegant group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute top-4 right-4 text-6xl font-display font-bold text-accent/10 group-hover:text-accent/20 transition-colors">
                {achievement.year}
              </div>
              <achievement.icon className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-display font-bold text-foreground mb-2 relative z-10">
                {achievement.title}
              </h3>
              <p className="text-muted-foreground text-sm relative z-10">
                {achievement.organization}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
