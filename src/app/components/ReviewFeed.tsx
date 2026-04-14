import React from "react";
import { IconStar } from "./Icons";

const REVIEWS = [
  { name: "Arvind K.", rating: 5, text: "Masterstroke! The ghost AI feels as real as my actual opposition." },
  { name: "Mamata B.", rating: 4, text: "Khela Hobe! I love the speed on Hard mode." },
  { name: "Yogi A.", rating: 5, text: "Bulldozing through the maze is very satisfying. 56-inch logic!" },
  { name: "Nitish K.", rating: 3, text: "I keep switching sides (of the screen) to avoid the ghosts." },
  { name: "Stalin M.", rating: 4, text: "The cool blue theme for Rahul G is very refreshing." },
  { name: "Pawan K.", rating: 5, text: "Original idea, great sarcasm. Totally fun game!" },
  { name: "Akhilesh Y.", rating: 4, text: "Cycling through the maze is fun, but where are my cycle tracks?" },
];

export const ReviewFeed: React.FC = () => {
  return (
    <div className="w-full mt-12 mb-8 overflow-hidden relative group">
      <div className="flex flex-col items-center mb-8">
        <h3 className="text-[10px] font-black tracking-[6px] text-white/30 uppercase">Neta Review Feed</h3>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent mt-3" />
      </div>

      {/* Marquee Container */}
      <div className="flex gap-6 neta-marquee-track whitespace-nowrap py-4 hover:pause-neta-marquee">
        {/* Double the array for seamless looping */}
        {[...REVIEWS, ...REVIEWS].map((rev, i) => (
          <div key={i} className="inline-flex flex-col gap-3 p-6 rounded-[24px] glass-panel bg-white/3 border border-white/5 min-w-[300px] backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-black tracking-widest text-white/70 uppercase">{rev.name}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <IconStar key={j} size={12} color={j < rev.rating ? "#fbbf24" : "rgba(255,255,255,0.05)"} />
                ))}
              </div>
            </div>
            <p className="text-[12px] text-white/40 leading-relaxed italic whitespace-normal font-medium tracking-wide">
              "{rev.text}"
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .neta-marquee-track {
          display: flex;
          width: fit-content;
          animation: neta-marquee 40s linear infinite;
        }
        @keyframes neta-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hover\\:pause-neta-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
