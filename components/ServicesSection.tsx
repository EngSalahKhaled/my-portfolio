"use client";

import { BriefcaseBusiness, LayoutTemplate, MonitorCog, Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";

const icons = [LayoutTemplate, MonitorCog, Languages, BriefcaseBusiness];

export default function ServicesSection() {
  const { lang } = useLanguage();
  const content = tr.services;
  const workHref = lang === "ar" ? "/ar/work" : "/en/work";

  return (
    <section id="services" className="py-24 bg-dark" aria-label="Services section">
      <div className="section-wrapper">
        <div className="text-center mb-14 space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#F5C518" }}>
            {content.sectionTag[lang]}
          </p>
          <h2 className="section-title">
            {content.title[lang]} <span className="gradient-text">{content.titleAccent[lang]}</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">{content.subtitle[lang]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {content.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article key={item.title.en} className="glass-card p-6 min-h-[220px] flex flex-col">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(245, 197, 24,0.08)",
                    border: "1px solid rgba(245, 197, 24,0.16)",
                    color: "#F5C518",
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-text-main text-lg font-semibold mb-3">{item.title[lang]}</h3>
                <p className="text-text-muted text-sm leading-relaxed flex-1">{item.desc[lang]}</p>
              </article>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a href="#contact" className="btn-primary">{content.ctaPrimary[lang]}</a>
          <a href={workHref} className="btn-outline">{content.ctaSecondary[lang]}</a>
        </div>
      </div>
    </section>
  );
}
