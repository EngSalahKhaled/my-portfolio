"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Active section observer ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  /* ── Click-outside-to-close ──
     If the menu is open and user clicks anywhere outside the
     drawer panel AND outside the hamburger button, close it. */
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // Don't close if clicking inside the menu or on the hamburger
      if (menuRef.current?.contains(target)) return;
      if (hamburgerRef.current?.contains(target)) return;
      setMenuOpen(false);
    };

    // Use a slight delay so the opening click doesn't immediately close
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  /* ── Lock body scroll when menu is open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
          scrolled
            ? "shadow-lg border-b md:border md:rounded-full"
            : "border-b border-transparent md:border md:rounded-full"
        }`}
        /* ── ZERO TRANSPARENCY: 100% solid backgrounds via CSS vars ── */
        style={{
          backgroundColor: scrolled ? "var(--dark-card)" : "var(--dark-bg)",
          borderColor: scrolled ? "var(--dark-border)" : "transparent",
        }}
        id="navbar"
        aria-label="Main navigation"
      >
        {/* ── Nav Header ── */}
        <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-6">
          {/* Logo */}
          <a
            href="#hero"
            onClick={closeMenu}
            className="flex items-center gap-2.5 group relative z-10"
            aria-label="Salah Portfolio - Home"
          >
            <div
              className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
              style={{ background: "linear-gradient(135deg,#F5C518,#C09B00)" }}
            >
              <span className="font-bold text-xs md:text-sm text-[#0D0D0D]">
                S
              </span>
            </div>
            <span
              className="font-bold text-base md:text-lg tracking-tight"
              style={{ color: "var(--text-main)" }}
            >
              Salah<span style={{ color: "#F5C518" }}>.</span>dev
            </span>
          </a>

          {/* Desktop Links */}
          <ul
            className="hidden lg:flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2 w-full"
            role="list"
          >
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
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ backgroundColor: "var(--dark-border)" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
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
              style={{
                borderColor: "var(--dark-border)",
                color: "#F5C518",
                backgroundColor: "var(--dark-surface)",
              }}
              aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
            >
              <span className="text-xs font-bold">{isAr ? "EN" : "ع"}</span>
            </button>
            <a
              href="#contact"
              className="btn-primary text-sm px-5 py-2 rounded-full"
            >
              {tr.nav.hireMe[lang]}
            </a>
          </div>

          {/* ── Mobile Hamburger → X Morphing Button ──
               3 spans that smoothly rotate/translate into an X shape.
               Min touch target: 44×44px for mobile accessibility. */}
          <div className="flex items-center gap-2 lg:hidden relative z-10">
            <ThemeSwitcher />
            <button
              ref={hamburgerRef}
              className="flex flex-col items-center justify-center gap-[5px] rounded-lg transition-colors duration-200"
              style={{ width: 44, height: 44 }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {/* Top bar: rotates +45° and slides down to form X */}
              <span
                className="block rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: 22,
                  height: 2,
                  backgroundColor: "var(--text-main)",
                  transform: menuOpen
                    ? "rotate(45deg) translateY(5px)"
                    : "rotate(0) translateY(0)",
                }}
              />
              {/* Middle bar: fades out */}
              <span
                className="block rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: 22,
                  height: 2,
                  backgroundColor: "var(--text-main)",
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              {/* Bottom bar: rotates -45° and slides up to form X */}
              <span
                className="block rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: 22,
                  height: 2,
                  backgroundColor: "var(--text-main)",
                  transform: menuOpen
                    ? "rotate(-45deg) translateY(-5px)"
                    : "rotate(0) translateY(0)",
                }}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile Side Drawer ──
             CONSTRAINTS MET:
             1. ZERO transparency — bg uses solid var(--dark-card)
             2. 75% width — w-[75vw] max-w-xs keeps page visible
             3. Click-outside-to-close — overlay div below handles it
             4. 44px min touch targets — min-h-[44px] on all links/buttons
             5. Smooth slide-in from right with fade overlay */}

        {/* Scrim overlay — allows click-outside and dims the background */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-14 z-40 lg:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Drawer panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-14 right-0 z-50 w-[75vw] max-w-xs lg:hidden overflow-hidden flex flex-col border-l"
              style={{
                height: "calc(100vh - 3.5rem)",
                /* ZERO TRANSPARENCY: 100% solid color background */
                backgroundColor: "var(--dark-card)",
                borderColor: "var(--dark-border)",
              }}
            >
              <div className="flex-1 overflow-y-auto px-5 py-8 pb-28 flex flex-col">
                {/* Navigation Links */}
                <motion.ul
                  className="flex flex-col gap-1"
                  role="list"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                    },
                  }}
                >
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: 24 },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            type: "spring",
                            stiffness: 350,
                            damping: 28,
                          },
                        },
                      }}
                    >
                      {/* ── 44px min touch target on every link ── */}
                      <a
                        href={link.href}
                        className="flex items-center gap-3 rounded-xl px-3 transition-all duration-200"
                        style={{
                          minHeight: 44,
                          color:
                            activeSection === link.id
                              ? "#F5C518"
                              : "var(--text-muted)",
                          backgroundColor:
                            activeSection === link.id
                              ? "var(--dark-surface)"
                              : "transparent",
                          fontWeight: activeSection === link.id ? 700 : 600,
                          fontSize: "1.05rem",
                        }}
                        onClick={closeMenu}
                      >
                        {/* Active indicator dot */}
                        {activeSection === link.id && (
                          <motion.div
                            layoutId="mobile-active-indicator"
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: "#F5C518" }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Bottom Actions */}
                <motion.div
                  className="flex flex-col gap-3 mt-auto pt-8"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.35 }}
                >
                  {/* Language toggle — 44px min touch target */}
                  <button
                    onClick={() => {
                      toggleLang();
                      closeMenu();
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border font-bold transition-colors text-sm w-full"
                    style={{
                      minHeight: 44,
                      borderColor: "var(--dark-border)",
                      color: "#F5C518",
                      backgroundColor: "var(--dark-surface)",
                    }}
                  >
                    {isAr ? "Switch to English" : "التبديل إلى العربية"}
                  </button>

                  {/* CTA button — 44px min touch target */}
                  <a
                    href="#contact"
                    className="btn-primary w-full justify-center rounded-xl text-sm font-semibold"
                    style={{ minHeight: 44, display: "flex", alignItems: "center" }}
                    onClick={closeMenu}
                  >
                    {tr.nav.hireMe[lang]}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
