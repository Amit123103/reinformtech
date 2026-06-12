import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { HeartPulse, Landmark, ShoppingBag, Building2, GraduationCap, Truck } from "lucide-react";

const industries = [
  {
    title: "Healthcare & MedTech",
    description: "HIPAA-compliant platforms, telemedicine apps, and patient management systems.",
    icon: HeartPulse,
  },
  {
    title: "Finance & FinTech",
    description: "Secure banking portals, crypto trading platforms, and payment gateways.",
    icon: Landmark,
  },
  {
    title: "Retail & E-Commerce",
    description: "Scalable online stores, inventory management, and custom marketplaces.",
    icon: ShoppingBag,
  },
  {
    title: "Real Estate & PropTech",
    description: "Property listing platforms, virtual tour integrations, and CRM tools.",
    icon: Building2,
  },
  {
    title: "Education & EdTech",
    description: "E-learning platforms, student portals, and virtual classroom software.",
    icon: GraduationCap,
  },
  {
    title: "Logistics & Supply Chain",
    description: "Fleet tracking, warehouse management, and delivery routing apps.",
    icon: Truck,
  },
];

export function Industries() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--color-background)]">
      <Container>
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Industries"
            title="Domains we serve"
            description="We build specialized software solutions tailored to the unique challenges and regulatory requirements of your specific industry."
            className="mb-16"
          />
        </AnimateOnScroll>

        <AnimateOnScroll variants={staggerContainer}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <AnimateOnScroll key={industry.title} variants={fadeUp}>
                <Card className="h-full group hover:shadow-lg transition-all duration-300 border-[var(--color-border)] bg-[var(--color-surface)]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)] transition-colors duration-300">
                      <industry.icon className="w-6 h-6 text-[var(--color-primary)] group-hover:text-[var(--color-background)] transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-lg">{industry.title}</CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {industry.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  );
}
