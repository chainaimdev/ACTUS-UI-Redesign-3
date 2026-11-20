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

/**
 * Cash-flow bar chart (bottom right) with a timeline cursor.
 * A dot travels along the timeline from TIMELINE_START to TIMELINE_END every SWEEP_MS; as it passes
 * a bar, that bar pops (scales ~12% from the baseline and settles). Bars never move sideways.
 * Animations: .hero-cursor and .hero-bar-pulse in globals.css (their 4s / 164px must match below).
 * The tallest bar's pop stays below the far-right flow node at (560, 350).
 */
const CHART_BASELINE = 424
const BAR_WIDTH = 16
const TIMELINE_Y = 452
const TIMELINE_START = 426
const TIMELINE_END = 590 // TIMELINE_START + 164 (cursor travel in globals.css)
const SWEEP_MS = 4000 // must equal the .hero-cursor / .hero-bar-pulse duration
const PULSE_PEAK = 0.06 // the pulse keyframe peaks at 6% of SWEEP_MS
const cashBars = [
  { x: 430, h: 30, up: true },
  { x: 456, h: 20, up: false },
  { x: 482, h: 44, up: true },
  { x: 508, h: 16, up: false },
  { x: 534, h: 52, up: true },
  { x: 560, h: 58, up: true },
]
/** Delay so a bar's pop peaks exactly when the cursor is over its centre. */
const pulseDelay = (x: number) =>
  Math.round((SWEEP_MS * (x + BAR_WIDTH / 2 - TIMELINE_START)) / (TIMELINE_END - TIMELINE_START) - SWEEP_MS * PULSE_PEAK)

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

      {/* cash-flow bars with a timeline cursor */}
      <g>
        {/* bar baseline */}
        <line x1={TIMELINE_START} x2={TIMELINE_END} y1={CHART_BASELINE} y2={CHART_BASELINE} stroke="var(--accent-silver)" strokeWidth="1.5" />

        {/* bars: fixed in place; each pops from the baseline when the cursor passes it */}
        {cashBars.map((b) => (
          <rect
            key={b.x}
            className="hero-bar-pulse"
            style={{ transformOrigin: b.up ? 'bottom' : 'top', animationDelay: `${pulseDelay(b.x)}ms` }}
            x={b.x}
            y={b.up ? CHART_BASELINE - b.h : CHART_BASELINE}
            width={BAR_WIDTH}
            height={b.h}
            rx="3"
            fill={b.up ? 'url(#hero-grad-v)' : 'var(--accent-silver)'}
            opacity={b.up ? 1 : 0.6}
          />
        ))}

        {/* timeline with a tick under each bar */}
        <line x1={TIMELINE_START} x2={TIMELINE_END} y1={TIMELINE_Y} y2={TIMELINE_Y} stroke="var(--accent-silver)" strokeWidth="1.5" opacity="0.8" />
        {cashBars.map((b) => (
          <line
            key={`t${b.x}`}
            x1={b.x + BAR_WIDTH / 2}
            x2={b.x + BAR_WIDTH / 2}
            y1={TIMELINE_Y - 3}
            y2={TIMELINE_Y + 3}
            stroke="var(--accent-silver)"
            strokeWidth="1.5"
          />
        ))}

        {/* cursor: glides left to right along the timeline, then starts again */}
        <g className="hero-cursor">
          <circle cx={TIMELINE_START} cy={TIMELINE_Y} r="7" fill="var(--grad-to)" opacity="0.18" />
          <circle cx={TIMELINE_START} cy={TIMELINE_Y} r="4" fill="url(#hero-grad)" />
        </g>
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
