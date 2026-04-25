"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";

// Google Drive direct download URL for the CV
const CV_URL =
  "https://drive.google.com/uc?export=download&id=16lr0po6JjvOqMMxM8V8VTOl92eCtSTpA";

export default function ExperienceSection() {
  const { lang, isAr } = useLanguage();
  const content = tr.experience;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const typeColors: Record<string, { color: string; bg: string; border: string }> = {
    Development: {
      color: "#F5C518",
      bg: "rgba(245,197,24,0.1)",
      border: "rgba(245,197,24,0.25)",
    },
    تطوير: {
      color: "#F5C518",
      bg: "rgba(245,197,24,0.1)",
      border: "rgba(245,197,24,0.25)",
    },
    Entrepreneurship: {
      color: "#34D399",
      bg: "rgba(52,211,153,0.1)",
      border: "rgba(52,211,153,0.25)",
    },
    "ريادة أعمال": {
      color: "#34D399",
      bg: "rgba(52,211,153,0.1)",
      border: "rgba(52,211,153,0.25)",
    },
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24"
      style={{ background: "var(--dark-bg)" }}
      aria-label={
        isAr
          ? "قسم الخبرة والمسيرة المهنية"
          : "Experience and career timeline section"
      }
    >
      <div className="section-wrapper">
        {/* ── Header ── */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 ${isAr ? "text-right" : ""}`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div className="space-y-3">
            <p
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "#F5C518" }}
            >
              {content.sectionTag[lang]}
            </p>
            <h2 className="section-title">
              {content.title[lang]}{" "}
              <span className="gradient-text">{content.titleAccent[lang]}</span>
            </h2>
            <p className="text-text-muted max-w-xl text-base leading-relaxed">
              {content.subtitle[lang]}
            </p>
          </div>

          {/* CV Download */}
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="experience-download-cv-btn"
            className="self-start md:self-auto flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm border transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              borderColor: "rgba(245,197,24,0.4)",
              color: "#F5C518",
              background: "rgba(245,197,24,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(245,197,24,0.12)";
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(245,197,24,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(245,197,24,0.05)";
              e.currentTarget.style.boxShadow = "none";
            }}
            aria-label={
              isAr
                ? "تحميل السيرة الذاتية لصلاح خالد"
                : "Download Salah Khaled's CV"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            {content.downloadCv[lang]}
          </a>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Central vertical line — hidden on mobile, shown md+ */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, var(--dark-border) 8%, var(--dark-border) 92%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          {/* Mobile left line */}
          <div
            className="md:hidden absolute top-0 bottom-0 left-5 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, var(--dark-border) 8%, var(--dark-border) 92%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-8 md:space-y-0">
            {content.items.map((item, index) => {
              const isLeft = index % 2 === 0;
              const typeKey = item.type.en;
              const scheme = typeColors[typeKey] ?? {
                color: "#F5C518",
                bg: "rgba(245,197,24,0.1)",
                border: "rgba(245,197,24,0.25)",
              };
              const isFirst = index === 0;

              return (
                <div
                  key={item.title.en}
                  className="relative md:grid md:grid-cols-2 md:gap-8 md:mb-12"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible
                      ? "translateY(0)"
                      : "translateY(28px)",
                    transition: `opacity 0.55s ease ${index * 160}ms, transform 0.55s ease ${index * 160}ms`,
                  }}
                >
                  {/* ── MOBILE LAYOUT (always left-aligned with left line) ── */}
                  <div className="md:hidden flex items-start gap-4 pl-12 relative">
                    {/* Dot on the mobile left line */}
                    <span
                      className="absolute left-[14px] top-6 w-3 h-3 rounded-full border-2 flex-shrink-0 z-10"
                      style={{
                        background: isFirst ? "#F5C518" : "var(--dark-surface)",
                        borderColor: isFirst ? "#F5C518" : scheme.color,
                        boxShadow: isFirst
                          ? "0 0 12px rgba(245,197,24,0.5)"
                          : `0 0 8px ${scheme.color}40`,
                      }}
                      aria-hidden="true"
                    />

                    <div className="flex-1 min-w-0">
                      <ExperienceCard
                        item={item}
                        lang={lang}
                        isAr={isAr}
                        scheme={scheme}
                        isFirst={isFirst}
                      />
                    </div>
                  </div>

                  {/* ── DESKTOP LAYOUT (alternating left/right) ── */}
                  {/* Left column */}
                  <div
                    className={`hidden md:flex ${
                      isAr
                        ? isLeft
                          ? "justify-start pr-8"
                          : "justify-end pl-8"
                        : isLeft
                        ? "justify-end pr-8"
                        : "justify-start pl-8"
                    }`}
                  >
                    {/* Show card on left side when isLeft (en) or !isLeft (ar) */}
                    {(isAr ? !isLeft : isLeft) && (
                      <div className="w-full max-w-md">
                        <ExperienceCard
                          item={item}
                          lang={lang}
                          isAr={isAr}
                          scheme={scheme}
                          isFirst={isFirst}
                        />
                      </div>
                    )}
                  </div>

                  {/* Center dot — desktop only */}
                  <div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-start justify-center pt-6 z-10"
                    aria-hidden="true"
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                      style={{
                        background: isFirst
                          ? "#F5C518"
                          : "var(--dark-surface)",
                        borderColor: isFirst ? "#F5C518" : scheme.color,
                        boxShadow: isFirst
                          ? "0 0 14px rgba(245,197,24,0.6)"
                          : `0 0 10px ${scheme.color}50`,
                      }}
                    />
                  </div>

                  {/* Right column */}
                  <div
                    className={`hidden md:flex ${
                      isAr
                        ? isLeft
                          ? "justify-end pl-8"
                          : "justify-start pr-8"
                        : isLeft
                        ? "justify-start pl-8"
                        : "justify-end pr-8"
                    }`}
                  >
                    {(isAr ? isLeft : !isLeft) && (
                      <div className="w-full max-w-md">
                        <ExperienceCard
                          item={item}
                          lang={lang}
                          isAr={isAr}
                          scheme={scheme}
                          isFirst={isFirst}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-component: Card ─────────────────────────────────────────────────────*/
function ExperienceCard({
  item,
  lang,
  isAr,
  scheme,
  isFirst,
}: {
  item: (typeof tr.experience.items)[number];
  lang: "en" | "ar";
  isAr: boolean;
  scheme: { color: string; bg: string; border: string };
  isFirst: boolean;
}) {
  return (
    <article
      className="rounded-2xl p-5 sm:p-6 group transition-all duration-300 hover:-translate-y-1"
      style={{
        background: isFirst
          ? "linear-gradient(145deg, #1a1400 0%, #141000 100%)"
          : "rgba(255,255,255,0.03)",
        border: isFirst
          ? `1.5px solid rgba(245,197,24,0.3)`
          : `1px solid var(--dark-border)`,
        boxShadow: isFirst
          ? "0 0 30px rgba(245,197,24,0.08), 0 4px 20px rgba(0,0,0,0.3)"
          : "0 4px 20px rgba(0,0,0,0.15)",
      }}
    >
      {/* Type badge + year */}
      <div
        className={`flex items-center justify-between gap-3 flex-wrap mb-4 ${isAr ? "flex-row-reverse" : ""}`}
      >
        <span
          className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            color: scheme.color,
            background: scheme.bg,
            border: `1px solid ${scheme.border}`,
          }}
        >
          {item.type[lang]}
        </span>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            color: "var(--text-muted)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--dark-border)",
          }}
        >
          {item.year[lang]}
        </span>
      </div>

      {/* Icon + Title + Company */}
      <div
        className={`flex items-start gap-3 mb-3 ${isAr ? "flex-row-reverse" : ""}`}
      >
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{
            background: isFirst
              ? "rgba(245,197,24,0.1)"
              : "rgba(255,255,255,0.05)",
            border: isFirst
              ? "1px solid rgba(245,197,24,0.2)"
              : "1px solid var(--dark-border)",
          }}
          aria-hidden="true"
        >
          {item.icon}
        </span>
        <div className={isAr ? "text-right" : ""}>
          <h3 className="text-text-main font-bold text-base sm:text-lg leading-snug">
            {item.title[lang]}
          </h3>
          <p className="text-text-muted text-sm mt-0.5 leading-snug">
            {item.company[lang]}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className={`text-text-muted text-sm leading-relaxed mb-4 ${isAr ? "text-right" : ""}`}
      >
        {item.desc[lang]}
      </p>

      {/* Tags */}
      <div className={`flex flex-wrap gap-2 ${isAr ? "justify-end" : ""}`}>
        {item.tags.map((tag) => (
          <span key={tag} className="skill-tag text-xs">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
