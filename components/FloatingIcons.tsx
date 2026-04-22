"use client";

import { useEffect, useState } from "react";

export default function FloatingIcons() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Defer mounting to after first paint — doesn't block LCP
    const id = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* React Icon — uses CSS animation, will-change for GPU compositing */}
      <div
        className="absolute top-1/4 left-[15%] opacity-10 animate-float"
        style={{ willChange: "transform" }}
      >
        <svg
          viewBox="-11.5 -10.23174 23 20.46348"
          className="w-16 h-16"
          style={{ fill: "var(--theme-primary)" }}
        >
          <circle cx="0" cy="0" r="2.05" fill="var(--theme-primary)" />
          <g stroke="var(--theme-primary)" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      </div>

      {/* Gemini Sparkle — offset animation timing */}
      <div
        className="absolute bottom-1/3 right-[15%] opacity-10"
        style={{
          willChange: "transform",
          animation: "float 8s ease-in-out 1s infinite alternate",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-12 h-12"
          style={{ fill: "var(--theme-primary)" }}
        >
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2ZM18.5 18.5L19.5 15.5L20.5 18.5L23.5 19.5L20.5 20.5L19.5 23.5L18.5 20.5L15.5 19.5L18.5 18.5Z" />
        </svg>
      </div>
    </div>
  );
}
