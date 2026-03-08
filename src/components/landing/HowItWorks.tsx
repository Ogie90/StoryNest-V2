const steps = [
  {
    number: "1",
    title: "Tell Us About Your Child",
    description: "Share their name, age, interests, and the little details that make them special.",
  },
  {
    number: "2",
    title: "We Craft a Personalized Story",
    description: "Our system weaves a unique narrative with custom characters and illustrations just for them.",
  },
  {
    number: "3",
    title: "Preview, Unlock & Keep",
    description: "Preview your story for free, then unlock the full experience to read and revisit anytime.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-16 lg:py-24">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-4">
        How It Works
      </h2>
      <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">
        Three simple steps to create a story your child will never forget.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground text-xl font-bold flex items-center justify-center mx-auto mb-5">
              {step.number}
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
