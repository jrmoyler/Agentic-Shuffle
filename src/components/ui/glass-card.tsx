"use client";

import { motion, useMotionValue } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import type { ElevationLevel } from "@/types/catalog";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  color?: string;
  elevation?: ElevationLevel;
  hover?: boolean;
};

export function GlassCard({
  children,
  className,
  contentClassName,
  color = "#7C3AED",
  elevation = 2,
  hover = true
}: GlassCardProps) {
  const cursorX = useMotionValue("50%");
  const cursorY = useMotionValue("0%");
  const glowOpacity = useMotionValue(0.5);

  return (
    <motion.div
      className={cn("glass-surface rounded-[2rem]", `elevation-${elevation}`, className)}
      style={
        {
          "--department-color": color,
          "--cursor-x": cursorX,
          "--cursor-y": cursorY,
          "--glow-opacity": glowOpacity
        } as CSSProperties
      }
      whileHover={hover ? { y: -8, scale: 1.012 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        cursorX.set(`${((event.clientX - rect.left) / rect.width) * 100}%`);
        cursorY.set(`${((event.clientY - rect.top) / rect.height) * 100}%`);
        glowOpacity.set(0.82);
      }}
      onMouseLeave={() => {
        cursorX.set("50%");
        cursorY.set("0%");
        glowOpacity.set(0.5);
      }}
    >
      <div className={cn("glass-content", contentClassName)}>{children}</div>
    </motion.div>
  );
}
