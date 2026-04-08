import React from "react";
import { LuX, LuTwitter, LuLink as LinkIcon, LuDownload } from "react-icons/lu";
import { FaWhatsapp, FaSms } from "react-icons/fa";
import { Button } from "./Button";

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  score?: number;
  screenshotUrl?: string | null;
}

export const ShareSheet: React.FC<ShareSheetProps> = ({ isOpen, onClose, score, screenshotUrl }) => {
  if (!isOpen) return null;

  const shareText = `I scored ${score || 0} points in MODI_LANDER! 🏆 Can you beat me? Play here: https://modiman-xi.vercel.app/ — Built by PRINCE & SMIT`;
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    sms: `sms:?body=${encodedText}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://modiman-xi.vercel.app/");
    alert("Link copied to clipboard!");
  };

  const handleDownloadScreenshot = () => {
    if (!screenshotUrl) return;
    const a = document.createElement("a");
    a.href = screenshotUrl;
    a.download = "modiman_score.png";
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md sm:items-center p-4 animate-in fade-in duration-300 font-sans">
      <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-background/90 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl slide-in-from-bottom-full sm:slide-in-from-bottom-10 transition-all duration-500 relative overflow-hidden">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary/50 blur-[2px] rounded-b-full"></div>
        
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-widest text-primary drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            SHARE SCORE
          </h2>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[8px] tracking-[3px] text-white/30 font-bold uppercase">MODI_LANDER</span>
            <span className="text-[7px] tracking-[2px] text-white/20">by PRINCE &amp; SMIT</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors bg-white/5 p-2 rounded-full"
          >
            <LuX size={18} />
          </button>
        </div>

        {/* Screenshot preview */}
        {screenshotUrl && (
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="p-2 bg-white/5 border border-white/10 rounded-2xl w-full">
              <img
                src={screenshotUrl}
                alt="Score screenshot"
                className="w-full rounded-xl object-contain max-h-48 drop-shadow-lg"
              />
            </div>
            <button
              onClick={handleDownloadScreenshot}
              className="flex items-center gap-2 text-xs tracking-widest font-bold text-accent hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all bg-accent/10 px-4 py-2 rounded-full"
            >
              <LuDownload size={16} /> SAVE SCREENSHOT
            </button>
          </div>
        )}

        {score !== undefined && (
          <div className="mb-8 text-center text-sm tracking-wide text-white/80 font-medium">
            I SCORED <span className="text-primary font-bold text-lg">{score}</span> POINTS!
          </div>
        )}

        <div className="grid grid-cols-4 gap-4">
          <a 
            href={shareLinks.whatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-[0_5px_15px_rgba(0,229,255,0.3)] group-hover:-translate-y-1 transition-all duration-300">
              <FaWhatsapp size={24} className="text-white/80 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-[10px] tracking-widest font-semibold text-white/40 group-hover:text-primary transition-colors">WA</span>
          </a>
          
          <a 
            href={shareLinks.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-[0_5px_15px_rgba(0,229,255,0.3)] group-hover:-translate-y-1 transition-all duration-300">
              <LuTwitter size={24} className="text-white/80 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-[10px] tracking-widest font-semibold text-white/40 group-hover:text-primary transition-colors">X</span>
          </a>

          <a 
            href={shareLinks.sms}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-[0_5px_15px_rgba(0,229,255,0.3)] group-hover:-translate-y-1 transition-all duration-300">
              <FaSms size={24} className="text-white/80 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-[10px] tracking-widest font-semibold text-white/40 group-hover:text-primary transition-colors">SMS</span>
          </a>

          <button 
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-[0_5px_15px_rgba(0,229,255,0.3)] group-hover:-translate-y-1 transition-all duration-300">
              <LinkIcon size={22} className="text-white/80 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-[10px] tracking-widest font-semibold text-white/40 group-hover:text-primary transition-colors">COPY</span>
          </button>
        </div>

        <div className="mt-6">
          <Button variant="secondary" className="w-full text-xs py-3" onClick={onClose}>
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
};
