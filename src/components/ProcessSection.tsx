import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, Ruler, Hammer, CheckCircle } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: MessageSquare,
      number: '01',
      title: 'Consultation',
      description: 'We start by understanding your vision, requirements, and budget through detailed discussions.'
    },
    {
      icon: Lightbulb,
      number: '02',
      title: 'Concept Design',
      description: 'Our designers create innovative concepts and 3D visualizations for your approval.'
    },
    {
      icon: Ruler,
      number: '03',
      title: 'Planning',
      description: 'Detailed planning including material selection, timelines, and budget finalization.'
    },
    {
      icon: Hammer,
      number: '04',
      title: 'Execution',
      description: 'Expert craftsmen bring the design to life with precision and attention to detail.'
    },
    {
      icon: CheckCircle,
      number: '05',
      title: 'Handover',
      description: 'Final inspection, styling, and handover of your beautiful new space.'
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
            Our <span className="text-accent">Design Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A systematic approach that ensures seamless execution from concept to completion
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 border-4 border-background mb-4 relative">
                  <step.icon className="w-8 h-8 text-accent" />
                  <span className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-accent text-primary-foreground font-bold text-sm flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
