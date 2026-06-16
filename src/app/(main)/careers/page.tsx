"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Briefcase, Coffee, Heart, Map, Monitor, Star, Loader2 } from "lucide-react";
import { JobApplicationModal } from "@/components/sections/JobApplicationModal";

const benefits = [
  { icon: <Monitor className="w-6 h-6" />, title: "Remote-First", desc: "Work from anywhere. We provide a $2k home office stipend." },
  { icon: <Heart className="w-6 h-6" />, title: "Health & Wellness", desc: "Premium health, dental, and vision coverage for you and your family." },
  { icon: <Coffee className="w-6 h-6" />, title: "Flexible Hours", desc: "We care about output, not hours logged. Work when you are most productive." },
  { icon: <Map className="w-6 h-6" />, title: "Annual Retreats", desc: "Once a year, we fly the entire team to a beautiful destination for a week." },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/careers');
        const data = await res.json();
        if (res.ok) {
          setJobs(data);
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Ensure we have enough items to fill the screen for a smooth marquee loop
  let baseJobs = [...jobs];
  if (baseJobs.length > 0) {
    while (baseJobs.length < 8) {
      baseJobs = [...baseJobs, ...jobs];
    }
  }
  const displayJobs = [...baseJobs, ...baseJobs];

  return (
    <div className="pb-24">
      {/* Custom Styles for Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Hero with Visible Background Image */}
      <section className="relative pt-40 pb-32 mb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Office Team Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-[2px]"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Reduced heading sizes from 4xl/5xl/6xl to 3xl/4xl */}
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              Do the best work of your career.
            </h1>
            {/* Reduced text-xl to text-base/lg */}
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8">
              We're a remote-first team of builders who value autonomy, deep work, and delivering exceptional quality without the enterprise bloat.
            </p>
            <Button size="md" className="bg-white text-black hover:bg-gray-100 font-semibold" onClick={() => {
              document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              View Open Positions
            </Button>
          </div>
        </Container>
      </section>

      {/* Open Positions Marquee */}
      <section id="open-roles" className="mb-24 overflow-hidden">
        <Container>
          <SectionHeading title="Open Roles" eyebrow="Join The Team" align="center" className="mb-12" />
        </Container>
          
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--color-muted)]" />
          </div>
        ) : jobs.length > 0 ? (
          <div className="w-full relative py-4">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-background)] to-transparent z-10 hidden md:block" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-background)] to-transparent z-10 hidden md:block" />
            
            <div className="animate-scroll">
              {/* Repeated array to create seamless loop effect */}
              {displayJobs.map((job, index) => (
                <div 
                  key={`${job.id}-${index}`} 
                  className="mx-4 w-[350px] shrink-0 flex flex-col p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[var(--color-text)] mb-3 line-clamp-1" title={job.title}>
                      {job.title}
                    </h3>
                    <div className="flex flex-col gap-2 text-sm font-medium">
                      <span className="text-[var(--color-accent)] flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> {job.department}
                      </span>
                      <span className="text-[var(--color-muted)] flex items-center gap-2">
                        <Coffee className="w-4 h-4" /> {job.type}
                      </span>
                      <span className="text-[var(--color-muted)] flex items-center gap-2">
                        <Map className="w-4 h-4" /> {job.location}
                      </span>
                    </div>
                  </div>
                  <Button onClick={() => setSelectedJob(job.title)} className="mt-6 w-full shadow-sm">
                    Apply Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Container>
            <div className="text-center p-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl text-[var(--color-muted)] shadow-sm">
              <p>There are no open positions at the moment. Please check back later.</p>
            </div>
          </Container>
        )}
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

      {/* Culture Gallery */}
      <section className="mb-24 overflow-hidden">
        <Container>
           <SectionHeading title="Life at TechZen" eyebrow="Culture" align="left" className="mb-12" />
        </Container>
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

      <JobApplicationModal 
        jobTitle={selectedJob || ""} 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </div>
  );
}
