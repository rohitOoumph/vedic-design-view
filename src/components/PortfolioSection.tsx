import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import coworkingImg1 from '@/assets/project-coworking-1.jpg';
import coworkingImg2 from '@/assets/project-coworking-2.jpg';
import coworkingImg3 from '@/assets/project-coworking-3.jpg';
import coworkingImg4 from '@/assets/project-coworking-4.jpg';
import corporateOffice from '@/assets/project-corporate-office.jpg';
import meetingRoom from '@/assets/project-meeting-room.jpg';

const projects = [
  {
    title: 'Co-Working Office - Game Zone',
    category: 'Corporate',
    image: coworkingImg1,
    description: 'Modern co-working space with vibrant game zone and collaborative areas at Capital Park, Hyderabad'
  },
  {
    title: 'Co-Working Office - Recreation Area',
    category: 'Corporate',
    image: coworkingImg2,
    description: 'Dynamic workspace featuring creative murals and multi-functional zones'
  },
  {
    title: 'Co-Working Office - Cafeteria',
    category: 'Corporate',
    image: coworkingImg3,
    description: 'Sophisticated cafeteria design with premium finishes and comfortable seating'
  },
  {
    title: 'Co-Working Office - Gaming Zone',
    category: 'Corporate',
    image: coworkingImg4,
    description: 'Entertainment area with billiards and chess tables for employee recreation'
  },
  {
    title: 'Corporate Office Reception',
    category: 'Corporate',
    image: corporateOffice,
    description: 'Modern reception area with creative seating and professional branding'
  },
  {
    title: 'Executive Meeting Room',
    category: 'Corporate',
    image: meetingRoom,
    description: 'Professional conference room with contemporary design elements'
  }
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Residential', 'Corporate'];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our collection of thoughtfully designed spaces
          </p>

          {/* Filter buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-accent text-accent-foreground shadow-lg'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

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
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0">
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-80 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button 
            className="px-8 py-4 bg-accent text-accent-foreground rounded-full hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Complete Portfolio
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
