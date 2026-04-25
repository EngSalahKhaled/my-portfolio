"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";

function FAQItem({
  question,
  answer,
  index,
  isAr,
  visible,
}: {
  question: string;
  answer: string;
  index: number;
  isAr: boolean;
  visible: boolean;
}) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="glass-card overflow-hidden transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.45s ease ${index * 80}ms, transform 0.45s ease ${index * 80}ms`,
        borderColor: open ? "rgba(245,197,24,0.3)" : "var(--dark-border)",
      }}
    >
      <button
        id={`faq-question-${index}`}
        className={`w-full flex items-center justify-between gap-4 p-5 text-left group ${isAr ? "flex-row-reverse text-right" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span
          className="font-semibold text-text-main text-base leading-snug group-hover:text-gold transition-colors duration-200"
          style={{ color: open ? "#F5C518" : "var(--text-main)" }}
        >
          {question}
        </span>
        <span
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: open ? "rgba(245,197,24,0.12)" : "var(--dark-surface)",
            border: `1px solid ${open ? "rgba(245,197,24,0.3)" : "var(--dark-border)"}`,
            color: open ? "#F5C518" : "var(--text-muted)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
        </span>
      </button>

      {/* Animated answer panel */}
      <div
        id={`faq-answer-${index}`}
        ref={answerRef}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        style={{
          maxHeight: open ? `${answerRef.current?.scrollHeight ?? 500}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <p
          className={`px-5 pb-5 text-text-muted text-sm leading-relaxed ${isAr ? "text-right" : ""}`}
          style={{ borderTop: "1px solid var(--dark-border)" }}
        >
          <span className="block pt-4">{answer}</span>
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { lang, isAr } = useLanguage();
  const content = tr.faq;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split items into two columns for desktop layout
  const left = content.items.filter((_, i) => i % 2 === 0);
  const right = content.items.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 bg-dark"
      aria-label={isAr ? "قسم الأسئلة الشائعة" : "Frequently asked questions section"}
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

        {/* Two-column accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="space-y-4">
            {left.map((item, i) => (
              <FAQItem
                key={item.q.en}
                question={item.q[lang]}
                answer={item.a[lang]}
                index={i * 2}
                isAr={isAr}
                visible={visible}
              />
            ))}
          </div>
          <div className="space-y-4">
            {right.map((item, i) => (
              <FAQItem
                key={item.q.en}
                question={item.q[lang]}
                answer={item.a[lang]}
                index={i * 2 + 1}
                isAr={isAr}
                visible={visible}
              />
            ))}
          </div>
        </div>

        {/* CTA at bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <p className="text-text-muted text-sm">
            {isAr ? "سؤال آخر في ذهنك؟" : "Still have a question in mind?"}
          </p>
          <a href="#contact" className="btn-primary" id="faq-contact-cta">
            {isAr ? "تواصل مباشرة" : "Ask Me Directly"}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
