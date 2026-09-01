"use client";

import React, { useEffect, useRef } from "react";

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
  angle = 0,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "rgb(75, 166, 37)",
  darkLineColor = "rgb(46, 125, 50)",
}: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    };
    resizeCanvas();

    let offset = 0;
    const preferReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const drawGrid = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);
      ctx.save();

      // No rotation - keep grid flat horizontally
      // Only apply minimal perspective transform for depth effect
      const horizonY = height * 0.4; // Horizon line position
      const vanishingPointX = width / 2;
      const vanishingPointY = horizonY;

      // Draw horizontal lines with progressive spacing (perspective effect)
      // const numHorizontalLines = 25;
      const numHorizontalLines = 40;
      for (let i = 0; i < numHorizontalLines; i++) {
        // Progressive spacing - lines get closer together near horizon
        const progress = i / numHorizontalLines;
        const spacing = cellSize * (0.5 + progress * 1.5); // Lines spread out as they get closer
        const y = horizonY + offset + (i * spacing);
        
        if (y > height) continue;

        // Fade lines near the edges and horizon
        const distanceFromHorizon = (y - horizonY) / (height - horizonY);
        const fadeAlpha = opacity * Math.min(1, distanceFromHorizon * 1.5);

        // Canvas 2D gradients can't resolve CSS custom properties, so the brand green is inlined here (kept in sync with --primary).
        const gradient = ctx.createLinearGradient(0, y, width, y);
        gradient.addColorStop(0, `rgba(75, 166, 37, ${fadeAlpha * 0.2})`);
        gradient.addColorStop(0.5, `rgba(75, 166, 37, ${fadeAlpha})`);
        gradient.addColorStop(1, `rgba(75, 166, 37, ${fadeAlpha * 0.2})`);

        ctx.strokeStyle = gradient;
        // ctx.lineWidth = 1.5;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw vertical lines converging to vanishing point (horizontal perspective)
      const numVerticalLines = 40;
      for (let i = 0; i < numVerticalLines; i++) {
        const x = (i / (numVerticalLines - 1)) * width;
        
        // Calculate line from bottom to vanishing point for proper horizontal perspective
        const bottomX = x;
        const bottomY = height;
        const topX = vanishingPointX + (x - vanishingPointX) * 0.15; // Converge toward center
        const topY = horizonY;

        // Fade vertical lines near edges
        const distanceFromCenter = Math.abs(x - width / 2) / (width / 2);
        const fadeAlpha = opacity * (1 - distanceFromCenter * 0.6);

        // Kept in sync with --accent (deeper green) for visual depth against the primary-green horizontal lines.
        const gradient = ctx.createLinearGradient(x, horizonY, x, height);
        gradient.addColorStop(0, `rgba(46, 125, 50, ${fadeAlpha * 0.1})`);
        gradient.addColorStop(0.5, `rgba(46, 125, 50, ${fadeAlpha})`);
        gradient.addColorStop(1, `rgba(46, 125, 50, ${fadeAlpha * 0.1})`);

        ctx.strokeStyle = gradient;
        // ctx.lineWidth = 1.2;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(topX, topY);
        ctx.lineTo(bottomX, bottomY);
        ctx.stroke();
      }

      // Add gradient fade at top and bottom edges
      const topFade = ctx.createLinearGradient(0, 0, 0, horizonY);
      topFade.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      topFade.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, width, horizonY);

      const bottomFade = ctx.createLinearGradient(0, height - 100, 0, height);
      bottomFade.addColorStop(0, "rgba(255, 255, 255, 0)");
      bottomFade.addColorStop(1, "rgba(255, 255, 255, 0.3)");
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, height - 100, width, 100);

      ctx.restore();

      // Update offset for animation (scrolling effect)
      if (!preferReducedMotion) {
        offset = (offset + 0.5) % (cellSize * 3);
      }

      animationRef.current = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [angle, cellSize, opacity, lightLineColor, darkLineColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
