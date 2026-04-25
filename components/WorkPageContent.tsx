"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";
import PageHeader from "./PageHeader";
import ProjectsSection from "./ProjectsSection";

export default function WorkPageContent() {
  const { lang, isAr } = useLanguage();
  const homeHref = isAr ? "/ar" : "/en";
  const contactHref = `${homeHref}#contact`;
  const content = tr.workPage;

  return (
    <>
      <PageHeader current="work" />
      <main>
        <section className="py-20 md:py-24 bg-dark">
          <div className="section-wrapper">
            <div className={`max-w-4xl ${isAr ? "mr-auto text-right" : ""}`}>
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#F5C518" }}>
                {content.sectionTag[lang]}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                {content.title[lang]} <span className="gradient-text">{content.titleAccent[lang]}</span>
              </h1>
              <p className="text-lg text-text-muted leading-relaxed max-w-3xl mt-6">
                {content.subtitle[lang]}
              </p>
              <div className={`flex flex-wrap gap-4 mt-8 ${isAr ? "justify-end" : ""}`}>
                <a href={contactHref} className="btn-primary">
                  {content.contactCta[lang]}
                </a>
                <a href={homeHref} className="btn-outline">
                  {content.homeCta[lang]}
                </a>
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection />

        <section className="py-24 bg-dark">
          <div className="section-wrapper">
            <div className="text-center mb-14 space-y-4">
              <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#F5C518" }}>
                {content.processTag[lang]}
              </p>
              <h2 className="section-title">
                {content.processTitle[lang]} <span className="gradient-text">{content.processAccent[lang]}</span>
              </h2>
              <p className="text-text-muted max-w-2xl mx-auto">{content.processSubtitle[lang]}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.processItems.map((item) => (
                <article key={item.title.en} className="glass-card p-6 min-h-[220px]">
                  <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#F5C518" }}>
                    {item.title[lang]}
                  </p>
                  <p className="text-text-muted leading-relaxed">{item.desc[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
