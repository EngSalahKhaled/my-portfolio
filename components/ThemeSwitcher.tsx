"use client";

import { useTheme } from "@/lib/ThemeContext";

export default function ThemeSwitcher() {
  const { mode, setMode } = useTheme();
  const isDark = mode === "dark";

  return (
    <button
      onClick={() => setMode(isDark ? "light" : "dark")}
      className="relative w-12 h-6 rounded-full border flex items-center"
      style={{
        background: isDark ? "rgba(245,197,24,0.12)" : "rgba(245,197,24,0.22)",
        borderColor: "rgba(245,197,24,0.35)",
      }}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Light Mode" : "Dark Mode"}
      id="theme-mode-toggle"
    >
      <span
        className="absolute w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
        style={{
          left: isDark ? "2px" : "calc(100% - 22px)",
          background: "linear-gradient(135deg,#F5C518,#C09B00)",
          transition: "left 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {isDark ? (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#0D0D0D" aria-hidden="true">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#0D0D0D" aria-hidden="true">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        )}
      </span>
    </button>
  );
}
