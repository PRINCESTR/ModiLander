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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSend = async () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }
    if (rating === 0) {
      alert("Please select a star rating!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Using Formspree for background submission
      // REPLACE 'mqaejebg' with your actual Formspree ID
      const response = await fetch("https://formspree.io/f/mqaejebg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          rating: `${rating}/5 Stars`, 
          review: message || "No message provided" 
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setName("");
        setMessage("");
        setRating(0);
        // Reset success state after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[500px] mx-auto p-8 rounded-[32px] glass-panel mt-12 mb-6 border border-white/5 relative overflow-hidden">
      {/* Success Overlay */}
      {isSuccess && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-500">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h3 className="text-xl font-black text-white">Review Sent!</h3>
          <p className="text-sm text-white/40 mt-1">Thank you for your feedback.</p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner group">
          <IconStar size={24} color={rating > 0 ? "#fbbf24" : accentColor} className="transition-colors duration-300" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-black tracking-tight text-white/90">Rate the Game</h3>
          <span className="text-[10px] uppercase tracking-[4px] text-white/30 font-medium">Help us improve the maze</span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 px-1">
          <label className="text-[10px] uppercase tracking-[3px] text-white/40 font-bold">
            Rating <span className="text-red-500/60 ml-1 text-xs">*</span>
          </label>
          <div className="flex gap-2.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => !isSubmitting && setHoverRating(star)}
                onMouseLeave={() => !isSubmitting && setHoverRating(0)}
                onClick={() => !isSubmitting && setRating(star)}
                disabled={isSubmitting}
                className="transition-all duration-300 transform hover:scale-125 active:scale-90 disabled:opacity-50"
                aria-label={`Rate ${star} stars`}
              >
                <IconStar 
                  size={28} 
                  color={(hoverRating || rating) >= star ? "#fbbf24" : "rgba(255,255,255,0.08)"} 
                  className={`transition-all duration-300 ${rating >= star ? 'drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]' : ''}`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-[10px] font-black text-white/20 uppercase self-center tracking-widest animate-pulse">
                {rating}/5
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[3px] text-white/40 font-bold ml-1">
            Your Name <span className="text-red-500/60 ml-1 text-xs">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Rahul G."
            disabled={isSubmitting}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all placeholder:text-white/10 shadow-inner disabled:opacity-50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[3px] text-white/40 font-bold ml-1">Message</label>
          <textarea
            placeholder="Tell us what you liked or what's broken..."
            disabled={isSubmitting}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all placeholder:text-white/10 resize-none shadow-inner disabled:opacity-50"
          />
        </div>
      </div>

      <button
        onClick={handleSend}
        disabled={isSubmitting || rating === 0 || !name.trim()}
        className="group relative overflow-hidden rounded-2xl py-4 flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg mt-2 disabled:cursor-not-allowed"
        style={{ 
          background: rating > 0 && name.trim() ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` : "rgba(255,255,255,0.05)",
          border: `1px solid ${rating > 0 && name.trim() ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}`
        }}
      >
        <span className={`text-xs font-black tracking-[6px] uppercase transition-colors duration-300 ${rating > 0 && name.trim() ? "text-white" : "text-white/20"}`}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </span>
        {!isSubmitting && (
          <IconPlay size={12} color={rating > 0 && name.trim() ? "white" : "rgba(255,255,255,0.2)"} className="group-hover:translate-x-1 transition-transform" />
        )}
      </button>

      <p className="text-center text-[8px] text-white/20 uppercase tracking-[4px] mt-2 font-medium">
        Secure Submission &bull; Background Sync
      </p>
    </div>
  );
};

