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

  const handleSend = (phone: string) => {
    if (rating === 0) {
      alert("Please select a star rating first!");
      return;
    }
    const starText = "⭐".repeat(rating);
    const text = encodeURIComponent(`Hi! I'm ${name || "a Player"}. Rating: ${rating}/5 ${starText}. Review: ${message}`);
    window.open(`https://wa.me/91${phone}?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-5 w-full max-w-[500px] mx-auto p-6 rounded-[24px] glass-panel mt-8 mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner">
          <IconStar size={20} color={rating > 0 ? "#fbbf24" : accentColor} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-black tracking-tight text-white/90">Send Review</h3>
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

      <div className="grid grid-cols-2 gap-3 mt-2">
        <button
          onClick={() => handleSend("9033640100")}
          className="group relative overflow-hidden rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-all active:scale-[0.98] bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">Prince</span>
          <IconPlay size={10} color="white" className="opacity-40 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={() => handleSend("9016590044")}
          className="group relative overflow-hidden rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-all active:scale-[0.98] bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">Smit</span>
          <IconPlay size={10} color="white" className="opacity-40 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <p className="text-center text-[7px] text-white/20 uppercase tracking-widest mt-1">
        Redirection will open WhatsApp &bull; Secure Submission
      </p>
    </div>
  );
};
