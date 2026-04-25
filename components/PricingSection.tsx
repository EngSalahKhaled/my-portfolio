"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";

export default function PricingSection() {
  const { lang, isAr } = useLanguage();
  const content = tr.pricing;
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

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 bg-dark-card"
      aria-label={isAr ? "قسم الأسعار" : "Pricing section"}
    >
      <div className="section-wrapper">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#F5C518" }}>
            {content.sectionTag[lang]}
          </p>
          <h2 className="section-title">
            {content.title[lang]}{" "}
            <span className="gradient-text">{content.titleAccent[lang]}</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">{content.subtitle[lang]}</p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {content.plans.map((plan, index) => (
            <article
              key={plan.name.en}
              id={`pricing-plan-${index}`}
              className="relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms`,
                background: plan.highlight
                  ? "linear-gradient(145deg, #1a1400 0%, #1f1900 50%, #0d0d0d 100%)"
                  : "var(--dark-card-rgba)",
                border: plan.highlight
                  ? "1.5px solid rgba(245,197,24,0.45)"
                  : "1px solid var(--dark-border)",
                boxShadow: plan.highlight
                  ? "0 0 40px rgba(245,197,24,0.12), 0 8px 32px rgba(0,0,0,0.3)"
                  : "0 4px 20px rgba(0,0,0,0.15)",
              }}
              aria-label={`${plan.name[lang]} — ${content.startingFrom[lang]} ${plan.price[lang]}`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #ffd700, #F5C518, #c09b00)",
                    color: "#0d0d0d",
                    boxShadow: "0 2px 12px rgba(245,197,24,0.4)",
                  }}
                >
                  ⭐ {content.popular[lang]}
                </div>
              )}

              {/* Icon + Name */}
              <div className={`flex items-center gap-3 mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: plan.highlight ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.04)",
                    border: plan.highlight ? "1px solid rgba(245,197,24,0.25)" : "1px solid var(--dark-border)",
                  }}
                  aria-hidden="true"
                >
                  {plan.icon}
                </span>
                <h3 className="text-text-main font-bold text-xl">{plan.name[lang]}</h3>
              </div>

              {/* Price */}
              <div className={`mb-3 ${isAr ? "text-right" : ""}`}>
                <p className="text-xs text-text-muted uppercase tracking-wide mb-1">
                  {content.startingFrom[lang]}
                </p>
                <p
                  className="text-4xl font-extrabold tracking-tight"
                  style={{ color: plan.highlight ? "#F5C518" : "var(--text-main)" }}
                >
                  {plan.price[lang]}
                </p>
              </div>

              {/* Description */}
              <p className={`text-text-muted text-sm leading-relaxed mb-6 ${isAr ? "text-right" : ""}`}>
                {plan.desc[lang]}
              </p>

              {/* Divider */}
              <hr
                className="mb-6"
                style={{ borderColor: plan.highlight ? "rgba(245,197,24,0.2)" : "var(--dark-border)" }}
              />

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8" role="list">
                {(plan.features[lang] as string[]).map((feature) => (
                  <li key={feature} className={`flex items-start gap-2.5 ${isAr ? "flex-row-reverse" : ""}`}>
                    <svg
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ color: plan.highlight ? "#F5C518" : "#34D399" }}
                      aria-hidden="true"
                    >
                      <path
                        d="M13.5 4.5L6.5 11.5L3 8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className={`text-sm text-text-muted ${isAr ? "text-right" : ""}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                id={`pricing-cta-${index}`}
                className={plan.highlight ? "btn-primary justify-center" : "btn-outline justify-center"}
              >
                {content.contactForCustom[lang]}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-text-muted text-sm mt-8 max-w-xl mx-auto">
          {isAr
            ? "* الأسعار تقديرية وقد تختلف بناءً على متطلبات المشروع. تواصل لحصول على عرض سعر مخصص."
            : "* Prices are indicative and may vary based on project requirements. Contact for a custom quote."}
        </p>
      </div>
    </section>
  );
}
