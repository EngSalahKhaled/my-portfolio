"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";

function QuoteBadge({ mirrored = false }: { mirrored?: boolean }) {
  return (
    <div
      className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(245, 197, 24, 0.16) 0%, rgba(245, 197, 24, 0.06) 100%)",
        border: "1px solid rgba(245, 197, 24, 0.22)",
        boxShadow: "0 10px 28px rgba(245, 197, 24, 0.08)",
      }}
      aria-hidden="true"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(255,255,255,0.16), transparent 52%)",
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        style={{
          fill: "#F5C518",
          transform: mirrored ? "scaleX(-1)" : "none",
        }}
      >
        <path d="M10.42 8.62C10.42 6.07 8.74 4 6.67 4 4.6 4 2.92 6.07 2.92 8.62c0 2.09 1.12 3.86 2.66 4.43-.42.76-.99 1.3-2.03 1.9a.75.75 0 0 0 .37 1.4c3.77 0 6.5-3.28 6.5-7.73Zm10.66 0C21.08 6.07 19.4 4 17.33 4c-2.07 0-3.75 2.07-3.75 4.62 0 2.09 1.12 3.86 2.66 4.43-.42.76-.99 1.3-2.03 1.9a.75.75 0 0 0 .37 1.4c3.77 0 6.5-3.28 6.5-7.73Z" />
      </svg>
    </div>
  );
}

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  const content = tr.testimonials;
  const isAr = lang === "ar";

  return (
    <section id="testimonials" className="py-24 bg-dark" aria-label="Testimonials section">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.items.map((item) => (
            <article key={item.name.en} className="glass-card p-6 min-h-[250px] flex flex-col">
              <div className={`mb-5 flex ${isAr ? "justify-end" : "justify-start"}`}>
                <QuoteBadge mirrored={isAr} />
              </div>
              <p className={`text-text-main leading-relaxed flex-1 ${isAr ? "text-right" : "text-left"}`}>
                {item.quote[lang]}
              </p>
              <div className="pt-5 mt-5 border-t border-dark-border">
                <p className={`text-text-main font-semibold ${isAr ? "text-right" : "text-left"}`}>
                  {item.name[lang]}
                </p>
                <p className={`text-text-muted text-sm ${isAr ? "text-right" : "text-left"}`}>
                  {item.role[lang]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
