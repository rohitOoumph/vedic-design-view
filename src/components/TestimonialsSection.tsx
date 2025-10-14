import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    designation: 'Homeowner',
    project: 'Luxury Villa Interior',
    content: 'Vedic Interiors transformed our house into a dream home. Their attention to detail and understanding of our lifestyle needs was exceptional. The team delivered exactly what we envisioned, on time and within budget.',
    rating: 5
  },
  {
    name: 'Priya Sharma',
    designation: 'CEO, Tech Solutions Inc.',
    project: 'Corporate Office Design',
    content: 'Our new office space has become a source of inspiration for our team. Vedic Interiors created a perfect blend of functionality and aesthetics that truly reflects our brand identity. Highly recommended!',
    rating: 5
  },
  {
    name: 'Amit Patel',
    designation: 'Restaurant Owner',
    project: 'Commercial Interior',
    content: 'Working with Vedic Interiors was a pleasure from start to finish. Their creative approach and professional execution helped us create a unique dining experience for our customers. Exceptional work!',
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Client Testimonials
          </h2>
          <div className="h-1 w-24 bg-accent mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear what our satisfied clients have to say about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="hover:shadow-xl transition-all duration-300 border-border bg-card"
            >
              <CardContent className="p-8">
                {/* Star rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
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
                  "{testimonial.content}"
                </p>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-semibold text-foreground text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.designation}
                  </p>
                  <p className="text-xs text-accent mt-1">
                    {testimonial.project}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
