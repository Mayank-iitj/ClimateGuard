"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroBadgeProps {
  text: string;
  className?: string;
}

export function HeroBadge({ text, className }: HeroBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-sage/20 bg-brand-sage/5 text-sm font-medium text-brand-sage shadow-[0_0_15px_rgba(175,195,180,0.1)]",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-forest opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-sage"></span>
      </span>
      {text}
    </motion.div>
  );
}
