"use client";

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

function projectToViewport(lat: number, lng: number) {
  const x = 50 + (lng / 180) * 38;
  const y = 50 - (lat / 90) * 30;
  return { x, y };
}

export function GlobePolaroids({
  markers = defaultMarkers,
  className = "",
}: GlobePolaroidsProps) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-140 select-none ${className}`}>
      <div className="absolute inset-0 rounded-full border border-amber-200/60 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.96),rgba(246,210,122,0.32)_18%,rgba(15,23,42,0.94)_62%,rgba(15,23,42,1)_100%)] shadow-[0_25px_70px_rgba(15,23,42,0.2)]" />
      <div className="absolute inset-[8%] rounded-full border border-white/25" />
      <div className="absolute inset-[15%] rounded-full border border-white/18" />
      <div className="absolute inset-[23%] rounded-full border border-amber-300/40" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_52%,rgba(255,255,255,0.08)_70%,transparent_100%)]" />

      {markers.map((marker) => {
        const { x, y } = projectToViewport(marker.location[0], marker.location[1]);

        return (
          <div
            key={marker.id}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(-50%, -50%) rotate(${marker.rotate}deg)`,
            }}
          >
            <div className="flex flex-col items-center">
              <div className="h-18 w-18 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg shadow-slate-900/10">
                <img
                  src={marker.image}
                  alt={marker.caption}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <span className="mt-2 rounded-full border border-white/20 bg-white/75 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-700 backdrop-blur-sm">
                {marker.caption}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
