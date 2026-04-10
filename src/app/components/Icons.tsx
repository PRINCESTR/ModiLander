import React from "react";

type P = { size?: number; color?: string; className?: string; style?: React.CSSProperties };

export const IconVolume = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={color} stroke="none" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

export const IconMute = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={color} stroke="none" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

export const IconShare = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

export const IconInstagram = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
  </svg>
);

export const IconGitHub = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export const IconTrophy = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 22V18" />
    <path d="M14 22V18" />
    <path d="M8 21c0-3.31 1.79-6 4-6s4 2.69 4 6" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
);

export const IconSkull = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="12" r="1" fill={color} stroke="none" />
    <circle cx="15" cy="12" r="1" fill={color} stroke="none" />
    <path d="M8 20v2h8v-2" />
    <path d="M12.5 17v-1h-1v1" />
    <path d="M16 20a2 2 0 0 0 2-2V9.5a6.5 6.5 0 1 0-13 0V18a2 2 0 0 0 2 2z" />
  </svg>
);

export const IconHome = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const IconPlay = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const IconCamera = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export const IconX = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const IconRefresh = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

export const IconArrowLeft = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const IconStar = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// Life icon for Modi (lotus-inspired abstract dot-ring shape)
export const IconLifeModi = ({ size = 18, color = "#f97316", dim = false }: { size?: number; color?: string; dim?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ opacity: dim ? 0.2 : 1, transition: "opacity 0.3s" }}>
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" />
    <circle cx="10" cy="10" r="3.5" fill={color} />
    <circle cx="10" cy="2" r="1.5" fill={color} opacity="0.6" />
    <circle cx="10" cy="18" r="1.5" fill={color} opacity="0.6" />
    <circle cx="2" cy="10" r="1.5" fill={color} opacity="0.6" />
    <circle cx="18" cy="10" r="1.5" fill={color} opacity="0.6" />
  </svg>
);

// Life icon for Rahul (hand waving abstract)
export const IconLifeRahul = ({ size = 18, color = "#3b82f6", dim = false }: { size?: number; color?: string; dim?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ opacity: dim ? 0.2 : 1, transition: "opacity 0.3s" }}>
    <rect x="3" y="8" width="2.5" height="9" rx="1.25" fill={color} />
    <rect x="6.5" y="5" width="2.5" height="12" rx="1.25" fill={color} />
    <rect x="10" y="6.5" width="2.5" height="10.5" rx="1.25" fill={color} />
    <rect x="13.5" y="8" width="2.5" height="9" rx="1.25" fill={color} />
    <path d="M3 8C3 6 4.5 5 5.5 6" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// Download arrow
export const IconDownload = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// LinkedIn Icon
export const IconLinkedIn = ({ size = 16, color = "currentColor", className = "" }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);
