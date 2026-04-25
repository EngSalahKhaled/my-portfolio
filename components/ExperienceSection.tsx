"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";

export default function ExperienceSection() {
  const { lang, isAr } = useLanguage();
  const content = tr.experience;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const typeColors: Record<string, string> = {
    Development: "#F5C518",
    "ريادة أعمال": "#34D399",
    Entrepreneurship: "#34D399",
    تطوير: "#F5C518",
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 bg-dark"
      aria-label={isAr ? "قسم الخبرة والمسيرة المهنية" : "Experience and career timeline section"}
    >
      <div className="section-wrapper">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 ${isAr ? "text-right" : ""}`}>
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#F5C518" }}>
              {content.sectionTag[lang]}
            </p>
            <h2 className="section-title">
              {content.title[lang]}{" "}
              <span className="gradient-text">{content.titleAccent[lang]}</span>
            </h2>
            <p className="text-text-muted max-w-2xl">{content.subtitle[lang]}</p>
          </div>

          {/* CV Download Button — placeholder until user uploads CV */}
          <a
            href="/cv/salah-khaled-cv.pdf"
            download
            id="experience-download-cv-btn"
            className="btn-outline self-start md:self-auto flex-shrink-0 gap-2"
            aria-label={isAr ? "تحميل السيرة الذاتية لصلاح خالد" : "Download Salah Khaled's CV"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            {content.downloadCv[lang]}
          </a>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className={`absolute top-0 bottom-0 w-px ${isAr ? "right-8 md:right-[calc(50%-0.5px)]" : "left-8 md:left-[calc(50%-0.5px)]"}`}
            style={{ background: "linear-gradient(to bottom, transparent, var(--dark-border) 10%, var(--dark-border) 90%, transparent)" }}
            aria-hidden="true"
          />

          <div className="space-y-12">
            {content.items.map((item, index) => {
              const isLeft = index % 2 === 0;
              const typeColor = typeColors[item.type.en] ?? "#F5C518";

              return (
                <div
                  key={item.title.en}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isAr
                      ? "flex-row-reverse"
                      : isLeft
                      ? "flex-row md:flex-row"
                      : "flex-row md:flex-row-reverse"
                  }`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.5s ease ${index * 150}ms, transform 0.5s ease ${index * 150}ms`,
                  }}
                >
                  {/* Content card */}
                  <div
                    className={`flex-1 md:w-[calc(50%-2.5rem)] ${
                      isAr ? "ml-6 md:ml-0" :
                      isLeft ? "mr-6 md:mr-14" : "ml-6 md:ml-14"
                    }`}
                  >
                    <article
                      className="glass-card p-6 group hover:-translate-y-1 transition-transform duration-300"
                      style={{ borderColor: index === 0 ? "rgba(245,197,24,0.25)" : "var(--dark-border)" }}
                    >
                      {/* Year badge */}
                      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                        <span
                          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                          style={{ color: typeColor, background: `${typeColor}15`, border: `1px solid ${typeColor}30` }}
                        >
                          {item.type[lang]}
                        </span>
                        <span className="text-xs text-text-muted font-medium">
                          {item.year[lang]}
                        </span>
                      </div>

                      {/* Icon + Title */}
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl flex-shrink-0" aria-hidden="true">{item.icon}</span>
                        <div>
                          <h3 className="text-text-main font-bold text-lg leading-tight">
                            {item.title[lang]}
                          </h3>
                          <p className="text-text-muted text-sm mt-0.5">{item.company[lang]}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-text-muted text-sm leading-relaxed mb-4 ${isAr ? "text-right" : ""}`}>
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
                  </div>

                  {/* Center dot */}
                  <div
                    className={`absolute top-6 flex-shrink-0 z-10 ${
                      isAr ? "right-[calc(2rem-6px)] md:right-[calc(50%-6px)]" :
                             "left-[calc(2rem-6px)] md:left-[calc(50%-6px)]"
                    }`}
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: "50%",
                      background: index === 0 ? "#F5C518" : "var(--dark-surface)",
                      border: `2.5px solid ${index === 0 ? "#F5C518" : "var(--dark-border)"}`,
                      boxShadow: index === 0 ? "0 0 12px rgba(245,197,24,0.5)" : "none",
                    }}
                    aria-hidden="true"
                  />

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden md:block flex-1" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
