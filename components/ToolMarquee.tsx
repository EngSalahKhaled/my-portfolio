"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import {
  Code2,
  Box,
  FileCode2,
  Wind,
  Zap,
  Server,
  TerminalSquare,
  Bot,
  BrainCircuit,
  Database,
  Sparkles,
} from "lucide-react";

// Tool data
const TOOLS = [
  { name: "React", icon: Code2, color: "#61DAFB" },
  { name: "Next.js", icon: Box, color: "#FFFFFF" },
  { name: "TypeScript", icon: FileCode2, color: "#3178C6" },
  { name: "Tailwind CSS", icon: Wind, color: "#38B2AC" },
  { name: "Framer Motion", icon: Zap, color: "#E902B5" },
  { name: "Node.js", icon: Server, color: "#339933" },
  { name: "VS Code", icon: TerminalSquare, color: "#007ACC" },
  { name: "AI Agents", icon: Bot, color: "#F5C518" },
  { name: "OpenAI", icon: BrainCircuit, color: "#10B981" },
  { name: "Supabase", icon: Database, color: "#3ECF8E" },
  { name: "Cursor", icon: Sparkles, color: "#60A5FA" },
];

export default function ToolMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Motion value to track the x-axis translation
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      // The container holds exactly TWO sets of tools.
      // We divide by 2 to get the exact pixel width of ONE set.
      setContentWidth(containerRef.current.scrollWidth / 2);
    }
    
    // Update width on resize to maintain perfect loop
    const handleResize = () => {
      if (containerRef.current) {
        setContentWidth(containerRef.current.scrollWidth / 2);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useAnimationFrame((time, delta) => {
    // 1. Pause on hover
    // 2. Do nothing if width isn't calculated yet
    if (isHovered || contentWidth === 0) return;

    // Adjust scroll speed here (higher = faster)
    const speed = 0.04;
    const moveBy = speed * delta;

    let newX = x.get() - moveBy;

    // Reset loop seamlessly when the first set of items is fully out of view
    if (newX <= -contentWidth) {
      newX += contentWidth;
    }

    x.set(newX);
  });

  return (
    <section className="relative w-full max-w-7xl mx-auto py-16 overflow-hidden bg-transparent">
      {/* Edge Fading Masks */}
      {/* Left Mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-12 md:w-48 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, var(--dark-bg) 0%, transparent 100%)",
        }}
      />
      {/* Right Mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-12 md:w-48 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, var(--dark-bg) 0%, transparent 100%)",
        }}
      />

      {/* Marquee Track Container */}
      <div
        className="flex w-max"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={containerRef}
          className="flex gap-4 md:gap-6 pr-4 md:pr-6"
          style={{ x }}
        >
          {/* Double the tools array to create the seamless loop effect */}
          {[...TOOLS, ...TOOLS].map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={`${tool.name}-${index}`}
                className="flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-6 md:py-3.5 rounded-full border border-dark-border bg-dark-card/50 backdrop-blur-xl cursor-default shadow-sm"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "var(--dark-surface)",
                  borderColor: tool.color,
                  boxShadow: `0 0 20px ${tool.color}40`,
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6 shrink-0" color={tool.color} />
                <span className="text-sm md:text-base font-semibold tracking-wide text-text-main whitespace-nowrap transition-colors">
                  {tool.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
