import React, { useState, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ShareSheet } from "../components/ShareSheet";
import html2canvas from "html2canvas";
import { IconHome, IconShare, IconInstagram, IconRefresh, IconTrophy, IconSkull, IconDownload, IconX } from "../components/Icons";
import { ReviewForm } from "../components/ReviewForm";

import modiVideo from "./../../assets/win/modiwin.mp4";
import rahulVideo from "./../../assets/win/rahulwin.mp4";
import modiLoseVideo from "./../../assets/win/modi_lose.mp4";
import rahulLoseVideo from "./../../assets/win/rahul_lose.mp4";
import winmodiPhoto from "./../../assets/win/winmodi.png";
import winrahulPhoto from "./../../assets/win/winrahul.png";

// Satirical result messages
const WIN_MESSAGES = [
  "A true visionary! You collected all the dots and left nothing for the public. Masterstroke!",
  "Incredible leadership! Another maze conquered, another set of promises successfully forgotten.",
  "Historic victory! You successfully avoided all accountability and ate everything in sight.",
  "Youth icon triumphs again! Proving that the 47th relaunch is always the charm.",
];
const LOSS_MESSAGES = [
  "Unbelievable! You actually got caught. Must have been an international conspiracy.",
  "Defeat? No, this is just a strategic retreat to launch a new, more expensive Yatra.",
  "The opposition must have hacked the EVMs... I mean, the arcade machines.",
  "Caught by accountability! Don't worry, the media will blame the ghosts anyway.",
];

