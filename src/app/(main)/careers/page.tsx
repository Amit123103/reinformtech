"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Briefcase, Coffee, Heart, Map, Monitor, Star } from "lucide-react";
import { JobApplicationModal } from "@/components/sections/JobApplicationModal";

const benefits = [
  { icon: <Monitor className="w-6 h-6" />, title: "Remote-First", desc: "Work from anywhere. We provide a $2k home office stipend." },
  { icon: <Heart className="w-6 h-6" />, title: "Health & Wellness", desc: "Premium health, dental, and vision coverage for you and your family." },
  { icon: <Coffee className="w-6 h-6" />, title: "Flexible Hours", desc: "We care about output, not hours logged. Work when you are most productive." },
  { icon: <Map className="w-6 h-6" />, title: "Annual Retreats", desc: "Once a year, we fly the entire team to a beautiful destination for a week." },
];

const jobs = [
  { title: "Senior Full-Stack Engineer", dept: "Engineering", type: "Full-time", loc: "Remote (US/EU Timezones)" },
  { title: "Product Designer (Enterprise)", dept: "Design", type: "Full-time", loc: "Remote" },
  { title: "Cloud Security Architect", dept: "Engineering", type: "Full-time", loc: "Remote (US Only)" },
  { title: "Frontend Engineering Intern", dept: "Engineering", type: "Internship", loc: "Remote" },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="mb-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] tracking-tight mb-8">
              Do the best work of your career.
            </h1>
            <p className="text-xl text-[var(--color-muted)] leading-relaxed mb-10">
              We're a remote-first team of builders who value autonomy, deep work, and delivering exceptional quality without the enterprise bloat.
            </p>
            <Button size="lg" className="bg-[var(--color-text)] text-[var(--color-background)] hover:bg-[var(--color-muted)]">
              View Open Positions
            </Button>
          </div>
        </Container>
      </section>

      {/* Culture Gallery */}
      <section className="mb-24 overflow-hidden">
        <div className="flex gap-4 px-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          <div className="min-w-[80vw] md:min-w-[40vw] h-[400px] snap-center rounded-3xl overflow-hidden shrink-0 border border-[var(--color-border)]">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Team meeting" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-[80vw] md:min-w-[40vw] h-[400px] snap-center rounded-3xl overflow-hidden shrink-0 border border-[var(--color-border)]">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Company retreat" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-[80vw] md:min-w-[40vw] h-[400px] snap-center rounded-3xl overflow-hidden shrink-0 border border-[var(--color-border)]">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Collaborative workspace" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-24 py-24 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <Container>
          <SectionHeading title="Benefits" eyebrow="Why Join Us" align="left" className="mb-16" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="p-6 bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors">
                <div className="w-12 h-12 bg-[var(--color-surface)] rounded-full flex items-center justify-center text-[var(--color-accent)] mb-6">
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] mb-3">{b.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <section>
        <Container>
          <SectionHeading title="Open Roles" eyebrow="Join The Team" align="left" className="mb-12" />
          <div className="flex flex-col gap-4">
            {jobs.map((job, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                    <span className="text-[var(--color-accent)]">{job.dept}</span>
                    <span className="text-[var(--color-muted)] border-l border-[var(--color-border)] pl-3">{job.type}</span>
                    <span className="text-[var(--color-muted)] border-l border-[var(--color-border)] pl-3">{job.loc}</span>
                  </div>
                </div>
                <Button onClick={() => setSelectedJob(job.title)} className="mt-6 md:mt-0 md:w-auto w-full">Apply Now</Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <JobApplicationModal 
        jobTitle={selectedJob || ""} 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </div>
  );
}
