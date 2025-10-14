const AboutSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            About Vedic Interiors
          </h2>
          
          <div className="h-1 w-24 bg-accent mx-auto mb-8" />
          
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            Since 2015, Vedic Architects & Interiors has been at the forefront of creating 
            exceptional spaces that inspire and elevate everyday experiences. As a multidisciplinary 
            design firm, we specialize in residential interiors, corporate offices, architectural 
            planning, and turnkey execution.
          </p>
          
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Our mission is simple yet profound: to transform spaces into environments that enhance 
            living and working experiences through thoughtful design, meticulous quality execution, 
            and unwavering client-centric solutions.
          </p>

          <div className="inline-block px-8 py-4 bg-accent/10 border-l-4 border-accent">
            <p className="text-2xl font-display text-accent font-semibold">
              "Creating Happiness Through Design"
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">Premium materials and expert craftsmanship</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">On-Time Delivery</h3>
              <p className="text-muted-foreground">Efficient project management and execution</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Client-Centric</h3>
              <p className="text-muted-foreground">Your vision, our expertise, perfect harmony</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
