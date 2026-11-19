const flowPaths = [
  'M200 150 C 280 150, 300 80, 400 80 S 500 130, 560 110',
  'M200 200 C 290 200, 320 175, 400 175 S 500 200, 560 190',
  'M200 250 C 290 250, 320 290, 400 290 S 500 255, 560 270',
  'M200 300 C 280 300, 300 380, 400 380 S 500 340, 560 350',
]

const nodes = [
  { cx: 400, cy: 80, r: 7 },
  { cx: 560, cy: 110, r: 5 },
  { cx: 400, cy: 175, r: 7 },
  { cx: 560, cy: 190, r: 5 },
  { cx: 400, cy: 290, r: 7 },
  { cx: 560, cy: 270, r: 5 },
  { cx: 400, cy: 380, r: 7 },
  { cx: 560, cy: 350, r: 5 },
]

const cashBars = [
  { x: 470, h: 34, up: true },
  { x: 492, h: 20, up: false },
  { x: 514, h: 46, up: true },
  { x: 536, h: 16, up: false },
  { x: 558, h: 58, up: true },
]

export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 600 460"
      role="img"
      aria-labelledby="hero-illustration-title"
      className="mx-auto w-full max-w-xl"
    >
      <title id="hero-illustration-title">
        A financial contract document transforming into flowing cash-flow lines and connected nodes
      </title>
      <defs>
        <linearGradient id="hero-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--grad-from)" />
          <stop offset="55%" stopColor="var(--grad-via)" />
          <stop offset="100%" stopColor="var(--grad-to)" />
        </linearGradient>
        <linearGradient id="hero-grad-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--grad-to)" />
          <stop offset="100%" stopColor="var(--grad-via)" />
        </linearGradient>
        <filter id="hero-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="rgb(var(--shadow-rgb))" floodOpacity="0.14" />
        </filter>
      </defs>

      {/* faint grid */}
      <g stroke="var(--border-color)" strokeWidth="1">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" x2="600" y1={30 + i * 57} y2={30 + i * 57} />
        ))}
      </g>

      {/* flowing cash-flow lines */}
      <g fill="none" strokeLinecap="round">
        {flowPaths.map((d, i) => (
          <g key={d}>
            <path d={d} stroke="url(#hero-grad)" strokeWidth="2.5" opacity="0.9" />
            <path
              d={d}
              stroke="var(--grad-to)"
              strokeWidth="2.5"
              strokeDasharray="6 18"
              className="motion-safe:animate-[hero-dash_2.4s_linear_infinite]"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </g>
        ))}
      </g>

      {/* nodes */}
      {nodes.map((n) => (
        <g key={`${n.cx}-${n.cy}`}>
          <circle cx={n.cx} cy={n.cy} r={n.r + 7} fill="var(--grad-to)" opacity="0.12" />
          <circle cx={n.cx} cy={n.cy} r={n.r} fill="var(--elevated)" stroke="url(#hero-grad)" strokeWidth="2.5" />
        </g>
      ))}
      <path d="M400 80 L400 175 M400 290 L400 380" stroke="var(--accent-silver)" strokeWidth="1.5" strokeDasharray="3 5" />

      {/* cash-flow bars */}
      <g transform="translate(0 0)">
        <line x1="460" x2="580" y1="430" y2="430" stroke="var(--accent-silver)" strokeWidth="1.5" />
        {cashBars.map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={b.up ? 430 - b.h : 430}
            width="14"
            height={b.h}
            rx="3"
            fill={b.up ? 'url(#hero-grad-v)' : 'var(--accent-silver)'}
            opacity={b.up ? 1 : 0.6}
          />
        ))}
      </g>

      {/* contract document */}
      <g filter="url(#hero-shadow)">
        <rect x="40" y="70" width="170" height="320" rx="18" fill="var(--elevated)" stroke="var(--border-color)" />
      </g>
      <rect x="40" y="70" width="170" height="5" rx="2.5" fill="url(#hero-grad)" />
      <rect x="62" y="98" width="70" height="10" rx="5" fill="var(--grad-from)" />
      <rect x="62" y="118" width="44" height="7" rx="3.5" fill="var(--accent-silver)" opacity="0.6" />
      {[150, 200, 250, 300].map((y) => (
        <g key={y}>
          <rect x="62" y={y - 8} width="96" height="7" rx="3.5" fill="var(--accent-silver)" opacity="0.45" />
          <rect x="62" y={y + 4} width="70" height="7" rx="3.5" fill="var(--accent-silver)" opacity="0.3" />
          <circle cx="190" cy={y} r="6" fill="url(#hero-grad)" />
        </g>
      ))}
      <rect x="62" y="340" width="56" height="24" rx="12" fill="var(--surface)" stroke="var(--border-color)" />
      <text x="90" y="356" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--grad-via)" fontFamily="var(--font-space-grotesk)">
        PAM
      </text>
      <text x="168" y="356" textAnchor="middle" fontSize="11" fill="var(--ink-muted)" fontFamily="var(--font-inter)">
        {'{ }'}
      </text>
    </svg>
  )
}
