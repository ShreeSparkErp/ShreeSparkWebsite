// Shree Spark logo loader, shown when an in-page link is clicked:
// the "S" is drawn in outline, fills with the logo colours, the spark star
// ignites and the wordmark appears. Then it fades out over the new section.

export default function LogoTransition() {
  return (
    <div className="logo-transition" aria-hidden="true">
      <div className="lt-curtain" />
      <div className="lt-stage">
        <div className="shree-logo-create">
          <svg className="shree-spark-svg" viewBox="0 0 395 470" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Lower facet: logo navy */}
              <linearGradient id="ltNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3D57A3" />
                <stop offset="55%" stopColor="#2E4382" />
                <stop offset="100%" stopColor="#233465" />
              </linearGradient>
              {/* Main sweeping S body: logo cerulean */}
              <linearGradient id="ltBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1AA3E3" />
                <stop offset="50%" stopColor="#008DD2" />
                <stop offset="100%" stopColor="#0A72AE" />
              </linearGradient>
              <radialGradient id="ltStarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#9AD8F6" />
                <stop offset="75%" stopColor="#1AA3E3" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* 1. Lower facet: outline draw, then fill */}
            <path
              className="lt-draw lt-draw-base"
              pathLength="100"
              d="M11,288 L216,394 L225,399 L231,408 L231,415 L223,426 L162,455 L141,458 L127,453 L24,397 L15,389 L10,374 L11,289 Z"
            />
            <path
              className="lt-fill lt-fill-base"
              fill="url(#ltNavyGrad)"
              d="M11,288 L216,394 L225,399 L231,408 L231,415 L223,426 L162,455 L141,458 L127,453 L24,397 L15,389 L10,374 L11,289 Z"
            />

            {/* 2. Main S body: outline draw, then fill */}
            <path
              className="lt-draw lt-draw-body"
              pathLength="100"
              d="M217,41 L226,42 L230,48 L231,123 L227,137 L214,150 L130,190 L283,265 L293,273 L301,287 L301,363 L298,370 L293,373 L281,370 L21,237 L12,226 L10,165 L15,150 L22,143 L216,42 Z"
            />
            <path
              className="lt-fill lt-fill-body"
              fill="url(#ltBlueGrad)"
              d="M217,41 L226,42 L230,48 L231,123 L227,137 L214,150 L130,190 L283,265 L293,273 L301,287 L301,363 L298,370 L293,373 L281,370 L21,237 L12,226 L10,165 L15,150 L22,143 L216,42 Z"
            />

            {/* 3. Spark star */}
            <g className="lt-star">
              <circle cx="324" cy="69" r="30" fill="url(#ltStarGlow)" className="lt-star-halo" />
              <path
                fill="url(#ltBlueGrad)"
                d="M324,10 L336,46 L353,59 L383,69 L357,76 L344,84 L333,101 L324,128 L316,99 L311,91 L294,79 L265,69 L286,64 L301,57 L312,44 L324,11 Z"
              />
            </g>
          </svg>

          {/* 4. Wordmark */}
          <div className="lt-wordmark">
            <span className="lt-title">
              <span className="brand-shree">Shree</span>
              <span className="brand-spark">Spark</span>
            </span>
            <span className="lt-subtitle">INFOTECH</span>
          </div>
        </div>
      </div>
    </div>
  )
}
