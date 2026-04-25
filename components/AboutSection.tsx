"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

const englishHighlights = [
  "Front End Developer",
  "React Developer",
  "Next.js Developer",
  "Riyadh, Saudi Arabia",
];

const arabicHighlights = [
  "مطور واجهات أمامية",
  "React",
  "Next.js",
  "الرياض، السعودية",
];

export default function AboutSection() {
  const { isAr } = useLanguage();

  return (
    <section
      id="about"
      className="py-24 bg-dark"
      aria-label={isAr ? "نبذة عن صلاح خالد" : "About Salah Khaled"}
    >
      <div className="section-wrapper">
        <div className={`max-w-4xl ${isAr ? "mr-auto text-right" : ""}`}>
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#F5C518" }}
          >
            {isAr ? "عني" : "About"}
          </p>

          <h2 className="section-title mb-5">
            {isAr ? (
              <>
                مطور واجهات أمامية يركز على{" "}
                <span className="gradient-text">النتائج والنمو</span>
              </>
            ) : (
              <>
                Why Hire a Front End Developer Focused on{" "}
                <span className="gradient-text">Results</span>
              </>
            )}
          </h2>

          <p
            className="text-lg leading-relaxed max-w-3xl"
            style={{ color: "var(--text-muted)" }}
          >
            {isAr
              ? "أنا صلاح خالد، مطور واجهات أمامية من الرياض، السعودية، أعمل على بناء واجهات سريعة وحديثة باستخدام React وNext.js وTypeScript. أركز على الأداء وتجربة المستخدم والتحويلات، وأصمم صفحات ومواقع تساعد الشركات ورواد الأعمال على النمو بشكل فعلي."
              : "I'm Salah Khaled, a Front End Developer in Riyadh, Saudi Arabia, building fast, modern websites with React, Next.js, and TypeScript. I focus on performance, user experience, and conversion-driven interfaces that help brands, startups, and growing businesses turn traffic into real results."}
          </p>

          <div className={`flex flex-wrap gap-3 mt-8 ${isAr ? "justify-end" : ""}`}>
            {(isAr ? arabicHighlights : englishHighlights).map((item) => (
              <span
                key={item}
                className="skill-tag"
                style={{
                  background: "rgba(245, 197, 24,0.06)",
                  border: "1px solid rgba(245, 197, 24,0.18)",
                  color: "var(--text-main)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
