import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does personalization work?",
    a: "You share a few details about your child — their name, age, interests, and favorite things. StoryNest uses these to craft a unique story where your child is the hero, set in a world they'll love.",
  },
  {
    q: "What ages is StoryNest for?",
    a: "StoryNest stories are designed for children aged 2–10. The tone and complexity adjust based on the age you provide.",
  },
  {
    q: "Can I preview the book before paying?",
    a: "Yes! You can create and preview a story for free. If you love it, you can unlock the full book with all pages and illustrations.",
  },
  {
    q: "What format does the final book come in?",
    a: "Your book is delivered as a beautifully formatted digital book that you can read on any device and download to keep forever.",
  },
  {
    q: "Can I create more than one story?",
    a: "Absolutely. You can create as many stories as you'd like — each one personalized for a different child or a different world.",
  },
  {
    q: "Is my child's information kept private?",
    a: "Yes. We take privacy seriously. Your child's details are only used to personalize their story and are never shared with third parties.",
  },
];

const FAQ = () => (
  <section className="py-16 lg:py-24 bg-muted/30">
    <div className="max-w-2xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-10">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border rounded-xl bg-card px-5 shadow-sm"
          >
            <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
