"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";
import ThemeSwitcher from "./ThemeSwitcher";

const SECTION_IDS = ["hero", "projects", "business", "skills", "certifications", "contact"];

export default function Navbar() {
  const { lang, toggleLang, isAr } = useLanguage();
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState("hero");

  // ── Scroll → glass nav ─────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Active section tracking via IntersectionObserver ───────────────────
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navLinks = [
    { label: tr.nav.about[lang],    href: "#about",    id: "hero" },
    { label: tr.nav.projects[lang], href: "#projects", id: "projects" },
    { label: tr.nav.business[lang], href: "#business", id: "business" },
    { label: tr.nav.skills[lang],   href: "#skills",   id: "skills" },
    { label: tr.nav.contact[lang],  href: "#contact",  id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-dark-card/85 backdrop-blur-lg border-b border-dark-border shadow-md shadow-black/15 scrolled-nav"
          : "bg-transparent"
      }`}
      id="navbar"
      aria-label="Main navigation"
    >
      <div className="section-wrapper flex items-center justify-between h-16">
        {/* ── Logo ── */}
        <a href="#hero" className="flex items-center gap-2 group" aria-label="Salah Portfolio - Home">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:rotate-12"
            style={{ background: "linear-gradient(135deg,#F5C518,#C09B00)", color: "#0D0D0D" }}
          >S</span>
          <span className="font-bold text-lg tracking-tight" style={{ color: "var(--text-main)" }}>
            Salah<span style={{ color: "#F5C518" }}>.</span>dev
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link py-1 ${activeSection === link.id ? "active" : ""}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop Controls ── */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeSwitcher />
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-[border-color,background-color] duration-200 hover:-translate-y-0.5"
            style={{ borderColor: "rgba(245,197,24,0.3)", color: "#F5C518", background: "rgba(245,197,24,0.05)" }}
            aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
            id="lang-toggle-desktop"
          >
            <span aria-hidden="true">{isAr ? "🇬🇧" : "🇸🇦"}</span>
            {isAr ? "EN" : "ع"}
          </button>
          <a href="#contact" className="btn-primary text-sm px-5 py-2" id="nav-hire-btn">
            {tr.nav.hireMe[lang]}
          </a>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-dark-surface transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`w-5 h-0.5 bg-text-main transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-text-main transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-text-main transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden border-b border-dark-border transition-[max-height,opacity] duration-300 ${
          menuOpen ? "max-h-96 opacity-100 bg-dark-card/95 backdrop-blur-xl" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="section-wrapper py-4 flex flex-col gap-2" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`block py-2 px-3 rounded-lg font-medium transition-colors duration-200 ${
                  activeSection === link.id
                    ? "text-gold bg-yellow-400/8"
                    : "text-text-muted hover:text-gold hover:bg-yellow-400/5"
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-3 flex justify-center border-t border-dark-border mt-2">
            <ThemeSwitcher />
          </li>
          <li className="pt-2 flex gap-2">
            <button
              onClick={() => { toggleLang(); closeMenu(); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold"
              style={{ borderColor: "rgba(245,197,24,0.3)", color: "#F5C518" }}
              id="lang-toggle-mobile"
            >
              {isAr ? "🇬🇧 English" : "🇸🇦 عربي"}
            </button>
            <a
              href="#contact"
              className="btn-primary flex-1 justify-center"
              onClick={closeMenu}
              id="nav-hire-btn-mobile"
            >
              {tr.nav.hireMe[lang]}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
