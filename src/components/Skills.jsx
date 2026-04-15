"use client";
import React, { useState, useEffect, useRef } from "react";
import Skill from "./Skill";
import { listOfSkills } from "@/data/skillsData";

const Skills = () => {
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
      id="skills"
      ref={sectionRef}
      style={{
        width: "100%",
        background: "var(--bg-primary)",
        padding: "80px 0",
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
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
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
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
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
            ✦ &nbsp; Tech Stack
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: "14px",
            }}
          >
            Skills
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              maxWidth: "520px",
              lineHeight: 1.75,
            }}
          >
            Technologies and tools I work with across mobile, web, cloud, and AI.
          </p>
        </div>

        {/* Skills grid — dense auto-fill */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: "14px",
          }}
        >
          {listOfSkills.map((s, i) => (
            <div
              key={s.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`,
              }}
            >
              <Skill
                skillName={s.skillName}
                imgSrc={s.imgPath}
                imgAlt={s.skillName}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
