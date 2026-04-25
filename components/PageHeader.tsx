"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ThemeSwitcher from "./ThemeSwitcher";

export default function PageHeader({
  current = "work",
}: {
  current?: "work" | "home";
}) {
  const { lang, toggleLang, isAr } = useLanguage();
  const homeHref = isAr ? "/ar" : "/en";
  const workHref = isAr ? "/ar/work" : "/en/work";
  const contactHref = `${homeHref}#contact`;

  const links = [
    {
      href: homeHref,
      label: lang === "ar" ? "الرئيسية" : "Home",
      active: current === "home",
    },
    {
      href: workHref,
      label: lang === "ar" ? "الأعمال" : "Work",
      active: current === "work",
    },
    {
      href: contactHref,
      label: lang === "ar" ? "تواصل" : "Contact",
      active: false,
    },
  ];

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(13,13,13,0.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--dark-border)",
        boxShadow: "0 1px 0 0 rgba(245,197,24,0.06)",
      }}
    >
      <div className="section-wrapper h-16 flex items-center justify-between gap-4">

        {/* ── Logo ── */}
        <Link
          href={homeHref}
          className="group flex items-center gap-2.5 font-bold text-base md:text-lg select-none"
          style={{ color: "var(--text-main)" }}
        >
          {/* Avatar bubble with pulse glow */}
          <span
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-extrabold shrink-0"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #F5C518 55%, #C09B00 100%)",
              color: "#0D0D0D",
              boxShadow: "0 0 0 0 rgba(245,197,24,0.45)",
              transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 14px 4px rgba(245,197,24,0.35)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 0 rgba(245,197,24,0.45)")
            }
          >
            S
          </span>

          {/* Brand text */}
          <span className="tracking-tight">
            <span
              style={{
                transition: "color 0.2s",
              }}
              className="group-hover:text-[#F5C518]"
            >
              Salah
            </span>
            <span
              style={{
                color: "#F5C518",
                textShadow: "0 0 8px rgba(245,197,24,0.6)",
              }}
            >
              .
            </span>
            <span
              className="group-hover:text-[#F5C518]"
              style={{ transition: "color 0.2s" }}
            >
              dev
            </span>
          </span>
        </Link>

        {/* ── Nav Links ── */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Secondary navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
              style={{
                color: link.active ? "#F5C518" : "var(--text-muted)",
              }}
            >
              {link.label}
              {/* Gold underline indicator */}
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  height: "2px",
                  borderRadius: "1px",
                  background: "linear-gradient(90deg, #FFD700, #C09B00)",
                  boxShadow: "0 0 6px rgba(245,197,24,0.5)",
                  width: link.active ? "60%" : "0%",
                  transition: "width 0.25s ease",
                }}
                aria-hidden
              />
            </Link>
          ))}
        </nav>

        {/* ── Controls ── */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <button
            onClick={toggleLang}
            className="flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-200 hover:scale-105 hover:border-[#F5C518]"
            style={{
              borderColor: "var(--dark-border)",
              color: "#F5C518",
              backgroundColor: "var(--dark-surface)",
            }}
            aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
          >
            <span className="text-xs font-bold">{isAr ? "EN" : "ع"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
