"use client";
import { useEffect, useRef } from "react";

// ── Trail configuration ──────────────────────────────────────────────────────
const TRAIL_LENGTH = 22;       // number of particles in the tail
const BASE_RADIUS  = 6;        // head dot radius (px)
const LERP_SPEED   = 0.14;     // how fast each particle chases the one ahead

// Gradient palette (head → tail): cyan → blue → violet → pink → rose
const PALETTE = [
  "#22d3ee", // cyan-400
  "#38bdf8", // sky-400
  "#60a5fa", // blue-400
  "#818cf8", // indigo-400
  "#a78bfa", // violet-400
  "#c084fc", // purple-400
  "#e879f9", // fuchsia-400
  "#f472b6", // pink-400
  "#fb7185", // rose-400
];

function getColor(idx, total) {
  const t   = idx / (total - 1);               // 0 (head) → 1 (tail)
  const pos = t * (PALETTE.length - 1);
  const lo  = Math.floor(pos);
  const hi  = Math.min(lo + 1, PALETTE.length - 1);
  const mix = pos - lo;

  // Hex-lerp two neighbouring palette colours
  const hex  = (s) => parseInt(s.slice(1), 16);
  const r    = (c) => (c >> 16) & 0xff;
  const g    = (c) => (c >>  8) & 0xff;
  const b    = (c) =>  c        & 0xff;

  const c0 = hex(PALETTE[lo]);
  const c1 = hex(PALETTE[hi]);

  const rr = Math.round(r(c0) + (r(c1) - r(c0)) * mix);
  const gg = Math.round(g(c0) + (g(c1) - g(c0)) * mix);
  const bb = Math.round(b(c0) + (b(c1) - b(c0)) * mix);

  return `rgb(${rr},${gg},${bb})`;
}

// ── Component ────────────────────────────────────────────────────────────────
const CustomCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Hide on touch / stylus devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Resize canvas to viewport
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Hide the native cursor globally
    document.body.style.cursor = "none";

    // ── State ────────────────────────────────────────────────────────────────
    // Each particle: { x, y }
    const particles = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: -200,
      y: -200,
    }));

    let mouse      = { x: -200, y: -200 };
    let isHovering = false;
    let isClicking = false;

    // ── Event listeners ──────────────────────────────────────────────────────
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onDown = () => { isClicking = true; };
    const onUp   = () => { isClicking = false; };
    const onOver = (e) => {
      if (e.target.closest("a, button, [role='button'], input, textarea, select, label")) {
        isHovering = true;
      }
    };
    const onOut  = () => { isHovering = false; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseover",  onOver);
    document.addEventListener("mouseout",   onOut);

    // ── Render loop ──────────────────────────────────────────────────────────
    let raf;

    const lerp = (a, b, t) => a + (b - a) * t;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Step 1: propagate positions (each particle lerps toward the one ahead)
      // particle[0] chases mouse directly
      particles[0].x = lerp(particles[0].x, mouse.x, LERP_SPEED * 1.5);
      particles[0].y = lerp(particles[0].y, mouse.y, LERP_SPEED * 1.5);

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const speed = LERP_SPEED * (1 - i / TRAIL_LENGTH * 0.5); // slower toward tail
        particles[i].x = lerp(particles[i].x, particles[i - 1].x, speed);
        particles[i].y = lerp(particles[i].y, particles[i - 1].y, speed);
      }

      // Step 2: draw tail → head (so head renders on top)
      for (let i = TRAIL_LENGTH - 1; i >= 0; i--) {
        const t      = i / (TRAIL_LENGTH - 1);          // 0=head, 1=tail
        const radius = BASE_RADIUS * (1 - t * 0.85);    // shrinks toward tail
        const alpha  = 1 - t * 0.88;                    // fades toward tail
        const color  = getColor(i, TRAIL_LENGTH);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, Math.max(radius, 0.8), 0, Math.PI * 2);

        // Glow
        const glow = ctx.createRadialGradient(
          particles[i].x, particles[i].y, 0,
          particles[i].x, particles[i].y, radius * (isHovering ? 3.5 : 2.5)
        );
        glow.addColorStop(0, color);
        glow.addColorStop(1, "transparent");

        ctx.fillStyle = glow;
        ctx.shadowColor  = color;
        ctx.shadowBlur   = isClicking ? 22 : 12;
        ctx.fill();
        ctx.restore();
      }

      // Step 3: draw crisp head dot at exact mouse position
      const headRadius = isClicking ? BASE_RADIUS * 0.7 : BASE_RADIUS;
      const headColor  = isHovering ? "#f472b6" : "#22d3ee";

      ctx.save();
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, headRadius, 0, Math.PI * 2);
      ctx.fillStyle = headColor;
      ctx.shadowColor = headColor;
      ctx.shadowBlur  = isHovering ? 20 : 14;
      ctx.fill();
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 999999,
      }}
    />
  );
};

export default CustomCursor;
