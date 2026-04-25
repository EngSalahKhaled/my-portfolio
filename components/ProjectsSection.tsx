"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr } from "@/lib/i18n/translations";
import {
  FEATURED_CASE_STUDIES,
  FEATURED_PROJECTS,
  FILTER_KEYS,
  FILTER_TO_CATEGORY,
  PROJECTS,
  type FilterKey,
} from "@/lib/project-data";
import ProjectShowcaseCard from "./ProjectShowcaseCard";

export default function ProjectsSection({ preview = false }: { preview?: boolean }) {
  const { lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const workHref = lang === "ar" ? "/ar/work" : "/en/work";

  if (preview) {
    return (
      <section id="projects" className="py-24 bg-dark-card" aria-label="Projects preview section">
        <div className="section-wrapper">
          <div className="text-center mb-14 space-y-4">
            <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#F5C518" }}>
              {tr.projects.preview.sectionTag[lang]}
            </p>
            <h2 className="section-title">
              {tr.projects.preview.title[lang]} <span className="gradient-text">{tr.projects.preview.titleAccent[lang]}</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">{tr.projects.preview.subtitle[lang]}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.slice(0, 3).map((project, index) => (
              <ProjectShowcaseCard key={project.id} project={project} index={index} lang={lang} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a href={workHref} className="btn-primary">
              {tr.projects.preview.cta[lang]}
            </a>
            <a href="#contact" className="btn-outline">
              {tr.hero.getInTouch[lang]}
            </a>
          </div>
        </div>
      </section>
    );
  }

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === FILTER_TO_CATEGORY[activeFilter]);

  return (
    <section id="projects" className="py-20 bg-dark-card" aria-label="Projects section">
      <div className="section-wrapper">
        <div className="text-center mb-14 space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#F5C518" }}>
            {tr.projects.sectionTag[lang]}
          </p>
          <h2 className="section-title">
            {tr.projects.title[lang]} <span className="gradient-text">{tr.projects.titleAccent[lang]}</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">{tr.projects.subtitle[lang]}</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-16">
          {FEATURED_CASE_STUDIES.slice(0, 3).map((project) => (
            <article key={`${project.id}-case-study`} className="glass-card p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-text-main font-semibold text-lg">{project.title}</p>
                  <p className="text-text-muted text-sm mt-1">{project.subtitle[lang]}</p>
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-xs">
                    {tr.projects.caseStudies.cta[lang]}
                  </a>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#F5C518" }}>
                    {tr.projects.caseStudies.challenge[lang]}
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed">{project.caseStudy?.challenge[lang]}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#F5C518" }}>
                    {tr.projects.caseStudies.approach[lang]}
                  </p>
                  <p className="text-text-muted text-sm leading-relaxed">{project.caseStudy?.approach[lang]}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#F5C518" }}>
                    {tr.projects.caseStudies.outcome[lang]}
                  </p>
                  <p className="text-text-main text-sm leading-relaxed">{project.caseStudy?.outcome[lang]}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10" role="group" aria-label="Filter projects">
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              className={`filter-pill ${activeFilter === key ? "active" : ""}`}
              onClick={() => setActiveFilter(key)}
              aria-pressed={activeFilter === key}
            >
              {tr.projects.filters[key][lang]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-live="polite">
          {filtered.map((project, index) => (
            <div key={project.id} role="listitem">
              <ProjectShowcaseCard project={project} index={index} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
