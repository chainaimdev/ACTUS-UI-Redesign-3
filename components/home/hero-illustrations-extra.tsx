/**
 * Additional hero illustrations, in the same visual language as HeroIllustration
 * (600×460 canvas, faint grid, brand-gradient strokes, elevated cards, haloed nodes).
 * Theme-aware: every colour comes from CSS variables.
 */

const FONT_HEAD = 'var(--font-space-grotesk)'
const FONT_BODY = 'var(--font-inter)'

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-grad`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
        <stop offset="0%" stopColor="var(--grad-from)" />
        <stop offset="55%" stopColor="var(--grad-via)" />
        <stop offset="100%" stopColor="var(--grad-to)" />
      </linearGradient>
      <linearGradient id={`${id}-grad-v`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="var(--grad-to)" />
        <stop offset="100%" stopColor="var(--grad-via)" />
      </linearGradient>
      <filter id={`${id}-shadow`} x="-40%" y="-40%" width="180%" height="220%">
        <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="rgb(var(--shadow-rgb))" floodOpacity="0.14" />
      </filter>
      <filter id={`${id}-shadow-sm`} x="-60%" y="-120%" width="220%" height="400%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="rgb(var(--shadow-rgb))" floodOpacity="0.12" />
      </filter>
    </defs>
  )
}

function Grid() {
  return (
    <g stroke="var(--border-color)" strokeWidth="1">
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="0" x2="600" y1={30 + i * 57} y2={30 + i * 57} />
      ))}
    </g>
  )
}

/** Animated "flow" on top of a gradient path, same as the main hero. */
function Flow({ d, id, delay = 0, width = 2.5 }: { d: string; id: string; delay?: number; width?: number }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={d} stroke={`url(#${id}-grad)`} strokeWidth={width} opacity="0.9" />
      <path
        d={d}
        stroke="var(--grad-to)"
        strokeWidth={width}
        strokeDasharray="6 18"
        className="motion-safe:animate-[hero-dash_2.4s_linear_infinite]"
        style={{ animationDelay: `${delay}s` }}
      />
    </g>
  )
}

function Node({ cx, cy, r, id }: { cx: number; cy: number; r: number; id: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 7} fill="var(--grad-to)" opacity="0.12" />
      <circle cx={cx} cy={cy} r={r} fill="var(--elevated)" stroke={`url(#${id}-grad)`} strokeWidth="2.5" />
    </g>
  )
}

function Card({
  x,
  y,
  w,
  h,
  id,
  topBar = true,
}: {
  x: number
  y: number
  w: number
  h: number
  id: string
  topBar?: boolean
}) {
  return (
    <g>
      <g filter={`url(#${id}-shadow)`}>
        <rect x={x} y={y} width={w} height={h} rx="16" fill="var(--elevated)" stroke="var(--border-color)" />
      </g>
      {topBar && <rect x={x} y={y} width={w} height="5" rx="2.5" fill={`url(#${id}-grad)`} />}
    </g>
  )
}

