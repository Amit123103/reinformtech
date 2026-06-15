"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface JobApplicationModalProps {
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export function JobApplicationModal({ jobTitle, isOpen, onClose }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    coverLetter: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: jobTitle,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit application");

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-background)] shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text)]">Apply for {jobTitle}</h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">Please fill out the details below.</p>
          </div>
          <button onClick={onClose} className="text-[var(--color-muted)] hover:text-[var(--color-text)] p-2">
            ✕
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Application Received!</h3>
              <p className="text-[var(--color-muted)] mb-6">
                Thank you for applying. We've sent a confirmation to your email. We'll be in touch soon.
              </p>
              <Button onClick={onClose} className="w-full">Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
                  {error}
                </div>
              )}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--color-text)]">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--color-text)]">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--color-text)]">LinkedIn or Portfolio URL</label>
                <input
                  required
                  type="url"
                  value={formData.portfolio}
                  onChange={e => setFormData(p => ({ ...p, portfolio: e.target.value }))}
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-[var(--color-text)]">Cover Letter or Resume Link</label>
                <textarea
                  required
                  rows={4}
                  value={formData.coverLetter}
                  onChange={e => setFormData(p => ({ ...p, coverLetter: e.target.value }))}
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 resize-none"
                  placeholder="Tell us why you are a great fit..."
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={onClose} className="w-full px-4 py-2 border border-[var(--color-border)] text-[var(--color-text)] rounded-lg font-medium hover:bg-[var(--color-background)]" disabled={loading}>
                  Cancel
                </button>
                <Button type="submit" className="w-full bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
