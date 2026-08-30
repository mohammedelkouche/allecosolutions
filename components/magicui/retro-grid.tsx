"use client";

import * as React from "react";

interface RetroGridProps {
  className?: string;
  angle?: number;
  cellSize?: number;
  opacity?: number;
  lightLineColor?: string;
  darkLineColor?: string;
}

export function RetroGrid({
  className = "",
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "var(--primary)",
  darkLineColor = "var(--primary)",
}: RetroGridProps) {
  const gradientId = React.useId();
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  }, []);

  const animationStyle = !prefersReducedMotion
    ? `
      @keyframes retro-grid-animate {
        0% {
          transform: rotate(${angle}deg) translate(0, 0);
          opacity: ${opacity};
        }
        50% {
          opacity: ${opacity * 1.2};
        }
        100% {
          transform: rotate(${angle}deg) translate(0, ${cellSize}px);
          opacity: ${opacity};
        }
      }
      .retro-grid-animated {
        animation: retro-grid-animate 20s linear infinite;
      }
    `
    : "";

  return (
    <>
      <style jsx>{animationStyle}</style>
      <div
        aria-hidden="true"
        className={["pointer-events-none absolute inset-0 overflow-hidden", className]
          .filter(Boolean)
          .join(" ")}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className={`h-full w-full ${!prefersReducedMotion ? "retro-grid-animated" : ""}`}
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={lightLineColor} />
              <stop offset="100%" stopColor={darkLineColor} />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="transparent" />
          <path
            d={`M 0 0 L ${cellSize} 0 M 0 0 L 0 ${cellSize}`}
            stroke={`url(#${gradientId})`}
            strokeWidth="0.7"
            opacity={opacity}
            fill="none"
          />
          <path
            d={`M ${cellSize} 0 L ${cellSize} ${cellSize} M 0 ${cellSize} L ${cellSize} ${cellSize}`}
            stroke={`url(#${gradientId})`}
            strokeWidth="0.7"
            opacity={opacity}
            fill="none"
          />
        </svg>
      </div>
    </>
  );
}
