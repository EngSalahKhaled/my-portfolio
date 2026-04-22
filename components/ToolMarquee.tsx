"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

/* ─── Items: AI Tools + Dev Stack ───────────────────────────────────────────
   Grouped by type for visual interest: AI tools first, then dev tools.
   Using inline SVG where possible for crisp rendering at any DPI.        */
const ITEMS = [
  // ── AI & Productivity ────────────────────────────────────────────────
  {
    name: "Gemini",
    color: "#8B5CF6",
    icon: (
      <svg viewBox="0 0 28 28" className="w-5 h-5" aria-hidden="true">
        <path d="M14 2 L16.8 11.2 L26 14 L16.8 16.8 L14 26 L11.2 16.8 L2 14 L11.2 11.2 Z" fill="#8B5CF6" />
        <path d="M22 22 L23.2 18.8 L26.4 17.6 L23.2 16.4 L22 13.2 L20.8 16.4 L17.6 17.6 L20.8 18.8 Z" fill="#A78BFA" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    color: "#10B981",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#10B981" aria-hidden="true">
        <path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 004.981 4.18a5.985 5.985 0 00-3.998 2.9 6.046 6.046 0 00.743 7.097 5.98 5.98 0 00.51 4.911 6.051 6.051 0 006.515 2.9A5.985 5.985 0 0013.26 24a6.056 6.056 0 005.772-4.206 5.99 5.99 0 003.997-2.9 6.056 6.056 0 00-.747-7.073zM13.26 22.43a4.476 4.476 0 01-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 00.392-.681v-6.737l2.02 1.168a.071.071 0 01.038.052v5.583a4.504 4.504 0 01-4.494 4.494zM3.6 18.304a4.47 4.47 0 01-.535-3.014l.142.085 4.783 2.759a.771.771 0 00.78 0l5.843-3.369v2.332a.08.08 0 01-.033.062L9.74 19.95a4.5 4.5 0 01-6.14-1.646zM2.34 7.896a4.485 4.485 0 012.366-1.973V11.6a.766.766 0 00.388.676l5.815 3.355-2.02 1.168a.076.076 0 01-.071 0L4.24 13.815a4.5 4.5 0 01-1.9-5.919zm16.597 3.855l-5.843-3.369 2.02-1.168a.076.076 0 01.071 0l4.575 2.642a4.498 4.498 0 01-.679 8.127v-5.677a.79.79 0 00-.144-.555zm2.01-3.055l-.141-.085-4.774-2.782a.776.776 0 00-.785 0L9.409 9.23V6.897a.066.066 0 01.028-.061l4.573-2.639a4.5 4.5 0 016.166 4.666zm-12.64 4.135l-2.02-1.164a.08.08 0 01-.038-.057V6.075a4.5 4.5 0 017.375-3.453l-.142.08-4.778 2.758a.795.795 0 00-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "Claude",
    color: "#D97706",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#D97706" opacity="0.15" />
        <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#D97706">C</text>
      </svg>
    ),
  },
  {
    name: "Antigravity",
    color: "#F5C518",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden="true">
        <path d="M12 2L22 20H2L12 2Z" fill="#F5C518" opacity="0.2" stroke="#F5C518" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="2" fill="#F5C518" />
      </svg>
    ),
  },
  {
    name: "Cursor",
    color: "#60A5FA",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path d="M4 4l16 8-8 2-2 8z" fill="#60A5FA" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: "Copilot",
    color: "#818CF8",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#818CF8" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
  },
  // ── Dev & Design Stack ────────────────────────────────────────────────
  {
    name: "Next.js",
    color: "#E5E5E5",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path
          d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0z"
          fill="#E5E5E5"
        />
      </svg>
    ),
  },
  {
    name: "React",
    color: "#61DAFB",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    color: "#3178C6",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M14 10.5H10V12h2.5v5H14v-5h2V10.5h-2zM9 10.5H7v4c0 1.1.9 2 2 2h1v-1.5H9.5c-.28 0-.5-.22-.5-.5V12H11v-1.5H9v-.5c0-.28.22-.5.5-.5H11V8.5H9.5C8.12 8.5 7 9.62 7 11v-.5z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Figma",
    color: "#F24E1E",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83" />
        <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF" />
        <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E" />
        <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262" />
        <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    name: "Firebase",
    color: "#FFCA28",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z" fill="#FFCA28" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    color: "#E5E5E5",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="#E5E5E5" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    color: "#9CA3AF",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#9CA3AF" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

export default function ToolMarquee() {
  const { isAr } = useLanguage();

  return (
    <div
      className="w-full border-y border-dark-border py-4 overflow-hidden relative"
      style={{ background: "var(--dark-card)" }}
    >
      {/* Left label — outside the scroll track */}
      <div
        className="hidden md:flex absolute left-0 top-0 bottom-0 items-center px-6 z-20 border-r border-dark-border"
        style={{ background: "var(--dark-card)", minWidth: "220px" }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest whitespace-nowrap"
          style={{ color: "var(--text-muted)" }}>
          {isAr ? "مدعوم بالذكاء الاصطناعي" : "AI Workflow Powered By"}
        </p>
      </div>

      {/* Gradient fades */}
      <div
        className="absolute inset-y-0 left-0 z-10 pointer-events-none"
        style={{
          width: "260px",
          background: `linear-gradient(to right, var(--dark-card) 200px, transparent)`,
        }}
      />
      <div
        className="absolute inset-y-0 right-0 z-10 pointer-events-none w-24"
        style={{ background: `linear-gradient(to left, var(--dark-card) 60px, transparent)` }}
      />

      {/* 
        Seamless marquee: TWO identical tracks side by side.
        The first starts at 0, the second starts at -100%.
        When first reaches -100%, second is at 0 — perfect loop.
        translateX animates from 0 to -100%, then resets (no jump).
      */}
      <div
        className="flex md:ml-[220px]"
        style={{ overflow: "hidden" }}
      >
        <div className="flex animate-marquee-seamless shrink-0" aria-hidden="false">
          {ITEMS.map((item, i) => (
            <ToolChip key={`a-${i}`} item={item} />
          ))}
        </div>
        {/* Duplicate — starts right after first, creates the seamless loop */}
        <div className="flex animate-marquee-seamless shrink-0" aria-hidden="true">
          {ITEMS.map((item, i) => (
            <ToolChip key={`b-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolChip({ item }: { item: typeof ITEMS[0] }) {
  return (
    <div
      className="flex items-center gap-2.5 mx-3 px-4 py-2 rounded-full border whitespace-nowrap cursor-default group transition-colors duration-200"
      style={{
        borderColor: "var(--dark-border)",
        background: "var(--dark-surface)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = item.color + "60";
        e.currentTarget.style.background = item.color + "10";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--dark-border)";
        e.currentTarget.style.background = "var(--dark-surface)";
      }}
    >
      <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
        {item.icon}
      </span>
      <span
        className="text-sm font-semibold tracking-wide transition-colors duration-200"
        style={{ color: "var(--text-main)" }}
      >
        {item.name}
      </span>
    </div>
  );
}
