"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaBook, FaStar, FaCode } from "react-icons/fa";
import { SiFlutter } from "react-icons/si";

const OpenSourceItem = ({ OpenSourceItem: item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        background: "rgba(8,12,20,0.8)",
        border: hovered
          ? "1.5px solid rgba(6,182,212,0.55)"
          : "1.5px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 8px 48px rgba(6,182,212,0.18), 0 2px 16px rgba(0,0,0,0.6)"
          : "0 2px 24px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-6px) scale(1.012)" : "translateY(0) scale(1)",
        transition: "all 0.38s cubic-bezier(.22,.68,0,1.2)",
        backdropFilter: "blur(18px)",
        padding: "28px",
      }}
    >
      {/* Glow accent top-left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          transition: "opacity 0.4s",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(8,145,178,0.1))",
            border: "1px solid rgba(6,182,212,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <SiFlutter size={20} color="#67e8f9" />
        </div>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              color: hovered ? "#67e8f9" : "#f1f5f9",
              fontSize: "1.05rem",
              fontWeight: 700,
              lineHeight: 1.3,
              marginBottom: "4px",
              transition: "color 0.25s",
            }}
          >
            {item.name}
          </h3>
          <p
            style={{
              color: "rgba(148,163,184,0.7)",
              fontSize: "0.82rem",
              lineHeight: 1.6,
            }}
          >
            {item.description}
          </p>
        </div>
      </div>

      {/* Feature list */}
      <ul style={{ margin: "0 0 20px 0", padding: 0, listStyle: "none" }}>
        {item.features.map((feature, idx) => (
          <li
            key={idx}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              color: "rgba(203,213,225,0.75)",
              fontSize: "0.8rem",
              lineHeight: 1.6,
              marginBottom: "8px",
            }}
          >
            <span
              style={{
                color: "#06b6d4",
                marginTop: "4px",
                flexShrink: 0,
                fontSize: "0.55rem",
              }}
            >
              ◆
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.07)",
          marginBottom: "18px",
        }}
      />

      {/* Action buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {item.links?.pub && (
          <Link href={item.links.pub} target="_blank" rel="noopener noreferrer">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 16px",
                borderRadius: "99px",
                background: "linear-gradient(90deg, #0891b2, #06b6d4)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 2px 12px rgba(6,182,212,0.35)",
                textDecoration: "none",
              }}
            >
              <FaStar size={11} />
              pub.dev
            </span>
          </Link>
        )}
        {item.links?.github && (
          <Link href={item.links.github} target="_blank" rel="noopener noreferrer">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 16px",
                borderRadius: "99px",
                background: "rgba(255,255,255,0.08)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                color: "#e2e8f0",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                backdropFilter: "blur(6px)",
              }}
            >
              <FaGithub size={12} />
              GitHub
            </span>
          </Link>
        )}
        {item.links?.docs && (
          <Link href={item.links.docs} target="_blank" rel="noopener noreferrer">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 16px",
                borderRadius: "99px",
                background: "rgba(255,255,255,0.08)",
                border: "1.5px solid rgba(255,255,255,0.15)",
                color: "#e2e8f0",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                backdropFilter: "blur(6px)",
              }}
            >
              <FaBook size={11} />
              Docs
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default OpenSourceItem;
