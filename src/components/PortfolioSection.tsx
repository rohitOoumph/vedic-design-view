import { useState } from 'react';
import { Card } from '@/components/ui/card';
import residentialImg1 from '@/assets/project-residential-1.jpg';
import corporateImg1 from '@/assets/project-corporate-1.jpg';
import residentialImg2 from '@/assets/project-residential-2.jpg';

const projects = [
  {
    title: 'Modern Luxury Residence',
    category: 'Residential',
    image: residentialImg1,
    description: 'Contemporary home design with warm wood tones and sophisticated finishes'
  },
  {
    title: 'Corporate Office Space',
    category: 'Corporate',
    image: corporateImg1,
    description: 'Professional workspace designed for productivity and collaboration'
  },
  {
    title: 'Premium Kitchen Design',
    category: 'Residential',
    image: residentialImg2,
    description: 'Elegant kitchen with custom cabinetry and modern appliances'
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
        <div className="text-center mb-12">
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
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-accent text-accent-foreground shadow-lg'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
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
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-accent text-accent-foreground rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105">
            View Complete Portfolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
