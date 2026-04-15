"use client";
import { youtubeVideosData } from "@/data/youtubeVideosData";
import React, { useState, useEffect, useRef } from "react";
import VideoItem from "./VideoItem";
import Link from "next/link";
import { FaYoutube, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const Videos = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const { theme } = useTheme();

  const featured = youtubeVideosData[activeIndex];
  const rest = youtubeVideosData.filter((_, i) => i !== activeIndex);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const prev = () => setActiveIndex((i) => (i - 1 + youtubeVideosData.length) % youtubeVideosData.length);
  const next = () => setActiveIndex((i) => (i + 1) % youtubeVideosData.length);

  return (
    <section
      id="tech-posts"
      ref={sectionRef}
      style={{
        width: "100%",
        background: "var(--bg-primary)",
        padding: "96px 0 80px",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s ease"
      }}
    >
      {/* Ambient theatre spotlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(6,182,212,var(--glow-opacity)) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      
      {/* Red YouTube glow bottom-right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-150px",
          width: "500px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(220,38,38,var(--glow-opacity)) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle film grain / scan-lines texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: theme === 'dark' 
            ? "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 6px)"
            : "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Section header */}
        <div style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent-cyan)",
              marginBottom: "10px",
            }}
          >
            ✦ &nbsp; YouTube
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Tech Videos
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              maxWidth: "520px",
              lineHeight: 1.75,
            }}
          >
            Tutorials, deep-dives, and project showcases - enjoy the content, subscribe, and leave a thumbs up! 👍
          </p>
        </div>

        {/* Featured video + nav */}
        <div
          style={{
            position: "relative",
            marginBottom: "32px",
          }}
        >
          {/* Nav arrows */}
          <button
            onClick={prev}
            aria-label="Previous video"
            style={{
              position: "absolute",
              left: "-20px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "var(--card-hover-bg)",
              border: "1.5px solid var(--border-accent)",
              color: "var(--accent-cyan-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.25s ease",
            }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(6,182,212,0.3)"}
            onMouseOut={e => e.currentTarget.style.background = "var(--card-hover-bg)"}
          >
            <FaChevronLeft size={14} />
          </button>

          <div
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 0 0 1px var(--border-accent), 0 24px 80px rgba(0,0,0,0.5)",
            }}
          >
            <VideoItem
              key={featured.videoId}
              videoId={featured.videoId}
              featured={true}
            />
          </div>

          <button
            onClick={next}
            aria-label="Next video"
            style={{
              position: "absolute",
              right: "-20px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "var(--card-hover-bg)",
              border: "1.5px solid var(--border-accent)",
              color: "var(--accent-cyan-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "all 0.25s ease",
            }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(6,182,212,0.3)"}
            onMouseOut={e => e.currentTarget.style.background = "var(--card-hover-bg)"}
          >
            <FaChevronRight size={14} />
          </button>
        </div>

        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          {youtubeVideosData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "99px",
                background: i === activeIndex ? "var(--accent-cyan)" : "var(--border-subtle)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Rest of videos grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {rest.map((item, i) => (
            <div
              key={item.videoId}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                cursor: "pointer",
              }}
              onClick={() => {
                const idx = youtubeVideosData.findIndex(v => v.videoId === item.videoId);
                setActiveIndex(idx);
                sectionRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <VideoItem videoId={item.videoId} />
            </div>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "52px",
          }}
        >
          <Link
            href="https://www.youtube.com/@king_rittik?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 32px",
                borderRadius: "99px",
                background: "linear-gradient(90deg, #b91c1c, #ef4444)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 4px 24px rgba(239,68,68,0.4), 0 0 0 1px rgba(239,68,68,0.2)",
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(239,68,68,0.55), 0 0 0 1px rgba(239,68,68,0.3)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(239,68,68,0.4), 0 0 0 1px rgba(239,68,68,0.2)";
              }}
            >
              <FaYoutube size={20} />
              Subscribe
            </span>
          </Link>

          <Link
            href="https://www.youtube.com/channel/UC9Ul36hf_pSlt1UCRFKFApQ/join"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 32px",
                borderRadius: "99px",
                background: "linear-gradient(90deg, #92400e, #d97706)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 4px 24px rgba(217,119,6,0.4), 0 0 0 1px rgba(217,119,6,0.2)",
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(217,119,6,0.55), 0 0 0 1px rgba(217,119,6,0.3)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(217,119,6,0.4), 0 0 0 1px rgba(217,119,6,0.2)";
              }}
            >
              <FaStar size={16} />
              Join Membership
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Videos;
