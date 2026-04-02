"use client";

import { useEffect } from "react";

export default function SecurityWrapper() {
  useEffect(() => {
    // إيقاف الكليك يمين (Right Click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // إيقاف اختصارات لوحة المفاتيح لفتح الـ Console أو الـ Source Code
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" || // F12
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) || // Ctrl+Shift+C
        (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) || // Ctrl+Shift+J
        (e.ctrlKey && (e.key === "U" || e.key === "u")) || // Ctrl+U (View Source)
        // Mac Equivalents
        (e.metaKey && e.altKey && (e.key === "I" || e.key === "i")) ||
        (e.metaKey && e.altKey && (e.key === "C" || e.key === "c")) ||
        (e.metaKey && e.altKey && (e.key === "J" || e.key === "j")) ||
        (e.metaKey && (e.key === "U" || e.key === "u"))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null; // This component doesn't render anything visually
}
