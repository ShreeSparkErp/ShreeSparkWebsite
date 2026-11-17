// Decorative, animated company background: soft glow, light sweep, rising dust and
// two faint tech outlines per section (logo spark, orbit, hexagon network, code
// brackets, circuit, data cube). Purely visual: aria-hidden, no pointer events,
// disabled for reduced-motion users.

const svgProps = {
  viewBox: '0 0 100 100',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// Four-point spark, the star from the Shree Spark logo
const Spark = (p) => (
  <svg {...svgProps} {...p}>
    <path d="M50 8 C53 38 62 47 92 50 C62 53 53 62 50 92 C47 62 38 53 8 50 C38 47 47 38 50 8 Z" />
    <path d="M80 14 C81 21 83 23 90 24 C83 25 81 27 80 34 C79 27 77 25 70 24 C77 23 79 21 80 14 Z" />
  </svg>
)

// Planet with two orbits: cloud / connected systems
const Orbit = (p) => (
  <svg {...svgProps} {...p}>
    <circle cx="50" cy="50" r="11" />
    <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(-28 50 50)" />
    <ellipse cx="50" cy="50" rx="42" ry="16" transform="rotate(28 50 50)" />
    <circle cx="86" cy="31" r="2.6" fill="currentColor" stroke="none" />
    <circle cx="16" cy="70" r="2" fill="currentColor" stroke="none" />
  </svg>
)

// Hexagon network: integrated modules
const HexNet = (p) => (
  <svg {...svgProps} {...p}>
    <polygon points="50,8 86,29 86,71 50,92 14,71 14,29" />
    <line x1="50" y1="50" x2="50" y2="8" />
    <line x1="50" y1="50" x2="86" y2="71" />
    <line x1="50" y1="50" x2="14" y2="71" />
    <circle cx="50" cy="50" r="5" />
    <circle cx="50" cy="8" r="3" fill="currentColor" stroke="none" />
    <circle cx="86" cy="71" r="3" fill="currentColor" stroke="none" />
    <circle cx="14" cy="71" r="3" fill="currentColor" stroke="none" />
  </svg>
)

// Code brackets: custom software
const Code = (p) => (
  <svg {...svgProps} {...p}>
    <polyline points="34,26 12,50 34,74" />
    <polyline points="66,26 88,50 66,74" />
    <line x1="57" y1="18" x2="43" y2="82" />
  </svg>
)

// Circuit traces: technology
const Circuit = (p) => (
  <svg {...svgProps} {...p}>
    <polyline points="8,30 34,30 46,42 92,42" />
    <polyline points="8,58 26,58 38,70 70,70 80,60 92,60" />
    <polyline points="50,8 50,24 60,34" />
    <circle cx="8" cy="30" r="2.6" fill="currentColor" stroke="none" />
    <circle cx="92" cy="42" r="2.6" fill="currentColor" stroke="none" />
    <circle cx="8" cy="58" r="2.6" fill="currentColor" stroke="none" />
    <circle cx="92" cy="60" r="2.6" fill="currentColor" stroke="none" />
    <circle cx="50" cy="8" r="2.6" fill="currentColor" stroke="none" />
  </svg>
)

// Isometric data cube: data / storage
const Cube = (p) => (
  <svg {...svgProps} {...p}>
    <polygon points="50,12 86,31 50,50 14,31" />
    <polyline points="14,31 14,69 50,88 86,69 86,31" />
    <line x1="50" y1="50" x2="50" y2="88" />
  </svg>
)

// Each variant pairs two outlines so neighbouring sections look different.
const VARIANTS = [
  [Orbit, Spark],
  [HexNet, Code],
  [Circuit, Spark],
  [Cube, Orbit],
  [Spark, HexNet],
]

export default function BrandBackdrop({ variant = 0, dust = 14, className = '' }) {
  const v = variant % VARIANTS.length
  const [ShapeA, ShapeB] = VARIANTS[v]
  return (
    <div className={`jewel-backdrop jb-v${v} ${className}`} aria-hidden="true">
      <span className="jb-glow" />
      <span className="jb-gleam" />
      <ShapeA className="jb-shape jb-a" />
      <ShapeB className="jb-shape jb-b" />
      <div className="jb-dust">
        {Array.from({ length: dust }, (_, i) => <i key={i} />)}
      </div>
    </div>
  )
}
