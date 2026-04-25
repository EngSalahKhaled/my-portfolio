"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { translations as tr, type Lang } from "@/lib/i18n/translations";
import type { Project } from "@/lib/project-data";

export default function ProjectShowcaseCard({
  project,
  index,
  lang,
}: {
  project: Project;
  index: number;
  lang: Lang;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const st = tr.projects.status;
  const statusMap = {
    live: {
      label: st.live[lang],
      cls: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    },
    inDevelopment: {
      label: st.inDevelopment[lang],
      cls: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    },
    caseStudy: {
      label: st.caseStudy[lang],
      cls: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    },
  } as const;
  const { label: statusLabel, cls: statusCls } = statusMap[project.status];

  const Component = project.link ? "a" : "article";
  const linkProps = project.link
    ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Component
      {...linkProps}
      ref={cardRef as any}
      className={`group relative glass-card overflow-hidden block transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${project.featured ? "ring-1 ring-yellow-400/20" : ""}`}
      style={{
        transitionDelay: `${index * 80}ms`,
        transform: hovered
          ? "translateY(-6px)"
          : visible
            ? "translateY(0)"
            : "translateY(32px)",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.45),0 0 30px rgba(245,197,24,0.08)"
          : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${project.title} project`}
    >
      {project.featured && (
        <div className="absolute top-3 right-3 z-10">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "linear-gradient(135deg,#F5C518,#F5C518)",
              color: "#0D0D0D",
            }}
          >
            {tr.projects.featured[lang]}
          </span>
        </div>
      )}

      <div className="relative h-48 overflow-hidden" style={{ background: project.gradient }}>
        <div className="absolute inset-0 grid-lines-bg opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <Image
            src={project.logo}
            alt={`${project.title} logo`}
            width={400}
            height={400}
            className="w-full h-full object-contain drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 0 20px rgba(245, 197, 24,0.15))",
              transition: "transform 0.4s ease, filter 0.4s ease",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{ background: "rgba(245, 197, 24,0.06)" }}
        />
        <div className="absolute bottom-3 left-3">
          <span
            className="text-xs font-medium px-2 py-1 rounded-full text-text-muted"
            style={{
              background: "var(--project-category-bg)",
              border: "1px solid var(--project-category-border)",
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-text-main leading-tight">{project.title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{project.subtitle[lang]}</p>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full border flex-shrink-0 ${statusCls}`}>
            {statusLabel}
          </span>
        </div>

        <p className="text-text-muted text-sm leading-relaxed min-h-[66px]">
          {hovered ? project.longDescription[lang] : project.description[lang]}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <span
              key={metric}
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                color: "rgba(245, 197, 24,0.8)",
                background: "rgba(245, 197, 24,0.05)",
                border: "1px solid rgba(245, 197, 24,0.15)",
              }}
            >
              {metric}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="skill-tag">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && <span className="skill-tag text-gray-500">+{project.tags.length - 4}</span>}
        </div>
      </div>
    </Component>
  );
}
