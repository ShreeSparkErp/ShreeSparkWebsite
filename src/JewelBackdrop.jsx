// Decorative, animated jewellery background (gold dust, gem & ornament outlines, gleam).
// Purely visual: aria-hidden, no pointer events, disabled for reduced-motion users.

const svgProps = {
  viewBox: '0 0 100 100',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const Diamond = (p) => (
  <svg {...svgProps} {...p}>
    <polygon points="25,30 75,30 92,48 50,92 8,48" />
    <line x1="8" y1="48" x2="92" y2="48" />
    <line x1="38" y1="30" x2="32" y2="48" />
    <line x1="62" y1="30" x2="68" y2="48" />
    <line x1="32" y1="48" x2="50" y2="92" />
    <line x1="68" y1="48" x2="50" y2="92" />
  </svg>
)

const Ring = (p) => (
  <svg {...svgProps} {...p}>
    <ellipse cx="50" cy="66" rx="30" ry="26" />
    <ellipse cx="50" cy="66" rx="24" ry="20" />
    <polygon points="40,20 60,20 67,28 50,45 33,28" />
    <line x1="33" y1="28" x2="67" y2="28" />
    <line x1="44" y1="20" x2="41" y2="28" />
    <line x1="56" y1="20" x2="59" y2="28" />
    <line x1="41" y1="28" x2="50" y2="45" />
    <line x1="59" y1="28" x2="50" y2="45" />
  </svg>
)

const GoldBar = (p) => (
  <svg {...svgProps} {...p}>
    <polygon points="14,72 86,72 76,50 24,50" />
    <polygon points="24,50 76,50 68,36 32,36" />
    <line x1="14" y1="72" x2="24" y2="50" />
    <text x="50" y="65" textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="1" fill="currentColor" stroke="none">999.9</text>
  </svg>
)

const Pendant = (p) => (
  <svg {...svgProps} {...p}>
    <path d="M8,8 Q50,72 92,8" strokeDasharray="1.5 3.5" />
    <circle cx="50" cy="42" r="2.5" />
    <path d="M50,46 C59,58 61,66 50,78 C39,66 41,58 50,46 Z" />
    <path d="M50,52 C55,60 56,65 50,72" />
  </svg>
)

const RoundGem = (p) => (
  <svg {...svgProps} {...p}>
    <polygon points="83.3,36.2 83.3,63.8 63.8,83.3 36.2,83.3 16.7,63.8 16.7,36.2 36.2,16.7 63.8,16.7" />
    <polygon points="68,50 62.7,62.7 50,68 37.3,62.7 32,50 37.3,37.3 50,32 62.7,37.3" />
    <polyline points="83.3,36.2 68,50 83.3,63.8 62.7,62.7 63.8,83.3 50,68 36.2,83.3 37.3,62.7 16.7,63.8 32,50 16.7,36.2 37.3,37.3 36.2,16.7 50,32 63.8,16.7 62.7,37.3 83.3,36.2" />
  </svg>
)

// Each variant pairs two ornaments so neighbouring sections look different.
const VARIANTS = [
  [Ring, Diamond],
  [GoldBar, RoundGem],
  [Pendant, Diamond],
  [RoundGem, Ring],
  [Diamond, GoldBar],
]

export default function JewelBackdrop({ variant = 0, dust = 14, className = '' }) {
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
