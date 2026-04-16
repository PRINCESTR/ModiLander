import React from 'react';
import { Link } from 'react-router';
import { FaCaretLeft, FaEnvelope } from 'react-icons/fa';

export const ContactPage: React.FC = () => {
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
        
        <h1 className="text-3xl md:text-4xl font-black text-white/90 mb-8 border-b border-white/10 pb-4 tracking-tight">Contact Us</h1>
        
        <div className="space-y-6 text-sm leading-relaxed text-white/70">
          <p className="text-lg font-medium text-white/90 mb-2">
            Have questions, feedback, or found a bug? We'd love to hear from you.
          </p>
          
          <p>
            ModiLander is actively maintained. If you encounter any issues during gameplay or have suggestions for new features, please don't hesitate to reach out. We are always looking for ways to improve the arcade experience.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <h3 className="font-bold text-white/80 uppercase tracking-widest text-xs">Direct Email</h3>
            <a 
              href="mailto:contact@modilander.com" 
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl px-6 py-4 w-fit group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaEnvelope className="text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/40 uppercase tracking-wider font-bold">Email us at</span>
                <span className="text-white font-medium text-base">contact@modilander.com</span>
              </div>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <h3 className="font-bold text-white/80 uppercase tracking-widest text-xs mb-3">For AdSense & Business Inquiries</h3>
            <p className="text-white/50 text-xs">
              Please use the email address above with the subject line <strong>[Business Inquiry]</strong> so it can be routed to the appropriate team member.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
