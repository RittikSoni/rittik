"use client";
import { researchData } from "@/data/researchData";
import React, { useState, useEffect, useRef } from "react";
import ResearchItem from "./ResearchItem";

const ResearchPublications = () => {
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
      id="r&d"
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
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-80px",
          right: "15%",
          width: "500px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(124,58,237,var(--glow-opacity)) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "10%",
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
        <div style={{ marginBottom: "56px" }}>
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
            ✦ &nbsp; Research
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
            Publications
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              maxWidth: "540px",
              lineHeight: 1.75,
            }}
          >
            Peer-reviewed publications, book chapters, and technical research spanning AI, machine learning, and data-driven healthcare.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {researchData.map((item, i) => (
            <div
              key={item.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              <ResearchItem
                title={item.title}
                abstract={item.abstract}
                authors={item.authors}
                publisher={item.publisher}
                year={item.year}
                isbn={item.isbn}
                type={item.type}
                keywords={item.keywords}
                image={item.image}
                accessLink={item.accessLink}
                alt={item.title}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchPublications;
