"use client";
import React, { useState } from "react";
import Image from "next/image";

const Skill = ({ skillName, imgSrc, imgAlt }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "22px 16px 18px",
        borderRadius: "18px",
        background: hovered
          ? "var(--card-hover-bg)"
          : "var(--card-bg)",
        border: hovered
          ? "1px solid var(--border-accent)"
          : "1px solid var(--border-subtle)",
        boxShadow: hovered
          ? "0 0 0 4px var(--border-subtle), 0 8px 32px rgba(6,182,212,0.15), 0 2px 8px rgba(0,0,0,0.5)"
          : "0 2px 12px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-6px) scale(1.07)" : "translateY(0) scale(1)",
        transition: "all 0.32s cubic-bezier(.22,.68,0,1.2)",
        cursor: "default",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflow: "hidden",
      }}
    >
      {/* Spotlight radial behind icon */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <div
        style={{
          position: "relative",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          filter: hovered
            ? "drop-shadow(0 0 10px rgba(6,182,212,0.7)) brightness(1.15)"
            : "brightness(0.9)",
          transition: "filter 0.3s ease",
        }}
      >
        <Image
          src={imgSrc}
          height={46}
          width={46}
          alt={imgAlt}
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Name */}
      <span
        style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          color: hovered ? "var(--accent-cyan-light)" : "var(--text-secondary)",
          letterSpacing: "0.05em",
          textAlign: "center",
          transition: "color 0.25s",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {skillName}
      </span>
    </div>
  );
};

export default Skill;
