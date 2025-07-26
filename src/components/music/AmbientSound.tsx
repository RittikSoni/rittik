import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { FiPower, FiVolumeX, FiVolume2 } from "react-icons/fi";
import { motion } from "framer-motion";

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

type Env =
  | "rain"
  | "snow"
  | "wind"
  | "lofi"
  | "ocean"
  | "forest"
  | "airport"
  | "off";
const baseUrl = "https://cdn.jsdelivr.net/gh/RittikSoni/assets@main/music/";

const audioFiles: Record<Env, string> = {
  rain: `${baseUrl}rain.mp3`,
  snow: `${baseUrl}snow.mp3`,
  wind: `${baseUrl}wind.mp3`,
  lofi: `/audio/lofi.mp3`,
  ocean: `${baseUrl}ocean.mp3`,
  forest: `${baseUrl}forest.mp3`,
  airport: `${baseUrl}airport.mp3`,
  off: "",
};

export default function AmbientEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [env, setEnv] = useState<Env>("off");
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

    const setupVisualizer = () => {
      if (env !== "lofi" || !player) return;
      const AudioCtx = (window.AudioContext ||
        (window as any).webkitAudioContext) as {
        new (): AudioContext;
      };
      const audioCtx = new AudioCtx();
      const srcNode = audioCtx.createMediaElementSource(
        player["_sounds"][0]._node as HTMLMediaElement
      );
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
      if (env === "lofi") {
        if (analyser) {
          //   Lofi Visualizer
          analyser.getByteFrequencyData(dataArray as Uint8Array<ArrayBuffer>);
          const barWidth = width / dataArray.length;
          for (let i = 0; i < dataArray.length; i++) {
            const barHeight = (dataArray[i] / 255) * 50;
            ctx.fillStyle = `rgba(2, 250, 151, ${dataArray[i] / 255})`;
            ctx.fillRect(
              i * barWidth,
              height - barHeight,
              barWidth - 2,
              barHeight
            );
          }
        }
        // Lofi Note Animation
        const time = Date.now() * 0.2;

        const noteCount = 30;

        for (let i = 0; i < noteCount; i++) {
          const freqValue = dataArray[i % dataArray.length] / 255;
          const x = Math.sin(i + time / 1000) * width * 0.4 + width / 2;
          const y = (Math.cos(i + time / 1400) + 1) * height * 0.4;

          const size = freqValue * 20 + 4;
          const opacity = Math.min(1, freqValue + 0.3);

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.font = `${size}px serif`;
          ctx.fillText("♪", x, y);
          ctx.closePath();
        }
      }

      // Ocean Effect Enhancer with Bubbles, Shimmer
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

      if (env === "forest") {
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

  const sounds = ["rain", "snow", "wind", "lofi", "ocean", "forest", "airport"];

  const [showControls, setShowControls] = useState(true);
  const lastScrollY = useRef(0);
  const [ambientOn, setAmbientOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const goingDown = currentScrollY > lastScrollY.current;
      setShowControls(!goingDown);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]"
      />

      {/* Toggle + Controls */}
      <motion.div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[101]
                 px-4 py-2 bg-black/10 border border-white/20
                 backdrop-blur-2xl rounded-[28px] shadow-xl
                 flex items-center justify-center gap-2
                 transition-all duration-300"
        animate={{ opacity: showControls ? 1 : 0 }}
        style={{ pointerEvents: showControls ? "auto" : "none" }}
      >
        {/* Power Toggle */}
        <motion.button
          onClick={() => {
            setAmbientOn((prev) => !prev);
            if (ambientOn) setEnv("off");
          }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="p-2 rounded-full bg-black/20 hover:bg-black/30 border border-white/20 text-white shadow flex items-center gap-2"
        >
          {ambientOn ? (
            <FiPower size={18} className="text-red-600" />
          ) : (
            <FiPower size={18} className="text-green-500" />
          )}
          {ambientOn ? "" : "Ambient"}
        </motion.button>

        {/* Show when enabled */}
        {ambientOn && (
          <>
            {sounds.map((e) => (
              <motion.button
                key={e}
                onClick={() => setEnv(e as Env)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className={`px-3 py-1.5 text-sm rounded-[18px] capitalize font-medium transition-all border backdrop-blur-xl text-white ${
                  env === e
                    ? "bg-white/10 ring-2 ring-white/20 border-white/10"
                    : "bg-white/5 hover:bg-white/10 border-white/5"
                }`}
                style={{
                  textShadow: "0 0 6px rgba(0,0,0,0.3)",
                }}
              >
                {e}
              </motion.button>
            ))}

            {/* Mute Button */}
            <motion.button
              onClick={() => setMuted((m) => !m)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="p-2 rounded-full bg-black/10 hover:bg-black/20 border border-black/20 text-white shadow-md backdrop-blur-xl"
              style={{
                textShadow: "0 0 6px rgba(0,0,0,0.4)",
              }}
            >
              {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
            </motion.button>
          </>
        )}
      </motion.div>
    </>
  );
}
