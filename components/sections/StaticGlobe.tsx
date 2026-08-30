export interface CountryMarker {
  id: string;
  /** Where the connecting line touches the map (0-100 container space). */
  anchor: { x: number; y: number };
  /** Where the polaroid photo card is placed (0-100 container space). */
  position: { x: number; y: number };
  rotate: number;
  image: string;
  caption: string;
}

interface StaticGlobeProps {
  markers?: CountryMarker[];
  className?: string;
}

export const defaultCountryMarkers: CountryMarker[] = [
  {
    id: "france",
    anchor: { x: 50, y: 38 },
    position: { x: 54, y: 11 },
    rotate: 2,
    image: "/locations/french.jpg",
    caption: "France",
  },
  {
    id: "spain",
    anchor: { x: 45, y: 47 },
    position: { x: 15, y: 34 },
    rotate: -5,
    image: "/locations/spain.jpg",
    caption: "Espagne",
  },
  {
    id: "morocco",
    anchor: { x: 47, y: 52 },
    position: { x: 85, y: 62 },
    rotate: 4,
    image: "/locations/morocco.jpg",
    caption: "Maroc",
  },
];

// Zoom/pan of /public/world-map.svg inside the circular viewport, tuned so
// Western Europe & North Africa (our 3 markers) sit clearly within the crop.
const MAP_ZOOM = 320; // displayed image width, as % of the container width
const MAP_ASPECT = 2434.94 / 4378.13;
const FOCUS_X = 0.4928;
const FOCUS_Y = 0.271;
const MAP_LEFT = (0.5 - FOCUS_X * (MAP_ZOOM / 100)) * 100;
const MAP_TOP = (0.5 - FOCUS_Y * (MAP_ZOOM / 100) * MAP_ASPECT) * 100;

export function StaticGlobe({ markers = defaultCountryMarkers, className = "" }: StaticGlobeProps) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-125 select-none ${className}`}>
      <div className="absolute inset-0 overflow-hidden rounded-full bg-[radial-gradient(circle_at_32%_28%,#f4f8fc,#e2ecf6_60%,#cddceb_100%)] shadow-[0_25px_70px_rgba(15,23,42,0.15)] ring-1 ring-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element -- static decorative vector, not a Next/Image candidate */}
        <img
          src="/world-map.svg"
          alt=""
          aria-hidden="true"
          className="absolute max-w-none"
          style={{ width: `${MAP_ZOOM}%`, left: `${MAP_LEFT}%`, top: `${MAP_TOP}%` }}
        />
      </div>
      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/40" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {markers.map((marker) => (
          <line
            key={`line-${marker.id}`}
            x1={marker.anchor.x}
            y1={marker.anchor.y}
            x2={marker.position.x}
            y2={marker.position.y + 7}
            stroke="#c28b2b"
            strokeWidth="0.4"
          />
        ))}
        {markers.map((marker) => (
          <circle key={`anchor-${marker.id}`} cx={marker.anchor.x} cy={marker.anchor.y} r="1.3" fill="#c28b2b" />
        ))}
      </svg>

      {markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute flex flex-col items-center transition-all duration-300 hover:z-50 hover:scale-110"
          style={{
            left: `${marker.position.x}%`,
            top: `${marker.position.y}%`,
            transform: `translate(-50%, -50%) rotate(${marker.rotate}deg)`,
          }}
        >
          <div className="h-16 w-16 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg shadow-slate-900/20 md:h-20 md:w-20">
            <img
              src={marker.image}
              alt={marker.caption}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <span className="mt-2 rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-700">
            {marker.caption}
          </span>
        </div>
      ))}
    </div>
  );
}