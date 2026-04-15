"use client";
import { projectData } from "@/data/projectData";
import React, { useState, useEffect, useRef } from "react";
import ProjectItem from "./ProjectItem";

const ALL = "All";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Derive unique categories (category can be string or array)
  const categories = [
    ALL,
    ...Array.from(
      new Set(
        projectData
          .flatMap((p) => (Array.isArray(p.category) ? p.category : p.category ? [p.category] : []))
      )
    ),
  ];

  const filtered =
    activeFilter === ALL
      ? projectData
      : projectData.filter((p) => {
          const cats = Array.isArray(p.category) ? p.category : p.category ? [p.category] : [];
          return cats.includes(activeFilter);
        });

  // Intersection Observer for section fade-in
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
      id="projects"
      ref={sectionRef}
      style={{
        width: "100%",
        background: "linear-gradient(180deg, #080c14 0%, #0d0d1a 60%, #0a0a16 100%)",
        padding: "96px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glows */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(6,182,212,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "0",
          right: "-200px",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(6,182,212,0.08) 0%, transparent 70%)",
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
              color: "#06b6d4",
              marginBottom: "10px",
            }}
          >
            ✦ &nbsp; Portfolio
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              background: "linear-gradient(90deg, #f1f5f9 0%, #67e8f9 55%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "16px",
            }}
          >
            Things I&apos;ve Built
          </h2>
          <p
            style={{
              color: "rgba(148,163,184,0.8)",
              fontSize: "1rem",
              maxWidth: "520px",
              lineHeight: 1.75,
            }}
          >
            A curated selection of projects - from AI-powered healthcare apps to
            cross-platform tools and open-source experiments.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "40px",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: "7px 20px",
                  borderRadius: "99px",
                  border: isActive
                    ? "1.5px solid rgba(6,182,212,0.7)"
                    : "1.5px solid rgba(255,255,255,0.1)",
                  background: isActive
                    ? "linear-gradient(90deg, rgba(6,182,212,0.2), rgba(8,145,178,0.15))"
                    : "rgba(255,255,255,0.04)",
                  color: isActive ? "#67e8f9" : "rgba(148,163,184,0.7)",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  backdropFilter: "blur(8px)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {filtered.map((project, i) => (
            <div
              key={project.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`,
              }}
            >
              <ProjectItem
                title={project.title}
                description={project.description}
                image={project.image}
                sourceCode={project?.sourceCode}
                projectLink={project.projectLink}
                appStoreLink={project?.appStoreLink}
                youtubeLink={project?.youtubeLink}
                websiteLink={project?.websiteLink}
                alt={project.title}
                tags={project.tags}
                category={project.category}
                featured={project.featured}
              />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            color: "rgba(100,116,139,0.7)",
            fontSize: "0.82rem",
            textAlign: "center",
            marginTop: "56px",
            letterSpacing: "0.04em",
          }}
        >
          More on{" "}
          <a
            href="https://github.com/RittikSoni"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#a78bfa",
              textDecoration: "none",
              fontWeight: 600,
              borderBottom: "1px solid rgba(167,139,250,0.35)",
            }}
          >
            GitHub
          </a>
          ,{" "}
          <a
            href="https://play.google.com/store/apps/dev?id=4707482099887111290"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#67e8f9",
              textDecoration: "none",
              fontWeight: 600,
              borderBottom: "1px solid rgba(103,232,249,0.35)",
            }}
          >
            Play Store
          </a>
          ,{" "}
          <a
            href="https://apps.apple.com/in/app/doctors-ai/id6758019612"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#93c5fd",
              textDecoration: "none",
              fontWeight: 600,
              borderBottom: "1px solid rgba(147,197,253,0.35)",
            }}
          >
            App Store
          </a>
          , and other platforms.
        </p>
      </div>
    </section>
  );
};

export default Projects;
