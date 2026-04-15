"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { BsGooglePlay } from "react-icons/bs";
import { github, googlePlay, linkedIn, mail, youtube } from "@/data/socialLinks";

const NAV_LINKS = [
  { label: "Home",     href: "/#home" },
  { label: "About",    href: "/#about" },
  { label: "Skills",   href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Videos",   href: "/#tech-posts" },
  { label: "OSS",      href: "/#open-source" },
  { label: "R&D",      href: "/#r&d" },
  { label: "Contact",  href: "/#contact" },
];

const SOCIALS = [
  { icon: <FaYoutube size={16} />,    href: youtube,     label: "YouTube" },
  { icon: <FaLinkedinIn size={16} />, href: linkedIn,    label: "LinkedIn" },
  { icon: <FaGithub size={16} />,     href: github,      label: "GitHub" },
  { icon: <AiOutlineMail size={17} />,href: mail,        label: "Email" },
  { icon: <BsGooglePlay size={15} />, href: googlePlay,  label: "Play Store" },
];

function Navbar() {
  const [nav, setNav]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset >= 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = nav ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [nav]);

  return (
    <>
      {/* ── Desktop / Main Bar ─────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          background: scrolled ? "rgba(5,8,18,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(6,182,212,0.15)" : "none",
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(6,182,212,0.08)"
            : "none",
          transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link href="/#home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/assets/rittik_logo.png"
            alt="Rittik Soni"
            width={44}
            height={18}
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Desktop nav links */}
        <ul
          style={{
            display: "none",
            listStyle: "none",
            margin: 0,
            padding: 0,
            gap: "4px",
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "99px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: hoveredLink === link.href ? "#67e8f9" : "rgba(203,213,225,0.7)",
                  background: hoveredLink === link.href
                    ? "rgba(6,182,212,0.12)"
                    : "transparent",
                  border: hoveredLink === link.href
                    ? "1px solid rgba(6,182,212,0.3)"
                    : "1px solid transparent",
                  transition: "all 0.22s ease",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setNav(true)}
          aria-label="Open menu"
          className="mobile-menu-btn"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            cursor: "pointer",
            color: "#e2e8f0",
          }}
        >
          <AiOutlineMenu size={18} />
        </button>
      </nav>

      {/* ── Mobile Drawer Backdrop ─────────────────────── */}
      <div
        onClick={() => setNav(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          zIndex: 110,
          opacity: nav ? 1 : 0,
          pointerEvents: nav ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* ── Mobile Drawer ──────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "min(80vw, 320px)",
          background: "linear-gradient(160deg, rgba(7,11,20,0.98) 0%, rgba(5,8,18,0.99) 100%)",
          borderRight: "1px solid rgba(6,182,212,0.15)",
          boxShadow: "8px 0 40px rgba(0,0,0,0.6)",
          zIndex: 120,
          transform: nav ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.38s cubic-bezier(.22,.68,0,1.2)",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          overflowY: "auto",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Image
            src="/assets/rittik_logo.png"
            alt="Rittik Soni"
            width={80}
            height={32}
            style={{ objectFit: "contain" }}
          />
          <button
            onClick={() => setNav(false)}
            aria-label="Close menu"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              color: "#e2e8f0",
            }}
          >
            <AiOutlineClose size={16} />
          </button>
        </div>

        {/* Tagline */}
        <p
          style={{
            padding: "14px 24px 0",
            fontSize: "0.72rem",
            color: "rgba(148,163,184,0.5)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Software Engineer · Lifelong Learner
        </p>

        {/* Nav links */}
        <ul
          style={{
            listStyle: "none",
            margin: "16px 0 0",
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setNav(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "11px 16px",
                  borderRadius: "12px",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: "rgba(203,213,225,0.8)",
                  background: "transparent",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(6,182,212,0.1)";
                  e.currentTarget.style.color = "#67e8f9";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(203,213,225,0.8)";
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "rgba(6,182,212,0.5)",
                    flexShrink: 0,
                  }}
                />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social links */}
        <div style={{ padding: "24px 24px 32px", marginTop: "auto" }}>
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.06)",
              marginBottom: "20px",
            }}
          />
          <p
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#06b6d4",
              marginBottom: "14px",
            }}
          >
            Let&apos;s Connect
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {SOCIALS.map(({ icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={() => setNav(false)}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(203,213,225,0.7)",
                    transition: "all 0.22s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(6,182,212,0.15)";
                    e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)";
                    e.currentTarget.style.color = "#67e8f9";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "rgba(203,213,225,0.7)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {icon}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive style for desktop nav */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;
