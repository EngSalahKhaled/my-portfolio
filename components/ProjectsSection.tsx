"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations as tr, type Lang } from "@/lib/i18n/translations";

/* ─── TypeScript Interfaces ──────────────────────────────────────────────────*/
type FilterKey = "all" | "webApps" | "uiDesign" | "mobile";
type ProjectCategory = "Web Apps" | "UI Design" | "Mobile";

interface Project {
  id: string;
  title: string;
  subtitle: { en: string; ar: string };
  description: { en: string; ar: string };
  longDescription: { en: string; ar: string };
  category: ProjectCategory;
  tags: string[];
  status: "live" | "inDevelopment" | "caseStudy";
  featured?: boolean;
  gradient: string;
  logo: string;
  metrics: string[];
  link?: string;
}

/* ─── Project Data ───────────────────────────────────────────────────────────*/
const PROJECTS: Project[] = [
  {
    id: "darak",
    title: "Darak | داراك",
    subtitle: {
      en: "Real Estate & Services Platform · Saudi Arabia",
      ar: "منصة العقارات والخدمات · المملكة العربية السعودية",
    },
    description: {
      en: "A comprehensive real estate marketplace and services aggregator for the Saudi market.",
      ar: "منصة متكاملة للعقارات وخدمات الاستفادة منها في السوق السعودية.",
    },
    longDescription: {
      en: "Darak connects buyers, sellers, and renters with verified listings across Saudi cities, integrating services like cleaning, maintenance, and moving — all in one platform. Built with Next.js, TypeScript, and a real-time database.",
      ar: "داراك يربط المشترين والبائعين والمستأجرين بإعلانات موثقة في المدن السعودية، ويدمج خدمات مثل التنظيف والصيانة والنقل — في منصة واحدة. مبني بـ Next.js وTypeScript وقاعدة بيانات آنية.",
    },
    category: "Web Apps",
    tags: ["Next.js", "TypeScript", "Real Estate", "Arabic UI", "Maps API"],
    status: "inDevelopment",
    featured: true,
    gradient: "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
    logo: "/logos/logo-darak.png",
    metrics: ["500+ Listings", "Arabic RTL", "Real-time Search"],
    link: "https://darak.sa",
  },
  {
    id: "infinity-portal",
    title: "Infinity Portal",
    subtitle: {
      en: "Car Protection CRM Dashboard",
      ar: "لوحة CRM لحماية السيارات",
    },
    description: {
      en: "Internal CRM and booking management portal for INFINITY BRIGHT centre.",
      ar: "نظام إدارة علاقات العملاء الداخلي لمركز إنفينيتي برايت.",
    },
    longDescription: {
      en: "Full-stack CRM for tracking bookings, service history, inventory, and employee performance across the INFINITY BRIGHT Riyadh operation.",
      ar: "نظام CRM متكامل لتتبع الحجوزات وسجل الخدمات والمخزون وأداء الموظفين في فرع الرياض.",
    },
    category: "Web Apps",
    tags: ["React", "TypeScript", "Dashboard", "CRM", "Tailwind"],
    status: "live",
    gradient: "linear-gradient(135deg,#0D0D0D 0%,#1a1a1a 50%,#2a1a00 100%)",
    logo: "/logos/logo-infinity-portal.png",
    metrics: ["200+ Clients", "Real-time Bookings", "Staff Management"],
    link: "https://infinitybright.com",
  },
  {
    id: "tadawul",
    title: "تداول كابيتال",
    subtitle: { en: "Trading Signals Dashboard", ar: "لوحة إشارات التداول" },
    description: {
      en: "Real-time trading signals dashboard with AI chatbot for Saudi capital markets.",
      ar: "لوحة إشارات تداول آنية مع روبوت محادثة ذكي للأسواق المالية السعودية.",
    },
    longDescription: {
      en: "Live trading signals, portfolio analytics, and an AI chatbot for market insights. Scroll-based animations optimised for long trading sessions.",
      ar: "إشارات تداول حية وتحليلات للمحفظة وروبوت محادثة ذكي. رسوم متحركة مُحسَّنة لجلسات التداول الطويلة.",
    },
    category: "Web Apps",
    tags: ["React", "Framer Motion", "AI", "Finance", "Arabic"],
    status: "live",
    gradient: "linear-gradient(135deg,#0a1628 0%,#0d2137 50%,#102435 100%)",
    logo: "/logos/logo-tadawul.png",
    metrics: ["Live Charts", "AI Chatbot", "Arabic Support"],
    link: "#",
  },
  {
    id: "build-hub",
    title: "Build Hub",
    subtitle: { en: "Construction Cost Estimator", ar: "مقدّر تكاليف البناء" },
    description: {
      en: "AI-powered cost estimator with animated landing page for a Saudi contractor.",
      ar: "مقدّر تكاليف بالذكاء الاصطناعي مع صفحة هبوط متحركة لمقاول سعودي.",
    },
    longDescription: {
      en: "Landing page and web app for Build Hub featuring an AI cost estimator, animated hero, and service catalog with a rentals sub-section.",
      ar: "موقع Build Hub يتضمن مقدّر الذكاء الاصطناعي وقسم الإيجارات والخدمات مع رسوم متحركة.",
    },
    category: "UI Design",
    tags: ["HTML", "CSS", "JavaScript", "Animations", "AI"],
    status: "live",
    gradient: "linear-gradient(135deg,#1a1200 0%,#2a1e00 50%,#1a1a1a 100%)",
    logo: "/logos/logo-build-hub.png",
    metrics: ["Animated Hero", "AI Estimator", "Mobile First"],
    link: "#",
  },
  {
    id: "infinity-landing",
    title: "INFINITY BRIGHT",
    subtitle: {
      en: "Luxury Car Protection Landing Page",
      ar: "صفحة هبوط لحماية السيارات الفاخرة",
    },
    description: {
      en: "Luxurious single-page site for Riyadh's premium 3M-certified car protection brand.",
      ar: "موقع احترافي أحادي الصفحة لعلامة إنفينيتي برايت للسيارات الفاخرة.",
    },
    longDescription: {
      en: "Dark mode landing with Services, Pricing, Gallery, and Testimonials. Includes a separate Products & Pricing page with responsive CSS animations.",
      ar: "وضع داكن مع أقسام الخدمات والأسعار والمعرض والشهادات وصفحة منتجات وأسعار مستقلة.",
    },
    category: "UI Design",
    tags: ["HTML", "CSS", "JS", "Dark Mode", "Luxury Brand"],
    status: "live",
    gradient: "linear-gradient(135deg,#0D0D0D 0%,#1a1400 50%,#2a1f00 100%)",
    logo: "/logos/logo-infinity-bright.png",
    metrics: ["3M Certified", "Dark Theme", "Luxury UX"],
    link: "https://infinitybright.com",
  },
  {
    id: "mashhour-hub",
    title: "Mashhour Hub | مشهور هب",
    subtitle: {
      en: "AI Digital Marketing Agency · Saudi Arabia",
      ar: "وكالة تسويق رقمي بالذكاء الاصطناعي · المملكة العربية السعودية",
    },
    description: {
      en: "Full-scale AI-driven digital marketing agency platform for brands, startups, and individuals.",
      ar: "منصة وكالة تسويق رقمي متكاملة بالذكاء الاصطناعي للعلامات التجارية والشركات الناشئة.",
    },
    longDescription: {
      en: "Mashhour Hub leverages OpenAI, Gemini, and AWS ML to deliver AI video production, intelligent voiceovers, automated social media management, and high-performance web development — all in one bilingual platform.",
      ar: "مشهور هب يستخدم OpenAI وGemini وAWS ML لتقديم إنتاج مقاطع فيديو بالذكاء الاصطناعي وتعليق صوتي آلي وإدارة منصات اجتماعية وتطوير مواقع عالية الأداء — كل ذلك في منصة ثنائية اللغة.",
    },
    category: "Web Apps",
    tags: ["Next.js", "OpenAI", "Gemini AI", "AWS ML", "Bilingual"],
    status: "live",
    featured: true,
    gradient: "linear-gradient(135deg,#0d0221 0%,#1a0533 50%,#2d1060 100%)",
    logo: "/logos/logo-mashhour-hub.png",
    metrics: ["AI-Powered", "Full Bilingual", "Multi-Service"],
    link: "https://mashhor-hub.com/",
  },
  {
    id: "rentals",
    title: "Rentals & Logistics",
    subtitle: {
      en: "Property & Fleet Sub-platform",
      ar: "منصة فرعية للإيجار والشحن",
    },
    description: {
      en: "Rentals page with system dark/light mode, filtering, and service cards.",
      ar: "صفحة إيجارات مع التحويل التلقائي بين الوضع الداكن والفاتح والفلترة.",
    },
    longDescription: {
      en: "Auto-adapts to system color scheme (prefers-color-scheme) for property rentals and logistics fleet bookings in Saudi Arabia.",
      ar: "تتكيف تلقائياً مع نظام ألوان الجهاز لحجوزات الإيجار والشحن في المملكة العربية السعودية.",
    },
    category: "UI Design",
    tags: ["CSS", "Dark/Light Mode", "Responsive", "Filtering"],
    status: "caseStudy",
    gradient: "linear-gradient(135deg,#0d1a1a 0%,#0a1f1f 50%,#122020 100%)",
    logo: "/logos/logo-rentals.png",
    metrics: ["System Theme", "Filtering UI", "Responsive"],
    link: "#",
  },
];

