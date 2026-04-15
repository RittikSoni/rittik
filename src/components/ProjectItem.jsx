"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGooglePlay, FaApple, FaGithub, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";


const ProjectItem = ({ title, description, image, sourceCode, projectLink, appStoreLink, youtubeLink, websiteLink, alt, tags = [], category, featured }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        background: "rgba(15,15,25,0.72)",
        border: hovered ? "1.5px solid rgba(6,182,212,0.6)" : "1.5px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 8px 48px 0 rgba(6,182,212,0.22), 0 2px 8px rgba(0,0,0,0.5)"
          : "0 2px 24px rgba(0,0,0,0.35)",
        transition: "border 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(.22,.68,0,1.2)",
        transform: hovered ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
        cursor: "pointer",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      {/* Featured badge */}
      {featured && (
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 20,
            background: "linear-gradient(90deg, #0891b2 0%, #06b6d4 100%)",
            color: "#fff",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "3px 10px",
            borderRadius: "99px",
            boxShadow: "0 2px 12px rgba(6,182,212,0.5)",
          }}
        >
          ✦ Featured
        </div>
      )}



      {/* Project Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.55s cubic-bezier(.22,.68,0,1.1), filter 0.4s ease",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            filter: hovered ? "brightness(0.28) blur(1.5px)" : "brightness(0.82)",
          }}
        />

        {/* Gradient overlay always present */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 40%, rgba(10,10,20,0.95) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Hover content overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.88)",
              fontSize: "0.82rem",
              lineHeight: 1.65,
              textAlign: "center",
              marginBottom: "18px",
              textShadow: "0 1px 8px rgba(0,0,0,0.7)",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>          {/* Action buttons */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            {projectLink && (
              <Link href={projectLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 18px",
                    borderRadius: "99px",
                    background: "linear-gradient(90deg, #0891b2, #06b6d4)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    boxShadow: "0 2px 16px rgba(6,182,212,0.45)",
                    textDecoration: "none",
                  }}
                >
                  <FaGooglePlay size={13} />
                  Play Store
                </span>
              </Link>
            )}
            {youtubeLink && (
              <Link href={youtubeLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 18px",
                    borderRadius: "99px",
                    background: "linear-gradient(90deg, #b91c1c, #ef4444)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    boxShadow: "0 2px 16px rgba(239,68,68,0.4)",
                    textDecoration: "none",
                  }}
                >
                  <FaYoutube size={14} />
                  Watch Demo
                </span>
              </Link>
            )}
            {websiteLink && (
              <Link href={websiteLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 18px",
                    borderRadius: "99px",
                    background: "linear-gradient(90deg, #0e7490, #06b6d4)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    boxShadow: "0 2px 16px rgba(6,182,212,0.4)",
                    textDecoration: "none",
                  }}
                >
                  <FaExternalLinkAlt size={11} />
                  View Project
                </span>
              </Link>
            )}
            {appStoreLink && (
              <Link href={appStoreLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 18px",
                    borderRadius: "99px",
                    background: "linear-gradient(90deg, #0f172a, #1e3a5f)",
                    border: "1.5px solid rgba(147,197,253,0.35)",
                    color: "#93c5fd",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  <FaApple size={14} />
                  App Store
                </span>
              </Link>
            )}
            {sourceCode && (
              <Link href={sourceCode} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "7px 18px",
                    borderRadius: "99px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <FaGithub size={13} />
                  Source Code
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div style={{ padding: "14px 18px 16px" }}>
        <h3
          style={{
            color: "#f1f5f9",
            fontSize: "1rem",
            fontWeight: 700,
            marginBottom: "8px",
            letterSpacing: "0.01em",
            lineHeight: 1.3,
            transition: "color 0.25s",
            ...(hovered ? { color: "#67e8f9" } : {}),
          }}
        >
          {title}
        </h3>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(203,213,225,0.7)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  padding: "2px 8px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
