import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { ShareSheet } from "../components/ShareSheet";
import { IconVolume, IconMute, IconShare, IconInstagram, IconGitHub } from "../components/Icons";


// ── All character images ──────────────────────────────────────────────────────
import modi5 from "./../../assets/characters/modi/5.png";
import modi6 from "./../../assets/characters/modi/6.png";
import modi7 from "./../../assets/characters/modi/7.png";
import rahul1 from "./../../assets/characters/rahul/1.png";
import rahul2 from "./../../assets/characters/rahul/2.png";
import rahul3 from "./../../assets/characters/rahul/3.png";
import Logo from "./../../assets/favicon.png";
import modiMusic from "./../../assets/audio/wah-modiji-wah.mp3";
import rahulMusic from "./../../assets/audio/maja-aaya.mp3";

// ── Live ticker headlines ─────────────────────────────────────────────────────
const HEADLINES = [
  "BREAKING — Masterstroke! Leader successfully escapes all questions by pretending they are maze walls.",
  "LIVE — Visionary finds brilliant way to ignore poverty: focusing entirely on eating dots.",
  "EXCLUSIVE — 56-Inch chest perfectly designed to squeeze through narrow corridors while evading press.",
  "FLASH — Youth Icon re-launches himself for the 47th time after losing a life in level 2.",
  "NEW POLICY — Eating all dots declared critical national interest; public told to fast.",
  "UPDATE — Avoiding media questions added as a new high-speed evasion mechanic.",
  "SPORTS — Annual 'Chase Voters Through Maze' championship officially inaugurated.",
  "ALERT — Opposition blames ghosts for poor performance; ruling party taxes the dots.",
];

// ── Difficulty config ─────────────────────────────────────────────────────────
export const DIFFICULTY_LEVELS = [
  { id: "easy",   label: "Easy",   subtitle: "Slow Ghosts",   speed: 240, color: "#22c55e", ghosts: 2 },
  { id: "medium", label: "Medium", subtitle: "Classic Pace",  speed: 160, color: "#f97316", ghosts: 3 },
  { id: "hard",   label: "Hard",   subtitle: "Full Send",     speed: 100, color: "#ef4444", ghosts: 4 },
] as const;

export type DifficultyId = typeof DIFFICULTY_LEVELS[number]["id"];

// ── Character data ────────────────────────────────────────────────────────────
const CHARACTERS = [
  {
    id: "modi",
    name: "MODI JI",
    title: "The Great Pellet Collector",
    tagline: "Wah Modiji Wah!",
    images: [modi5, modi6, modi7],
    heroImage: modi6,
    audio: modiMusic,
    accent: "#f97316", accentLight: "#fb923c",
    border: "rgba(249,115,22,0.45)", shadow: "rgba(249,115,22,0.3)", bg: "rgba(249,115,22,0.10)",
    stats: [
      { l: "Promise Speed",   v: 99 },
      { l: "Dot Collection",  v: 95 },
      { l: "Ghost Evasion",   v: 78 },
    ],
    quote: "Ek baar commit kar liya, toh phir khud ki bhi nahi sunta.",
  },
  {
    id: "rahul",
    name: "RAHUL G",
    title: "The Maze Philosopher",
    tagline: "Maja Aaya!",
    images: [rahul1, rahul2, rahul3],
    heroImage: rahul1,
    audio: rahulMusic,
    accent: "#3b82f6", accentLight: "#60a5fa",
    border: "rgba(59,130,246,0.45)", shadow: "rgba(59,130,246,0.3)", bg: "rgba(59,130,246,0.10)",
    stats: [
      { l: "Yatra Distance",  v: 88 },
      { l: "Mic Drops",       v: 72 },
      { l: "Chaos Theory",    v: 91 },
    ],
    quote: "Poverty is just a state of mind… unlike this maze, which is very real.",
  },
];

const CREATORS = [
  { name: "PRINCE", ig: "https://www.instagram.com/zwischenweg/",    gh: "https://github.com/PRINCESTR", handle: "@zwischenweg",    color: "#8b5cf6" },
  { name: "SMIT",   ig: "https://www.instagram.com/sutariya_smit_/", gh: "https://github.com/PRINCESTR", handle: "@sutariya_smit_",  color: "#00e5ff" },
];

