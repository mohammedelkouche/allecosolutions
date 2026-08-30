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
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "rgb(200, 200, 200)",
  darkLineColor = "rgb(50, 50, 50)",
}: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

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

      // Apply rotation
      ctx.translate(width / 2, height / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.translate(-width / 2, -height / 2);

      const colors = [lightLineColor, darkLineColor];

      // Draw horizontal lines
      for (let y = offset; y < height + cellSize; y += cellSize) {
        const gradient = ctx.createLinearGradient(0, y, width, y);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(0.5, colors[1]);
        gradient.addColorStop(1, colors[0]);

        ctx.strokeStyle = gradient;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw vertical lines
      for (let x = 0; x < width; x += cellSize) {
        const gradient = ctx.createLinearGradient(x, 0, x, height);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(0.5, colors[1]);
        gradient.addColorStop(1, colors[0]);

        ctx.strokeStyle = gradient;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      ctx.restore();

      // Update offset for animation
      if (!preferReducedMotion) {
        offset = (offset + 1) % cellSize;
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
