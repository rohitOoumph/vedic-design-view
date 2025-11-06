import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '@/cms/hooks/useContent';
import ProjectModal from './ProjectModal';

interface PortfolioSectionProps {
  activeCategory?: string;
  showTitle?: boolean;
  limit?: number;
}

const PortfolioSection = ({ activeCategory = 'All', showTitle = false, limit }: PortfolioSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { data: projectsData, isLoading } = useProjects({ limit });
  const projects = projectsData || [];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  if (isLoading) {
    return (
      <section className="py-24 bg-card">
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
    <>
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          {showTitle && (
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Our Portfolio
              </h2>
              <div className="h-1 w-24 bg-accent mx-auto mb-6" />
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our collection of thoughtfully designed spaces
              </p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img 
                        src={project.cover_image_url || '/placeholder.svg'} 
                        alt={project.title}
                        className="w-full h-80 object-cover"
                        loading="lazy"
                        decoding="async"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        {project.category && (
                          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full mb-3">
                            {project.category}
                          </span>
                        )}
                        <h3 className="text-2xl font-semibold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {project.short_desc}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {!limit && (
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div 
                className="inline-block px-8 py-4 bg-accent/10 text-accent rounded-full font-medium"
              >
                Showing {filteredProjects.length} {activeCategory !== 'All' ? activeCategory : ''} Project{filteredProjects.length !== 1 ? 's' : ''}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default PortfolioSection;
