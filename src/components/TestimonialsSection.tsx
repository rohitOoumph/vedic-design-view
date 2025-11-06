import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useTestimonials } from '@/cms/hooks/useContent';

const TestimonialsSection = () => {
  const { data: testimonialsData, isLoading } = useTestimonials(3);
  const testimonials = testimonialsData || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Client Testimonials
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear what our satisfied clients have to say about their experience
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-border bg-card">
                <CardContent className="p-8">
                  {/* Star rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <svg 
                        key={i}
                        className="w-5 h-5 text-accent fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground text-lg">
                      {testimonial.client_name}
                    </h4>
                    {testimonial.designation && (
                      <p className="text-sm text-muted-foreground">
                        {testimonial.designation}
                        {testimonial.company && `, ${testimonial.company}`}
                      </p>
                    )}
                    {testimonial.project_type && (
                      <p className="text-xs text-accent mt-1">
                        {testimonial.project_type}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
