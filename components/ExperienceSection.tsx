"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";

const CV_URL =
  "https://drive.google.com/file/d/16lr0po6JjvOqMMxM8V8VTOl92eCtSTpA/view";

/* ─── Type-colour palettes ───────────────────────────────────────────────────*/
const PALETTE: Record<string, { glow: string; accent: string; bg: string; border: string }> = {
  Development: {
    glow: "rgba(245,197,24,0.18)",
    accent: "#F5C518",
    bg: "rgba(245,197,24,0.08)",
    border: "rgba(245,197,24,0.28)",
  },
  تطوير: {
    glow: "rgba(245,197,24,0.18)",
    accent: "#F5C518",
    bg: "rgba(245,197,24,0.08)",
    border: "rgba(245,197,24,0.28)",
  },
  Entrepreneurship: {
    glow: "rgba(52,211,153,0.18)",
    accent: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.28)",
  },
  "ريادة أعمال": {
    glow: "rgba(52,211,153,0.18)",
    accent: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.28)",
  },
};

const DEFAULT_PALETTE = PALETTE["Development"];

/* ─── Main Section ───────────────────────────────────────────────────────────*/
export default function ExperienceSection() {
  const { lang, isAr } = useLanguage();
  const content = tr.experience;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "var(--dark-bg)" }}
      aria-label={isAr ? "قسم الخبرة والمسيرة المهنية" : "Experience timeline"}
    >
      {/* Decorative background orb */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,197,24,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="section-wrapper relative z-10">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-20 ${isAr ? "text-right sm:flex-row-reverse" : ""}`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className="inline-block w-8 h-[2px] rounded-full"
                style={{ background: "#F5C518" }}
                aria-hidden="true"
              />
              <p
                className="text-xs font-bold tracking-[0.22em] uppercase"
                style={{ color: "#F5C518" }}
              >
                {content.sectionTag[lang]}
              </p>
            </div>
            <h2 className="section-title">
              {content.title[lang]}{" "}
              <span className="gradient-text">{content.titleAccent[lang]}</span>
            </h2>
            <p className="text-text-muted max-w-lg text-base leading-relaxed">
              {content.subtitle[lang]}
            </p>
          </div>

          {/* CV download */}
          <CvButton lang={lang} isAr={isAr} />
        </div>

        {/* ── Timeline ──────────────────────────────────────────────────────── */}
        <div className="relative">
          {/* Central spine */}
          <div
            className="absolute inset-y-0 left-5 sm:left-1/2 sm:-translate-x-1/2 w-[2px]"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(245,197,24,0.25) 10%, rgba(245,197,24,0.12) 90%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-10">
            {content.items.map((item, i) => {
              const palette = PALETTE[item.type.en] ?? DEFAULT_PALETTE;
              const isLeft = i % 2 === 0;

              return (
                <TimelineRow
                  key={item.title.en}
                  item={item}
                  lang={lang}
                  isAr={isAr}
                  palette={palette}
                  isLeft={isLeft}
                  index={i}
                  visible={visible}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Timeline Row (handles desktop alternation + mobile single-column) ──────*/
function TimelineRow({
  item,
  lang,
  isAr,
  palette,
  isLeft,
  index,
  visible,
}: {
  item: (typeof tr.experience.items)[number];
  lang: "en" | "ar";
  isAr: boolean;
  palette: (typeof PALETTE)[string];
  isLeft: boolean;
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="relative flex items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 180}ms, transform 0.6s ease ${index * 180}ms`,
      }}
    >
      {/* ── Spine dot ── */}
      <div
        className="absolute left-5 sm:left-1/2 sm:-translate-x-1/2 z-20 flex-shrink-0"
        style={{ top: "1.75rem" }}
        aria-hidden="true"
      >
        {/* Outer pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: palette.accent,
            opacity: index === 0 ? 0.3 : 0,
            animationDuration: "2.4s",
          }}
        />
        <span
          className="relative flex w-4 h-4 rounded-full border-2"
          style={{
            background: index === 0 ? palette.accent : "var(--dark-surface)",
            borderColor: palette.accent,
            boxShadow: `0 0 14px ${palette.glow}`,
          }}
        />
      </div>

      {/* ── Desktop: alternating columns ── */}
      {/* Left ghost (empty spacer on desktop right-side cards) */}
      <div
        className={`hidden sm:block flex-1 ${isLeft ? "pr-14" : "pl-14"}`}
        aria-hidden="true"
      >
        {isLeft && (
          <ExperienceCard
            item={item}
            lang={lang}
            isAr={isAr}
            palette={palette}
            isFirst={index === 0}
            alignRight
          />
        )}
      </div>

      {/* Right side */}
      <div className={`hidden sm:block flex-1 ${isLeft ? "pl-14" : "pr-14"}`}>
        {!isLeft && (
          <ExperienceCard
            item={item}
            lang={lang}
            isAr={isAr}
            palette={palette}
            isFirst={index === 0}
          />
        )}
      </div>

      {/* ── Mobile: always single column after the dot ── */}
      <div className="sm:hidden flex-1 pl-12 pr-0">
        <ExperienceCard
          item={item}
          lang={lang}
          isAr={isAr}
          palette={palette}
          isFirst={index === 0}
        />
      </div>
    </div>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────────────*/
