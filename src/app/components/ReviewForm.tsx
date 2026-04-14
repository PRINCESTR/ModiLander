import React, { useState } from "react";
import { IconStar, IconPlay } from "./Icons";

interface ReviewFormProps {
  accentColor?: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ accentColor = "#f97316" }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    if (!name.trim() || rating === 0) {
      alert("Please provide your name and a star rating!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Using Formspree (placeholder mpzeodzo) for background collection to vkpk90100@gmail.com
      await fetch("https://formspree.io/f/mqaejebg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating: `${rating}/5 Stars`, target: "vkpk90100@gmail.com" }),
      });
      setIsSent(true);
    } catch (e) {
      alert("Submission failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <div className="w-full max-w-[400px] mx-auto p-12 glass-panel rounded-[32px] border border-white/5 text-center mt-12 mb-6 animate-in fade-in zoom-in duration-500">
        <div className="text-3xl mb-4">✨</div>
        <h3 className="text-sm font-black tracking-[4px] uppercase text-white/60">Thank You!</h3>
        <p className="text-[10px] text-white/20 uppercase tracking-widest mt-2">Your 5-star rating matters.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-[400px] mx-auto p-8 rounded-[32px] glass-panel border border-white/5 mt-12 mb-6 text-center">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-black tracking-[6px] uppercase text-white/40">Rate the Game</h3>
        <div className="h-px w-12 bg-white/10 mx-auto mt-2" />
      </div>

      <div className="flex justify-center gap-3 py-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onMouseEnter={() => !isSubmitting && setHoverRating(s)}
            onMouseLeave={() => !isSubmitting && setHoverRating(0)}
            onClick={() => !isSubmitting && setRating(s)}
            className="transition-all duration-300 transform hover:scale-125 active:scale-95"
          >
            <IconStar 
              size={32} 
              color={(hoverRating || rating) >= s ? "#fbbf24" : "rgba(255,255,255,0.04)"} 
              className={rating >= s ? "drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]" : ""}
            />
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isSubmitting}
        className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white text-center focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10 font-bold tracking-widest uppercase"
      />

      <button
        onClick={handleSend}
        disabled={isSubmitting || rating === 0 || !name.trim()}
        className="py-4 px-8 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black tracking-[6px] uppercase transition-all hover:bg-white/10 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Submit Rating"}
      </button>

      <p className="text-[7px] text-white/10 uppercase tracking-[4px]">
        Secure Background Submission
      </p>
    </div>
  );
};
