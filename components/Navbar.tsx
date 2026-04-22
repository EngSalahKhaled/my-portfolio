"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";
import ThemeSwitcher from "./ThemeSwitcher";

const SECTION_IDS = [
  "hero",
  "about",
  "projects",
  "business",
  "skills",
  "certifications",
  "contact",
];

export default function Navbar() {
  const { lang, toggleLang, isAr } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navLinks = [
    { label: tr.nav.home[lang], href: "#hero", id: "hero" },
    { label: tr.nav.about[lang], href: "#about", id: "about" },
    { label: tr.nav.projects[lang], href: "#projects", id: "projects" },
    { label: tr.nav.business[lang], href: "#business", id: "business" },
    { label: tr.nav.skills[lang], href: "#skills", id: "skills" },
    { label: tr.nav.contact[lang], href: "#contact", id: "contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center md:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`pointer-events-auto w-full md:max-w-5xl transition-colors duration-300 relative ${
          scrolled || menuOpen
            ? "bg-dark-card/90 backdrop-blur-md shadow-lg border-b border-dark-border md:border md:rounded-full"
            : "bg-transparent md:bg-dark-surface/50 md:backdrop-blur-md border-b border-transparent md:border-dark-border/50 md:rounded-full"
        }`}
        id="navbar"
        aria-label="Main navigation"
      >
        {/* ── Nav Header ── */}
        <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
          {/* Logo */}
          <a href="#hero" onClick={closeMenu} className="flex items-center gap-2.5 group relative z-10" aria-label="Salah Portfolio - Home">
            <div
              className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
              style={{ background: "linear-gradient(135deg,#F5C518,#C09B00)" }}
            >
              <span className="font-bold text-xs md:text-sm text-[#0D0D0D]">S</span>
            </div>
            <span className="font-bold text-base md:text-lg tracking-tight" style={{ color: "var(--text-main)" }}>
              Salah<span style={{ color: "#F5C518" }}>.</span>dev
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 w-full" role="list">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 relative z-10 block ${
                    activeSection === link.id
                      ? "text-text-main"
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-dark-border rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-3 relative z-10">
            <ThemeSwitcher />
            <button
              onClick={toggleLang}
              className="flex items-center justify-center w-9 h-9 rounded-full border transition-transform duration-300 hover:scale-105"
              style={{ borderColor: "rgba(245,197,24,0.3)", color: "#F5C518", background: "rgba(245,197,24,0.05)" }}
              aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
            >
              <span className="text-xs font-bold">{isAr ? "EN" : "ع"}</span>
            </button>
            <a href="#contact" className="btn-primary text-sm px-5 py-2 rounded-full">
              {tr.nav.hireMe[lang]}
            </a>
          </div>

          {/* Mobile Hamburger & Theme */}
          <div className="flex items-center gap-2 lg:hidden relative z-10">
            <ThemeSwitcher />
            <button
              className="flex flex-col items-center justify-center w-10 h-10 gap-1.5 rounded-full"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className={`w-5 h-0.5 bg-text-main transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-5 h-0.5 bg-text-main transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-text-main transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── Mobile Edge-to-Edge Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-dark-bg/95 backdrop-blur-3xl lg:hidden overflow-hidden flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-6 py-8 pb-24 flex flex-col gap-8">
                <ul className="flex flex-col gap-4" role="list">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className={`text-2xl font-bold transition-colors duration-200 block ${
                          activeSection === link.id
                            ? "text-gold"
                            : "text-text-muted hover:text-text-main"
                        }`}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-dark-border">
                  <button
                    onClick={() => { toggleLang(); closeMenu(); }}
                    className="flex items-center justify-center gap-2 py-4 rounded-xl border font-bold transition-colors hover:bg-dark-surface text-base w-full"
                    style={{ borderColor: "rgba(245,197,24,0.3)", color: "#F5C518", background: "rgba(245,197,24,0.05)" }}
                  >
                    {isAr ? "Switch to English" : "التبديل إلى العربية"}
                  </button>
                  <a
                    href="#contact"
                    className="btn-primary w-full justify-center py-4 rounded-xl text-base"
                    onClick={closeMenu}
                  >
                    {tr.nav.hireMe[lang]}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
