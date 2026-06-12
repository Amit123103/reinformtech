import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Users, Zap, ShieldCheck, HeartHandshake } from "lucide-react";

const pillars = [
  {
    title: "Experienced Team",
    description: "Senior engineers and designers with a track record of delivering at scale.",
    stat: "10+",
    statLabel: "Years Avg Experience",
    icon: Users,
  },
  {
    title: "Fast Delivery",
    description: "Agile methodologies that get your product to market faster without sacrificing quality.",
    stat: "40%",
    statLabel: "Faster Time-to-Market",
    icon: Zap,
  },
  {
    title: "Transparent Process",
    description: "Clear communication, regular updates, and no black boxes. You're involved every step.",
    stat: "100%",
    statLabel: "Code Visibility",
    icon: ShieldCheck,
  },
  {
    title: "Long-Term Support",
    description: "We don't just ship and run. We partner with you to maintain and scale your application.",
    stat: "24/7",
    statLabel: "Dedicated Support",
    icon: HeartHandshake,
  },
];

export function WhyChoose() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimateOnScroll>
            <SectionHeading
              eyebrow="Why Choose TechZen"
              title="Why work with us?"
              description="We're builders at heart. We don't just write code; we care about the success of your business. Here's what you can expect when you partner with us."
              className="mb-8"
            />
            <div className="flex gap-6 mt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-[var(--color-primary)] mb-1">98%</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Client Retention</span>
              </div>
              <div className="w-px h-12 bg-[var(--color-border)] mx-2" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-[var(--color-primary)] mb-1">200+</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Projects Shipped</span>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variants={staggerContainer}>
            <div className="grid sm:grid-cols-2 gap-8">
              {pillars.map((pillar, index) => (
                <AnimateOnScroll key={pillar.title} variants={fadeUp}>
                  <div className="flex flex-col">
                    <div className="w-10 h-10 rounded bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                      <pillar.icon className="w-5 h-5 text-[var(--color-accent)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-[var(--color-muted)] mb-4 text-balance">
                      {pillar.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
                      <div className="font-semibold text-[var(--color-primary)]">{pillar.stat}</div>
                      <div className="text-xs text-[var(--color-muted)] uppercase tracking-wider">{pillar.statLabel}</div>
                    </div>
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