// ── Ticker ────────────────────────────────────────────────────────────────────
const Ticker: React.FC<{ accent: string }> = ({ accent: _accent }) => {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % HEADLINES.length); setShow(true); }, 300);
    }, 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-3 w-full max-w-sm overflow-hidden">
      <div className="flex-shrink-0 flex items-center gap-1.5 rounded-full px-2.5 py-1"
        style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[7px] font-black tracking-[3px] text-red-400 uppercase">Live</span>
      </div>
      <p className="text-[9px] tracking-wide flex-1 truncate transition-opacity duration-300 font-medium"
        style={{ opacity: show ? 1 : 0, color: "rgba(255,255,255,0.3)",
          transition: "opacity 0.3s ease" }}>
        {HEADLINES[idx]}
      </p>
    </div>
  );
};

// ── StatBar ───────────────────────────────────────────────────────────────────
const StatBar: React.FC<{ label: string; val: number; color: string }> = ({ label, val, color }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex justify-between items-center">
      <span className="text-[8px] uppercase tracking-[2px] font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</span>
      <span className="text-[8px] font-black tabular-nums" style={{ color }}>{val}</span>
    </div>
    <div className="h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <div className="h-full rounded-full" style={{ width: `${val}%`, background: `linear-gradient(90deg, ${color}70, ${color})` }} />
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
export const StartPage: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selId, setSelId] = useState(CHARACTERS[0].id);
  const [difficulty, setDifficulty] = useState<DifficultyId>("easy");
  const [leaving, setLeaving] = useState(false);
  const [heroImgIdx, setHeroImgIdx] = useState(0);
  const [bestScore] = useState(() => {
    try { return parseInt(localStorage.getItem("modiman_highScore") || "0"); } catch { return 0; }
  });
  const navigate = useNavigate();
  const sel = CHARACTERS.find(c => c.id === selId)!;
  const diff = DIFFICULTY_LEVELS.find(d => d.id === difficulty)!;

  // Cycle character hero image every 2.5s
  useEffect(() => {
    setHeroImgIdx(0);
    const t = setInterval(() => setHeroImgIdx(i => (i + 1) % sel.images.length), 2500);
    return () => clearInterval(t);
  }, [selId, sel.images.length]);

  const beep = useCallback((freq = 440, type: OscillatorType = "sine", vol = 0.07, dur = 0.09) => {
    if (isMuted) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + dur);
    } catch (_) {}
  }, [isMuted]);

  const handleStart = () => {
    beep(900, "square", 0.07, 0.12);
    setLeaving(true);
    const prev = (window as any).activeAudio as HTMLAudioElement | undefined;
    if (prev) { prev.pause(); prev.currentTime = 0; }
    (window as any).activeAudio = null;
    setTimeout(() => navigate("/game", { state: { character: selId, difficulty } }), 350);
  };

  const handleSelect = (id: string) => {
    if (id === selId) return;
    beep(700, "sine", 0.05, 0.09);
    setSelId(id);
    const prev = (window as any).activeAudio as HTMLAudioElement | undefined;
    if (prev) { prev.pause(); prev.currentTime = 0; }
    if (!isMuted) {
      const audio = new Audio(CHARACTERS.find(c => c.id === id)?.audio);
      audio.play().catch(() => {});
      (window as any).activeAudio = audio;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "MODI_LANDER", text: "India's most sarcastic maze game!", url: window.location.href }); }
      catch (e) { if ((e as Error).name !== "AbortError") setIsShareOpen(true); }
    } else setIsShareOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans"
      style={{
        background: "#04040f",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(0.98)" : "scale(1)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}>

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full blur-[140px] transition-all duration-1000"
          style={{ top: "-25%", right: "-15%", width: "70%", height: "70%",
            background: `radial-gradient(circle, ${sel.accent}22 0%, transparent 70%)` }} />
        <div className="absolute rounded-full blur-[120px] transition-all duration-1000"
          style={{ bottom: "-25%", left: "-15%", width: "60%", height: "60%",
            background: `radial-gradient(circle, ${sel.accent}15 0%, transparent 70%)` }} />
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        {/* Decorative aesthetic lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* Diagonal accent lines — visible */}
          <line x1="0%" y1="10%" x2="60%" y2="100%" stroke={sel.accent} strokeWidth="1" strokeOpacity="0.18" />
          <line x1="15%" y1="0%" x2="85%" y2="100%" stroke={sel.accent} strokeWidth="0.5" strokeOpacity="0.1" />
          <line x1="100%" y1="0%" x2="40%" y2="100%" stroke={sel.accent} strokeWidth="0.8" strokeOpacity="0.14" />
          {/* Horizontal gold accent line */}
          <line x1="0" y1="38%" x2="100%" y2="34%"
            stroke="url(#goldLine)" strokeWidth="1" strokeOpacity="0.35" />
          {/* Horizontal silver accent line */}
          <line x1="0" y1="72%" x2="100%" y2="68%"
            stroke="url(#silverLine)" strokeWidth="0.6" strokeOpacity="0.2" />
          <defs>
            <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="25%" stopColor="#f59e0b" stopOpacity="1" />
              <stop offset="75%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="silverLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#94a3b8" stopOpacity="1" />
              <stop offset="70%" stopColor="#cbd5e1" stopOpacity="1" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-3 pb-2"
        style={{ background: "rgba(4,4,15,0.7)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2.5">
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 rounded-full blur-md animate-pulse" style={{ background: sel.accent + "50" }} />
            <img src={Logo} alt="" className="relative w-5 h-5 object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-black tracking-[3px] text-white uppercase">Modi_Lander</span>
            <span className="text-[8px] tracking-[2px] font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>by Prince &amp; Smit</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          <button onClick={() => { beep(); setIsMuted(m => !m); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {isMuted
              ? <IconMute size={13} color="rgba(255,255,255,0.4)" />
              : <IconVolume size={13} color="rgba(255,255,255,0.4)" />}
          </button>
          <button onClick={() => { beep(); handleShare(); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <IconShare size={13} color="rgba(255,255,255,0.4)" />
          </button>
        </div>
      </header>

      {/* ── Main layout ── */}
      <main className="relative z-10 flex flex-col lg:flex-row items-start min-h-screen pt-16">

        {/* ── LEFT: Character Art Panel ── */}
        <div className="relative w-full lg:w-[42%] lg:min-h-screen flex items-center justify-center overflow-hidden"
          style={{ minHeight: "clamp(280px, 45vw, 100vh)" }}>

          {/* Character image — large and cinematic */}
          <div className="relative flex items-end justify-center w-full h-full" style={{ minHeight: "clamp(280px, 50vw, 620px)" }}>
            {/* Glow behind character */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 rounded-full blur-3xl transition-all duration-1000"
              style={{ background: `radial-gradient(circle, ${sel.accent}30 0%, transparent 70%)` }} />
            {/* Character img — cycles through personality images */}
            <img
              key={selId + heroImgIdx}
              src={sel.images[heroImgIdx]}
              alt={sel.name}
              className="relative z-10 object-contain drop-shadow-2xl transition-all duration-700"
              style={{
                height: "clamp(220px, 42vw, 540px)",
                filter: `drop-shadow(0 0 40px ${sel.accent}60)`,
                animation: "fade-in 0.5s ease-out",
              }}
            />
            {/* Character name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-4 z-20"
              style={{ background: "linear-gradient(to top, rgba(4,4,15,0.9) 0%, transparent 100%)" }}>
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: sel.accent }} />
                    <span className="text-[8px] font-black tracking-[4px] uppercase" style={{ color: sel.accent }}>Playing as</span>
                  </div>
                  <h2 className="font-black leading-none" style={{
                    fontSize: "clamp(28px, 8vw, 48px)",
                    color: "#ffffff",
                    textShadow: `0 2px 10px rgba(255,255,255,0.2), 0 0 20px ${sel.accent}50`,
                  }}>{sel.name}</h2>
                  <p className="text-xs font-medium mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{sel.title}</p>
                </div>
                {/* Tagline pill */}
                <div className="rounded-full px-3 py-1.5" style={{ background: sel.bg, border: `1px solid ${sel.border}` }}>
                  <span className="text-[8px] font-black tracking-wide italic" style={{ color: sel.accent }}>"{sel.tagline}"</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Controls Panel ── */}
        <div className="flex-1 flex flex-col gap-5 px-5 py-6 lg:py-20 lg:px-8 w-full">

          {/* Ticker */}
          <Ticker accent={sel.accent} />

          {/* Title block */}
          <div className="flex flex-col gap-0.5">
            <div className="font-black leading-none select-none" style={{
              fontSize: "clamp(52px, 12vw, 88px)",
              letterSpacing: "-0.04em",
              color: "#ffffff",
              textShadow: "0 2px 20px rgba(255,255,255,0.15)",
            }}>MODI</div>
            <div className="font-black leading-none select-none transition-colors duration-500" style={{
              fontSize: "clamp(52px, 12vw, 88px)",
              letterSpacing: "-0.04em",
              color: sel.accent,
              textShadow: `0 0 30px ${sel.accent}70, 0 0 60px ${sel.accent}30`,
            }}>LANDER</div>
            <p className="text-sm font-semibold tracking-[3px] uppercase mt-2" style={{ color: "rgba(255,255,255,0.3)" }}>
              India's Most Satirical Maze Game
            </p>
          </div>

          {/* ── Character selector ── */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black tracking-[4px] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Choose Your Neta</label>
            <div className="grid grid-cols-2 gap-2.5">
              {CHARACTERS.map(char => {
                const isSel = selId === char.id;
                return (
                  <button key={char.id} onClick={() => handleSelect(char.id)}
                    className="relative flex flex-col items-center gap-2 p-3.5 rounded-2xl overflow-hidden group text-center transition-all duration-300"
                    style={{
                      background: isSel ? `linear-gradient(135deg, ${char.accent}20, ${char.accentLight}08)` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isSel ? char.border : "rgba(255,255,255,0.07)"}`,
                      boxShadow: isSel ? `0 0 30px ${char.shadow}` : "none",
                      transform: isSel ? "scale(1.02)" : "scale(1)",
                    }}>
                    {isSel && <div className="absolute top-0 left-4 right-4 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${char.accent}80, transparent)` }} />}

                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ background: isSel ? char.bg : "rgba(255,255,255,0.04)", border: `1px solid ${isSel ? char.border : "rgba(255,255,255,0.06)"}` }}>
                      <img src={char.images[0]} alt={char.name} className="h-12 w-12 object-contain drop-shadow-xl" />
                    </div>

                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-base font-black tracking-[1.5px]"
                        style={{ color: isSel ? "#fff" : "rgba(255,255,255,0.4)" }}>{char.name}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wide"
                        style={{ color: isSel ? char.accent + "cc" : "rgba(255,255,255,0.18)" }}>{char.title}</span>
                    </div>

                    {/* Stats — shown when selected */}
                    {isSel && (
                      <div className="w-full flex flex-col gap-1.5 mt-0.5">
                        {char.stats.map(s => <StatBar key={s.l} label={s.l} val={s.v} color={char.accent} />)}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quote */}
          <div className="rounded-xl px-4 py-3 flex items-start gap-2 transition-all duration-500"
            style={{ background: sel.bg, border: `1px solid ${sel.border}45` }}>
            <span className="text-base" style={{ color: sel.accent, lineHeight: 1 }}>&#8220;</span>
            <p className="text-[9px] italic leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.35)" }}>{sel.quote}</p>
            <span className="text-base self-end" style={{ color: sel.accent, lineHeight: 1 }}>&#8221;</span>
          </div>

          {/* ── Difficulty selector ── */}
          <div className="flex flex-col gap-2">
            <label className="text-[8px] font-black tracking-[4px] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
              Difficulty Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DIFFICULTY_LEVELS.map(d => {
                const isSel = difficulty === d.id;
                return (
                  <button key={d.id}
                    onClick={() => { beep(600, "sine", 0.04, 0.08); setDifficulty(d.id); }}
                    className="relative flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-300"
                    style={{
                      background: isSel ? `${d.color}18` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isSel ? d.color + "55" : "rgba(255,255,255,0.07)"}`,
                      transform: isSel ? "scale(1.04)" : "scale(1)",
                      boxShadow: isSel ? `0 0 20px ${d.color}25` : "none",
                    }}>
                    {isSel && <div className="absolute top-0 left-3 right-3 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${d.color}80, transparent)` }} />}
                    <span className="text-[10px] font-black tracking-wide" style={{ color: isSel ? "#fff" : "rgba(255,255,255,0.35)" }}>
                      {d.label}
                    </span>
                    <span className="text-[7px] font-medium" style={{ color: isSel ? d.color : "rgba(255,255,255,0.2)" }}>
                      {d.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Start button ── */}
          <button onClick={handleStart}
            className="relative w-full overflow-hidden rounded-2xl group transition-all duration-300 active:scale-[0.97]"
            style={{ padding: "18px 24px",
              background: `linear-gradient(135deg, ${sel.accent}25, rgba(255,255,255,0.04), ${sel.accentLight}18)`,
              border: `1px solid ${sel.border}`,
            }}
            onMouseOver={e => (e.currentTarget.style.boxShadow = `0 0 60px ${sel.shadow}, 0 0 120px ${sel.shadow}40`)}
            onMouseOut={e => (e.currentTarget.style.boxShadow = "none")}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${sel.accent}90, transparent)` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full"
              style={{ transition: "transform 0.7s ease-in-out" }} />
            <div className="relative flex flex-col items-center gap-1">
              <span className="text-[11px] font-black tracking-[8px] uppercase text-white">
                Start Election
              </span>
              <span className="text-[7px] font-medium tracking-[3px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                {diff.label} — {diff.subtitle}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px opacity-40"
              style={{ background: `linear-gradient(90deg, transparent, ${sel.accentLight}70, transparent)` }} />
          </button>

          <p className="text-center text-[7px] tracking-[2px] uppercase" style={{ color: "rgba(255,255,255,0.12)" }}>
            Arrow Keys &middot; WASD &middot; D-Pad on mobile
          </p>

          {/* ── Scoreboard ── */}
          <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {[
              { label: "Best Score",    value: bestScore.toString().padStart(6, "0"), color: sel.accent },
              { label: "Promises Kept", value: "😭",  color: "#ef4444" },
              { label: "Terms Left",    value: "∞",   color: "rgba(255,255,255,0.35)" },
            ].map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5 py-3"
                style={{ background: "rgba(255,255,255,0.02)", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <span className="text-[9px] uppercase tracking-[2px] font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>{item.label}</span>
                <span className="text-base font-black tabular-nums" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* ── Credits ── */}
          <div className="flex flex-col gap-3">
            <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <div className="h-px w-4" style={{ background: `linear-gradient(90deg, transparent, ${sel.accent}25)` }} />
              <span className="text-[7px] tracking-[4px] uppercase font-black" style={{ color: "rgba(255,255,255,0.15)" }}>Crafted by</span>
              <div className="h-px w-4" style={{ background: `linear-gradient(270deg, transparent, ${sel.accent}25)` }} />
            </div>
            <div className="flex justify-center gap-3">
              {CREATORS.map(c => (
                <div key={c.name} className="flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-0.5 h-6 rounded-full opacity-50"
                    style={{ background: `linear-gradient(180deg, ${c.color}, transparent)` }} />
                  <div className="flex flex-col gap-0">
                    <span className="text-[10px] font-black tracking-[2px]" style={{ color: "rgba(255,255,255,0.8)" }}>{c.name}</span>
                    <span className="text-[7px] tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>{c.handle}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <a href={c.ig} target="_blank" rel="noopener noreferrer"
                      className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}
                      title="Instagram">
                      <IconInstagram size={12} color="rgba(255,255,255,0.5)" />
                    </a>
                    <a href={c.gh} target="_blank" rel="noopener noreferrer"
                      className="w-6 h-6 rounded-md flex items-center justify-center transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}
                      title="GitHub">
                      <IconGitHub size={12} color="rgba(255,255,255,0.45)" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-[6px] italic leading-relaxed" style={{ color: "rgba(255,255,255,0.1)" }}>
              Pure satire &amp; entertainment &middot; Not affiliated with any political party
            </p>
          </div>
        </div>
      </main>

      <ShareSheet isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </div>
  );
};