function ExperienceCard({
  item,
  lang,
  isAr,
  palette,
  isFirst,
  alignRight = false,
}: {
  item: (typeof tr.experience.items)[number];
  lang: "en" | "ar";
  isAr: boolean;
  palette: (typeof PALETTE)[string];
  isFirst: boolean;
  alignRight?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl p-5 sm:p-6 cursor-default transition-all duration-300 ${alignRight ? "text-left" : ""}`}
      style={{
        background: hovered
          ? isFirst
            ? "linear-gradient(145deg, #1f1900 0%, #1a1200 100%)"
            : "rgba(255,255,255,0.05)"
          : isFirst
          ? "linear-gradient(145deg, #191300 0%, #111000 100%)"
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? palette.border : isFirst ? "rgba(245,197,24,0.22)" : "var(--dark-border)"}`,
        boxShadow: hovered
          ? `0 0 40px ${palette.glow}, 0 8px 32px rgba(0,0,0,0.35)`
          : isFirst
          ? `0 0 20px rgba(245,197,24,0.07), 0 4px 16px rgba(0,0,0,0.25)`
          : "0 2px 12px rgba(0,0,0,0.18)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      aria-label={`${item.title[lang]} at ${item.company[lang]}`}
    >
      {/* Accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)`,
          opacity: hovered ? 1 : isFirst ? 0.5 : 0,
        }}
        aria-hidden="true"
      />

      {/* Type badge + year */}
      <div
        className={`flex items-center justify-between gap-3 flex-wrap mb-4 ${isAr ? "flex-row-reverse" : ""}`}
      >
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase px-3 py-1 rounded-full"
          style={{
            color: palette.accent,
            background: palette.bg,
            border: `1px solid ${palette.border}`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: palette.accent }}
            aria-hidden="true"
          />
          {item.type[lang]}
        </span>

        <span
          className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
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
          className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] flex-shrink-0 transition-transform duration-300"
          style={{
            background: isFirst
              ? "rgba(245,197,24,0.1)"
              : "rgba(255,255,255,0.05)",
            border: `1px solid ${isFirst ? "rgba(245,197,24,0.2)" : "var(--dark-border)"}`,
            transform: hovered ? "scale(1.1) rotate(-3deg)" : "scale(1) rotate(0deg)",
          }}
          aria-hidden="true"
        >
          {item.icon}
        </span>

        <div className={isAr ? "text-right" : ""}>
          <h3 className="text-text-main font-bold text-base sm:text-lg leading-snug tracking-tight">
            {item.title[lang]}
          </h3>
          <p
            className="text-sm mt-0.5 font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            {item.company[lang]}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="my-4 h-px"
        style={{
          background: `linear-gradient(90deg, ${palette.border}, transparent)`,
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Description */}
      <p
        className={`text-sm leading-relaxed mb-5 ${isAr ? "text-right" : ""}`}
        style={{ color: "var(--text-muted)" }}
      >
        {item.desc[lang]}
      </p>

      {/* Tech Stack badges */}
      <div
        className={`flex flex-wrap gap-2 ${isAr ? "justify-end" : ""}`}
        aria-label="Tech stack"
      >
        {item.tags.map((tag) => (
          <TechBadge key={tag} label={tag} accent={palette.accent} hovered={hovered} />
        ))}
      </div>
    </article>
  );
}

/* ─── Tech Badge ─────────────────────────────────────────────────────────────*/
function TechBadge({
  label,
  accent,
  hovered,
}: {
  label: string;
  accent: string;
  hovered: boolean;
}) {
  const [tagHovered, setTagHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setTagHovered(true)}
      onMouseLeave={() => setTagHovered(false)}
      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all duration-200 cursor-default select-none"
      style={{
        color: tagHovered ? accent : "var(--text-muted)",
        background: tagHovered
          ? `${accent}18`
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${tagHovered ? `${accent}40` : "var(--dark-border)"}`,
        transform: tagHovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: tagHovered ? `0 2px 8px ${accent}25` : "none",
      }}
    >
      {label}
    </span>
  );
}

/* ─── CV Download Button ─────────────────────────────────────────────────────*/
function CvButton({ lang, isAr }: { lang: "en" | "ar"; isAr: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={CV_URL}
      target="_blank"
      rel="noopener noreferrer"
      id="experience-download-cv-btn"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="self-start sm:self-auto flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-250"
      style={{
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: hovered ? "#F5C518" : "rgba(245,197,24,0.35)",
        color: "#F5C518",
        background: hovered ? "rgba(245,197,24,0.1)" : "rgba(245,197,24,0.04)",
        boxShadow: hovered ? "0 0 22px rgba(245,197,24,0.22)" : "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
      aria-label={isAr ? "تحميل السيرة الذاتية" : "Download CV"}
    >
      {/* Download icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
      </svg>
      {tr.experience.downloadCv[lang]}
    </a>
  );
}
