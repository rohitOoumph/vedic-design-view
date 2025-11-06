import { motion } from 'framer-motion';
import { Building2, Home, Store, Sparkles } from 'lucide-react';
import { useProjects } from '@/cms/hooks/useContent';

interface PortfolioCategoriesSectionProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const PortfolioCategoriesSection = ({ activeCategory, onCategoryChange }: PortfolioCategoriesSectionProps) => {
  const { data: projectsData } = useProjects({});
  const projects = projectsData || [];
  
  // Extract unique categories from projects
  const dbCategories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
  
  // Icon mapping helper
  const getIconForCategory = (category: string) => {
    const lowerCat = category.toLowerCase();
    if (lowerCat.includes('residential')) return Home;
    if (lowerCat.includes('corporate') || lowerCat.includes('commercial') || lowerCat.includes('coworking')) return Building2;
    return Store;
  };
  
  // Build categories array with icons
  const categories = [
    { id: 'All', name: 'All Projects', icon: Sparkles },
    ...dbCategories.map(cat => ({
      id: cat,
      name: cat,
      icon: getIconForCategory(cat)
    }))
  ];

  const stats = [
    { label: 'Completed Projects', value: '200+' },
    { label: 'Happy Clients', value: '180+' },
    { label: 'Design Awards', value: '15+' },
    { label: 'Team Members', value: '25+' }
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
            Explore Our <span className="text-accent">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Browse through our diverse range of successfully completed projects
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-accent text-primary-foreground shadow-elegant'
                    : 'bg-card text-foreground border border-border hover:border-accent/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="w-5 h-5" />
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-card rounded-lg border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl font-display font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioCategoriesSection;
