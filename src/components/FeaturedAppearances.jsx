"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaSpotify, FaMicrophone, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import { useTheme } from "@/context/ThemeContext";

const APPEARANCES = [
  {
    id: "podcast",
    type: "Podcast",
    typeBadge: "🎙️ Podcast Feature",
    show: "Startup Party",
    title: "Building the Future: Engineering, AI & Entrepreneurship",
    description:
      "Featured on Startup Party - one of India's leading startup & entrepreneurship podcasts. We explored software engineering, building products with AI, and the journey from developer to creator.",
    href: "https://open.spotify.com/episode/4Mi0R9ZRvmnDKm2HfRYF3O",
    cta: "Listen on Spotify",
    platform: "Spotify",
    Icon: FaSpotify,
    PlatformIcon: FaSpotify,
    accentColor: "#1DB954",
    gradientFrom: "rgba(29,185,84,0.15)",
    gradientTo: "rgba(29,185,84,0.02)",
    borderColor: "rgba(29,185,84,0.3)",
    glowColor: "rgba(29,185,84,0.18)",
    badge: null,
  },
  {
    id: "google-ai-day",
    type: "Talk",
    typeBadge: "🚀 Conference Speaker",
    show: "Google AI Day",
    title: "AI in the Real World: Building Intelligent Applications",
    description:
      "Invited as a speaker at Google AI Day to share insights on practical AI, covering how engineers can leverage modern LLMs, AI APIs, and on-device ML to build smarter, real-world products. Featured Doctors AI.",
    href: "https://youtube.com/shorts/odgsD_H4a_A",
    cta: "Watch the Talk",
    platform: "YouTube",
    Icon: FaMicrophone,
    PlatformIcon: FaYoutube,
    accentColor: "#06b6d4",
    gradientFrom: "rgba(6,182,212,0.15)",
    gradientTo: "rgba(6,182,212,0.02)",
    borderColor: "rgba(6,182,212,0.3)",
    glowColor: "rgba(6,182,212,0.18)",
    badge: "Google",
  },
];

const FeaturedAppearances = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      style={{
        width: "100%",
        background: "var(--bg-secondary)",
        padding: "96px 0 80px",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      {/* Ambient glow left (Spotify green) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-60px",
          left: "-100px",
          width: "500px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(29,185,84,var(--glow-opacity)) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Ambient glow right (cyan) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-60px",
          right: "-100px",
          width: "500px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(6,182,212,var(--glow-opacity)) 0%, transparent 70%)",
          pointerEvents: "none",
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
        <div style={{ marginBottom: "56px", textAlign: "center" }}>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent-cyan)",
              marginBottom: "12px",
            }}
          >
            ✦ &nbsp; As Seen On
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
            Speaking &amp; Media
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              maxWidth: "480px",
              lineHeight: 1.75,
              margin: "0 auto",
            }}
          >
            Podcast features, conference talks, and media appearances where I
            share ideas about engineering, AI, and building products.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: "28px",
          }}
        >
          {APPEARANCES.map((item, i) => {
            const isHovered = hovered === item.id;
            return (
              <div
                key={item.id}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.55s ease ${i * 0.15}s, transform 0.55s ease ${i * 0.15}s`,
                }}
              >
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Gradient border wrapper */}
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "24px",
                      padding: "2px",
                      background: isHovered
                        ? `linear-gradient(135deg, ${item.accentColor}88, transparent 60%)`
                        : "linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%)",
                      transition: "background 0.35s ease",
                      boxShadow: isHovered
                        ? `0 20px 60px ${item.glowColor}, 0 4px 20px rgba(0,0,0,0.3)`
                        : "0 4px 24px rgba(0,0,0,0.2)",
                    }}
                  >
                    <div
                      style={{
                        borderRadius: "22px",
                        padding: "36px 32px",
                        background: isHovered
                          ? `linear-gradient(145deg, ${item.gradientFrom}, ${item.gradientTo})`
                          : "var(--card-bg)",
                        border: `1px solid ${isHovered ? item.borderColor : "var(--border-subtle)"}`,
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        transition: "all 0.35s cubic-bezier(.22,.68,0,1.2)",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      {/* Top shine line on hover */}
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "1px",
                          background: isHovered
                            ? `linear-gradient(90deg, transparent, ${item.accentColor}88, transparent)`
                            : "transparent",
                          transition: "background 0.35s ease",
                        }}
                      />

                      {/* Top row: icon blob + badges */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          marginBottom: "28px",
                          flexWrap: "wrap",
                          gap: "12px",
                        }}
                      >
                        {/* Icon blob */}
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "18px",
                            background: `linear-gradient(135deg, ${item.accentColor}22, ${item.accentColor}44)`,
                            border: `1px solid ${item.accentColor}44`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transform: isHovered ? "scale(1.1) rotate(-4deg)" : "scale(1) rotate(0deg)",
                            transition: "transform 0.35s cubic-bezier(.22,.68,0,1.2)",
                          }}
                        >
                          <item.Icon size={26} color={item.accentColor} />
                        </div>

                        {/* Badges */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                          <span
                            style={{
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              padding: "4px 12px",
                              borderRadius: "99px",
                              background: `${item.accentColor}22`,
                              color: item.accentColor,
                              border: `1px solid ${item.accentColor}44`,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.typeBadge}
                          </span>
                          {item.badge === "Google" && (
                            <span
                              style={{
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                padding: "3px 10px",
                                borderRadius: "99px",
                                background: "rgba(66,133,244,0.15)",
                                color: "#4285F4",
                                border: "1px solid rgba(66,133,244,0.3)",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <SiGoogle size={9} /> Google Event
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Show name */}
                      <p
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: item.accentColor,
                          marginBottom: "10px",
                          opacity: 0.9,
                        }}
                      >
                        {item.show}
                      </p>

                      {/* Title */}
                      <h3
                        style={{
                          fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)",
                          fontWeight: 700,
                          lineHeight: 1.35,
                          color: "var(--text-primary)",
                          marginBottom: "16px",
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.78,
                          marginBottom: "32px",
                        }}
                      >
                        {item.description}
                      </p>

                      {/* Divider */}
                      <div
                        style={{
                          height: "1px",
                          background: isHovered
                            ? `linear-gradient(90deg, ${item.accentColor}55, transparent)`
                            : "var(--border-subtle)",
                          marginBottom: "24px",
                          transition: "background 0.35s ease",
                        }}
                      />

                      {/* CTA row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 22px",
                            borderRadius: "99px",
                            background: isHovered ? item.accentColor : `${item.accentColor}18`,
                            color: isHovered ? "#fff" : item.accentColor,
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            letterSpacing: "0.05em",
                            border: `1px solid ${item.accentColor}55`,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <item.PlatformIcon size={14} />
                          {item.cta}
                          <FaExternalLinkAlt size={10} style={{ opacity: 0.7 }} />
                        </div>

                        {/* Live dot + platform label */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            color: "var(--text-muted)",
                            fontSize: "0.72rem",
                            letterSpacing: "0.08em",
                          }}
                        >
                          <div
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: item.accentColor,
                              opacity: isHovered ? 1 : 0.4,
                              boxShadow: isHovered ? `0 0 8px ${item.accentColor}` : "none",
                              transition: "all 0.3s ease",
                            }}
                          />
                          {item.platform}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAppearances;
