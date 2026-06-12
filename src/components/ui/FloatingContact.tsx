"use client";

import { Phone, Instagram } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/1234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
      </a>

      {/* Instagram Button */}
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300"
        aria-label="Follow us on Instagram"
      >
        <Instagram className="w-5 h-5" />
      </a>

      {/* Phone Button */}
      <a 
        href="tel:+1234567890" 
        className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300"
        aria-label="Call Us"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
