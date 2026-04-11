import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { LuVolume2, LuVolumeX, LuMaximize, LuMinimize } from "react-icons/lu";
import { Link, useNavigate, useLocation } from "react-router";
import { DPad } from "../components/DPad";
import { FaCaretLeft } from "react-icons/fa";

// Import character assets
import modi5 from "./../../assets/characters/modi/5.png";
import modi6 from "./../../assets/characters/modi/6.png";
import modi7 from "./../../assets/characters/modi/7.png";
import rahul1 from "./../../assets/characters/rahul/1.png";
import rahul2 from "./../../assets/characters/rahul/2.png";
import rahul3 from "./../../assets/characters/rahul/3.png";
import bonusImg from "./../../assets/characters/8.png";

// Audio assets
import bgMusic from "./../../assets/audio/bg_music.mp3";
import wahModi from "./../../assets/audio/wah-modiji-wah.mp3";
import majaAaya from "./../../assets/audio/maja-aaya.mp3";
import laureNa from "./../../assets/audio/laure-na-bhujjam-x-modi.mp3";
import khatam from "./../../assets/audio/khatam.mp3";

// MAZE TEMPLATE — never mutated, freshMaze() always returns a deep copy
const MAZE_TEMPLATE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 3, 1, 1, 0, 1, 2, 1, 0, 1, 1, 3, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 2, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 4, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 2, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 3, 1, 1, 0, 1, 0, 1, 0, 1, 1, 3, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
/** Always returns a brand-new deep copy — mutations never touch MAZE_TEMPLATE */
const freshMaze = () => MAZE_TEMPLATE.map(row => [...row]);

const GRID_SIZE = { cols: 13, rows: 13 };

