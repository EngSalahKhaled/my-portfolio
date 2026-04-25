"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";

export default function ResultsSection() {
  const { lang } = useLanguage();
  const content = tr.results;

  return (
    <section id="results" className="py-24 bg-dark-card" aria-label="Results section">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {content.items.map((item) => (
            <article key={item.label.en} className="glass-card p-6 min-h-[220px] flex flex-col justify-between">
              <div>
                <p className="text-4xl sm:text-5xl font-bold gradient-text">{item.value}</p>
                <h3 className="text-text-main text-lg font-semibold mt-4">{item.label[lang]}</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mt-4">{item.detail[lang]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
