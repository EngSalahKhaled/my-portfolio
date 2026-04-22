"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Only dark/light — color themes removed (gold is fixed)
interface ThemeContextType {
  mode: "dark" | "light";
  setMode: (mode: "dark" | "light") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Gold theme tokens applied once, never change
const GOLD = {
  primary: "#F5C518",
  light: "#FFD700",
  dark: "#C09B00",
  rgb: "245, 197, 24",
};

function applyGoldTokens() {
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", GOLD.primary);
  root.style.setProperty("--theme-light", GOLD.light);
  root.style.setProperty("--theme-dark", GOLD.dark);
  root.style.setProperty("--theme-rgb", GOLD.rgb);
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<"dark" | "light">("dark");

  // Init on mount — read persisted values
  useEffect(() => {
    applyGoldTokens(); // ensure tokens are set even if SSR skipped them

    const savedMode = localStorage.getItem("app-mode") as "dark" | "light" | null;
    const initial = savedMode === "light" || savedMode === "dark" ? savedMode : "dark";
    setModeState(initial);
    document.documentElement.setAttribute("data-mode", initial);
  }, []);

  const setMode = (newMode: "dark" | "light") => {
    // ── Zero-lag theme switch ──────────────────────────────────────────────
    // 1. Disable ALL transitions for one frame to avoid mass-repaint lag
    const root = document.documentElement;
    root.classList.add("no-transition");
    root.setAttribute("data-mode", newMode);

    // 2. Re-enable transitions on the very next paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove("no-transition");
      });
    });

    setModeState(newMode);
    localStorage.setItem("app-mode", newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

// Keep type alias for any code that still imports ThemeColor
export type ThemeColor = "gold";
