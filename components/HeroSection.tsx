"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";
import profileImg from "@/images/profile.jpg";

/* ─── Typewriter hook ────────────────────────────────────────────────────────*/
function useTypewriter(phrases: readonly string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = phrases[phraseIndex] ?? "";

    const tick = () => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          timeoutRef.current = setTimeout(() => setDeleting(true), pause);
          return;
        }
        setCharIndex((c) => c + 1);
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setPhraseIndex((i) => (i + 1) % phrases.length);
          setCharIndex(0);
          return;
        }
        setCharIndex((c) => c - 1);
      }
    };

    timeoutRef.current = setTimeout(tick, deleting ? speed / 2 : speed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, deleting, phraseIndex, phrases, speed, pause]);

  return displayed;
}

/* ─── Scroll-reveal hook ─────────────────────────────────────────────────────*/
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Hero Section ───────────────────────────────────────────────────────────*/
export default function HeroSection() {
  const { lang, isAr } = useLanguage();
  // ✅ Memoize so the array reference stays stable between renders.
  // Without this, a new array is created every render → useTypewriter effect
  // fires every render → infinite loop.
  const phrases = useMemo(() => tr.hero.typewriterPhrases[lang], [lang]);
  const typed = useTypewriter(phrases);
  const { ref: statsRef, visible: statsVisible } = useScrollReveal();

  const stats = [
    { value: 3, suffix: "+", label: tr.hero.stats.yearsExp[lang] },
    { value: 20, suffix: "+", label: tr.hero.stats.projects[lang] },
    { value: 2, suffix: "", label: tr.hero.stats.businesses[lang] },
    { value: 1, suffix: "", label: tr.hero.stats.certs[lang] },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center hero-mesh bg-hero-pattern pt-16"
      aria-label="Hero — Introduction"
    >
      {/* Decorative orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,197,24,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,197,24,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="section-wrapper w-full py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: Text ── */}
          <div
            className={`animate-slide-up space-y-6 order-2 ${isAr ? "lg:order-2 text-right" : "lg:order-1"}`}
          >
            {/* Gemini badge — clickable link to certificate */}
            <a
              href="https://edu.google.accredible.com/eab1a54a-90a1-47be-a423-71ada4edd135#acc.VM4XbQKl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium animate-pulse-gold transition-all duration-200 hover:brightness-125 hover:scale-105"
              style={{
                borderColor: "rgba(245,197,24,0.3)",
                background: "rgba(245,197,24,0.05)",
                color: "#F5C518",
              }}
              id="gemini-badge"
              aria-label={isAr ? "عرض شهادة Gemini" : "View Gemini Certificate"}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                aria-hidden="true"
              >
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  fill="#EA4335"
                />
              </svg>
              {tr.hero.badge[lang]}
            </a>

            {/* Name */}
            <div>
              <p className="text-gray-400 text-lg font-medium mb-2">
                {tr.hero.greeting[lang]}
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
                <span className="gradient-text">Salah Khaled</span>
              </h1>
            </div>

            {/* Typewriter */}
            <div className="h-12 flex items-center" aria-live="polite">
              <p
                className={`text-xl sm:text-2xl text-gray-300 ${isAr ? "font-sans" : "font-mono"}`}
              >
                {typed}
                <span className="typewriter-cursor" aria-hidden="true" />
              </p>
            </div>

            {/* Bio */}
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              {isAr ? (
                <>
                  أبني تجارب ويب{" "}
                  <span style={{ color: "#F5C518" }} className="font-medium">
                    عالية الأداء
                  </span>{" "}
                  وأنشئ مشاريع تحل مشكلات حقيقية. من الكود إلى الشركة — أتميز
                  عند تقاطع التقنية وريادة الأعمال.
                </>
              ) : (
                <>
                  I craft{" "}
                  <span style={{ color: "#F5C518" }} className="font-medium">
                    high-performance
                  </span>{" "}
                  web experiences and build businesses that solve real-world
                  problems. From code to company — I thrive at the intersection
                  of tech and entrepreneurship.
                </>
              )}
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-4 pt-2 ${isAr ? "justify-end" : ""}`}
            >
              <a
                href="#projects"
                className="btn-primary"
                id="hero-view-work-btn"
              >
                {tr.hero.viewWork[lang]}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#contact" className="btn-outline" id="hero-contact-btn">
                {tr.hero.getInTouch[lang]}
              </a>
            </div>

            {/* Socials */}
            <div
              className={`flex items-center gap-4 pt-2 ${isAr ? "justify-end" : ""}`}
              aria-label="Social links"
            >
              {[
                {
                  href: "https://github.com",
                  label: "GitHub",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                },
                {
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  href: "https://wa.me/+966500438424",
                  label: "WhatsApp",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12.031 2.25c-5.385 0-9.756 4.37-9.756 9.754 0 1.716.446 3.385 1.295 4.862L2.25 21.75l4.981-1.305a9.71 9.71 0 004.8.125c5.385 0 9.754-4.37 9.754-9.754S17.416 2.25 12.031 2.25zm.006 17.5A8.204 8.204 0 017.9 18.577l-.3-.178-3.037.796.812-2.96-.195-.31a8.214 8.214 0 01-1.256-4.417c0-4.542 3.696-8.243 8.243-8.243s8.243 3.7 8.243 8.243-3.696 8.243-8.243 8.243zm4.52-6.173c-.247-.124-1.464-.723-1.691-.806-.228-.083-.394-.124-.56.124-.166.248-.64 .806-.784.97-.145.166-.29.186-.537.062-.247-.124-1.046-.385-1.992-1.23-.736-.657-1.232-1.468-1.377-1.716-.145-.248-.016-.382.108-.505.112-.11.247-.29.37-.435.124-.145.166-.248.248-.415.083-.166.042-.31-.02-.435-.062-.124-.56-1.346-.767-1.842-.201-.482-.405-.417-.56-.425-.145-.008-.311-.008-.477-.008-.166 0-.435.062-.662.31-.228.248-.87.848-.87 2.066s.891 2.396 1.015 2.562c.124.166 1.748 2.668 4.234 3.74.59.255 1.05.408 1.41.522.593.188 1.133.161 1.558.098.474-.07 1.464-.598 1.67-1.176.207-.578.207-1.074.145-1.176-.062-.102-.228-.164-.475-.288z" />
                    </svg>
                  ),
                },
                {
                  href: "https://facebook.com/",
                  label: "Facebook",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  ),
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border flex items-center justify-center text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all duration-200"
                  style={{ borderColor: "#2A2A2A" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Avatar ── */}
          <div
            className={`flex justify-center order-1 ${isAr ? "lg:order-1 lg:justify-start" : "lg:order-2 lg:justify-end"}`}
          >
            <div className="relative animate-float">
              <div
                className="absolute inset-0 rounded-3xl blur-2xl scale-105 animate-pulse"
                style={{ background: "rgba(245,197,24,0.15)" }}
                aria-hidden="true"
              />
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden gold-border-animated">
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-3 pt-2"
                  style={{
                    background:
                      "linear-gradient(145deg,#1A1A1A 0%,#0D0D0D 100%)",
                  }}
                >
                  <div
                    className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 shadow-[0_0_25px_rgba(245,197,24,0.4)] transition-transform duration-500 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg,#FFD700 0%,#F5C518 50%,#C09B00 100%)",
                    }}
                  >
                    <img
                      src={profileImg.src}
                      alt="Salah Khaled"
                      className="w-full h-full object-cover rounded-full border-[3px]"
                      style={{ borderColor: "#0D0D0D" }}
                    />
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-white font-bold text-2xl tracking-wide">
                      Salah
                    </p>
                    <p
                      className="text-xs sm:text-sm font-bold tracking-widest uppercase mt-1"
                      style={{ color: "#F5C518" }}
                    >
                      Front End Developer
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="absolute -top-4 -right-4 glass-card px-3 py-2 animate-bounce-subtle shadow-xl"
                aria-hidden="true"
              >
                <p className="text-xs text-gray-400">
                  {tr.hero.availableFor[lang]}
                </p>
                <p className="text-sm font-bold" style={{ color: "#F5C518" }}>
                  {tr.hero.freelance[lang]}
                </p>
              </div>
              <div
                className="absolute -bottom-4 -left-4 glass-card px-3 py-2 shadow-xl"
                aria-hidden="true"
              >
                <p className="text-xs text-gray-400">{tr.hero.basedIn[lang]}</p>
                <p className="text-white text-sm font-bold">
                  {tr.hero.location[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-dark-border"
        >
          {stats.map(({ value, suffix, label }, i) => (
            <div
              key={label}
              className={`text-center transition-all duration-700 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-3xl sm:text-4xl font-bold gradient-text">
                {value}
                {suffix}
              </p>
              <p className="text-gray-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-subtle"
        aria-hidden="true"
      >
        <p className="text-gray-600 text-xs tracking-widest uppercase">
          {tr.hero.scroll[lang]}
        </p>
        <div className="w-px h-8 bg-gradient-to-b from-yellow-400/60 to-transparent" />
      </div>
    </section>
  );
}
