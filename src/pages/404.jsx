import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Particle field behind the 404 number
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const COLORS = ["#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <>
      <Head>
        <title>404 — Page Not Found | Rittik Soni</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "24px",
        transition: "background 0.4s ease",
      }}>
        {/* Ambient glows */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "-120px", left: "-80px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", bottom: "-100px", right: "-60px",
          width: "450px", height: "450px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(6,182,212,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Particle canvas */}
        <canvas ref={canvasRef} aria-hidden="true" style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 1, textAlign: "center",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>

          {/* Glitchy 404 number */}
          <div style={{ position: "relative", marginBottom: "8px" }}>
            <h1 style={{
              fontSize: "clamp(7rem, 22vw, 14rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
              userSelect: "none",
            }}>
              404
            </h1>
            {/* Glitch layers */}
            <style>{`
              @keyframes glitch-1 {
                0%,94%,100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
                95% { clip-path: inset(20% 0 60% 0); transform: translate(-4px, 2px); }
                97% { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); }
              }
              @keyframes glitch-2 {
                0%,91%,100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
                92% { clip-path: inset(40% 0 40% 0); transform: translate(4px, 1px); }
                94% { clip-path: inset(70% 0 5%  0); transform: translate(-4px, -1px); }
              }
              @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
            `}</style>
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              fontSize: "clamp(7rem, 22vw, 14rem)", fontWeight: 900, lineHeight: 1,
              letterSpacing: "-0.04em", margin: 0,
              background: "linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              animation: "glitch-1 4s linear infinite",
              filter: "blur(0.5px)",
            }}>404</div>
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              fontSize: "clamp(7rem, 22vw, 14rem)", fontWeight: 900, lineHeight: 1,
              letterSpacing: "-0.04em", margin: 0,
              background: "linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              animation: "glitch-2 4s linear infinite",
              filter: "blur(0.5px)",
            }}>404</div>
          </div>

          {/* Floating icon */}
          <div style={{ animation: "float 3s ease-in-out infinite", marginBottom: "24px", fontSize: "2.5rem" }}>
            🛸
          </div>

          <h2 style={{
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "12px",
          }}>
            Lost in the void?
          </h2>

          <p style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            maxWidth: "380px",
            lineHeight: 1.7,
            margin: "0 auto 36px",
          }}>
            This page doesn&apos;t exist (yet). Head back home, there&apos;s a lot more to explore there.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => history.back()}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "11px 22px", borderRadius: "99px",
                background: "var(--card-bg)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
                fontSize: "0.875rem", fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)"; e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              <FiArrowLeft size={16} /> Go back
            </button>

            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "11px 22px", borderRadius: "99px",
                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                border: "none",
                color: "#fff",
                fontSize: "0.875rem", fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(6,182,212,0.3)",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(6,182,212,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(6,182,212,0.3)"; }}
              >
                <FiHome size={16} /> Back to Home
              </div>
            </Link>
          </div>

          {/* Signature */}
          <p style={{
            marginTop: "48px",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
          }}>
            — King Rittik
          </p>
        </div>
      </main>
    </>
  );
}
