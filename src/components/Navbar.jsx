"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn, FaYoutube, FaSun, FaMoon } from "react-icons/fa";
import { BsGooglePlay } from "react-icons/bs";
import { github, googlePlay, linkedIn, mail, youtube } from "@/data/socialLinks";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();

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
          background: scrolled ? "var(--bg-navbar)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-accent)" : "none",
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.5), 0 1px 0 var(--border-subtle)"
            : "none",
          transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link href="/#home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src={theme === 'light' 
              ? "/assets/rittik-soni-kr-kingrittik-logo-lightmode.png" 
              : "/assets/rittik-soni-kr-kingrittik-logo-darkmode.png"}
            alt="Rittik Soni"
            width={44}
            height={18}
            style={{ objectFit: "contain" }}
          />
        </Link>

        {/* Right side: Nav links + Theme Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
                    color: hoveredLink === link.href ? "var(--accent-cyan-light)" : "var(--text-secondary)",
                    background: hoveredLink === link.href
                      ? "var(--card-hover-bg)"
                      : "transparent",
                    border: hoveredLink === link.href
                      ? "1px solid var(--border-accent)"
                      : "1px solid transparent",
                    transition: "all 0.22s ease",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: "56px",
              height: "28px",
              borderRadius: "99px",
              background: theme === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)",
              border: "1px solid var(--border-subtle)",
              cursor: "pointer",
              position: "relative",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: theme === 'dark' ? "#67e8f9" : "#0891b2",
                boxShadow: theme === 'dark' ? "0 0 10px rgba(103,232,249,0.5)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: theme === 'dark' ? "translateX(28px)" : "translateX(0)",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {theme === 'dark' ? (
                <FaMoon size={10} color="#050812" />
              ) : (
                <FaSun size={11} color="#fff" />
              )}
            </div>
          </button>

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
              background: "var(--card-hover-bg)",
              border: "1px solid var(--border-subtle)",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            <AiOutlineMenu size={18} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer Backdrop ─────────────────────── */}
      <div
        onClick={() => setNav(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--overlay-bg)",
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
          background: "linear-gradient(160deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
          borderRight: "1px solid var(--border-accent)",
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
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <Image
            src={theme === 'light' 
              ? "/assets/rittik-soni-kr-kingrittik-logo-lightmode.png" 
              : "/assets/rittik-soni-kr-kingrittik-logo-darkmode.png"}
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
              background: "var(--card-hover-bg)",
              border: "1px solid var(--border-subtle)",
              cursor: "pointer",
              color: "var(--text-primary)",
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
            color: "var(--text-muted)",
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
                  color: "var(--text-secondary)",
                  background: "transparent",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--card-hover-bg)";
                  e.currentTarget.style.color = "var(--accent-cyan-light)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--accent-cyan)",
                    flexShrink: 0,
                    opacity: 0.5
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
              background: "var(--border-subtle)",
              marginBottom: "20px",
            }}
          />
          <p
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent-cyan)",
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
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                    transition: "all 0.22s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--card-hover-bg)";
                    e.currentTarget.style.borderColor = "var(--border-accent)";
                    e.currentTarget.style.color = "var(--accent-cyan-light)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "var(--card-bg)";
                    e.currentTarget.style.borderColor = "var(--border-subtle)";
                    e.currentTarget.style.color = "var(--text-secondary)";
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
