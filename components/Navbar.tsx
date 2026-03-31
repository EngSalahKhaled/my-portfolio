"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";

export default function Navbar() {
  const { lang, toggleLang, isAr } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: tr.nav.about[lang], href: "#about" },
    { label: tr.nav.projects[lang], href: "#projects" },
    { label: tr.nav.business[lang], href: "#business" },
    { label: tr.nav.skills[lang], href: "#skills" },
    { label: tr.nav.contact[lang], href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-dark-card/80 backdrop-blur-xl border-b border-dark-border shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
      id="navbar"
      aria-label="Main navigation"
    >
      <div className="section-wrapper flex items-center justify-between h-16">
        {/* ── Logo ── */}
        <a
          href="#hero"
          className="flex items-center gap-2 group"
          aria-label="Salah Portfolio - Home"
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-transform group-hover:rotate-12 duration-300"
            style={{
              background: "linear-gradient(135deg,#FFD700,#C09B00)",
              color: "#0D0D0D",
            }}
          >
            S
          </span>
          <span className="font-bold text-lg tracking-tight">
            Fourth<span style={{ color: "#F5C518" }}>.</span>Pyramid
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link py-1">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA + Language Toggle ── */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: "rgba(245,197,24,0.3)",
              color: "#F5C518",
              background: "rgba(245,197,24,0.05)",
            }}
            aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
            id="lang-toggle-desktop"
          >
            <span aria-hidden="true">{isAr ? "🇬🇧" : "🇸🇦"}</span>
            {isAr ? "EN" : "ع"}
          </button>

          <a
            href="#contact"
            className="btn-primary text-sm px-5 py-2"
            id="nav-hire-btn"
          >
            {tr.nav.hireMe[lang]}
          </a>
        </div>

        {/* ── Mobile Menu Button ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-dark-surface transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden border-b border-dark-border ${
          menuOpen ? "max-h-96 bg-dark-card/95 backdrop-blur-xl" : "max-h-0"
        }`}
      >
        <ul className="section-wrapper py-4 flex flex-col gap-2" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2 px-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all duration-200 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2 flex gap-2">
            <button
              onClick={() => {
                toggleLang();
                setMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-semibold transition-colors"
              style={{ borderColor: "rgba(245,197,24,0.3)", color: "#F5C518" }}
              id="lang-toggle-mobile"
            >
              {isAr ? "🇬🇧 English" : "🇸🇦 عربي"}
            </button>
            <a
              href="#contact"
              className="btn-primary flex-1 justify-center"
              onClick={() => setMenuOpen(false)}
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