export const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const characterId = location.state?.character || 'modi';
  const difficultyId: string = location.state?.difficulty || 'medium';
  const DIFFICULTY_SPEED: Record<string, number> = { easy: 240, medium: 160, hard: 100 };
  const DIFFICULTY_GHOSTS: Record<string, number> = { easy: 2, medium: 3, hard: 4 };
  const gameSpeed = DIFFICULTY_SPEED[difficultyId] ?? 160;
  const ghostCount = DIFFICULTY_GHOSTS[difficultyId] ?? 3;
  // Ghost AI: % of time they use BFS pathfinding (rest = smarter random walk)
  const chaseProb = ({ easy: 0.12, medium: 0.55, hard: 0.92 } as Record<string, number>)[difficultyId] ?? 0.55;
  // Power mode ticks (each tick = gameSpeed ms)
  const powerTicks = ({ easy: 60, medium: 35, hard: 20 } as Record<string, number>)[difficultyId] ?? 35;

  // Build initial ghost positions based on difficulty
  const makeGhosts = (count: number) => [
    { x: 5, y: 5, dir: 'LEFT' },
    { x: 6, y: 5, dir: 'UP' },
    { x: 7, y: 5, dir: 'RIGHT' },
    { x: 5, y: 7, dir: 'DOWN' },
  ].slice(0, count);

  const [isReadyTextVisible, setReadyTextVisible] = useState(true);
  const [isPowerModeUIVisible, setPowerModeUIVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('modilander_highScore') || '0'));
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const dpadRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scoreRef2 = useRef<HTMLDivElement>(null);
  const hasAutoFullscreened = useRef(false);
  
  // High-performance dynamic scaling — accounts for header, score bar, and D-Pad
  useLayoutEffect(() => {
    const updateScale = () => {
      const headerH = headerRef.current?.offsetHeight || 0;
      const scoreH = scoreRef2.current?.offsetHeight || 0;
      const dpadH = dpadRef.current?.offsetHeight || 0;
      const availW = window.innerWidth - 16;
      const availH = window.innerHeight - headerH - scoreH - dpadH - 16;
      const s = Math.min(1, availW / 780, availH / 780);
      setScale(Math.max(0.1, s));
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateScale);
    return () => { observer.disconnect(); window.removeEventListener('resize', updateScale); };
  }, []);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [maze, setMaze] = useState<number[][]>(freshMaze);
  const [playerUI, setPlayerUI] = useState({ x: 6, y: 10 });
  const [ghostsUI, setGhostsUI] = useState(() => makeGhosts(ghostCount));
  const [hasInteracted, setHasInteracted] = useState(false);

  const playerRef = useRef({ x: 6, y: 10, nextDir: null as string | null, currentDir: null as string | null });
  const mazeRef = useRef<number[][]>(freshMaze());
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const ghostsRef = useRef(makeGhosts(ghostCount));
  const isMutedRef = useRef(isMuted);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const lastEffectRef = useRef<HTMLAudioElement | null>(null);

  // Fullscreen helpers (with webkit prefix for Samsung/old browsers)
  const requestFullscreen = useCallback(() => {
    const el = document.documentElement as any;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }, []);

  const exitFullscreen = useCallback(() => {
    const doc = document as any;
    if (doc.exitFullscreen) doc.exitFullscreen();
    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
  }, []);

  const toggleFullscreen = useCallback(() => {
    const doc = document as any;
    const isFs = !!(doc.fullscreenElement || doc.webkitFullscreenElement);
    if (isFs) exitFullscreen(); else requestFullscreen();
  }, [requestFullscreen, exitFullscreen]);

  // Sync fullscreen state with browser
  useEffect(() => {
    const onFsChange = () => {
      const doc = document as any;
      setIsFullscreen(!!(doc.fullscreenElement || doc.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
    };
  }, []);

  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  const playerImg = characterId === 'modi' ? modi5 : rahul3;
  const enemyImgs = characterId === 'modi' ? [rahul1, rahul2, rahul3] : [modi5, modi6, modi7];

  const playEffect = useCallback((src: string) => {
    if (!isMutedRef.current) {
      // Stop previous effect sound before playing new one
      if (lastEffectRef.current) {
        lastEffectRef.current.pause();
        lastEffectRef.current.currentTime = 0;
      }
      const sfx = new Audio(src);
      lastEffectRef.current = sfx;
      sfx.play().catch(e => console.error("Audio error:", e));
    }
  }, []);

  const moveEntity = useCallback((x: number, y: number, dir: string | null) => {
    let nx = x, ny = y;
    if (dir === 'UP') ny--; if (dir === 'DOWN') ny++; if (dir === 'LEFT') nx--; if (dir === 'RIGHT') nx++;
    if (nx < 0) nx = GRID_SIZE.cols - 1; if (nx >= GRID_SIZE.cols) nx = 0;
    if (mazeRef.current[ny] && mazeRef.current[ny][nx] !== 1 && mazeRef.current[ny][nx] !== 4) return { x: nx, y: ny };
    return { x, y };
  }, []);

  const handleDirection = useCallback((dir: string) => {
    // Auto-enter fullscreen on first touch interaction (mobile only)
    if (!hasAutoFullscreened.current && window.innerWidth < 768) {
      hasAutoFullscreened.current = true;
      requestFullscreen();
    }
    playerRef.current.nextDir = dir;
  }, [requestFullscreen]);

  useEffect(() => {
     // Prevent scrolling on the body while the game is active
     document.body.style.overflow = 'hidden';
     
     (window as any).isReadyPhase = true;
     setReadyTextVisible(true);
     let t = setTimeout(() => { (window as any).isReadyPhase = false; setReadyTextVisible(false); }, 2000);
     return () => {
       document.body.style.overflow = '';
       clearTimeout(t);
     };
  }, []);

  useEffect(() => {
    const loop = setInterval(() => {
      if ((window as any).isReadyPhase) return;
      
      if ((window as any).isPowerModeTimer > 0) {
          (window as any).isPowerModeTimer--;
          if ((window as any).isPowerModeTimer <= 0) {
              (window as any).isPowerMode = false;
              setPowerModeUIVisible(false);
          }
      }

      const p = playerRef.current;
      let nextPos = p.nextDir ? moveEntity(p.x, p.y, p.nextDir) : { x: p.x, y: p.y };
      if (nextPos.x !== p.x || nextPos.y !== p.y) {
        p.currentDir = p.nextDir; p.nextDir = null;
        p.x = nextPos.x; p.y = nextPos.y;
      } else if (p.currentDir) {
        nextPos = moveEntity(p.x, p.y, p.currentDir);
        p.x = nextPos.x; p.y = nextPos.y;
      }

      const cell = mazeRef.current[p.y][p.x];
      if (cell === 0 || cell === 3) {
        if (cell === 3) {
            playEffect(characterId === 'modi' ? wahModi : majaAaya);
            (window as any).isPowerMode = true;
            (window as any).isPowerModeTimer = powerTicks;
            setPowerModeUIVisible(true);
        }
        mazeRef.current[p.y][p.x] = 2;
        scoreRef.current += (cell === 3 ? 50 : 10);
        setMaze([...mazeRef.current]); setScore(scoreRef.current);
      }

      const gList = ghostsRef.current;

      const getBestMoveBFS = (startX: number, startY: number, targetX: number, targetY: number) => {
          let queue = [{ x: startX, y: startY, path: [] as string[] }];
          let visited = new Set();
          visited.add(`${startX},${startY}`);
          const dirsObj: any = { 'UP': {dx: 0, dy: -1}, 'DOWN': {dx: 0, dy: 1}, 'LEFT': {dx: -1, dy: 0}, 'RIGHT': {dx: 1, dy: 0} };
          while (queue.length > 0) {
              let current = queue.shift()!;
              if (current.x === targetX && current.y === targetY) return current.path[0];
              for (let d of Object.keys(dirsObj)) {
                  let m = dirsObj[d];
                  let nx = current.x + m.dx;
                  let ny = current.y + m.dy;
                  if (nx < 0) nx = GRID_SIZE.cols - 1;
                  if (nx >= GRID_SIZE.cols) nx = 0;
                  let key = `${nx},${ny}`;
                  if (ny >= 0 && ny < GRID_SIZE.rows && mazeRef.current[ny][nx] !== 1 && mazeRef.current[ny][nx] !== 4 && !visited.has(key)) {
                      visited.add(key);
                      queue.push({ x: nx, y: ny, path: [...current.path, d] });
                  }
              }
          }
          return null;
      };

      gList.forEach((g) => {
        let tX = p.x; let tY = p.y;
        const inPowerMode = (window as any).isPowerMode;

        // In power mode — all difficulties flee from player
        if (inPowerMode) {
          tX = (g.x + (g.x - tX) * 3 + GRID_SIZE.cols) % GRID_SIZE.cols;
          tY = (g.y + (g.y - tY) * 3 + GRID_SIZE.rows) % GRID_SIZE.rows;
          tY = Math.max(1, Math.min(GRID_SIZE.rows - 2, tY));
        }

        const DIRS = ['UP', 'DOWN', 'LEFT', 'RIGHT'] as const;
        const OPPOSITES: Record<string, string> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };

        // Decide: chase with BFS or roam randomly
        const willChase = inPowerMode || Math.random() < chaseProb;
        let bestDir: string | null = null;

        if (willChase) {
          bestDir = getBestMoveBFS(g.x, g.y, tX, tY);
        }

        if (!bestDir) {
          if (willChase) {
            // BFS failed — greedy fallback
            let minDist = Infinity;
            DIRS.forEach(d => {
              if (d === OPPOSITES[g.dir]) return;
              const test = moveEntity(g.x, g.y, d);
              if (test.x !== g.x || test.y !== g.y) {
                const dist = Math.abs(test.x - tX) + Math.abs(test.y - tY);
                if (dist < minDist) { minDist = dist; bestDir = d; }
              }
            });
          } else {
            // Pure random walk — prefer no reversal
            const shuffled = [...DIRS].sort(() => Math.random() - 0.5);
            for (const d of shuffled) {
              if (d === OPPOSITES[g.dir]) continue;
              const test = moveEntity(g.x, g.y, d);
              if (test.x !== g.x || test.y !== g.y) { bestDir = d; break; }
            }
          }
          // Last resort: allow reversal
          if (!bestDir) {
            const rev = moveEntity(g.x, g.y, OPPOSITES[g.dir]);
            if (rev.x !== g.x || rev.y !== g.y) bestDir = OPPOSITES[g.dir];
          }
        }

        if (bestDir) {
          const nPos = moveEntity(g.x, g.y, bestDir);
          g.x = nPos.x; g.y = nPos.y; g.dir = bestDir;
        }
      });

      const colHero = gList.find(g => g.x === p.x && g.y === p.y);
      if (colHero) {
        if ((window as any).isPowerMode) {
             // Ghost dies logic!
             scoreRef.current += 200;
             setScore(scoreRef.current);
             colHero.x = 6; colHero.y = 5;
        } else {
            playEffect(characterId === 'modi' ? khatam : laureNa);
            if (livesRef.current > 1) {
              livesRef.current--; setLives(livesRef.current);
              p.x = 6; p.y = 10; p.currentDir = null; p.nextDir = null;
              const freshGhosts = makeGhosts(ghostCount);
              ghostsRef.current.splice(0, ghostsRef.current.length, ...freshGhosts);
              (window as any).isReadyPhase = true;
              setReadyTextVisible(true);
              setTimeout(() => { (window as any).isReadyPhase = false; setReadyTextVisible(false); }, 2000);
            } else {
              clearInterval(loop); navigate('/win-loss', { state: { status: 'loss', character: characterId, score: scoreRef.current } });
            }
        }
      }

      if (!mazeRef.current.some((row: number[]) => row.includes(0) || row.includes(3))) {
        clearInterval(loop); navigate('/win-loss', { state: { status: 'win', character: characterId, score: scoreRef.current } });
      }
      setPlayerUI({ x: p.x, y: p.y }); setGhostsUI([...gList]);
    }, gameSpeed); // Dynamic speed based on difficulty
    return () => clearInterval(loop);
  }, [navigate, characterId, moveEntity, playEffect]);

  useEffect(() => {
    if (score > highScore) { setHighScore(score); localStorage.setItem('modilander_highScore', score.toString()); }
  }, [score, highScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setHasInteracted(true);
      const dirs: any = { ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT', w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT' };
      if (dirs[e.key]) handleDirection(dirs[e.key]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDirection]);

  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.loop = true; audio.volume = 0.4;
    bgMusicRef.current = audio;
    // Stop any START page audio carried over
    const prev = (window as any).activeAudio as HTMLAudioElement | undefined;
    if (prev) { prev.pause(); prev.currentTime = 0; }
    (window as any).activeAudio = null;
    if (!isMuted) audio.play().catch(e => console.error(e));
    return () => {
      // Stop bg music and last effect when leaving game page
      audio.pause();
      if (lastEffectRef.current) {
        lastEffectRef.current.pause();
        lastEffectRef.current.currentTime = 0;
      }
    };
  }, [isMuted]);

  // Character-specific theming for the game board
  const charAccent = characterId === 'modi' ? '#f59e0b' : '#0ea5e9';
  const charAccentGlow = characterId === 'modi' ? 'rgba(245,158,11,0.6)' : 'rgba(14,165,233,0.6)';
  const charWallColor = characterId === 'modi' ? 'rgba(245,158,11,0.04)' : 'rgba(14,165,233,0.04)';
  const charWallBorder = characterId === 'modi' ? 'rgba(245,158,11,0.1)' : 'rgba(14,165,233,0.12)';
  const charDotColor = characterId === 'modi' ? 'rgba(251,191,36,0.9)' : 'rgba(56,189,248,0.9)';
  const charDotGlow = characterId === 'modi' ? 'rgba(245,158,11,0.3)' : 'rgba(14,165,233,0.3)';

  const touchStartRef = useRef<{ x: number, y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setHasInteracted(true);
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.touches[0].clientX - touchStartRef.current.x;
    const dy = e.touches[0].clientY - touchStartRef.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    
    if (Math.max(absDx, absDy) > 35) { // 35px threshold
      if (absDx > absDy) {
        handleDirection(dx > 0 ? 'RIGHT' : 'LEFT');
      } else {
        handleDirection(dy > 0 ? 'DOWN' : 'UP');
      }
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; // reset to prevent multiple fires
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  return (
    <div 
      onTouchStart={handleTouchStart} 
      onTouchMove={handleTouchMove} 
      onTouchEnd={handleTouchEnd} 
      className="fixed inset-0 h-[100dvh] w-full flex flex-col bg-[#04040f] text-foreground font-sans overflow-hidden select-none z-[100]"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[30%] bg-accent/4 blur-[100px] rounded-full" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      </div>

      {/* Power Mode Peripheral Glow */}
      {isPowerModeUIVisible && (
        <div className="fixed inset-0 z-[5] pointer-events-none animate-[power-throb_2s_ease-in-out_infinite] rounded-[inherit]"
          style={{ boxShadow: 'inset 0 0 60px rgba(229,0,255,0.2)' }} />
      )}

      {/* Header Pill */}
      <div ref={headerRef} className="relative flex justify-center w-full px-4 pt-4 pb-2 z-[60]">
        <div className="flex items-center justify-between w-full max-w-[800px] rounded-full px-5 py-2 glass-pill shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <Link to="/" className="flex items-center gap-1.5 text-white/50 hover:text-white/90 transition-all duration-200 font-bold tracking-widest text-xs group">
            <FaCaretLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>MENU</span>
          </Link>
          {/* Center brand tag */}
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: charAccent }} />
            <span className="text-[10px] font-black tracking-[4px] text-white/80 uppercase">MODI_LANDER</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleFullscreen}
              className="md:hidden text-white/50 hover:text-white transition-all transform active:scale-90"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? <LuMinimize size={16} /> : <LuMaximize size={16} />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white/50 hover:text-white transition-all transform active:scale-90"
            >
              {isMuted ? <LuVolumeX size={16} /> : <LuVolume2 size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Score Area Pill */}
      <div ref={scoreRef2} className="flex justify-center flex-shrink-0 px-4 w-full mb-3 z-[60]">
        <div className="flex w-full max-w-[800px] items-center justify-between rounded-[24px] px-6 py-2 glass-pill shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
          {/* Promises Collected = Score */}
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[9px] font-bold tracking-widest text-white/50 uppercase">Promises</span>
            <span className="text-[22px] font-black tracking-wider tabular-nums leading-none" style={{ color: charAccent, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {score.toString().padStart(6, '0')}
            </span>
          </div>

          {/* Political Lives */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-bold tracking-widest text-white/50 uppercase">Terms Left</span>
            <div className="flex gap-2.5 rounded-full px-3.5 py-1.5" style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {[...Array(3)].map((_, i) => (
                <span key={i}
                  className="text-[16px] leading-none transition-all duration-300 drop-shadow-md"
                  style={{ opacity: i < lives ? 1 : 0.2, filter: i < lives ? 'none' : 'grayscale(1)', transform: i < lives ? 'scale(1)' : 'scale(0.8)' }}>
                  {characterId === 'modi' ? '🪷' : '✋'}
                </span>
              ))}
            </div>
          </div>

          {/* Hi-Score = Best */}
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[9px] font-bold tracking-widest text-white/50 uppercase">Best</span>
            <span className="text-[22px] font-black tracking-wider tabular-nums leading-none" style={{ color: "rgba(255,255,255,0.9)", textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {highScore.toString().padStart(6, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Relocated Power Mode Banner (Premium Floating Pill) */}
      {isPowerModeUIVisible && (
        <div className="flex justify-center w-full px-4 mb-4 z-[60] animate-[fade-in-up_0.5s_ease-out]">
          <div className="relative flex items-center gap-4 rounded-full px-8 py-2.5 glass shadow-[0_12px_40px_rgba(0,0,0,0.6)] border-white/10 overflow-hidden">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-magenta-500/20 to-purple-600/20 animate-[shimmer_3s_linear_infinite]" />
            
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff00ff] shadow-[0_0_12px_#ff00ff] animate-pulse" />
              <span className="font-black tracking-[5px] text-[12px] uppercase text-white drop-shadow-[0_2px_10px_rgba(255,0,255,0.5)]">
                {characterId === 'modi' ? 'MODI' : 'RAHUL'} POWER MODE ON!
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff00ff] shadow-[0_0_12px_#ff00ff] animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Maze Container */}
      <div ref={containerRef} className="flex-1 relative flex items-center justify-center w-full min-h-0 px-2 py-2 overflow-hidden">
        <div
          className="relative flex-shrink-0 flex items-center justify-center overflow-hidden rounded-2xl"
          style={{
            width: 780 * scale, height: 780 * scale,
            background: 'rgba(0,0,0,0.55)',
            border: `1px solid ${charWallBorder}`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.7), inset 0 0 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)`,
          }}
        >
          {/* GET READY overlay */}
          {isReadyTextVisible && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl"
              style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse"
                  style={{ background: charAccent + '25', border: `2px solid ${charAccent}60` }}>
                  <img src={playerImg} alt="" className="w-12 h-12 rounded-full object-cover" />
                </div>
                <span className="font-black tracking-[10px] animate-[fade-in_0.8s_ease-out] text-[42px] leading-tight"
                  style={{ color: '#ffffff', textShadow: `0 0 40px ${charAccentGlow}, 0 4px 12px rgba(0,0,0,0.5)` }}>
                  GET READY!
                </span>
                <span className="text-[10px] tracking-[4px] font-bold uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {characterId === 'modi' ? 'Wah Modiji Wah!' : 'Maja Aaya!'}
                </span>
              </div>
            </div>
          )}
          <div
            className={`absolute grid grid-cols-13 grid-rows-13 ${isPowerModeUIVisible ? '' : ''}`}
            style={{
              width: '780px', height: '780px',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              left: 0, top: 0,
              transition: 'box-shadow 0.5s ease',
              boxShadow: isPowerModeUIVisible ? 'inset 0 0 100px rgba(229,0,255,0.15)' : 'none',
            }}
          >
            {/* Subtle diagonal grid lines */}
            <div className="absolute inset-0 z-0 opacity-30"
              style={{ backgroundImage: `linear-gradient(${charAccent}06 1px, transparent 1px), linear-gradient(90deg, ${charAccent}06 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
            
            {maze.map((row: number[], y: number) =>
              row.map((cell: number, x: number) => (
                <div key={`${x}-${y}`} className="relative w-[60px] h-[60px] flex items-center justify-center">

                  {/* WALL cell — character-themed glass block */}
                  {cell === 1 && (
                    <div className="absolute inset-[3px] rounded-lg"
                      style={{
                        background: charWallColor,
                        border: `1px solid ${charWallBorder}`,
                        boxShadow: `inset 0 0 12px rgba(0,0,0,0.3), 0 0 6px ${charAccent}08`,
                      }} />
                  )}

                  {/* Normal dot */}
                  {cell === 0 && (
                    <div className="rounded-full"
                      style={{
                        width: 9, height: 9,
                        background: charDotColor,
                        boxShadow: `0 0 6px ${charDotGlow}`,
                      }} />
                  )}

                  {/* Power pellet */}
                  {cell === 3 && (
                    <div className="relative w-[46px] h-[46px] flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full animate-[pellet-glow_1.2s_ease-in-out_infinite]" />
                      <img src={bonusImg} alt="bonus" className="w-full h-full object-contain relative z-10 animate-[float_2s_ease-in-out_infinite]" />
                    </div>
                  )}

                  {/* Player */}
                  {playerUI.x === x && playerUI.y === y && (
                    <div className="absolute z-30 w-[60px] h-[60px]" style={{ left: 0, top: 0 }}>
                      <div className="absolute inset-0 rounded-full blur-xl animate-pulse"
                        style={{ background: isPowerModeUIVisible ? '#ff00ff' : charAccentGlow, opacity: isPowerModeUIVisible ? 0.7 : 0.4 }} />
                      <img src={playerImg} alt="player"
                        className="relative w-full h-full rounded-full object-cover scale-[1.08] transition-transform duration-300"
                        style={{
                          border: `2px solid ${isPowerModeUIVisible ? '#ff00ff' : charAccent}`,
                          boxShadow: isPowerModeUIVisible ? '0 0 30px #ff00ff, 0 0 60px rgba(255,0,255,0.4)' : `0 0 20px ${charAccentGlow}, 0 0 40px ${charAccent}40`,
                          filter: 'brightness(1.15)',
                        }} />
                    </div>
                  )}

                  {/* Enemy sprites */}
                  {ghostsUI.map((ghost, index) => ghost.x === x && ghost.y === y ? (
                    <div key={index} className="absolute z-20 w-[60px] h-[60px]" style={{ left: 0, top: 0 }}>
                      {isPowerModeUIVisible && (
                        <div className="absolute inset-1 rounded-full blur-md animate-pulse"
                          style={{ background: 'rgba(229,0,255,0.4)' }} />
                      )}
                      <img src={enemyImgs[index % enemyImgs.length]} alt="enemy"
                        className="relative w-[88%] h-[88%] ml-[6%] mt-[6%] rounded-full object-cover transition-all duration-200"
                        style={{
                          border: isPowerModeUIVisible ? '2px solid rgba(229,0,255,0.6)' : '1px solid rgba(255,255,255,0.2)',
                          filter: isPowerModeUIVisible ? 'hue-rotate(250deg) saturate(3) brightness(0.7)' : 'brightness(1)',
                          boxShadow: isPowerModeUIVisible ? '0 0 20px rgba(229,0,255,0.8)' : '0 6px 16px rgba(0,0,0,0.5)',
                          transform: isPowerModeUIVisible ? 'scale(0.88)' : 'scale(1)',
                          opacity: isPowerModeUIVisible ? 0.75 : 1,
                        }}
                      />
                    </div>
                  ) : null)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Mobile Swipe Hint Overlay */}
      {!hasInteracted && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50 md:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-500 rounded-lg">
          <div className="flex flex-col items-center gap-3 animate-bounce">
            <span className="text-4xl drop-shadow-xl" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.6))' }}>👆</span>
            <span className="text-white font-black tracking-widest text-xl uppercase text-center"
              style={{ textShadow: `0 0 20px ${charAccent}` }}>
              Swipe anywhere<br />to move
            </span>
          </div>
        </div>
      )}

      {/* D-Pad Area - Only on touch devices (phone/tablet), hidden on desktop */}
      <div ref={dpadRef} className="md:hidden flex w-full items-center justify-center p-2 flex-shrink-0 z-50 bg-black/50 backdrop-blur-sm">
        <DPad onDirection={handleDirection} />
      </div>
    </div>
  );
};
