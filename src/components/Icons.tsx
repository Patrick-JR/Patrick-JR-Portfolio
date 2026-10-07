import React from 'react';

// Brand Monogram "PM" matching the sleek cyber neon style
export const PMLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Patrick Mulenga Logo"
  >
    <rect width="44" height="44" rx="10" fill="#061226" />
    <path
      d="M12 12V32M12 12H21C23.7614 12 26 14.2386 26 17C26 19.7614 23.7614 22 21 22H12M24 32V18L29 25L34 18V32"
      stroke="#00E5FF"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// UpleX AI Stylized Neon Shield / Hexagon
export const UpleXLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-950/70 to-blue-950/80 border border-cyan-500/40 p-2 ${className}`}>
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-cyan-400">
      <path
        d="M6 8L16 3L26 8V18C26 23.5 16 29 16 29C16 29 6 23.5 6 18V8Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 12V17C11 19.5 13.2 21.5 16 21.5C18.8 21.5 21 19.5 21 17V12"
        stroke="#00E5FF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// BuyShare warm orange shopping basket / leaf badge
export const BuyShareLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-950/70 to-orange-950/80 border border-amber-500/40 p-2 ${className}`}>
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full text-amber-400">
      <circle cx="16" cy="16" r="12" stroke="#F59E0B" strokeWidth="2.2" />
      <path
        d="M10 14H22L20 22H12L10 14Z"
        stroke="#FBBF24"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 14V11C13 9.5 14.3 8.5 16 8.5C17.7 8.5 19 9.5 19 11V14"
        stroke="#FBBF24"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// Gifted Life colorful empowering tree emblem
export const GiftedLifeLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-950/70 to-teal-950/80 border border-emerald-500/40 p-2 ${className}`}>
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <circle cx="16" cy="16" r="13" fill="#042F2E" />
      <path
        d="M16 25V15M16 15C13 13 11 10 11 8C11 5.5 13 4 16 4C19 4 21 5.5 21 8C21 10 19 13 16 15ZM16 18C13 18 10 19 8 21M16 18C19 18 22 19 24 21"
        stroke="#34D399"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="8" r="2" fill="#F59E0B" />
      <circle cx="21" cy="8" r="2" fill="#38BDF8" />
      <circle cx="16" cy="5" r="2" fill="#EC4899" />
    </svg>
  </div>
);
