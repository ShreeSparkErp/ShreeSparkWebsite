// Full-screen "AI technology" logo build, shown when a header link is clicked.
// No card / boxes: the official logo (transparent PNG) is assembled directly on
// an animated tech backdrop: grid, circuit traces, converging data particles,
// a scanning beam, glitch-materialising icon pieces and a decoded wordmark.
// Each piece is the same image clipped to one part, so it's always the real logo.

const LOGO_SRC = '/logo-full-transparent.png'

// Clip regions in % of the square logo image
const PIECES = [
  { name: 'base',  clip: 'polygon(37.5% 33.75%, 58.75% 44.5%, 58.75% 47.5%, 37.5% 47.5%)' },
  { name: 'top',   clip: 'polygon(37.5% 19.4%, 54.1% 19.4%, 54.1% 26.9%, 58.75% 26.9%, 58.75% 44.5%, 37.5% 33.75%)' },
  { name: 'star',  clip: 'polygon(54.5% 18.1%, 62.5% 18.1%, 62.5% 26.25%, 54.5% 26.25%)' },
  { name: 'shree', clip: 'polygon(12.2% 48.1%, 51.125% 48.1%, 50.75% 51.875%, 51% 53.75%, 49.81% 56.56%, 49.44% 58.44%, 49.44% 61.9%, 12.2% 61.9%)' },
  { name: 'spark', clip: 'polygon(51.125% 48.1%, 88.75% 48.1%, 88.75% 61.5%, 49.44% 61.5%, 49.44% 58.44%, 49.81% 56.56%, 51% 53.75%, 50.75% 51.875%)' },
  { name: 'info',  clip: 'polygon(22.5% 62.2%, 75.6% 62.2%, 75.6% 67.8%, 22.5% 67.8%)' },
]

// Circuit traces running from the screen edges toward the logo (viewBox 1600 x 900)
const TRACES = [
  { d: 'M0,190 H290 L370,270 H560', end: [560, 270] },
  { d: 'M0,520 H220 L300,440 H540', end: [540, 440] },
  { d: 'M0,760 H320 L420,660 H600', end: [600, 660] },
  { d: 'M1600,170 H1320 L1230,260 H1040', end: [1040, 260] },
  { d: 'M1600,470 H1380 L1300,420 H1060', end: [1060, 420] },
  { d: 'M1600,740 H1300 L1200,640 H1000', end: [1000, 640] },
  { d: 'M640,0 V120 L700,180 V240', end: [700, 240] },
  { d: 'M980,900 V790 L920,730 V690', end: [920, 690] },
]

// Data particles flying in toward the centre
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + (i % 2 ? 0.2 : -0.1)
  const dist = 360 + (i % 5) * 70
  return {
    tx: Math.round(Math.cos(angle) * dist) + 'px',
    ty: Math.round(Math.sin(angle) * dist * 0.62) + 'px',
    delay: ((i % 7) * 0.06).toFixed(2) + 's',
  }
})

export default function LogoTransition({ label, x = '50%', y = '0%' }) {
  return (
    <div className="logo-transition" style={{ '--lt-x': x, '--lt-y': y }} aria-hidden="true">
      <div className="lt-curtain" />
      <div className="ai-grid" />

      <svg className="ai-circuits" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        {TRACES.map((t, i) => (
          <g key={i} style={{ '--i': i }}>
            <path className="ai-trace" d={t.d} pathLength="1" />
            <path className="ai-pulse" d={t.d} pathLength="1" />
            <circle className="ai-node" cx={t.end[0]} cy={t.end[1]} r="5" />
          </g>
        ))}
      </svg>

      <div className="ai-particles">
        {PARTICLES.map((p, i) => (
          <i key={i} style={{ '--tx': p.tx, '--ty': p.ty, animationDelay: p.delay }} />
        ))}
      </div>

      <div className="lt-stage">
        <div className="ai-halo" />
        <div className="lt-art">
          {PIECES.map((p) => (
            <span key={p.name} className={`lt-piece lt-${p.name}`}>
              <img src={LOGO_SRC} alt="" style={{ clipPath: p.clip }} draggable="false" />
            </span>
          ))}
          <span className="ai-star-burst" />
          <span className="ai-scan" />
        </div>
        {label && (
          <div className="ai-label">
            <span className="ai-prompt">›</span> navigating to <b>{label}</b>
            <span className="ai-caret" />
          </div>
        )}
      </div>
    </div>
  )
}
