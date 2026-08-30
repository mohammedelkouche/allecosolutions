"use client";

import { motion, useReducedMotion } from "framer-motion";

interface DiaTextRevealProps {
  text: string;
  colors?: string[];
  className?: string;
  duration?: number;
  delay?: number;
  textColor?: string;
}

export function DiaTextReveal({
  text,
  colors = ["#c28b2b", "#d9ae5d"],
  className = "",
  duration = 1.5,
  delay = 0,
  textColor = "var(--foreground)",
}: DiaTextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className} style={{ color: textColor }}>{text}</span>;
  }

  const characters = text.split("");
  const charDuration = duration / characters.length;

  return (
    <span className={`${className}`} style={{ color: textColor }}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: charDuration * 0.6,
            delay: delay + index * charDuration,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