const FILTER_KEYS: FilterKey[] = ["all", "webApps", "uiDesign", "mobile"];
const FILTER_TO_CATEGORY: Partial<Record<FilterKey, ProjectCategory>> = {
  webApps: "Web Apps",
  uiDesign: "UI Design",
  mobile: "Mobile",
};

/* ─── Project Card ───────────────────────────────────────────────────────────*/
function ProjectCard({
  project,
  index,
  lang,
}: {
  project: Project;
  index: number;
  lang: Lang;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<any>(null);
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
  };
  const { label: statusLabel, cls: statusCls } = statusMap[project.status];

  const Component = project.link ? "a" : "article";
  const linkProps = project.link
    ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Component
      {...linkProps}
      ref={cardRef}
      className={`group relative glass-card overflow-hidden cursor-pointer transition-all duration-500 block ${
        visible ? "opacity-100" : "opacity-0 translate-y-8"
      } ${project.featured ? "ring-1 ring-yellow-400/20" : ""}`}
      style={{
        transitionDelay: `${index * 80}ms`,
        transform: hovered
          ? "translateY(-6px)"
          : visible
            ? "translateY(0)"
            : "translateY(32px)",
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.5),0 0 30px rgba(245, 197, 24,0.08)"
          : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`project-${project.id}`}
      aria-label={`Project: ${project.title}`}
    >
      {/* Featured badge */}
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

      {/* Thumbnail */}
      <div
        className="relative h-48 overflow-hidden"
        style={{ background: project.gradient }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 grid-lines-bg opacity-20" />
        {/* Logo image */}
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
            onError={(e) => {
              // fallback to letter if logo not found
              const target = e.currentTarget;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          {/* Fallback letter */}
          <div
            className="w-16 h-16 rounded-2xl items-center justify-center backdrop-blur-sm hidden"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span className="text-2xl font-black text-text-main">
              {project.title[0]}
            </span>
          </div>
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{ background: "rgba(245, 197, 24,0.06)" }}
        />
        <div className="absolute bottom-3 left-3">
          <span
            className="text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm text-text-muted"
            style={{
              background: "var(--project-category-bg)",
              border: "1px solid var(--project-category-border)",
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-lg text-text-main leading-tight">
              {project.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {project.subtitle[lang]}
            </p>
          </div>
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full border flex-shrink-0 ${statusCls}`}
          >
            {statusLabel}
          </span>
        </div>

        <p
          className={`text-text-muted text-sm leading-relaxed transition-all duration-300 ${hovered ? "" : "line-clamp-2"}`}
        >
          {hovered ? project.longDescription[lang] : project.description[lang]}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <span
              key={m}
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{
                color: "rgba(245, 197, 24,0.8)",
                background: "rgba(245, 197, 24,0.05)",
                border: "1px solid rgba(245, 197, 24,0.15)",
              }}
            >
              {m}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="skill-tag">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="skill-tag text-gray-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </Component>
  );
}

/* ─── Projects Section ───────────────────────────────────────────────────────*/
export default function ProjectsSection() {
  const { lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === FILTER_TO_CATEGORY[activeFilter]);

  return (
    <section
      id="projects"
      className="py-24 bg-dark-card"
      aria-label="Projects section"
    >
      <div className="section-wrapper">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <p
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#F5C518" }}
          >
            {tr.projects.sectionTag[lang]}
          </p>
          <h2 className="section-title">
            {tr.projects.title[lang]}{" "}
            <span className="gradient-text">
              {tr.projects.titleAccent[lang]}
            </span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            {tr.projects.subtitle[lang]}
          </p>
        </div>

        {/* Filters */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-10"
          role="group"
          aria-label="Filter projects"
        >
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              className={`filter-pill ${activeFilter === key ? "active" : ""}`}
              onClick={() => setActiveFilter(key)}
              aria-pressed={activeFilter === key}
              id={`filter-${key}`}
            >
              {tr.projects.filters[key][lang]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-live="polite"
        >
          {filtered.map((project, i) => (
            <div key={project.id} role="listitem">
              <ProjectCard project={project} index={i} lang={lang} />
            </div>
          ))}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-600">
            <p className="text-5xl mb-4">🔍</p>
            <p>{tr.projects.noProjects[lang]}</p>
          </div>
        )}
      </div>
    </section>
  );
}

