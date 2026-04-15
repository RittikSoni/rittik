"use client";
import React, { useState, useEffect, useRef } from "react";
import OpenSourceItem from "./OpenSourceItem";
import { openSourceData } from "@/data/openSourceData";
import Link from "next/link";
import { FaGithub, FaHeart } from "react-icons/fa";

const OpenSourceContributions = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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
      id="open-source"
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
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-100px",
          left: "20%",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(6,182,212,var(--glow-opacity)) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-80px",
          right: "10%",
          width: "400px",
          height: "300px",
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
        {/* Header */}
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
            ✦ &nbsp; Open Source
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
            Built for Developers
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              maxWidth: "520px",
              lineHeight: 1.75,
            }}
          >
            Tools, libraries, and packages crafted to empower the developer community - open-source and free forever.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {openSourceData.map((item, i) => (
            <div
              key={item.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              <OpenSourceItem OpenSourceItem={item} />
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "16px", marginTop: "52px" }}>
          <Link href="https://github.com/RittikSoni" target="_blank" rel="noopener noreferrer">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 32px",
                borderRadius: "99px",
                background: "linear-gradient(90deg, #0891b2, #06b6d4)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 4px 24px rgba(6,182,212,0.35), 0 0 0 1px rgba(6,182,212,0.2)",
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(6,182,212,0.5), 0 0 0 1px rgba(6,182,212,0.3)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(6,182,212,0.35), 0 0 0 1px rgba(6,182,212,0.2)";
              }}
            >
              <FaGithub size={18} />
              More on GitHub
            </span>
          </Link>

          <Link href="https://github.com/sponsors/RittikSoni" target="_blank" rel="noopener noreferrer">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 32px",
                borderRadius: "99px",
                background: "linear-gradient(90deg, #9d174d, #ec4899)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 4px 24px rgba(236,72,153,0.35), 0 0 0 1px rgba(236,72,153,0.2)",
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(236,72,153,0.5), 0 0 0 1px rgba(236,72,153,0.3)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(236,72,153,0.35), 0 0 0 1px rgba(236,72,153,0.2)";
              }}
            >
              <FaHeart size={16} />
              Sponsor
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceContributions;
