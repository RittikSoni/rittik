"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaPlay, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const VideoItem = ({ videoId, featured = false }) => {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();

  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: featured ? "24px" : "18px",
        overflow: "hidden",
        aspectRatio: "16/9",
        background: "var(--bg-secondary)",
        border: hovered
          ? "1.5px solid var(--accent-cyan-light)"
          : "1.5px solid var(--border-subtle)",
        boxShadow: hovered
          ? "0 8px 48px rgba(6,182,212,0.18), 0 2px 16px rgba(0,0,0,0.4)"
          : "0 2px 24px rgba(0,0,0,0.15)",
        transform: hovered && !playing ? "translateY(-5px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "all 0.38s cubic-bezier(.22,.68,0,1.2)",
        cursor: "pointer",
        backdropFilter: "blur(18px)",
      }}
    >
      {playing ? (
        /* Live iframe */
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        />
      ) : (
        <>
          {/* Thumbnail */}
          <img
            src={thumb}
            alt="Video thumbnail"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.55s ease, filter 0.4s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              filter: theme === 'dark' 
                ? (hovered ? "brightness(0.45)" : "brightness(0.72)")
                : (hovered ? "brightness(0.6)" : "brightness(1) saturate(1.1)"),
            }}
          />

          {/* Vignette overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: theme === 'dark' 
                ? "linear-gradient(180deg, transparent 30%, rgba(5,8,18,0.92) 100%)"
                : "linear-gradient(180deg, transparent 30%, rgba(255,255,255,0.4) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Cinematic scan line effect */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
              pointerEvents: "none",
              opacity: theme === 'dark' ? 0.6 : 0.2,
            }}
          />

          {/* Play button */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setPlaying(true);
            }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: featured ? "72px" : "56px",
                height: featured ? "72px" : "56px",
                borderRadius: "50%",
                background: hovered
                  ? "var(--accent-cyan)"
                  : "rgba(255,255,255,0.18)",
                border: "2px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
                transform: hovered ? "scale(1.15)" : "scale(1)",
                boxShadow: hovered
                  ? "0 0 0 8px rgba(6,182,212,0.15), 0 4px 24px rgba(6,182,212,0.4)"
                  : "0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              <FaPlay
                size={featured ? 22 : 16}
                color="#fff"
                style={{ marginLeft: "3px" }}
              />
            </div>
          </div>

          {/* YouTube badge + external link */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(-6px)",
              transition: "all 0.3s ease",
            }}
          >
            <Link href={ytUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "4px 12px",
                  borderRadius: "99px",
                  background: "rgba(185,28,28,0.9)",
                  color: "#fff",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  backdropFilter: "blur(6px)",
                  textDecoration: "none",
                }}
              >
                <FaYoutube size={12} />
                Watch on YouTube
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoItem;