function Chip({ x, y, label, w }: { x: number; y: number; label: string; w?: number }) {
  const width = w ?? label.length * 8.5 + 22
  return (
    <g>
      <rect x={x - width / 2} y={y - 12} width={width} height="24" rx="12" fill="var(--surface)" stroke="var(--border-color)" />
      <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--grad-via)" fontFamily={FONT_HEAD}>
        {label}
      </text>
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* 1. Contract types: one taxonomy, every instrument                    */
/* ------------------------------------------------------------------ */

export function ContractTypesIllustration() {
  const id = 'hx-types'
  const cx = 300
  const cy = 232
  const types = ['PAM', 'ANN', 'LAM', 'NAM', 'SWAPS', 'OPTNS', 'FUTUR', 'STK']
  const rx = 225
  const ry = 160
  const items = types.map((t, i) => {
    const a = (-90 + i * 45) * (Math.PI / 180)
    return { t, x: Math.round(cx + rx * Math.cos(a)), y: Math.round(cy + ry * Math.sin(a)) }
  })
  return (
    <svg viewBox="0 0 600 460" role="img" aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-xl">
      <title id={`${id}-title`}>ACTUS at the centre of a ring of contract types: PAM, ANN, LAM, NAM, SWAPS, OPTNS, FUTUR and STK</title>
      <Defs id={id} />
      <Grid />

      {/* orbit */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="var(--accent-silver)" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.7" />

      {/* connectors hub -> type */}
      {items.map((it, i) => {
        const mx = (cx + it.x) / 2 + (it.y - cy) * 0.18
        const my = (cy + it.y) / 2 - (it.x - cx) * 0.18
        return <Flow key={it.t} id={id} d={`M${cx} ${cy} Q ${mx} ${my} ${it.x} ${it.y}`} delay={i * 0.25} width={2} />
      })}

      {/* type pills */}
      {items.map((it) => {
        const w = it.t.length * 9 + 34
        return (
          <g key={it.t}>
            <g filter={`url(#${id}-shadow-sm)`}>
              <rect x={it.x - w / 2} y={it.y - 17} width={w} height="34" rx="17" fill="var(--elevated)" stroke="var(--border-color)" />
            </g>
            <circle cx={it.x - w / 2 + 15} cy={it.y} r="4" fill={`url(#${id}-grad)`} />
            <text x={it.x + 6} y={it.y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--ink)" fontFamily={FONT_HEAD}>
              {it.t}
            </text>
          </g>
        )
      })}

      {/* hub */}
      <circle cx={cx} cy={cy} r="74" fill="var(--grad-to)" opacity="0.08" />
      <circle cx={cx} cy={cy} r="56" fill="var(--grad-to)" opacity="0.1" />
      <Card x={cx - 62} y={cy - 46} w={124} h={92} id={id} />
      <text x={cx} y={cy + 2} textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)" fontFamily={FONT_HEAD}>
        ACTUS
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="10.5" fill="var(--ink-muted)" fontFamily={FONT_BODY}>
        contract types
      </text>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 2. Event timeline: every contract event on one schedule              */
/* ------------------------------------------------------------------ */

export function EventTimelineIllustration() {
  const id = 'hx-events'
  const axisY = 318
  const events: { x: number; code: string; h: number; dir: 'in' | 'out'; kind?: 'reset' }[] = [
    { x: 70, code: 'IED', h: 84, dir: 'out' },
    { x: 140, code: 'IP', h: 34, dir: 'in' },
    { x: 205, code: 'IP', h: 34, dir: 'in' },
    { x: 270, code: 'RR', h: 0, dir: 'in', kind: 'reset' },
    { x: 335, code: 'IP', h: 44, dir: 'in' },
    { x: 400, code: 'PR', h: 70, dir: 'in' },
    { x: 465, code: 'IP', h: 44, dir: 'in' },
    { x: 535, code: 'MD', h: 130, dir: 'in' },
  ]
  return (
    <svg viewBox="0 0 600 460" role="img" aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-xl">
      <title id={`${id}-title`}>A contract timeline with events: initial exchange, interest payments, a rate reset, principal redemption and maturity</title>
      <Defs id={id} />
      <Grid />

      {/* contract card */}
      <Card x={36} y={40} w={196} h={112} id={id} />
      <rect x="56" y="64" width="78" height="9" rx="4.5" fill="var(--grad-from)" />
      <rect x="56" y="82" width="120" height="6" rx="3" fill="var(--accent-silver)" opacity="0.45" />
      <rect x="56" y="96" width="92" height="6" rx="3" fill="var(--accent-silver)" opacity="0.3" />
      <Chip x={84} y={128} label="ANN" />
      <text x="200" y="132" textAnchor="end" fontSize="11" fill="var(--ink-muted)" fontFamily={FONT_BODY}>
        5Y · 4.5%
      </text>

      {/* schedule bracket: the contract's terms generate the events below */}
      <Flow id={id} d="M232 96 C 300 96, 300 128, 360 128 L 548 128" delay={0.2} width={2} />
      <Node cx={548} cy={128} r={6} id={id} />
      <path d="M548 134 L548 160" stroke="var(--accent-silver)" strokeWidth="1.5" strokeDasharray="3 5" />

      {/* axis */}
      <line x1="40" x2="570" y1={axisY} y2={axisY} stroke="var(--accent-silver)" strokeWidth="2" />
      {events.map((e, i) => {
        if (e.kind === 'reset') {
          return (
            <g key={i}>
              <rect x={e.x - 9} y={axisY - 9} width="18" height="18" rx="3" transform={`rotate(45 ${e.x} ${axisY})`} fill="var(--elevated)" stroke={`url(#${id}-grad)`} strokeWidth="2.5" />
              <text x={e.x} y={axisY + 40} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-muted)" fontFamily={FONT_HEAD}>
                {e.code}
              </text>
            </g>
          )
        }
        const up = e.dir === 'in'
        const y = up ? axisY - e.h : axisY
        return (
          <g key={i}>
            <rect x={e.x - 9} y={y} width="18" height={e.h} rx="4" fill={up ? `url(#${id}-grad-v)` : 'var(--accent-silver)'} opacity={up ? 1 : 0.7} />
            {/* arrow head */}
            {up ? (
              <path d={`M${e.x - 7} ${y - 4} L${e.x} ${y - 13} L${e.x + 7} ${y - 4}`} fill="none" stroke="var(--grad-to)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d={`M${e.x - 7} ${y + e.h + 4} L${e.x} ${y + e.h + 13} L${e.x + 7} ${y + e.h + 4}`} fill="none" stroke="var(--accent-silver)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
            <circle cx={e.x} cy={axisY} r="4" fill="var(--elevated)" stroke="var(--grad-via)" strokeWidth="2" />
            <text x={e.x} y={up ? axisY + 24 : axisY + e.h + 32} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--grad-via)" fontFamily={FONT_HEAD}>
              {e.code}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Scenarios: same contract, many market paths, one risk view        */
/* ------------------------------------------------------------------ */

export function ScenarioIllustration() {
  const id = 'hx-scen'
  const curves = [
    { d: 'M200 230 C 270 200, 320 150, 400 120', label: '+100 bp', y: 120 },
    { d: 'M200 230 C 270 222, 320 205, 400 195', label: 'Base', y: 195 },
    { d: 'M200 230 C 270 245, 320 262, 400 270', label: '−50 bp', y: 270 },
  ]
  const hist = [12, 22, 38, 58, 78, 92, 84, 64, 44, 26, 14]
  return (
    <svg viewBox="0 0 600 460" role="img" aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-xl">
      <title id={`${id}-title`}>One contract evaluated under several interest-rate scenarios, producing a distribution of outcomes</title>
      <Defs id={id} />
      <Grid />

      {/* contract card */}
      <Card x={40} y={150} w={160} h={160} id={id} />
      <rect x="60" y="176" width="70" height="9" rx="4.5" fill="var(--grad-from)" />
      {[200, 222, 244].map((y) => (
        <rect key={y} x="60" y={y} width={y === 244 ? 70 : 110} height="6" rx="3" fill="var(--accent-silver)" opacity="0.4" />
      ))}
      <Chip x={88} y={284} label="PAM" />
      <circle cx="200" cy="230" r="6" fill={`url(#${id}-grad)`} />

      {/* scenario curves */}
      {curves.map((c, i) => (
        <g key={c.label}>
          <Flow id={id} d={c.d} delay={i * 0.3} />
          <Node cx={400} cy={c.y} r={6} id={id} />
          <Chip x={400} y={c.y - 30} label={c.label} />
        </g>
      ))}

      {/* outcome distribution */}
      <line x1="430" x2="580" y1="430" y2="430" stroke="var(--accent-silver)" strokeWidth="1.5" />
      {hist.map((h, i) => (
        <rect
          key={i}
          x={434 + i * 13}
          y={430 - h}
          width="10"
          height={h}
          rx="2.5"
          fill={i < 2 ? 'var(--accent-silver)' : `url(#${id}-grad-v)`}
          opacity={i < 2 ? 0.7 : 0.55 + (h / 92) * 0.45}
        />
      ))}
      {/* VaR marker */}
      <line x1="459" x2="459" y1="322" y2="434" stroke="var(--grad-from)" strokeWidth="1.5" strokeDasharray="4 4" />
      <rect x="430" y="300" width="58" height="22" rx="11" fill="var(--grad-from)" />
      <text x="459" y="315" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--on-brand)" fontFamily={FONT_HEAD}>
        VaR 99%
      </text>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Ecosystem: everyone reads the same contract                       */
/* ------------------------------------------------------------------ */

function Glyph({ kind, x, y }: { kind: 'bank' | 'regulator' | 'ledger' | 'analytics' | 'auditor'; x: number; y: number }) {
  const s = { stroke: 'var(--grad-via)', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (kind) {
    case 'bank':
      return (
        <g transform={`translate(${x - 10} ${y - 10})`} {...s}>
          <path d="M0 7 L10 1 L20 7 Z" />
          <path d="M3 9 V16 M8 9 V16 M12 9 V16 M17 9 V16 M0 19 H20" />
        </g>
      )
    case 'regulator':
      return (
        <g transform={`translate(${x - 10} ${y - 10})`} {...s}>
          <path d="M10 1 L18 4 V10 C18 15 14 18 10 20 C6 18 2 15 2 10 V4 Z" />
          <path d="M6.5 10.5 L9 13 L14 7.5" />
        </g>
      )
    case 'ledger':
      return (
        <g transform={`translate(${x - 11} ${y - 8})`} {...s}>
          <rect x="0" y="0" width="8" height="8" rx="2" />
          <rect x="14" y="0" width="8" height="8" rx="2" />
          <rect x="7" y="10" width="8" height="8" rx="2" />
          <path d="M8 4 H14 M4 8 L9 10 M18 8 L13 10" />
        </g>
      )
    case 'analytics':
      return (
        <g transform={`translate(${x - 10} ${y - 10})`} {...s}>
          <path d="M1 19 H19" />
          <path d="M4 16 V11 M9 16 V6 M14 16 V9" />
          <path d="M3 7 L8 3 L13 6 L18 1" />
        </g>
      )
    case 'auditor':
      return (
        <g transform={`translate(${x - 10} ${y - 10})`} {...s}>
          <circle cx="8" cy="8" r="6" />
          <path d="M12.5 12.5 L19 19" />
        </g>
      )
  }
}

export function EcosystemIllustration() {
  const id = 'hx-eco'
  const cx = 300
  const cy = 232
  const parties: { kind: 'bank' | 'regulator' | 'ledger' | 'analytics' | 'auditor'; label: string; x: number; y: number }[] = [
    { kind: 'bank', label: 'Banks', x: 100, y: 110 },
    { kind: 'regulator', label: 'Regulators', x: 500, y: 110 },
    { kind: 'ledger', label: 'Ledgers', x: 508, y: 340 },
    { kind: 'analytics', label: 'Analytics', x: 92, y: 340 },
    { kind: 'auditor', label: 'Auditors', x: 300, y: 418 },
  ]
  return (
    <svg viewBox="0 0 600 460" role="img" aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-xl">
      <title id={`${id}-title`}>One ACTUS contract shared by banks, regulators, ledgers, analytics and auditors</title>
      <Defs id={id} />
      <Grid />

      {/* rings */}
      <circle cx={cx} cy={cy} r="150" fill="none" stroke="var(--accent-silver)" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.6" />
      <circle cx={cx} cy={cy} r="96" fill="var(--grad-to)" opacity="0.06" />

      {/* links */}
      {parties.map((p, i) => (
        <Flow key={p.label} id={id} d={`M${cx} ${cy} L ${p.x} ${p.y}`} delay={i * 0.3} width={2} />
      ))}

      {/* party cards */}
      {parties.map((p) => (
        <g key={p.label}>
          <g filter={`url(#${id}-shadow-sm)`}>
            <rect x={p.x - 64} y={p.y - 26} width="128" height="52" rx="14" fill="var(--elevated)" stroke="var(--border-color)" />
          </g>
          <circle cx={p.x - 38} cy={p.y} r="15" fill="var(--grad-to)" opacity="0.12" />
          <Glyph kind={p.kind} x={p.x - 38} y={p.y} />
          <text x={p.x - 16} y={p.y + 4} fontSize="11.5" fontWeight="700" fill="var(--ink)" fontFamily={FONT_HEAD}>
            {p.label}
          </text>
        </g>
      ))}

      {/* central contract */}
      <Card x={cx - 58} y={cy - 74} w={116} h={148} id={id} />
      <rect x={cx - 40} y={cy - 50} width="56" height="8" rx="4" fill="var(--grad-from)" />
      {[-28, -12, 4].map((dy) => (
        <rect key={dy} x={cx - 40} y={cy + dy} width={dy === 4 ? 50 : 76} height="6" rx="3" fill="var(--accent-silver)" opacity="0.4" />
      ))}
      <Chip x={cx - 14} y={cy + 44} label="ACTUS" />
      <circle cx={cx + 32} cy={cy + 44} r="5" fill={`url(#${id}-grad)`} />
    </svg>
  )
}
