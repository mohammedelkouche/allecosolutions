"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export interface PolaroidMarker {
  id: string;
  location: [number, number];
  image: string;
  caption: string;
  rotate: number;
}

interface GlobePolaroidsProps {
  markers?: PolaroidMarker[];
  className?: string;
  speed?: number;
}

const defaultMarkers: PolaroidMarker[] = [
  {
    id: "polaroid-france",
    location: [46.6034, 1.8883],
    image: "/locations/french.jpg",
    caption: "France",
    rotate: 2,
  },
  {
    id: "polaroid-spain",
    location: [40.4637, -3.7492],
    image: "/locations/spain.jpg",
    caption: "Spain",
    rotate: -4,
  },
  {
    id: "polaroid-morocco",
    location: [31.7917, -7.0926],
    image: "/locations/morocco.jpg",
    caption: "Morocco",
    rotate: 5,
  },
];

const THETA = 0.3;

// Projects a lat/lng onto the visible 2D face of the sphere for the current
// rotation (phi) and tilt (theta), so overlay markers track the WebGL globe.
function projectMarker(lat: number, lng: number, phi: number) {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180 + phi;

  const x0 = Math.cos(latRad) * Math.sin(lngRad);
  const y0 = Math.sin(latRad);
  const z0 = Math.cos(latRad) * Math.cos(lngRad);

  const y = y0 * Math.cos(THETA) - z0 * Math.sin(THETA);
  const z = y0 * Math.sin(THETA) + z0 * Math.cos(THETA);

  return {
    x: 50 + x0 * 42,
    y: 50 - y * 42,
    z,
  };
}

export function GlobePolaroids({
  markers = defaultMarkers,
  className = "",
  speed = 0.0035,
}: GlobePolaroidsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const phiRef = useRef(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = media.matches;
    const update = () => {
      reducedMotionRef.current = media.matches;
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Create the canvas imperatively so every effect run (including React
    // Strict Mode's dev double-invoke) gets a brand-new WebGL context instead
    // of reusing one left in a corrupted state by the previous instance.
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 h-full w-full";
    wrapper.prepend(canvas);

    let globe: ReturnType<typeof createGlobe> | undefined;
    let width = 0;
    let animationFrameId = 0;

    const updateMarkerOverlay = () => {
      for (const marker of markers) {
        const el = markerRefs.current[marker.id];
        if (!el) continue;

        const { x, y, z } = projectMarker(marker.location[0], marker.location[1], phiRef.current);
        const visible = z > -0.2;

        el.style.display = visible ? "flex" : "none";
        if (!visible) continue;

        const scale = 0.55 + Math.max(z, 0) * 0.55;
        const opacity = Math.min(1, Math.max(0, (z + 0.2) / 0.5));

        el.style.left = `${x}%`;
        el.style.top = `${y}%`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(Math.round(z * 100) + 100);
        el.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${marker.rotate}deg)`;
      }
    };

    const onResize = () => {
      width = wrapper.offsetWidth;

      if (globe || width === 0) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: THETA,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.06, 0.14, 0.05],
        markerColor: [0.29, 0.65, 0.15],
        glowColor: [0.35, 0.7, 0.28],
        markers: markers.map((marker) => ({ location: marker.location, size: 0.06 })),
      });
    };

    const renderFrame = () => {
      if (!reducedMotionRef.current) {
        phiRef.current += speed;
      }
      globe?.update({ phi: phiRef.current, width: width * 2, height: width * 2 });
      updateMarkerOverlay();
      animationFrameId = requestAnimationFrame(renderFrame);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(wrapper);
    onResize();
    updateMarkerOverlay();
    animationFrameId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      globe?.destroy();
      canvas.remove();
    };
  }, [markers, speed]);

  return (
    <div
      ref={wrapperRef}
      className={`relative mx-auto aspect-square w-full max-w-140 select-none ${className}`}
    >
      {markers.map((marker) => (
        <div
          key={marker.id}
          ref={(el) => {
            markerRefs.current[marker.id] = el;
          }}
          className="absolute flex flex-col items-center"
          style={{ left: "50%", top: "50%" }}
        >
          <div className="h-18 w-18 overflow-hidden rounded-xl border border-border bg-white p-1 shadow-lg shadow-foreground/10">
            <img
              src={marker.image}
              alt={marker.caption}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <span className="mt-2 rounded-full border border-white/20 bg-white/75 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm">
            {marker.caption}
          </span>
        </div>
      ))}
    </div>
  );
}
