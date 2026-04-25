"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CertificationsSection() {
  const { isAr } = useLanguage();

  const certifications = [
    {
      id: "gemini",
      titleEn: "Gemini AI Professional",
      titleAr: "محترف ذكاء اصطناعي (Gemini AI)",
      issuer: "Google",
      descAr:
        "معتمد من Google. يثبت الكفاءة في دمج نماذج اللغات المتقدمة واستخدام تقنيات الذكاء الاصطناعي لبناء حلول ويب ذكية.",
      descEn:
        "Certified by Google. Demonstrates proficiency in integrating advanced LLMs and leveraging AI capabilities to build intelligent web solutions.",
      link: "https://edu.google.accredible.com/eab1a54a-90a1-47be-a423-71ada4edd135#acc.VM4XbQKl",
      tags: ["Google Cloud", "Generative AI", "LLM Integration"],
      isPlaceholder: false,
      icon: (
        <svg width="40" height="40" viewBox="0 0 18 18" aria-hidden="true">
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
            d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.411 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
            fill="#EA4335"
          />
        </svg>
      ),
    },
    {
      id: "google-educator",
      titleEn: "Google Certified Educator",
      titleAr: "معلم معتمد من Google",
      issuer: "Google for Education",
      descAr:
        "شهادة معتمدة من Google للمعلمين. تُثبت القدرة على استخدام أدوات Google في التعليم وتوظيف التقنيات الحديثة لتحسين بيئة التعلم.",
      descEn:
        "Certified by Google for Education. Demonstrates expertise in using Google Workspace tools in educational environments to enhance learning outcomes.",
      link: "https://edu.google.accredible.com/8cb3faf0-8460-41d6-886f-20b0aee2add0?utm_source=whatsapp&utm_medium=social",
      tags: ["Google Workspace", "Education", "EdTech"],
      isPlaceholder: true,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
        >
          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#4285F4" />
          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="#34A853" />
        </svg>
      ),
    },
    {
      id: "google-faculty",
      titleEn: "Google Faculty Member",
      titleAr: "عضو هيئة تدريس Google",
      issuer: "Google for Education",
      descAr:
        "عضو معتمد في هيئة تدريس Google للشركات الناشئة. يتضمن تقديم الإرشاد التقني والمشاركة في برامج تطوير ريادة الأعمال الممولة من Google.",
      descEn:
        "Recognized by Google for Startups as a Faculty Member. Involves providing technical mentorship and participating in Google-backed entrepreneurship development programs.",
      link: "https://edu.google.accredible.com/96b3b196-b209-4c16-982b-0dd99d5e341b?utm_source=whatsapp&utm_medium=social",
      tags: ["Google for Startups", "Mentorship", "Entrepreneurship"],
      isPlaceholder: true,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
        >
          <circle cx="12" cy="8" r="4" fill="#4285F4" />
          <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" fill="#34A853" />
          <circle cx="19" cy="6" r="2.5" fill="#FBBC05" />
          <path
            d="M17 11c2.2 0 4 1.3 4 3"
            stroke="#EA4335"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="certifications"
      className="py-24 relative border-t border-dark-border"
    >
      <div className="section-wrapper relative z-10">
        <div
          className={`text-center mb-16 animate-slide-up ${isAr ? "md:text-right" : "md:text-left"}`}
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: "#F5C518" }}
          >
            {isAr ? "الإنجازات" : "Achievements"}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {isAr ? "الشهادات والاعتمادات" : "Google-Certified Skills That Strengthen Every Build"}
          </h2>
          <div
            className={`w-20 h-1.5 bg-gold rounded-full ${isAr ? "ml-auto" : ""}`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <a
              key={cert.id}
              href={cert.link}
              target={cert.link === "#" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                background: "var(--dark-card)",
                borderColor: "var(--dark-border)",
                boxShadow: "0 0 40px rgba(var(--theme-rgb), 0.04)",
              }}
              id={`cert-${cert.id}`}
              aria-label={
                cert.isPlaceholder 
                  ? `${isAr ? cert.titleAr : cert.titleEn} — Exclusive` 
                  : (isAr ? cert.titleAr : cert.titleEn)
              }
            >
              {/* Placeholder badge */}
              {cert.isPlaceholder && (
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(var(--theme-rgb), 0.12)",
                      color: "var(--theme-primary)",
                      border: "1px solid rgba(var(--theme-rgb), 0.25)",
                    }}
                  >
                    {isAr ? "حصري" : "Exclusive"}
                  </span>
                </div>
              )}

              {/* Background Mesh */}
              <div
                className="absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Badge Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "rgba(var(--theme-rgb), 0.06)",
                    borderColor: "rgba(var(--theme-rgb), 0.18)",
                    boxShadow: "0 0 20px rgba(var(--theme-rgb), 0.08)",
                  }}
                >
                  {cert.icon}
                </div>

                {/* Content */}
                <div className={`${isAr ? "text-right" : "text-left"}`}>
                  <p
                    className="text-xs font-semibold tracking-wide mb-1"
                    style={{ color: "var(--theme-primary)" }}
                  >
                    {cert.issuer}
                  </p>
                  <h3
                    className="text-lg font-bold mb-2 group-hover:text-gold transition-colors"
                    style={{ color: "var(--text-main)" }}
                  >
                    {isAr ? cert.titleAr : cert.titleEn}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {isAr ? cert.descAr : cert.descEn}
                  </p>
                  <div
                    className={`flex flex-wrap gap-1.5 ${isAr ? "justify-end" : ""}`}
                  >
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "var(--dark-surface)",
                          border: "1px solid var(--dark-border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow indicator for non-placeholder */}
              {!cert.isPlaceholder && (
                <div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "var(--theme-primary)" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
