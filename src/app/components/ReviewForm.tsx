import React, { useState } from "react";
import { IconStar, IconPlay } from "./Icons";

interface ReviewFormProps {
  accentColor?: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ accentColor = "#f97316" }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSend = () => {
    if (rating === 0) {
      alert("Please select a star rating first!");
      return;
    }
    const starText = "⭐".repeat(rating);
    const text = encodeURIComponent(`Hi! Here's my vote: ${rating}/5 ${starText}. Review: ${message}`);
    
    const phones = ["9033640100", "9016590044"];
    
    // Attempt to open both (browsers may ask for permission for the second popup)
    phones.forEach((phone, index) => {
      setTimeout(() => {
        window.open(`https://wa.me/91${phone}?text=${text}`, "_blank");
      }, index * 500); // 500ms delay between opens to help avoid popup blockers
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-[500px] mx-auto p-6 rounded-[24px] glass-panel mt-8 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner">
          <IconStar size={20} color={rating > 0 ? "#fbbf24" : accentColor} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-black tracking-tight text-white/90">Submit Your Vote</h3>
          <span className="text-[9px] uppercase tracking-[3px] text-white/40">Your feedback matters</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Star Rating System */}
        <div className="flex flex-col gap-1.5 px-1">
          <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold ml-1">Your Rating</label>
          <div className="flex gap-2.5 ml-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(s)}
                className="transition-transform hover:scale-125 active:scale-95"
              >
                <IconStar 
                  size={26} 
                  color={(hoverRating || rating) >= s ? "#fbbf24" : "rgba(255,255,255,0.08)"} 
                  className={rating >= s ? "drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]" : ""}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-widest text-white/40 ml-1">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase tracking-widest text-white/40 ml-1">Your Review</label>
          <textarea
            placeholder="Tell us what you think about the game..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10 resize-none"
          />
        </div>
      </div>

      <div className="mt-2">
        <button
          onClick={handleSend}
          className="w-full group relative overflow-hidden rounded-xl py-4 px-4 flex items-center justify-center gap-3 transition-all active:scale-[0.98] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
        >
          <div className="flex -space-x-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse ring-2 ring-black/20" />
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75 ring-2 ring-black/20" />
          </div>
          <span className="text-[11px] font-black tracking-[4px] uppercase text-white">Submit Your Vote</span>
          <IconPlay size={10} color="white" className="opacity-40 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <p className="text-center text-[7px] text-white/20 uppercase tracking-widest mt-1">
        Redirection will open WhatsApp &bull; Secure Submission
      </p>
    </div>
  );
};
