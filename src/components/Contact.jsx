"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaLinkedinIn, FaYoutube, FaGithub, FaEnvelope,
  FaGooglePlay, FaApple, FaHeart,
} from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { SiMedium } from "react-icons/si";
import {
  discord, github, googlePlay, linkedIn, mail, medium, youtube,
} from "@/data/socialLinks";
import { useTheme } from "@/context/ThemeContext";

const SOCIALS = [
  { icon: FaGithub,     href: github,       label: "GitHub",     size: 20 },
  { icon: FaLinkedinIn, href: linkedIn,      label: "LinkedIn",   size: 19 },
  { icon: FaYoutube,    href: youtube,       label: "YouTube",    size: 20 },
  { icon: BsDiscord,    href: discord,       label: "Discord",    size: 20 },
  { icon: SiMedium,     href: medium,        label: "Medium",     size: 19 },
  { icon: FaGooglePlay, href: googlePlay,    label: "Play Store", size: 17 },
  { icon: FaApple,      href: "https://apps.apple.com/in/app/doctors-ai/id6758019612", label: "App Store", size: 21 },
];

const Contact = () => {
  const [visible, setVisible] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const year = new Date().getFullYear();

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
      id="contact"
      ref={sectionRef}
      style={{
        width: "100%",
        background: "var(--bg-primary)",
        padding: "96px 0 0",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s ease"
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-60px", left: "50%",
        transform: "translateX(-50%)", width: "700px", height: "350px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(6,182,212,var(--glow-opacity)) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 24px 80px",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Label */}
        <p style={{
          fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.25em",
          textTransform: "uppercase", color: "var(--accent-cyan)", marginBottom: "16px",
        }}>
          ✦ &nbsp; Get In Touch
        </p>

        {/* Heading */}
        <h2 style={{
          fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.1,
          color: "var(--text-primary)",
          marginBottom: "20px",
        }}>
          Let&apos;s Connect
        </h2>

        {/* Description */}
        <p style={{
          color: "var(--text-secondary)", fontSize: "1.05rem",
          maxWidth: "500px", lineHeight: 1.8, margin: "0 auto 40px",
        }}>
          Whether it&apos;s a project, collaboration, or just a conversation - I&apos;m always open to it.
        </p>

        {/* Email CTA */}
        <Link href={mail} style={{ textDecoration: "none" }}>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "13px 36px", borderRadius: "99px",
              background: "linear-gradient(90deg, #0891b2, #06b6d4)",
              color: "#fff", fontWeight: 700, fontSize: "0.95rem",
              letterSpacing: "0.07em", textTransform: "uppercase",
              boxShadow: "0 4px 28px rgba(6,182,212,0.4), 0 0 0 1px rgba(6,182,212,0.2)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 40px rgba(6,182,212,0.55), 0 0 0 1px rgba(6,182,212,0.3)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 28px rgba(6,182,212,0.4), 0 0 0 1px rgba(6,182,212,0.2)";
            }}
          >
            <FaEnvelope size={16} />
            Say Hello
          </span>
        </Link>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: "16px",
          margin: "48px auto", maxWidth: "320px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>
            Find me on
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
        </div>

        {/* Social icons — clean row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          flexWrap: "wrap", gap: "12px",
        }}>
          {SOCIALS.map(({ icon: Icon, href, label, size }, i) => (
            <div
              key={label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
              }}
            >
              <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{ textDecoration: "none" }}>
                <div
                  onMouseEnter={() => setHoveredSocial(label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: hoveredSocial === label
                      ? "var(--card-hover-bg)"
                      : "var(--card-bg)",
                    border: hoveredSocial === label
                      ? "1px solid var(--border-accent)"
                      : "1px solid var(--border-subtle)",
                    color: hoveredSocial === label ? "var(--accent-cyan-light)" : "var(--text-secondary)",
                    transform: hoveredSocial === label ? "translateY(-3px) scale(1.12)" : "none",
                    boxShadow: hoveredSocial === label ? "0 4px 20px rgba(6,182,212,0.2)" : "none",
                    transition: "all 0.25s cubic-bezier(.22,.68,0,1.2)",
                    backdropFilter: "blur(8px)",
                  }}
                  title={label}
                >
                  <Icon size={size} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "20px 24px",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "6px",
        color: "var(--text-muted)",
        fontSize: "0.75rem", letterSpacing: "0.05em",
        background: "var(--bg-secondary)",
      }}>
        <span>© {year} Rittik Soni</span>
        <span>·</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
          Made with <FaHeart size={10} color="#ef4444" style={{ margin: "0 2px" }} /> in Delhi, India
        </span>
      </div>
    </section>
  );
};

export default Contact;
