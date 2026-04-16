import React from 'react';
import { Link } from 'react-router';
import { FaCaretLeft } from 'react-icons/fa';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-[#04040f] text-white/80 font-sans p-6 md:p-12 relative overflow-y-auto">
      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-2xl mx-auto w-full glass-panel p-8 md:p-12 rounded-[24px] border border-white/10 bg-white/5 shadow-2xl relative z-10 mt-safe">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors mb-8 text-sm font-bold tracking-widest uppercase mb-6 drop-shadow-md">
          <FaCaretLeft /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-black text-white/90 mb-8 border-b border-white/10 pb-4 tracking-tight">About ModiLander</h1>
        
        <div className="space-y-6 text-sm leading-relaxed text-white/70">
          <p className="text-lg font-medium text-white/90">
            Welcome to ModiLander, a fast-paced, political satire maze arcade game built for the web.
          </p>
          
          <p>
            ModiLander takes the classic arcade chasing mechanics you know and love and injects them into a high-octane political arena. Navigate through the corridors of power, collect promises, activate power modes, and dodge the relentless opposition.
          </p>

          <div className="bg-black/30 p-6 rounded-xl border border-white/5 my-6">
            <h3 className="font-bold text-white/90 mb-2 uppercase tracking-widest text-xs">Entertainment Disclaimer</h3>
            <p className="text-white/60 italic">
              This application is a work of political satire created strictly for entertainment and amusement purposes. The characters, situations, and events depicted in this game are entirely fictional and exaggerated for comedic effect. It is not affiliated with, endorsed by, or meant to accurately represent any real-life political figures, parties, or organizations. 
            </p>
          </div>

          <p>
            Built using modern web technologies (React, Vite, HTML5 Canvas) by <strong>Prince & Smit</strong>, our goal was to engineer a premium, lightweight, and incredibly responsive experience that runs smoothly at 60 FPS on both mobile devices and desktops.
          </p>

          <p>
            We hope you have as much fun playing it as we had building it!
          </p>
        </div>
      </div>
    </div>
  );
};
