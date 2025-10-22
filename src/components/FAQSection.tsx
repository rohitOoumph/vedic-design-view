import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: 'How long does a typical interior design project take?',
      answer: 'Project timelines vary based on scope and size. A residential project typically takes 2-3 months, while commercial projects may take 3-6 months. We provide a detailed timeline during the planning phase.'
    },
    {
      question: 'Do you provide 3D visualizations before execution?',
      answer: 'Yes, we create detailed 3D renderings and walkthroughs so you can visualize your space before any work begins. This ensures you\'re completely satisfied with the design.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'Our pricing is transparent and customized based on project scope, materials, and complexity. We offer flexible packages for different budgets and provide detailed quotations upfront.'
    },
    {
      question: 'Do you handle all aspects including civil work?',
      answer: 'Yes, we offer complete turnkey solutions including civil work, electrical, plumbing, furniture, and décor. You can also opt for specific services based on your needs.'
    },
    {
      question: 'What if I want to make changes during the project?',
      answer: 'We welcome your feedback and accommodate reasonable changes. Major modifications may affect timeline and costs, which we\'ll discuss transparently before proceeding.'
    },
    {
      question: 'Do you provide warranty on your work?',
      answer: 'Yes, we provide warranty coverage on our workmanship and installations. Specific warranty periods vary by component and are detailed in your project agreement.'
    },
    {
      question: 'Can you work within my existing budget?',
      answer: 'Absolutely! We specialize in creating beautiful spaces across various budget ranges. During consultation, we\'ll suggest the best solutions that align with your financial plans.'
    },
    {
      question: 'Do you source materials or can I provide my own?',
      answer: 'We typically source all materials to ensure quality and warranty. However, we\'re flexible and can incorporate client-sourced materials with prior discussion.'
    }
  ];

  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about working with us
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 hover:border-accent/50 transition-colors"
              >
                <AccordionTrigger className="text-left hover:text-accent hover:no-underline py-6">
                  <span className="text-lg font-display font-semibold pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
