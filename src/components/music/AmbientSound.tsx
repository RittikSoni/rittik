import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { FiVolumeX, FiVolume2 } from "react-icons/fi";

declare global {
  interface Window {
    bubbles?: Array<{
      x: number;
      y: number;
      r: number;
      speed: number;
      alpha: number;
    }>;
  }
}

type Env = "rain" | "snow" | "wind" | "lofi" | "ocean";

const audioFiles: Record<Env, string> = {
  rain: "/audio/rain.mp3",
  snow: "/audio/snow.mp3",
  wind: "/audio/christmas.mp3",
  lofi: "/audio/christmas.mp3",
  ocean: "/audio/snow.mp3",
};

export default function AmbientEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [env, setEnv] = useState<Env>("rain");
  const [muted, setMuted] = useState(true);
  const [player, setPlayer] = useState<Howl | null>(null);

  useEffect(() => {
    const sound = new Howl({
      src: [audioFiles[env]],
      loop: true,
      html5: true,
      volume: muted ? 0 : 0.5,
    });
    sound.play();
    setPlayer(sound);
    return () => {
      sound.stop();
    };
  }, [env, muted]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationId: number;
    let particles: Array<any> = [];

    let analyser: AnalyserNode;
    let dataArray: Uint8Array;

    const initParticles = () => {
      particles = [];
      const count =
        env === "snow" ? 200 : env === "rain" ? 300 : env === "wind" ? 150 : 0;
      for (let i = 0; i < count; i++) {
        if (env === "rain") {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vX: 0,
            vY: Math.random() * 4 + 4,
            size: Math.random() * 20 + 10,
            opacity: Math.random() * 0.2 + 0.2,
            thickness: Math.random() * 1.5 + 0.5,
          });
        } else {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vX: env === "wind" ? Math.random() * 1 + 0.5 : 0,
            vY: env === "snow" ? Math.random() * 1 + 0.2 : 0,
            size: env === "snow" ? Math.random() * 3 + 2 : 1,
          });
        }
      }
    };

    // const setupVisualizer = () => {
    //   if (env !== "lofi" || !player) return;
    //   const AudioCtx = (window.AudioContext ||
    //     (window as any).webkitAudioContext) as {
    //     new (): AudioContext;
    //   };
    //   const audioCtx = new AudioCtx();
    //   const srcNode = audioCtx.createMediaElementSource(
    //     player["_sounds"][0]._node as HTMLMediaElement
    //   );
    //   analyser = audioCtx.createAnalyser();
    //   srcNode.connect(analyser);
    //   analyser.connect(audioCtx.destination);
    //   analyser.fftSize = 128;
    //   dataArray = new Uint8Array(analyser.frequencyBinCount);
    // };

    const setupVisualizer = () => {
      if (env !== "lofi" || !player) return;

      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const sound = player._sounds[0];
      const node = sound && sound._node;

      // Validate it's an HTMLMediaElement
      if (!(node instanceof HTMLMediaElement)) {
        console.warn("Not a valid HTMLMediaElement:", node);
        return;
      }

      const srcNode = audioCtx.createMediaElementSource(node);
      analyser = audioCtx.createAnalyser();
      srcNode.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 128;
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (["rain", "snow", "wind"].includes(env)) {
        for (const p of particles) {
          if (env === "rain") {
            ctx.strokeStyle = `rgba(173, 216, 230, ${p.opacity})`;
            ctx.lineWidth = p.thickness!;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x, p.y + p.size);
            ctx.stroke();
            p.y += p.vY!;
            if (p.y > height) {
              p.y = -p.size;
              p.x = Math.random() * width;
            }
          } else {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.y += p.vY!;
            p.x += p.vX!;
            if (p.y > height) p.y = -10;
            if (p.x > width) p.x = 0;
          }
        }
      }

      if (env === "lofi" && analyser) {
        analyser.getByteFrequencyData(dataArray as Uint8Array<ArrayBuffer>);
        const barWidth = width / dataArray.length;
        for (let i = 0; i < dataArray.length; i++) {
          const barHeight = (dataArray[i] / 255) * height;
          ctx.fillStyle = `rgba(255, 255, 255, ${dataArray[i] / 255})`;
          ctx.fillRect(
            i * barWidth,
            height - barHeight,
            barWidth - 2,
            barHeight
          );
        }
      }

      // Ocean Effect Enhancer with Bubbles, Shimmer, and Night Theme
      if (env === "ocean") {
        const time = Date.now() * 0.001;
        const baseY = height;

        const waveHeight1 = 20;
        const waveHeight2 = 30;
        const waveSpeed1 = 0.6;
        const waveSpeed2 = 0.3;

        ctx.save();

        // Night Theme Background
        const nightGradient = ctx.createLinearGradient(0, 0, 0, height);
        nightGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        nightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        // nightGradient.addColorStop(0, "#0a0f2c");
        // nightGradient.addColorStop(1, "#000814");
        ctx.fillStyle = nightGradient;
        ctx.fillRect(0, 0, width, height);

        // Ocean Waves Layer 1
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= width; x++) {
          const y =
            baseY - Math.sin(x * 0.015 + time * waveSpeed1) * waveHeight1;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const deepOcean = ctx.createLinearGradient(0, baseY - 50, 0, baseY);
        deepOcean.addColorStop(0, "rgba(0,90,120,0.4)");
        deepOcean.addColorStop(1, "rgba(0,140,180,0.5)");
        ctx.fillStyle = deepOcean;
        ctx.fill();

        // Ocean Waves Layer 2
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        for (let x = 0; x <= width; x++) {
          const y =
            baseY - Math.cos(x * 0.02 + time * waveSpeed2) * waveHeight2;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        const topOcean = ctx.createLinearGradient(0, baseY - 60, 0, baseY);
        topOcean.addColorStop(0, "rgba(173, 216, 230, 0.3)");
        topOcean.addColorStop(1, "rgba(0, 105, 148, 0.35)");
        ctx.fillStyle = topOcean;
        ctx.fill();

        // Light shimmer glints on crest tips
        for (let x = 0; x <= width; x += 20) {
          const y =
            baseY - Math.cos(x * 0.02 + time * waveSpeed2) * waveHeight2;
          if ((x + time * 50) % 100 < 10) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
            ctx.fill();
          }
        }

        // Bubble particles rising
        if (!window.bubbles) {
          window.bubbles = Array.from({ length: 20 }, () => ({
            x: Math.random() * width,
            y: baseY + Math.random() * 50,
            r: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.3,
          }));
        }
        window.bubbles.forEach((b) => {
          b.y -= b.speed;
          b.alpha -= 0.001;
          if (b.alpha <= 0 || b.y < baseY - 120) {
            b.x = Math.random() * width;
            b.y = baseY + Math.random() * 50;
            b.r = Math.random() * 2 + 1;
            b.alpha = Math.random() * 0.5 + 0.3;
            b.speed = Math.random() * 0.5 + 0.5;
          }
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
          ctx.fill();
        });

        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    };

    initParticles();
    setupVisualizer();
    draw();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, [env, player]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-100"
      />

      <div className="fixed bottom-4 left-4 flex space-x-2">
        {["rain", "snow", "wind", "lofi", "ocean"].map((e) => (
          <button
            key={e}
            onClick={() => setEnv(e as Env)}
            className={`px-3 py-1 rounded-xl transition ${
              env === e
                ? "bg-emerald-500 text-white shadow-lg"
                : "bg-white/70 hover:bg-white/90"
            }`}
          >
            {e.charAt(0).toUpperCase() + e.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setMuted((m) => !m)}
          className="px-3 py-1 rounded-xl bg-white/70 hover:bg-white/90 shadow-lg"
          aria-label={muted ? "Unmute audio" : "Mute audio"}
        >
          {muted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
        </button>
      </div>
    </>
  );
}
