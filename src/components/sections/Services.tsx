import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Code2, Smartphone, Layout, Cloud, Bot, Palette } from "lucide-react";

const services = [
  {
    title: "Custom Software",
    description: "We build software that actually works the way your team does. No bloated features, just tools designed to fix your specific bottlenecks.",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Web Development",
    description: "Fast, reliable websites built with modern tools. We focus on clean code so your site stays quick and doesn't break.",
    icon: Layout,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mobile App Development",
    description: "Apps that your customers will actually enjoy using, whether they're on an iPhone or an Android.",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "UI/UX Design",
    description: "We design interfaces that make sense. If your users need a manual to figure out your software, we haven't done our job.",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cloud Solutions",
    description: "We set up your servers and infrastructure so they don't crash when you finally get that big spike in traffic.",
    icon: Cloud,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AI & Automation",
    description: "We write scripts to handle the boring, repetitive tasks so your team can focus on the real work.",
    icon: Bot,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export function Services() {
  return (
    <section id="services" className="pt-24 lg:pt-32 pb-12 lg:pb-16 bg-[var(--color-background)]">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Our Services"
            title="What we do best"
            description="We don't do everything, but what we do, we do really well. Here's how we can help you build your next idea."
            align="center"
            className="mb-12 md:mb-16 [&_h2]:text-xl [&_h2]:md:text-2xl [&_p]:text-sm [&_p]:md:text-base max-w-2xl mx-auto"
          />
        </AnimateOnScroll>

        <AnimateOnScroll variants={staggerContainer}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <AnimateOnScroll key={service.title} variants={fadeUp}>
                <Card className="h-full group relative overflow-hidden border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-500">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover opacity-10 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/90 to-[var(--color-surface)]/60"></div>
                  </div>
                  
                  {/* Card Content */}
                  <CardHeader className="relative z-10 pt-8">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center mb-6 shadow-sm group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors duration-500">
                      <service.icon className="w-6 h-6 text-[var(--color-accent)] group-hover:text-white transition-colors duration-500" />
                    </div>
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10 pb-8">
                    <CardDescription className="text-sm leading-relaxed text-[var(--color-muted)] group-hover:text-[var(--color-primary)]/80 transition-colors duration-300">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
