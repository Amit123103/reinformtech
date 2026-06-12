import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and technical requirements.",
  },
  {
    number: "02",
    title: "Planning",
    description: "Creating comprehensive architecture, timelines, and establishing project milestones.",
  },
  {
    number: "03",
    title: "Design",
    description: "Crafting wireframes, prototypes, and high-fidelity UI that aligns with your brand.",
  },
  {
    number: "04",
    title: "Development",
    description: "Writing clean, scalable code using modern technologies and best practices.",
  },
  {
    number: "05",
    title: "Testing",
    description: "Rigorous QA, automated testing, and performance optimization before launch.",
  },
  {
    number: "06",
    title: "Launch",
    description: "Seamless deployment, monitoring, and transition to ongoing support phases.",
  },
];

export function Process() {
  return (
    <section className="pt-24 lg:pt-32 pb-12 lg:pb-16 bg-[var(--color-background)]">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Our Process"
            title="How we work together"
            description="No black boxes. We believe in building out in the open, keeping you in the loop from the first sketch to the final deployment."
            align="center"
            className="mb-20"
          />
        </AnimateOnScroll>

        <div className="relative">
          {/* Desktop continuous line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-[var(--color-border)] -translate-y-1/2 z-0" />
          
          {/* Mobile continuous vertical line */}
          <div className="md:hidden absolute top-0 bottom-0 left-[27px] w-px bg-[var(--color-border)] z-0" />

          <AnimateOnScroll variants={staggerContainer}>
            <div className="grid md:grid-cols-6 gap-8 md:gap-4 relative z-10">
              {processSteps.map((step, index) => (
                <AnimateOnScroll key={step.number} variants={fadeUp} className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-0">
                  {/* Step Number Dot */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)] font-bold text-lg md:mb-6 shadow-sm z-10 transition-transform hover:scale-110 hover:bg-[var(--color-primary)] hover:text-white duration-300">
                    {step.number}
                  </div>
                  
                  {/* Content */}
                  <div className="md:text-center mt-1 md:mt-0">
                    <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">{step.title}</h3>
                    <p className="text-sm text-[var(--color-muted)] text-balance md:px-2">{step.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}
