import React from "react";

export const SEOFooter: React.FC = () => {
  return (
    <footer id="seo-content" className="w-full bg-[#04040f] border-t border-white/5 py-16 px-6 sm:px-12 z-0 relative flex flex-col items-center selection:bg-white/20">
      <div className="max-w-4xl w-full flex flex-col gap-8 text-center sm:text-left text-white/70 font-sans">
        
        <div>
          <h1 className="text-3xl font-black text-white/90 tracking-tight mb-3">ModiLander — The Ultimate Political Maze Game</h1>
          <p className="text-base leading-relaxed">
            Welcome to <strong>ModiLander</strong>, India's most sarcastic, premium, and thrilling web-based arcade game! Experience high-octane maze chasing action right in your browser. Choose your favorite politician—whether it's the charismatic Modiji or the philosophizing Rahul G—and outrun the opposition through dynamically styled labyrinths. This game is highly optimized for mobile devices and desktop play.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="glass-panel rounded-2xl p-6 bg-white/5 border border-white/10 text-left">
            <h2 className="text-xl font-bold text-white/90 mb-3">🎮 How to Play</h2>
            <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
              <li><strong>Collect Points:</strong> Eat all the glowing dots in the political corridors.</li>
              <li><strong>Activate Power Mode:</strong> Grab the large energy pills to turn the tables!</li>
              <li><strong>Evasion Tactics:</strong> Dodge the unrelenting opposition ghosts tracking your every move.</li>
              <li><strong>Controls:</strong> Use arrow keys on desktop or ultra-responsive swipe/D-Pad controls on mobile.</li>
            </ul>
          </div>
          
          <div className="glass-panel rounded-2xl p-6 bg-white/5 border border-white/10 text-left">
            <h2 className="text-xl font-bold text-white/90 mb-3">✨ Core Features</h2>
            <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
              <li><strong>100% Free:</strong> Play instantly on any browser or mobile device.</li>
              <li><strong>Premium UI:</strong> Sleek glassmorphism mixed with sharp micro-animations.</li>
              <li><strong>Responsive AI:</strong> Chasing ghosts powered by dynamic (BFS) pathfinding.</li>
              <li><strong>Difficulty Settings:</strong> Pick from Easy, Medium, or Hard modes.</li>
              <li><strong>PWA Support:</strong> Install directly to your device for offline play.</li>
            </ul>
          </div>
        </div>

        <div className="glass-panel rounded-full overflow-hidden inline-flex sm:mx-auto max-w-fit mt-4 border border-white/10 bg-white/5 shadow-xl">
           <a href="https://twitter.com/intent/tweet?text=Play%20ModiLander%20-%20the%20funniest%20political%20maze%20game!%20%F0%9F%8F%86%20https://modilander.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-sm font-semibold tracking-wide hover:bg-white/10 hover:text-white transition-colors border-r border-white/10 flex items-center gap-2">
             Share on Twitter
           </a>
           <a href="https://wa.me/?text=Play%20ModiLander%20-%20the%20funniest%20political%20maze%20game!%20%F0%9F%8F%86%20https://modilander.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-sm font-semibold tracking-wide hover:bg-[#25D366]/20 transition-colors flex items-center gap-2 text-[#25D366]">
             Share on WhatsApp
           </a>
        </div>

        <div className="text-center text-xs text-white/30 pt-8 mt-4 border-t border-white/5">
           &copy; {new Date().getFullYear()} ModiLander Arcade Game. Engineered and Designed by Prince & Smit.<br />
           A political satire maze game created purely for amusement. No actual politicians were harmed in the making of this software.
        </div>
      </div>
    </footer>
  );
};
