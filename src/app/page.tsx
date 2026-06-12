import { Hero } from "@/components/sections/Hero";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { Services } from "@/components/sections/Services";
import { ImageShowcase } from "@/components/sections/ImageShowcase";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { MultiStepContact } from "@/components/sections/MultiStepContact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChoose />
      <ImageShowcase />
      <Process />
      <TrustSignals />
      <Industries />
      <Testimonials />
      <Team />
      <MultiStepContact />
    </>
  );
}
