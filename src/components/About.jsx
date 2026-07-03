"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FaGithub, FaLinkedinIn, FaYoutube, FaInstagram,
  FaGooglePlay, FaApple, FaExternalLinkAlt,
} from "react-icons/fa";
import { SiMedium } from "react-icons/si";
import { BsDiscord } from "react-icons/bs";
import {
  FiCpu, FiSmartphone, FiLayers, FiMic, FiBookOpen, FiGithub,
} from "react-icons/fi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import {
  github, linkedIn, youtube, instagram, medium, discord, googlePlay,
} from "@/data/socialLinks";

const SOCIALS = [
  {
    Icon: FaYoutube,
    href: youtube,
    label: "YouTube",
    handle: "@king_rittik",
    color: "#FF0000",
    bg: "rgba(255,0,0,0.1)",
    border: "rgba(255,0,0,0.25)",
  },
  {
    Icon: FaInstagram,
    href: instagram,
    label: "Instagram",
    handle: "@kingrittikofficial",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.1)",
    border: "rgba(225,48,108,0.25)",
  },
  {
    Icon: FaGithub,
    href: github,
    label: "GitHub",
    handle: "RittikSoni",
    color: "var(--text-primary)",
    bg: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.12)",
  },
  {
    Icon: FaLinkedinIn,
    href: linkedIn,
    label: "LinkedIn",
    handle: "rittik-soni",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.1)",
    border: "rgba(10,102,194,0.25)",
  },
  {
    Icon: SiMedium,
    href: medium,
    label: "Medium",
    handle: "@kingrittik",
    color: "var(--text-primary)",
    bg: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.12)",
  },
  {
    Icon: BsDiscord,
    href: discord,
    label: "Discord",
    handle: "Community",
    color: "#5865F2",
    bg: "rgba(88,101,242,0.1)",
    border: "rgba(88,101,242,0.25)",
  },
  {
    Icon: FaGooglePlay,
    href: googlePlay,
    label: "Play Store",
    handle: "King Rittik",
    color: "#01875F",
    bg: "rgba(1,135,95,0.1)",
    border: "rgba(1,135,95,0.25)",
  },
  {
    Icon: FaApple,
    href: "https://apps.apple.com/in/app/doctors-ai/id6758019612",
    label: "App Store",
    handle: "Doctors AI",
    color: "var(--text-primary)",
    bg: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.12)",
  },
];

const HIGHLIGHTS = [
  { Icon: FiCpu, label: "AI Builder", color: "#06b6d4" },
  { Icon: FiSmartphone, label: "Mobile Dev", color: "#8b5cf6" },
  { Icon: FiLayers, label: "Full Stack", color: "#06b6d4" },
  { Icon: FiMic, label: "Speaker", color: "#ec4899" },
  { Icon: MdOutlineVideoLibrary, label: "YouTuber", color: "#FF0000" },
  { Icon: FiBookOpen, label: "Researcher", color: "#f59e0b" },
  { Icon: FiGithub, label: "Open Source", color: "#10b981" },
];

const About = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        width: "100%",
        background: "var(--bg-primary)",
        padding: "96px 0 80px",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      {/* Ambient glows */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-80px", left: "-100px",
        width: "500px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(6,182,212,var(--glow-opacity)) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-60px", right: "-80px",
        width: "450px", height: "350px", borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(139,92,246,var(--glow-opacity)) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

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


        {/* Two-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
          gap: "56px",
          alignItems: "start",
        }}>
          {/* Left — text */}
          <div>
            <h2 style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800,
              lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "24px",
            }}>
              Hey, I&apos;m Rittik 👋
            </h2>

            {/* Highlight chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
              {HIGHLIGHTS.map(({ Icon, label, color }, i) => (
                <span
                  key={label}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    fontSize: "0.72rem", fontWeight: 700,
                    padding: "6px 14px", borderRadius: "99px",
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
                  }}
                >
                  <Icon size={12} color={color} style={{ flexShrink: 0 }} />
                  {label}
                </span>
              ))}
            </div>

            <div style={{ color: "var(--text-secondary)", lineHeight: 1.85, fontSize: "0.97rem" }}>
              <p style={{ marginBottom: "16px" }}>
                I&apos;m a Software Engineer, YouTuber and Content Creator who loves building things
                at the intersection of <strong style={{ color: "var(--text-primary)" }}>AI, mobile, and the web</strong>.
                From an e-commerce platform designed for a million users to AI-powered healthcare apps, I&apos;ve always
                chased ambitious ideas.
              </p>
              <p style={{ marginBottom: "16px" }}>
                Beyond the code, I run the <strong style={{ color: "var(--accent-cyan)" }}>King Rittik</strong> brand across
                YouTube and Instagram — sharing my engineering journey, tutorials, and behind-the-scenes of what I build.
                I was a speaker at <strong style={{ color: "var(--text-primary)" }}>Google AI Day</strong> and have been
                featured on the <strong style={{ color: "var(--text-primary)" }}>Startup Party</strong> podcast.
              </p>
              <p>
                Off screen, you&apos;ll find me on a football pitch, planning the next trip, or deep-diving into
                a new technology rabbit hole.
              </p>
            </div>
          </div>

          {/* Right — photo + social grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Photo card */}
            <div style={{
              position: "relative",
              borderRadius: "24px",
              padding: "2px",
              background: "linear-gradient(135deg, rgba(6,182,212,0.3), rgba(139,92,246,0.15))",
              boxShadow: "0 20px 60px rgba(6,182,212,0.1), 0 4px 20px rgba(0,0,0,0.3)",
            }}>
              <div style={{
                borderRadius: "22px",
                overflow: "hidden",
                background: "var(--card-bg)",
                backdropFilter: "blur(16px)",
              }}>
                <Image
                  src="/assets/rs_bg.jpg"
                  width={600}
                  height={400}
                  alt="Rittik Soni — Software Engineer, YouTuber and Content Creator"
                  style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>

            {/* Social links grid */}
            <div>
              <p style={{
                fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "var(--accent-cyan)",
                marginBottom: "12px",
              }}>
                Find me on
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: "8px",
              }}>
                {SOCIALS.map(({ Icon, href, label, handle, color, bg, border }, i) => {
                  const isHov = hovered === label;
                  return (
                    <div
                      key={label}
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(10px)",
                        transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
                      }}
                    >
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                        onMouseEnter={() => setHovered(label)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          padding: "9px 12px", borderRadius: "12px",
                          background: isHov ? bg : "var(--card-bg)",
                          border: `1px solid ${isHov ? border : "var(--border-subtle)"}`,
                          transform: isHov ? "translateY(-2px)" : "none",
                          boxShadow: isHov ? `0 4px 16px ${bg}` : "none",
                          transition: "all 0.22s cubic-bezier(.22,.68,0,1.2)",
                          cursor: "pointer",
                        }}>
                          <Icon size={14} color={isHov ? color : "var(--text-muted)"} style={{ flexShrink: 0 }} />
                          <div style={{ minWidth: 0 }}>
                            <div style={{
                              fontSize: "0.68rem", fontWeight: 700,
                              color: isHov ? "var(--text-primary)" : "var(--text-secondary)",
                              lineHeight: 1.2,
                            }}>
                              {label}
                            </div>
                            <div style={{
                              fontSize: "0.6rem", color: isHov ? color : "var(--text-muted)",
                              lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}>
                              {handle}
                            </div>
                          </div>
                          <FaExternalLinkAlt size={8} style={{ marginLeft: "auto", color: "var(--text-muted)", flexShrink: 0, opacity: isHov ? 1 : 0, transition: "opacity 0.2s" }} />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
