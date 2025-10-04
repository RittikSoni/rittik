import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { FiPower, FiVolumeX, FiVolume2, FiX, FiMusic } from "react-icons/fi";
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
    fireflies?: Array<{
      x: number;
      y: number;
      vX: number;
      vY: number;
      size: number;
      brightness: number;
      pulseSpeed: number;
      pulseOffset: number;
      depth: number;
      hue: number;
    }>;
    runwayLights?: Array<{
      x: number;
      y: number;
      phase: number;
      intensity: number;
      type: string;
    }>;
    planes?: Array<{
      x: number;
      y: number;
      speed: number;
      size: number;
      altitude: number;
      blinkPhase: number;
      contrail: Array<{ x: number; y: number }>;
    }>;
    leaves?: Array<{
      x: number;
      y: number;
      vY: number;
      rotation: number;
      rotationSpeed: number;
      size: number;
      swayAmplitude: number;
      swaySpeed: number;
      type: number;
      depth: number;
    }>;
    forestParticles?: Array<{
      x: number;
      y: number;
      vY: number;
      vX: number;
      size: number;
      opacity: number;
      floatOffset: number;
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

      // ---- Forest effect ----
      if (env === "forest") {
        const time = Date.now() * 0.001;

        // Initialize multi-layer fireflies with depth
        if (!window.fireflies) {
          window.fireflies = Array.from({ length: 25 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vX: (Math.random() - 0.5) * 0.8,
            vY: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 3 + 1,
            brightness: Math.random(),
            pulseSpeed: Math.random() * 1.5 + 0.5,
            pulseOffset: Math.random() * Math.PI * 2,
            depth: Math.random(), // 0 = far, 1 = close
            hue: Math.random() * 30 + 45, // Yellow-green range
          }));
        }

        // Initialize organic floating particles (pollen/dust)
        if (!window.forestParticles) {
          window.forestParticles = Array.from({ length: 40 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vY: Math.random() * 0.15 + 0.05,
            vX: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
            floatOffset: Math.random() * Math.PI * 2,
          }));
        }

        // Initialize falling leaves with realistic physics
        if (!window.leaves) {
          window.leaves = Array.from({ length: 12 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height - height,
            vY: Math.random() * 0.4 + 0.3,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.08,
            size: Math.random() * 12 + 6,
            swayAmplitude: Math.random() * 3 + 1,
            swaySpeed: Math.random() * 0.02 + 0.01,
            type: Math.floor(Math.random() * 3), // Different leaf types
            depth: Math.random() * 0.5 + 0.5,
          }));
        }

        // Animated fog layers with parallax
        for (let layer = 0; layer < 3; layer++) {
          const fogSpeed = (layer + 1) * 0.1;
          const fogOffset = (time * fogSpeed * 10) % width;
          const fogOpacity = 0.03 + layer * 0.02;

          const fogGradient = ctx.createLinearGradient(
            fogOffset - width,
            height * 0.3,
            fogOffset,
            height * 0.8
          );
          fogGradient.addColorStop(0, `rgba(34, 139, 34, 0)`);
          fogGradient.addColorStop(0.5, `rgba(50, 160, 50, ${fogOpacity})`);
          fogGradient.addColorStop(1, `rgba(34, 139, 34, 0)`);
          ctx.fillStyle = fogGradient;
          ctx.fillRect(0, 0, width, height);
        }

        // Animate floating particles
        window.forestParticles.forEach((p) => {
          p.y += p.vY;
          p.x += p.vX + Math.sin(time + p.floatOffset) * 0.3;

          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          if (p.x < -10 || p.x > width + 10) {
            p.x = Math.random() * width;
          }

          ctx.fillStyle = `rgba(200, 220, 180, ${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Animate and draw fireflies with depth-based rendering
        const sortedFireflies = [...window.fireflies].sort(
          (a, b) => a.depth - b.depth
        );

        sortedFireflies.forEach((f) => {
          // Smooth wandering movement
          f.vX += (Math.random() - 0.5) * 0.02;
          f.vY += (Math.random() - 0.5) * 0.02;
          f.vX = Math.max(-1, Math.min(1, f.vX)) * 0.98;
          f.vY = Math.max(-1, Math.min(1, f.vY)) * 0.98;

          f.x += f.vX * (f.depth + 0.3);
          f.y += f.vY * (f.depth + 0.3);

          // Wrap around edges smoothly
          if (f.x < -20) f.x = width + 20;
          if (f.x > width + 20) f.x = -20;
          if (f.y < -20) f.y = height + 20;
          if (f.y > height + 20) f.y = -20;

          // Dynamic pulsing with variance
          const pulse = (Math.sin(time * f.pulseSpeed + f.pulseOffset) + 1) / 2;
          const alpha = (pulse * 0.5 + 0.4) * (f.depth * 0.5 + 0.5);
          const glowSize = f.size * (8 + pulse * 4) * (f.depth * 0.5 + 0.5);

          // Multi-layer glow
          const glowGradient = ctx.createRadialGradient(
            f.x,
            f.y,
            0,
            f.x,
            f.y,
            glowSize
          );
          glowGradient.addColorStop(
            0,
            `hsla(${f.hue}, 100%, 70%, ${alpha * 0.9})`
          );
          glowGradient.addColorStop(
            0.3,
            `hsla(${f.hue}, 100%, 60%, ${alpha * 0.5})`
          );
          glowGradient.addColorStop(
            0.7,
            `hsla(${f.hue}, 90%, 50%, ${alpha * 0.2})`
          );
          glowGradient.addColorStop(1, `hsla(${f.hue}, 80%, 40%, 0)`);
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(f.x, f.y, glowSize, 0, Math.PI * 2);
          ctx.fill();

          // Bright core
          ctx.fillStyle = `hsla(${f.hue}, 100%, 85%, ${alpha * 1.2})`;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.size * (f.depth * 0.5 + 0.5), 0, Math.PI * 2);
          ctx.fill();
        });

        // Animate falling leaves with realistic motion
        window.leaves.forEach((leaf) => {
          leaf.y += leaf.vY * leaf.depth;
          leaf.x += Math.sin(leaf.y * leaf.swaySpeed) * leaf.swayAmplitude;
          leaf.rotation += leaf.rotationSpeed;

          if (leaf.y > height + 30) {
            leaf.y = -30;
            leaf.x = Math.random() * width;
          }

          ctx.save();
          ctx.translate(leaf.x, leaf.y);
          ctx.rotate(leaf.rotation);
          ctx.globalAlpha = leaf.depth;

          // Different leaf shapes
          if (leaf.type === 0) {
            // Oval leaf
            ctx.fillStyle = `rgba(85, 107, 47, ${0.7 * leaf.depth})`;
            ctx.beginPath();
            ctx.ellipse(0, 0, leaf.size, leaf.size * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();
          } else if (leaf.type === 1) {
            // Pointed leaf
            ctx.fillStyle = `rgba(107, 142, 35, ${0.7 * leaf.depth})`;
            ctx.beginPath();
            ctx.moveTo(0, -leaf.size);
            ctx.quadraticCurveTo(leaf.size * 0.6, 0, 0, leaf.size);
            ctx.quadraticCurveTo(-leaf.size * 0.6, 0, 0, -leaf.size);
            ctx.fill();
          } else {
            // Round leaf
            ctx.fillStyle = `rgba(75, 95, 40, ${0.7 * leaf.depth})`;
            ctx.beginPath();
            ctx.arc(0, 0, leaf.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        });
      }

      // AIRPORT EFFECT
      if (env === "airport") {
        const time = Date.now() * 0.001;

        // Initialize approach lighting system
        if (!window.runwayLights) {
          const lightsPerRow = 24;
          window.runwayLights = Array.from(
            { length: lightsPerRow },
            (_, i) => ({
              x: (width / (lightsPerRow + 1)) * (i + 1),
              y: height * 0.72,
              phase: i * 0.2,
              intensity:
                1 - (Math.abs(i - lightsPerRow / 2) / lightsPerRow) * 0.3,
              type: i % 3 === 0 ? "edge" : i % 4 === 0 ? "center" : "standard",
            })
          );
        }

        // Initialize aircraft with realistic flight paths
        if (!window.planes) {
          window.planes = Array.from({ length: 4 }, (_, i) => ({
            x: -150 - i * 300,
            y: height * 0.15 + Math.random() * height * 0.3,
            speed: 0.8 + Math.random() * 1.2,
            size: 18 + Math.random() * 12,
            altitude: 0.6 + Math.random() * 0.4,
            type: Math.random() > 0.5 ? "jet" : "prop",
            blinkPhase: Math.random() * Math.PI * 2,
            contrail: [],
          }));
        }

        // Animate and draw planes with contrails
        window.planes.forEach((plane) => {
          plane.x += plane.speed;

          // Add contrail position
          if (plane.contrail.length < 30) {
            plane.contrail.push({ x: plane.x - plane.size, y: plane.y });
          } else {
            plane.contrail.shift();
            plane.contrail.push({ x: plane.x - plane.size, y: plane.y });
          }

          // Reset plane
          if (plane.x > width + 150) {
            plane.x = -150;
            plane.y = height * 0.15 + Math.random() * height * 0.3;
            plane.speed = 0.8 + Math.random() * 1.2;
            plane.contrail = [];
          }

          // Draw plane body
          ctx.save();
          ctx.translate(plane.x, plane.y);
          ctx.globalAlpha = plane.altitude;

          // Fuselage
          ctx.fillStyle = `rgba(220, 220, 230, ${plane.altitude})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, plane.size, plane.size * 0.25, 0, 0, Math.PI * 2);
          ctx.fill();

          // Wings
          ctx.fillStyle = `rgba(200, 200, 210, ${plane.altitude * 0.9})`;
          ctx.beginPath();
          ctx.moveTo(-plane.size * 0.3, 0);
          ctx.lineTo(-plane.size * 0.5, -plane.size * 0.6);
          ctx.lineTo(-plane.size * 0.2, -plane.size * 0.15);
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(-plane.size * 0.3, 0);
          ctx.lineTo(-plane.size * 0.5, plane.size * 0.6);
          ctx.lineTo(-plane.size * 0.2, plane.size * 0.15);
          ctx.closePath();
          ctx.fill();

          // Tail
          ctx.fillStyle = `rgba(210, 210, 220, ${plane.altitude * 0.9})`;
          ctx.beginPath();
          ctx.moveTo(-plane.size * 0.8, 0);
          ctx.lineTo(-plane.size * 1.1, -plane.size * 0.4);
          ctx.lineTo(-plane.size * 0.75, 0);
          ctx.closePath();
          ctx.fill();

          // Cockpit
          ctx.fillStyle = `rgba(100, 150, 200, ${plane.altitude * 0.6})`;
          ctx.beginPath();
          ctx.ellipse(
            plane.size * 0.5,
            0,
            plane.size * 0.2,
            plane.size * 0.15,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();

          // Navigation lights (blinking)
          const blink = Math.sin(time * 3 + plane.blinkPhase) > 0;
          if (blink) {
            // Red light (left wing)
            ctx.fillStyle = "rgba(255, 0, 0, 0.9)";
            ctx.beginPath();
            ctx.arc(-plane.size * 0.5, plane.size * 0.6, 2, 0, Math.PI * 2);
            ctx.fill();

            // Green light (right wing)
            ctx.fillStyle = "rgba(0, 255, 0, 0.9)";
            ctx.beginPath();
            ctx.arc(-plane.size * 0.5, -plane.size * 0.6, 2, 0, Math.PI * 2);
            ctx.fill();
          }

          // Strobe light (tail - faster blink)
          if (Math.sin(time * 6 + plane.blinkPhase) > 0.8) {
            const strobeGradient = ctx.createRadialGradient(
              -plane.size * 1.1,
              -plane.size * 0.4,
              0,
              -plane.size * 1.1,
              -plane.size * 0.4,
              6
            );
            strobeGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
            strobeGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            ctx.fillStyle = strobeGradient;
            ctx.beginPath();
            ctx.arc(-plane.size * 1.1, -plane.size * 0.4, 6, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        });

        // Enhanced radar with sweep effect and range rings
        ctx.save();
        const radarX = width * 0.88;
        const radarY = height * 0.12;
        const radarRadius = 55;

        // Radar background
        ctx.fillStyle = "rgba(0, 20, 10, 0.3)";
        ctx.beginPath();
        ctx.arc(radarX, radarY, radarRadius, 0, Math.PI * 2);
        ctx.fill();

        // Range rings
        for (let i = 1; i <= 3; i++) {
          ctx.strokeStyle = `rgba(0, 255, 100, ${0.15 - i * 0.03})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(radarX, radarY, (radarRadius / 3) * i, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Outer radar circle
        ctx.strokeStyle = "rgba(0, 255, 100, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(radarX, radarY, radarRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.strokeStyle = "rgba(0, 255, 100, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(radarX - radarRadius, radarY);
        ctx.lineTo(radarX + radarRadius, radarY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(radarX, radarY - radarRadius);
        ctx.lineTo(radarX, radarY + radarRadius);
        ctx.stroke();

        // Radar sweep with fade trail
        const sweepAngle = time * 1.2;

        // Sweep trail (fading arc)
        for (let i = 0; i < 20; i++) {
          const trailAngle = sweepAngle - (i * Math.PI) / 40;
          const opacity = (20 - i) / 30;
          ctx.strokeStyle = `rgba(0, 255, 100, ${opacity * 0.3})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(
            radarX,
            radarY,
            radarRadius - 2,
            trailAngle,
            trailAngle + Math.PI / 20
          );
          ctx.stroke();
        }

        // Sweep line
        const sweepGradient = ctx.createLinearGradient(
          radarX,
          radarY,
          radarX + Math.cos(sweepAngle) * radarRadius,
          radarY + Math.sin(sweepAngle) * radarRadius
        );
        sweepGradient.addColorStop(0, "rgba(0, 255, 100, 0.8)");
        sweepGradient.addColorStop(0.7, "rgba(0, 255, 100, 0.4)");
        sweepGradient.addColorStop(1, "rgba(0, 255, 100, 0)");
        ctx.strokeStyle = sweepGradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(radarX, radarY);
        ctx.lineTo(
          radarX + Math.cos(sweepAngle) * radarRadius,
          radarY + Math.sin(sweepAngle) * radarRadius
        );
        ctx.stroke();

        // Aircraft blips (corresponding to planes)
        window.planes.forEach((plane, i) => {
          const blipAngle = (time * 0.3 + i * 1.5) % (Math.PI * 2);
          const blipDist = 15 + i * 12;

          // Blip glow
          const blipGradient = ctx.createRadialGradient(
            radarX + Math.cos(blipAngle) * blipDist,
            radarY + Math.sin(blipAngle) * blipDist,
            0,
            radarX + Math.cos(blipAngle) * blipDist,
            radarY + Math.sin(blipAngle) * blipDist,
            4
          );
          blipGradient.addColorStop(0, "rgba(0, 255, 100, 1)");
          blipGradient.addColorStop(1, "rgba(0, 255, 100, 0)");
          ctx.fillStyle = blipGradient;
          ctx.beginPath();
          ctx.arc(
            radarX + Math.cos(blipAngle) * blipDist,
            radarY + Math.sin(blipAngle) * blipDist,
            4,
            0,
            Math.PI * 2
          );
          ctx.fill();

          // Blip center
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.beginPath();
          ctx.arc(
            radarX + Math.cos(blipAngle) * blipDist,
            radarY + Math.sin(blipAngle) * blipDist,
            1.5,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        // Radar label
        ctx.fillStyle = "rgba(0, 255, 100, 0.7)";
        ctx.font = "10px monospace";
        ctx.fillText("ATC", radarX - 12, radarY + radarRadius + 15);

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

  const sounds = ["rain", "snow", "wind", "lofi", "ocean", "forest", "airport"];

  const [showControls, setShowControls] = useState(true);
  const lastScrollY = useRef(0);
  const [ambientOn, setAmbientOn] = useState(false);

  // if scroll down, hide the controls
  // else if scroll up, don't do anything to the controls
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const goingDown = currentScrollY > lastScrollY.current;
      if (goingDown) {
        setShowControls(false);
      } else {
        // setShowControls(true);
      }
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
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-100"
      />

      {/* If hide, add a button to show the controls */}
      <motion.button
        onClick={() => setShowControls((prev) => !prev)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="p-2 rounded-full bg-black/10 hover:bg-black/20 border border-black/20 text-white shadow-md backdrop-blur-xl fixed bottom-4 right-4 z-101"
        style={{
          textShadow: "0 0 6px rgba(0,0,0,0.4)",
        }}
        animate={{ opacity: !showControls ? 1 : 0 }}
      >
        {/* music icon with label in row*/}
        <div className="flex items-center gap-2">
          <FiMusic size={18} />
          Show Ambient
        </div>
      </motion.button>

      {/* Toggle + Controls */}
      <motion.div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-101
                 px-4 py-2 bg-black/10 border border-white/20
                 backdrop-blur-2xl rounded-[28px] shadow-xl
                 flex items-center justify-center gap-2
                 transition-all duration-300 flex-wrap"
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

            {/* Hide Button */}
            <motion.button
              onClick={() => setShowControls((prev) => !prev)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="p-2 rounded-full bg-black/10 hover:bg-black/20 border border-black/20 text-white shadow-md backdrop-blur-xl"
              style={{
                textShadow: "0 0 6px rgba(0,0,0,0.4)",
              }}
            >
              {/* hide icon */}
              <FiX size={18} />
            </motion.button>
          </>
        )}
      </motion.div>
    </>
  );
}