export const WinLossPage: React.FC = () => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const shareCardRef = useRef<HTMLDivElement>(null);

  const { status, character, score } = location.state || { status: "loss", character: "modi", score: 0 };
  const isWin = status === "win";

  const winnerName = isWin
    ? (character === "modi" ? "MODI JI" : "RAHUL G")
    : (character === "modi" ? "RAHUL G" : "MODI JI");
  const loserName = isWin
    ? (character === "modi" ? "RAHUL G" : "MODI JI")
    : (character === "modi" ? "MODI JI" : "RAHUL G");

  // Video: each character has their own win and lose video
  const videoSrc = character === "modi"
    ? (isWin ? modiVideo : modiLoseVideo)
    : (isWin ? rahulVideo : rahulLoseVideo);
  // Photo: always show the winner
  const showModi = (character === "modi" && isWin) || (character === "rahul" && !isWin);
  const photoSrc = showModi ? winmodiPhoto : winrahulPhoto;

  // Pick a random satirical message
  const sarcasticMsg = isWin
    ? WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
    : LOSS_MESSAGES[Math.floor(Math.random() * LOSS_MESSAGES.length)];

  const accentColor = isWin ? "#0ea5e9" : "#f43f5e";

  const beep = useCallback((freq = 440, type: OscillatorType = "sine", vol = 0.08, dur = 0.1) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + dur);
    } catch (_) {}
  }, []);

  const handleScreenshotAndShare = async () => {
    if (!shareCardRef.current) return;
    setIsSharing(true);
    try {
      await new Promise(r => setTimeout(r, 200));
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: "#000000", scale: 2, useCORS: true,
        allowTaint: true, logging: false,
        ignoreElements: el => el.tagName === "VIDEO",
      });
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/png"));
      if (!blob) { setIsSharing(false); setIsShareOpen(true); return; }
      if (screenshotUrl) URL.revokeObjectURL(screenshotUrl);
      const url = URL.createObjectURL(blob);
      setScreenshotUrl(url);
      const file = new File([blob], "modilander_score.png", { type: "image/png" });
      const shareText = `I scored ${score} in MODI_LANDER! 🏆 Can you beat me?\nPlay: https://modiman-xi.vercel.app/ — Built by PRINCE & SMIT`;
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file], title: "MODI_LANDER Score", text: shareText }); setIsSharing(false); return; }
        catch (err) { if ((err as Error).name === "AbortError") { setIsSharing(false); return; } }
      }
      setIsSharing(false); setIsShareOpen(true);
    } catch (err) {
      console.error("Screenshot failed:", err);
      setIsSharing(false); setIsShareOpen(true);
    }
  };

  const [storyBlob, setStoryBlob] = useState<Blob | null>(null);
  const [storyUrl, setStoryUrl] = useState<string | null>(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  const generateStoryCanvas = async (): Promise<Blob | null> => {
    // Full Instagram Story resolution: 1080x1920 rendered at 0.5x = 540x960
    const W = 540, H = 960;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    const PRIMARY = isWin ? "#00e5ff" : "#ff3366";
    const ACCENT = isWin ? "#e500ff" : "#ff8c00";
    const BG_MID = isWin ? "#020e14" : "#14020a";

    // ── Background: deep gradient ──────────────────────────────────────
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, "#030310");
    bgGrad.addColorStop(0.45, BG_MID);
    bgGrad.addColorStop(1, "#030310");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // ── Dot grid ──────────────────────────────────────────────────────
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    for (let x = 0; x < W; x += 26) for (let y = 0; y < H; y += 26) {
      ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI * 2); ctx.fill();
    }

    // ── Ambient glow blobs ────────────────────────────────────────────
    const blob1 = ctx.createRadialGradient(W / 2, H * 0.35, 0, W / 2, H * 0.35, 280);
    blob1.addColorStop(0, PRIMARY + "28"); blob1.addColorStop(1, "transparent");
    ctx.fillStyle = blob1; ctx.fillRect(0, 0, W, H);
    const blob2 = ctx.createRadialGradient(W * 0.8, H * 0.7, 0, W * 0.8, H * 0.7, 200);
    blob2.addColorStop(0, ACCENT + "18"); blob2.addColorStop(1, "transparent");
    ctx.fillStyle = blob2; ctx.fillRect(0, 0, W, H);

    // ── Geometric diagonal lines ──────────────────────────────────────
    const drawLine = (x1: number, y1: number, x2: number, y2: number, color: string, w: number) => {
      ctx.save(); ctx.globalAlpha = 0.12; ctx.strokeStyle = color; ctx.lineWidth = w;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
    };
    drawLine(-30, 80, 340, H + 50, PRIMARY, 1.5);
    drawLine(60, 0, 440, H * 0.9, PRIMARY, 0.8);
    drawLine(W + 30, 60, 200, H + 30, ACCENT, 1.2);
    drawLine(W - 60, 0, 100, H * 0.85, ACCENT, 0.6);

    // ── Corner bracket — top left ─────────────────────────────────────
    ctx.save(); ctx.globalAlpha = 0.35; ctx.strokeStyle = PRIMARY; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(28, 70); ctx.lineTo(28, 28); ctx.lineTo(70, 28); ctx.stroke();
    // top right
    ctx.beginPath(); ctx.moveTo(W - 28, 70); ctx.lineTo(W - 28, 28); ctx.lineTo(W - 70, 28); ctx.stroke();
    // bottom left
    ctx.strokeStyle = ACCENT;
    ctx.beginPath(); ctx.moveTo(28, H - 70); ctx.lineTo(28, H - 28); ctx.lineTo(70, H - 28); ctx.stroke();
    ctx.restore();

    // ── MODI_LANDER top brand ─────────────────────────────────────────
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = "800 15px Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    ctx.letterSpacing = "5px";
    ctx.fillText("MODI_LANDER", W / 2, 50);
    ctx.restore();

    // ── Thin top divider line ─────────────────────────────────────────
    const topLine = ctx.createLinearGradient(60, 0, W - 60, 0);
    topLine.addColorStop(0, "transparent"); topLine.addColorStop(0.5, PRIMARY + "50"); topLine.addColorStop(1, "transparent");
    ctx.strokeStyle = topLine; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60, 64); ctx.lineTo(W - 60, 64); ctx.stroke();

    // ── Character image panel ──────────────────────────────────────────
    try {
      const img = new Image(); img.crossOrigin = "anonymous";
      await new Promise<void>((res) => { img.onload = () => res(); img.onerror = () => res(); img.src = photoSrc; });
      const imgSize = 240, imgX = (W - imgSize) / 2, imgY = 100;
      // Glow behind image
      const imgGlow = ctx.createRadialGradient(W / 2, imgY + imgSize / 2, 0, W / 2, imgY + imgSize / 2, imgSize * 0.7);
      imgGlow.addColorStop(0, PRIMARY + "30"); imgGlow.addColorStop(1, "transparent");
      ctx.fillStyle = imgGlow; ctx.fillRect(0, 80, W, imgSize + 60);
      // Rounded rect clip
      ctx.save();
      const r = 36;
      ctx.beginPath();
      ctx.moveTo(imgX + r, imgY); ctx.lineTo(imgX + imgSize - r, imgY);
      ctx.arcTo(imgX + imgSize, imgY, imgX + imgSize, imgY + r, r);
      ctx.lineTo(imgX + imgSize, imgY + imgSize - r);
      ctx.arcTo(imgX + imgSize, imgY + imgSize, imgX + imgSize - r, imgY + imgSize, r);
      ctx.lineTo(imgX + r, imgY + imgSize);
      ctx.arcTo(imgX, imgY + imgSize, imgX, imgY + imgSize - r, r);
      ctx.lineTo(imgX, imgY + r);
      ctx.arcTo(imgX, imgY, imgX + r, imgY, r);
      ctx.closePath();
      // Border
      ctx.strokeStyle = PRIMARY + "55"; ctx.lineWidth = 2; ctx.stroke();
      // Background fill
      ctx.fillStyle = PRIMARY + "10"; ctx.fill();
      ctx.clip();
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
      ctx.restore();
      // Small trophy/skull overlay
      ctx.font = "36px Arial";
      ctx.fillText(isWin ? "🏆" : "💀", imgX + imgSize - 28, imgY + imgSize - 4);
    } catch (_) {}

    // ── RESULT text ────────────────────────────────────────────────────
    const resultY = 392;
    ctx.save();
    ctx.textAlign = "center";
    // Shadow glow pass
    ctx.shadowColor = PRIMARY; ctx.shadowBlur = 30;
    ctx.font = "900 72px Arial Black, Arial, sans-serif";
    ctx.fillStyle = PRIMARY;
    ctx.fillText(isWin ? "YOU WIN!" : "GAME OVER", W / 2, resultY);
    ctx.shadowBlur = 0;
    ctx.restore();

    // ── Winner chip ────────────────────────────────────────────────────
    const chipText = `${winnerName} WINS`;
    const chipY = 428;
    ctx.save();
    ctx.textAlign = "center";
    ctx.font = "bold 18px Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.fillText(chipText, W / 2, chipY);
    ctx.restore();

    // ── Horizontal divider ─────────────────────────────────────────────
    const midLine = ctx.createLinearGradient(60, 0, W - 60, 0);
    midLine.addColorStop(0, "transparent"); midLine.addColorStop(0.5, "rgba(255,255,255,0.12)"); midLine.addColorStop(1, "transparent");
    ctx.strokeStyle = midLine; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60, 456); ctx.lineTo(W - 60, 456); ctx.stroke();

    // ── Score glass card ───────────────────────────────────────────────
    const cardX = 60, cardY = 478, cardW = W - 120, cardH = 130, cardR = 24;
    ctx.save();
    // Card bg
    ctx.beginPath();
    ctx.moveTo(cardX + cardR, cardY); ctx.lineTo(cardX + cardW - cardR, cardY);
    ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardR, cardR);
    ctx.lineTo(cardX + cardW, cardY + cardH - cardR);
    ctx.arcTo(cardX + cardW, cardY + cardH, cardX + cardW - cardR, cardY + cardH, cardR);
    ctx.lineTo(cardX + cardR, cardY + cardH);
    ctx.arcTo(cardX, cardY + cardH, cardX, cardY + cardH - cardR, cardR);
    ctx.lineTo(cardX, cardY + cardR);
    ctx.arcTo(cardX, cardY, cardX + cardR, cardY, cardR);
    ctx.closePath();
    const cardGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    cardGrad.addColorStop(0, "rgba(255,255,255,0.06)");
    cardGrad.addColorStop(1, "rgba(255,255,255,0.02)");
    ctx.fillStyle = cardGrad; ctx.fill();
    ctx.strokeStyle = PRIMARY + "35"; ctx.lineWidth = 1; ctx.stroke();
    // Shine line on top of card
    const cardShine = ctx.createLinearGradient(cardX + 40, 0, cardX + cardW - 40, 0);
    cardShine.addColorStop(0, "transparent"); cardShine.addColorStop(0.5, PRIMARY + "60"); cardShine.addColorStop(1, "transparent");
    ctx.strokeStyle = cardShine; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cardX + 40, cardY); ctx.lineTo(cardX + cardW - 40, cardY); ctx.stroke();
    ctx.restore();

    // Score label
    ctx.save(); ctx.textAlign = "center";
    ctx.font = "bold 12px Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.letterSpacing = "5px";
    ctx.fillText("PROMISES COLLECTED", W / 2, cardY + 34);
    // Score value
    ctx.font = "900 68px Arial Black, Arial, sans-serif";
    ctx.fillStyle = "white";
    ctx.shadowColor = "rgba(255,255,255,0.25)"; ctx.shadowBlur = 20;
    ctx.letterSpacing = "3px";
    ctx.fillText(score.toString().padStart(6, "0"), W / 2, cardY + 105);
    ctx.shadowBlur = 0;
    ctx.restore();

    // ── @Mentions section ───────────────────────────────────────────────
    const mentY = 650;
    // Tag "Made by" label
    ctx.save(); ctx.textAlign = "center";
    ctx.font = "bold 11px Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.letterSpacing = "3px";
    ctx.fillText("MADE BY", W / 2, mentY);
    ctx.restore();

    // @prince pill
    const drawMentionPill = (text: string, cx: number, cy: number, color: string) => {
      ctx.save();
      const metrics = ctx.measureText(text);
      const pw = metrics.width + 32, ph = 38, px = cx - pw / 2, py = cy - ph / 2;
      const pr = 19;
      ctx.beginPath();
      ctx.moveTo(px + pr, py); ctx.lineTo(px + pw - pr, py);
      ctx.arcTo(px + pw, py, px + pw, py + pr, pr);
      ctx.lineTo(px + pw, py + ph - pr);
      ctx.arcTo(px + pw, py + ph, px + pw - pr, py + ph, pr);
      ctx.lineTo(px + pr, py + ph);
      ctx.arcTo(px, py + ph, px, py + ph - pr, pr);
      ctx.lineTo(px, py + pr);
      ctx.arcTo(px, py, px + pr, py, pr);
      ctx.closePath();
      ctx.fillStyle = color + "22"; ctx.fill();
      ctx.strokeStyle = color + "55"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = color;
      ctx.font = "bold 16px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(text, cx, cy + 6);
      ctx.restore();
    };

    const igPink = "#e1306c";
    ctx.font = "bold 16px Arial, sans-serif"; // set font before getContext measureText
    drawMentionPill("@zwischenweg", W / 2 - 90, mentY + 36, igPink);
    drawMentionPill("@sutariya_smit_", W / 2 + 95, mentY + 36, igPink);

    // ── Sarcastic message ───────────────────────────────────────────────
    ctx.save(); ctx.textAlign = "center";
    ctx.font = "italic 14px Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.fillText(
      isWin ? "Promises collected. Accountability avoided." : "Caught by the opposition. Rare event.",
      W / 2, mentY + 90
    );
    ctx.restore();

    // ── Bottom CTA strip ─────────────────────────────────────────────────
    const stripY = H - 120;
    const stripGrad = ctx.createLinearGradient(0, stripY, 0, H);
    stripGrad.addColorStop(0, "transparent");
    stripGrad.addColorStop(0.4, PRIMARY + "18");
    stripGrad.addColorStop(1, PRIMARY + "08");
    ctx.fillStyle = stripGrad; ctx.fillRect(0, stripY, W, H - stripY);

    // Horizontal line
    const botLine = ctx.createLinearGradient(60, 0, W - 60, 0);
    botLine.addColorStop(0, "transparent"); botLine.addColorStop(0.5, PRIMARY + "40"); botLine.addColorStop(1, "transparent");
    ctx.strokeStyle = botLine; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60, stripY + 8); ctx.lineTo(W - 60, stripY + 8); ctx.stroke();

    ctx.save(); ctx.textAlign = "center";
    ctx.font = "700 13px Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.letterSpacing = "2px";
    ctx.fillText("Can you beat this?", W / 2, stripY + 44);
    ctx.font = "bold 15px Arial, sans-serif";
    ctx.fillStyle = PRIMARY + "bb";
    ctx.letterSpacing = "1px";
    ctx.fillText("github.com/PRINCESTR", W / 2, stripY + 72);
    ctx.font = "700 11px Arial, sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.letterSpacing = "4px";
    ctx.fillText("MODI_LANDER · BY PRINCE & SMIT", W / 2, stripY + 100);
    ctx.restore();

    return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png", 0.95));
  };

  const handleInstaStory = async () => {
    beep(700, "sine", 0.06, 0.1);
    setIsGeneratingStory(true);
    try {
      const blob = await generateStoryCanvas();
      if (!blob) { setIsGeneratingStory(false); return; }
      // Revoke old URL
      if (storyUrl) URL.revokeObjectURL(storyUrl);
      const url = URL.createObjectURL(blob);
      setStoryBlob(blob); setStoryUrl(url);
      setIsGeneratingStory(false);
      setShowStoryModal(true);
    } catch (_) { setIsGeneratingStory(false); }
  };

  const doShare = async () => {
    if (!storyBlob) return;
    const file = new File([storyBlob], "modilander_story.png", { type: "image/png" });
    const shareText = `I scored ${score} in MODI_LANDER! Play: github.com/PRINCESTR — Made by @zwischenweg & @sutariya_smit_`;

    // 1. Try to copy image to clipboard so user can paste into Instagram
    let copiedToClipboard = false;
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": storyBlob })]);
      copiedToClipboard = true;
    } catch (_) {}

    // 2. Try native Web Share API (opens share sheet → Instagram Stories on mobile)
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "MODI_LANDER Score", text: shareText });
        setShowStoryModal(false);
        return;
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
      }
    }

    // 3. On iOS/Android: try instagram:// deep link + notify user image is copied
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    if (isIOS || isAndroid) {
      // Open Instagram Stories camera — user can paste the copied image
      window.location.href = "instagram://story-camera";
      // Small delay timeout to show user instructions if Instagram doesn't open
      return;
    }

    // 4. Desktop fallback: download
    if (storyUrl) {
      const a = document.createElement("a");
      a.href = storyUrl; a.download = "modilander_story.png"; a.click();
    }
    void copiedToClipboard;
  };

  return (
    <div className="font-sans select-none" style={{ minHeight: "100dvh", background: "#04040f", position: "relative", overflow: "hidden" }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-background">
        <div className="absolute rounded-full blur-[140px] opacity-40"
          style={{ top: "-10%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "60%",
            background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)` }} />
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      </div>

      {/* ── Unified responsive layout ── */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-[100dvh] items-stretch">

        {/* ── LEFT / TOP: Video panel ── */}
        <div className="relative w-full lg:w-[42%] aspect-video lg:aspect-auto lg:flex-shrink-0 lg:min-h-[100dvh] overflow-hidden bg-black flex items-center justify-center">
          <video src={videoSrc} autoPlay loop playsInline
            className="absolute inset-0 w-full h-full object-contain lg:object-cover"
            style={{ opacity: 0.9 }} />
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 lg:bg-gradient-to-r lg:from-black/20 lg:via-transparent lg:to-black/60" />
          {/* LIVE badge on video */}
          <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full px-3 py-1.5 glass-pill border-red-500/20">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse drop-shadow-md" />
            <span className="text-[9px] font-bold tracking-widest text-red-500 uppercase">LIVE</span>
          </div>
          {/* Result label on video (mobile) */}
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 lg:hidden px-4">
            <div className="flex items-center justify-center gap-3">
              {isWin
                ? <IconTrophy size={32} color={accentColor} />
                : <IconSkull size={32} color={accentColor} />}
              <div className="text-4xl font-extrabold tracking-tight" style={{
                color: '#f3f4f6', textShadow: `0 4px 20px rgba(0,0,0,0.8), 0 0 40px ${accentColor}`,
                animation: isWin ? "fade-in-up 0.8s ease-out" : "none",
              }}>
                {winnerName} WINS!
              </div>
            </div>
            <div className="text-[10px] font-bold tracking-widest uppercase mt-1" style={{ color: "rgba(255,255,255,0.7)", textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}>
              {isWin ? "Mission Complete" : "Better luck next time"}
            </div>
          </div>
        </div>

        {/* ── RIGHT / BOTTOM: Info + Actions ── */}
        <div className="flex-1 flex flex-col justify-center px-5 py-8 lg:px-10 lg:py-12 gap-6 lg:gap-8"
          style={{ animation: "fade-in 0.8s ease-out" }}>

          {/* Desktop header */}
          <div className="hidden lg:flex flex-col gap-3">
            <div className="flex items-center gap-2 rounded-full w-fit px-3.5 py-1.5 glass-pill border" style={{ borderColor: `${accentColor}30` }}>
              <span className="w-2 h-2 rounded-full animate-pulse drop-shadow-md" style={{ background: accentColor }} />
              <span className="text-[10px] font-bold tracking-[4px] uppercase" style={{ color: accentColor }}>
                {isWin ? "Mission Complete" : "Game Over"}
              </span>
            </div>
            <h1 className="font-extrabold tracking-tight leading-none flex items-center gap-4" style={{
              fontSize: "clamp(44px, 6vw, 80px)",
              color: '#f3f4f6',
              textShadow: `0 4px 20px rgba(0,0,0,0.8), 0 0 40px ${accentColor}`,
            }}>
              {isWin ? <IconTrophy size={56} color={accentColor} /> : <IconSkull size={56} color={accentColor} />}
              {winnerName} WINS!
            </h1>
            <p className="font-bold tracking-widest uppercase mt-1" style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              {isWin ? `${loserName} eliminated` : `Caught by ${winnerName}`}
            </p>
          </div>

          {/* Satirical message */}
          <div className="flex items-start gap-3 rounded-2xl px-5 py-4 glass shadow-md"
            style={{ borderLeft: `2px solid ${accentColor}` }}>
            <span className="text-xl font-serif mt-0.5 leading-none" style={{ color: accentColor }}>❝</span>
            <p className="text-sm italic tracking-wide" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{sarcasticMsg}</p>
          </div>

          {/* Photo + Score row */}
          <div className="flex items-stretch gap-4">
            {/* Character photo */}
            <div className="relative rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center glass-panel"
              style={{
                width: "clamp(90px, 20vw, 140px)", height: "clamp(90px, 20vw, 140px)",
              }}>
              <img src={photoSrc} alt="Result" className="w-full h-full object-contain p-2 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
              <div className="absolute bottom-0 right-0 rounded-tl-xl p-2 glass">
                {isWin
                  ? <IconTrophy size={18} color={accentColor} />
                  : <IconSkull size={18} color={accentColor} />}
              </div>
            </div>

            {/* Score card */}
            <div className="flex-1 flex flex-col justify-center rounded-2xl px-5 py-4 glass-panel">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">
                  Promises Collected
                </span>
                <span className="font-extrabold tabular-nums leading-none tracking-tight" style={{
                  fontSize: "clamp(32px, 8vw, 64px)",
                  color: "#f3f4f6",
                  textShadow: `0 4px 16px rgba(0,0,0,0.6)`,
                }}>
                  {score.toString().padStart(6, "0")}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="flex flex-col">
                  <span className="text-[8px] tracking-widest uppercase text-white/40 mb-0.5">Winner</span>
                  <span className="text-sm font-bold text-white/90">{winnerName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] tracking-widest uppercase text-white/40 mb-0.5">Eliminated</span>
                  <span className="text-sm font-medium text-white/50">{loserName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Replay */}
            <button
              onClick={() => { beep(900, "square", 0.07, 0.12); navigate("/game", { state: { character } }); }}
              className="relative overflow-hidden rounded-2xl font-bold text-xs tracking-widest uppercase transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5 glass hover:bg-white/10"
              style={{ padding: "18px 20px" }}
            >
              <IconRefresh size={16} color="currentColor" />
              <span>REPLAY</span>
            </button>

            {/* Home */}
            <Link to="/"
              className="relative overflow-hidden rounded-2xl font-bold text-xs tracking-widest uppercase transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5 glass hover:bg-white/10"
              style={{ padding: "18px 20px", textDecoration: "none", color: "rgba(255,255,255,0.9)" }}
              onClick={() => beep(600, "sine", 0.05, 0.1)}
            >
              <IconHome size={16} color="currentColor" />
              <span>HOME</span>
            </Link>

            {/* Share */}
            <button
              onClick={() => { beep(700, "sine", 0.06, 0.1); handleScreenshotAndShare(); }}
              disabled={isSharing}
              className="col-span-2 relative overflow-hidden rounded-2xl font-bold text-[13px] tracking-widest uppercase transition-all duration-300 active:scale-[0.98] group flex items-center justify-center gap-2.5 shadow-lg hover:shadow-2xl"
              style={{
                padding: "18px 20px",
                background: isWin
                  ? "linear-gradient(135deg, rgba(14,165,233,0.8), rgba(14,165,233,0.4))"
                  : "linear-gradient(135deg, rgba(244,63,94,0.8), rgba(244,63,94,0.4))",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                opacity: isSharing ? 0.7 : 1,
              }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <IconShare size={16} color="white" />
              <span className="drop-shadow-md">{isSharing ? "CAPTURING..." : "SHARE SCORE"}</span>
            </button>

            {/* Instagram Story button */}
            <button
              onClick={handleInstaStory}
              disabled={isGeneratingStory}
              className="col-span-2 relative overflow-hidden rounded-2xl font-black text-sm tracking-[3px] uppercase transition-all duration-300 active:scale-[0.97] group flex items-center justify-center gap-2.5"
              style={{
                padding: "16px 20px",
                background: "linear-gradient(135deg, rgba(225,48,108,0.22), rgba(131,58,180,0.22), rgba(253,29,29,0.14))",
                border: "1px solid rgba(225,48,108,0.4)",
                color: "white",
                opacity: isGeneratingStory ? 0.7 : 1,
              }}
              onMouseOver={e => !isGeneratingStory && (e.currentTarget.style.boxShadow = "0 0 40px rgba(225,48,108,0.35), 0 0 80px rgba(131,58,180,0.18)")}
              onMouseOut={e => (e.currentTarget.style.boxShadow = "none")}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(225,48,108,0.8), rgba(131,58,180,0.6), transparent)" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/4 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <IconInstagram size={15} color="white" />
              <span>{isGeneratingStory ? "GENERATING..." : "ADD TO INSTAGRAM STORY"}</span>
            </button>
          </div>


          {/* Credits */}
          <p className="text-center text-[8px] tracking-[3px] uppercase" style={{ color: "rgba(255,255,255,0.15)" }}>
            MODI_LANDER · PRINCE &amp; SMIT · For entertainment only
          </p>

          {/* ── Review Form ── */}
          <ReviewForm accentColor={accentColor} />
        </div>
      </div>

      {/* ── Hidden share card ── */}
      <div ref={shareCardRef} aria-hidden style={{
        position: "fixed", left: "-9999px", top: 0,
        width: "380px", background: "#0a0a1a", padding: "36px",
        borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)",
        fontFamily: "'Outfit', sans-serif", boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "28px", fontWeight: 900, color: accentColor, marginBottom: "4px", letterSpacing: "-0.5px" }}>
            {isWin ? "YOU WIN! 🏆" : "GAME OVER 💀"}
          </div>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.8)", letterSpacing: "2px", textTransform: "uppercase" }}>
            {winnerName} wins
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <div style={{ width: "160px", height: "160px", borderRadius: "24px", border: `1px solid ${accentColor}50`, background: "#050510" }}>
            <img src={photoSrc} alt="Result" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "12px" }} crossOrigin="anonymous" />
          </div>
        </div>
        <div style={{ textAlign: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "16px 0" }}>
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", marginBottom: "6px", letterSpacing: "4px", fontWeight: 700 }}>
            PROMISES COLLECTED
          </div>
          <div style={{ fontSize: "40px", color: "#fff", fontWeight: 900, letterSpacing: "2px" }}>
            {score.toString().padStart(6, "0")}
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "16px", fontSize: "8px", color: `${accentColor}80`, letterSpacing: "2px", fontWeight: 700 }}>
          MODI_LANDER · PRINCE &amp; SMIT
        </div>
      </div>

      <ShareSheet isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} score={score} screenshotUrl={screenshotUrl} />

      {/* ── Instagram Story Preview Modal ── */}
      {showStoryModal && storyUrl && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(20px)" }}
          onClick={() => setShowStoryModal(false)}
        >
          <div
            className="relative flex flex-col items-center gap-5 w-full max-w-sm"
            onClick={e => e.stopPropagation()}
          >
            {/* Close x */}
            <button onClick={() => setShowStoryModal(false)}
              className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <IconX size={14} color="rgba(255,255,255,0.7)" />
            </button>

            {/* Modal header */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#e1306c" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#833ab4" }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#fd1d1d" }} />
              </div>
              <h2 className="text-base font-black tracking-[3px] uppercase text-white">Your Story Card</h2>
              <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Preview · @mentions included inside</p>
            </div>

            {/* Story preview — 9:16 thumbnail */}
            <div className="relative rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl"
              style={{
                width: 195, height: 346,
                border: "1px solid rgba(225,48,108,0.4)",
                boxShadow: "0 0 60px rgba(225,48,108,0.25), 0 20px 60px rgba(0,0,0,0.6)",
              }}>
              <img src={storyUrl} alt="Story" className="w-full h-full object-cover" />
              {/* Instagram-style top UI overlay */}
              <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-2.5 pt-2">
                {[1,2,3].map(i => (
                  <div key={i} className="flex-1 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
                ))}
              </div>
              <div className="absolute top-4 left-2.5 flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full" style={{ background: "linear-gradient(135deg, #fd1d1d, #833ab4, #e1306c)" }} />
                <span className="text-[8px] font-bold text-white">Your Story</span>
              </div>
            </div>

            {/* @mentions chip row */}
            <div className="flex flex-col items-center gap-2 w-full">
              <p className="text-[8px] tracking-[3px] uppercase font-bold" style={{ color: "rgba(255,255,255,0.25)" }}>Tagged inside card</p>
              <div className="flex gap-2">
                {["@zwischenweg", "@sutariya_smit_"].map(h => (
                  <div key={h} className="flex items-center gap-1 rounded-full px-3 py-1.5"
                    style={{ background: "rgba(225,48,108,0.12)", border: "1px solid rgba(225,48,108,0.35)" }}>
                    <span className="text-[9px] font-black" style={{ color: "#e1306c" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Share button */}
            <button onClick={doShare}
              className="w-full relative overflow-hidden rounded-2xl font-black text-sm tracking-[3px] uppercase group flex items-center justify-center gap-2.5"
              style={{
                padding: "18px",
                background: "linear-gradient(135deg, rgba(225,48,108,0.28), rgba(131,58,180,0.28), rgba(253,29,29,0.2))",
                border: "1px solid rgba(225,48,108,0.5)",
                color: "white",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(225,48,108,0.9), rgba(131,58,180,0.7), transparent)" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <IconInstagram size={16} color="white" />
              <span className="relative">Open in Instagram Stories</span>
            </button>

            {/* Download fallback */}
            <button onClick={() => { if (storyUrl) { const a = document.createElement("a"); a.href = storyUrl; a.download = "modilander_story.png"; a.click(); } }}
              className="flex items-center justify-center gap-1.5 text-[9px] tracking-[2px] uppercase transition-all"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              <IconDownload size={11} color="rgba(255,255,255,0.3)" />
              Download instead
            </button>

            {/* How-to steps */}
            <div className="w-full rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-[8px] font-black tracking-[3px] uppercase mb-2" style={{ color: "rgba(255,255,255,0.25)" }}>How to post</p>
              {[
                "Tap 'Share Now' above",
                "Pick Instagram from share sheet",
                "Tap \"Add to Story\"",
                "Tag @zwischenweg & @sutariya_smit_",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2 py-1">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black flex-shrink-0"
                    style={{ background: "rgba(225,48,108,0.2)", color: "#e1306c" }}>{i + 1}</span>
                  <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
