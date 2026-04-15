"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaBookOpen, FaQuoteLeft } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

const typeColors = {
  "Book Chapter":  { bg: "rgba(124,58,237,0.2)",  border: "rgba(124,58,237,0.5)",  text: "#c4b5fd" },
  "Journal":       { bg: "rgba(6,182,212,0.2)",   border: "rgba(6,182,212,0.5)",   text: "#67e8f9" },
  "Conference":    { bg: "rgba(245,158,11,0.2)",  border: "rgba(245,158,11,0.5)",  text: "#fcd34d" },
  "Preprint":      { bg: "rgba(239,68,68,0.2)",   border: "rgba(239,68,68,0.5)",   text: "#fca5a5" },
};
const fallbackType = { bg: "rgba(6,182,212,0.15)", border: "rgba(6,182,212,0.35)", text: "#67e8f9" };

const ResearchItem = ({ title, abstract, authors = [], publisher, year, isbn, type, keywords = [], image, accessLink, alt }) => {
  const [hovered, setHovered] = useState(false);
  const typeStyle = typeColors[type] || fallbackType;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        background: "rgba(8,12,20,0.85)",
        border: hovered
          ? "1.5px solid rgba(6,182,212,0.5)"
          : "1.5px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 12px 60px rgba(6,182,212,0.18), 0 4px 20px rgba(0,0,0,0.7)"
          : "0 4px 32px rgba(0,0,0,0.5)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(.22,.68,0,1.2)",
        backdropFilter: "blur(18px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Book Cover ─────────────────────────────── */}
      {image && (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "3 / 2",   /* landscape – shows full cover clearly */
            overflow: "hidden",
            background: "#04060d",
          }}
        >
          <Image
            src={image}
            alt={alt || title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              transition: "transform 0.6s ease, filter 0.45s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              filter: hovered ? "brightness(0.38)" : "brightness(0.88)",
            }}
          />

          {/* Subtle scanline texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
              pointerEvents: "none",
            }}
          />

          {/* Bottom vignette so text bleeds nicely */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(8,12,20,0.0) 30%, rgba(8,12,20,0.98) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Type badge — top-left */}
          {type && (
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                zIndex: 10,
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: typeStyle.text,
                background: typeStyle.bg,
                border: `1px solid ${typeStyle.border}`,
                padding: "3px 12px",
                borderRadius: "99px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                backdropFilter: "blur(8px)",
              }}
            >
              <HiOutlineDocumentText size={10} />
              {type}
            </div>
          )}

          {/* Year — top-right */}
          {year && (
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 10,
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.55)",
                background: "rgba(0,0,0,0.4)",
                padding: "3px 10px",
                borderRadius: "99px",
                backdropFilter: "blur(6px)",
              }}
            >
              {year}
            </div>
          )}

          {/* Hover CTA overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              pointerEvents: hovered ? "auto" : "none",
              zIndex: 10,
            }}
          >
            {accessLink && (
              <Link href={accessLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 26px",
                    borderRadius: "99px",
                    background: "linear-gradient(90deg, #0891b2, #06b6d4)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    boxShadow: "0 4px 24px rgba(6,182,212,0.5)",
                    textDecoration: "none",
                  }}
                >
                  <FaBookOpen size={13} />
                  Read Publication
                </span>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ── Metadata ───────────────────────────────── */}
      <div style={{ padding: "20px 22px 0" }}>

        {/* Title */}
        <h3
          style={{
            color: hovered ? "#67e8f9" : "#f1f5f9",
            fontSize: "1rem",
            fontWeight: 700,
            lineHeight: 1.45,
            marginBottom: "10px",
            transition: "color 0.25s",
          }}
        >
          {title}
        </h3>

        {/* Authors */}
        {authors.length > 0 && (
          <p
            style={{
              fontSize: "0.75rem",
              color: "#67e8f9",
              fontWeight: 600,
              marginBottom: "4px",
            }}
          >
            {authors.join(", ")}
          </p>
        )}

        {/* Publisher */}
        {publisher && (
          <p style={{ fontSize: "0.72rem", color: "rgba(148,163,184,0.5)", fontStyle: "italic", marginBottom: "2px" }}>
            {publisher}
          </p>
        )}

        {/* ISBN */}
        {isbn && (
          <p style={{ fontSize: "0.65rem", color: "rgba(148,163,184,0.35)", letterSpacing: "0.05em", marginBottom: "14px" }}>
            ISBN: {isbn}
          </p>
        )}

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "14px" }} />

        {/* Abstract */}
        {abstract && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "14px" }}>
            <FaQuoteLeft size={10} color="rgba(6,182,212,0.45)" style={{ marginTop: "4px", flexShrink: 0 }} />
            <p
              style={{
                fontSize: "0.78rem",
                color: "rgba(148,163,184,0.7)",
                lineHeight: 1.7,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {abstract}
            </p>
          </div>
        )}

        {/* Keywords */}
        {keywords.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
            {keywords.map((kw) => (
              <span
                key={kw}
                style={{
                  fontSize: "0.58rem",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "rgba(103,232,249,0.65)",
                  background: "rgba(6,182,212,0.07)",
                  border: "1px solid rgba(6,182,212,0.15)",
                  borderRadius: "6px",
                  padding: "2px 8px",
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Footer ─────────────────────────────────── */}
      <div
        style={{
          padding: "0 22px 20px",
          marginTop: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {accessLink && (
          <Link href={accessLink} target="_blank" rel="noopener noreferrer">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "8px 20px",
                borderRadius: "99px",
                background: "linear-gradient(90deg, #0891b2, #06b6d4)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                boxShadow: "0 2px 16px rgba(6,182,212,0.35)",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = "scale(1.04)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(6,182,212,0.55)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 16px rgba(6,182,212,0.35)";
              }}
            >
              <FaBookOpen size={12} />
              Read Publication
            </span>
          </Link>
        )}
        <span
          style={{
            fontSize: "0.62rem",
            color: "rgba(148,163,184,0.3)",
            letterSpacing: "0.05em",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FaExternalLinkAlt size={8} />
          Peer Reviewed
        </span>
      </div>
    </div>
  );
};

export default ResearchItem;
