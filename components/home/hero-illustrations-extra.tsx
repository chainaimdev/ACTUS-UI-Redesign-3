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

/* ------------------------------------------------------------------ */
/* Entrance helpers for pictures 6-10 (animations live in globals.css: */
/* .hero-pop, .hero-bar, .hero-bar-x; all off for reduced motion).      */
/* ------------------------------------------------------------------ */

const FONT_MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

/** Fades and scales its children in once, after `delay` ms. */
function Pop({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  return (
    <g className="hero-pop" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </g>
  )
}

/** Vertical bar on a baseline that grows once: up for inflows, down for outflows. */
function GrowBar({
  x,
  base,
  h,
  w,
  id,
  delay = 0,
  down = false,
}: {
  x: number
  base: number
  h: number
  w: number
  id: string
  delay?: number
  down?: boolean
}) {
  return (
    <rect
      className="hero-bar"
      style={{ transformOrigin: down ? 'top' : 'bottom', animationDelay: `${delay}ms` }}
      x={x}
      y={down ? base : base - h}
      width={w}
      height={h}
      rx="3"
      fill={down ? 'var(--accent-silver)' : `url(#${id}-grad-v)`}
      opacity={down ? 0.65 : 1}
    />
  )
}

/** Green-free check badge in brand colours. */
function Check({ cx, cy, id }: { cx: number; cy: number; id: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="14" fill="var(--grad-to)" opacity="0.12" />
      <circle cx={cx} cy={cy} r="10" fill={`url(#${id}-grad)`} />
      <path
        d={`M${cx - 4.5} ${cy} L${cx - 1} ${cy + 3.5} L${cx + 5} ${cy - 3.5}`}
        fill="none"
        stroke="var(--on-brand)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* 6. Terms as data: contract terms as JSON, events out of one API      */
/* ------------------------------------------------------------------ */

export function TermsAsDataIllustration() {
  const id = 'hx-data'
  // ACTUS data-dictionary term names (see /standards/data-dictionary); values are an example PAM loan.
  const terms: [string, string][] = [
    ['contractType', '"PAM"'],
    ['notionalPrincipal', '1000000'],
    ['nominalInterestRate', '0.045'],
    ['maturityDate', '"2030-01-01"'],
    ['cycleOfInterestPayment', '"P6M"'],
  ]
  const events = [
    { code: 'IED', w: 70, out: true },
    { code: 'IP', w: 26 },
    { code: 'IP', w: 26 },
    { code: 'PR', w: 48 },
    { code: 'MD', w: 80 },
  ]
  const rowY = (i: number) => 124 + i * 50
  return (
    <svg viewBox="0 0 600 460" role="img" aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-xl">
      <title id={`${id}-title`}>Contract terms written as data go into the ACTUS service, which returns the contract&apos;s event schedule</title>
      <Defs id={id} />
      <Grid />

      {/* terms as JSON */}
      <Card x={36} y={70} w={214} h={300} id={id} />
      <rect x="56" y="94" width="60" height="9" rx="4.5" fill="var(--grad-from)" />
      <Chip x={214} y={99} label="JSON" />
      {terms.map(([k, v], i) => (
        <Pop key={k} delay={i * 90}>
          <text x="52" y={146 + i * 42} fontSize="10" fontFamily={FONT_MONO}>
            <tspan fill="var(--ink-muted)">{`"${k}": `}</tspan>
            <tspan fill="var(--grad-via)" fontWeight="700">
              {v}
            </tspan>
          </text>
        </Pop>
      ))}

      {/* into the ACTUS service */}
      <Flow id={id} d="M250 224 C 262 224, 270 224, 282 224" width={2} />
      <Card x={282} y={186} w={96} h={76} id={id} />
      <text x="330" y="224" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" fontFamily={FONT_HEAD}>
        ACTUS
      </text>
      <text x="330" y="243" textAnchor="middle" fontSize="10.5" fill="var(--ink-muted)" fontFamily={FONT_MONO}>
        /events
      </text>

      {/* out: the event schedule */}
      {events.map((_, i) => (
        <Flow key={`f${i}`} id={id} d={`M378 224 C 400 224, 400 ${rowY(i)}, 420 ${rowY(i)}`} delay={i * 0.25} width={1.75} />
      ))}
      {events.map((e, i) => (
        <Pop key={`r${i}`} delay={350 + i * 120}>
          <g filter={`url(#${id}-shadow-sm)`}>
            <rect x="420" y={rowY(i) - 15} width="150" height="30" rx="15" fill="var(--elevated)" stroke="var(--border-color)" />
          </g>
          <text x="446" y={rowY(i) + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--grad-via)" fontFamily={FONT_HEAD}>
            {e.code}
          </text>
          <rect
            x="474"
            y={rowY(i) - 4}
            width={e.w}
            height="8"
            rx="4"
            fill={e.out ? 'var(--accent-silver)' : `url(#${id}-grad)`}
            opacity={e.out ? 0.7 : 1}
          />
        </Pop>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 7. Portfolio view: many contracts, one aggregated cash-flow picture  */
/* ------------------------------------------------------------------ */

export function PortfolioIllustration() {
  const id = 'hx-port'
  const contracts = ['PAM', 'ANN', 'LAM', 'SWAPS', 'STK', 'OPTNS']
  const hub = { x: 238, y: 232 }
  const bars = [46, -24, 68, 38, -18, 92]
  const base = 330
  return (
    <svg viewBox="0 0 600 460" role="img" aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-xl">
      <title id={`${id}-title`}>Six contracts of different types combined into one portfolio and its net cash flow per period</title>
      <Defs id={id} />
      <Grid />

      {/* contracts -> portfolio */}
      {contracts.map((c, i) => {
        const y = 78 + i * 62
        const w = c.length * 9 + 34
        const right = 100 + w / 2
        return (
          <g key={c}>
            <Flow id={id} d={`M${right} ${y} C ${right + 50} ${y}, 200 ${hub.y}, ${hub.x} ${hub.y}`} delay={i * 0.25} width={1.75} />
            <Pop delay={i * 90}>
              <g filter={`url(#${id}-shadow-sm)`}>
                <rect x={100 - w / 2} y={y - 17} width={w} height="34" rx="17" fill="var(--elevated)" stroke="var(--border-color)" />
              </g>
              <circle cx={100 - w / 2 + 15} cy={y} r="4" fill={`url(#${id}-grad)`} />
              <text x={106} y={y + 4.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" fontFamily={FONT_HEAD}>
                {c}
              </text>
            </Pop>
          </g>
        )
      })}

      {/* portfolio */}
      <circle cx={hub.x + 56} cy={hub.y} r="76" fill="var(--grad-to)" opacity="0.06" />
      <Card x={hub.x} y={hub.y - 56} w={112} h={112} id={id} />
      <text x={hub.x + 56} y={hub.y - 4} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" fontFamily={FONT_HEAD}>
        Portfolio
      </text>
      <text x={hub.x + 56} y={hub.y + 16} textAnchor="middle" fontSize="10.5" fill="var(--ink-muted)" fontFamily={FONT_BODY}>
        6 contracts
      </text>

      {/* -> net cash flow per period */}
      <Flow id={id} d={`M${hub.x + 112} ${hub.y} C 365 ${hub.y}, 370 ${hub.y}, 384 ${hub.y}`} width={2} />
      <Card x={384} y={96} w={186} h={272} id={id} />
      <text x="402" y="130" fontSize="12" fontWeight="700" fill="var(--ink)" fontFamily={FONT_HEAD}>
        Net cash flow
      </text>
      <text x="402" y="147" fontSize="10" fill="var(--ink-muted)" fontFamily={FONT_BODY}>
        by period
      </text>
      <line x1="400" x2="556" y1={base} y2={base} stroke="var(--accent-silver)" strokeWidth="1.5" />
      {bars.map((h, i) => (
        <GrowBar key={i} id={id} x={406 + i * 25} base={base} h={Math.abs(h)} w={15} down={h < 0} delay={300 + i * 100} />
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 8. Reporting: one calculation feeds risk, finance and regulation     */
/* ------------------------------------------------------------------ */

export function ReportingIllustration() {
  const id = 'hx-rep'
  const engine = { x: 258, y: 230 }
  const reports = [
    { y: 40, title: 'Liquidity', sub: 'Cash-flow gaps by bucket' },
    { y: 182, title: 'Interest-rate risk', sub: 'Sensitivity to rate shocks' },
    { y: 324, title: 'Balance sheet', sub: 'Valuation and accruals' },
  ]
  return (
    <svg viewBox="0 0 600 460" role="img" aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-xl">
      <title id={`${id}-title`}>One ACTUS calculation feeding liquidity, interest-rate risk and balance-sheet reports</title>
      <Defs id={id} />
      <Grid />

      {/* contract */}
      <Card x={40} y={150} w={150} h={160} id={id} />
      <rect x="60" y="176" width="70" height="9" rx="4.5" fill="var(--grad-from)" />
      {[200, 222, 244].map((y) => (
        <rect key={y} x="60" y={y} width={y === 244 ? 64 : 104} height="6" rx="3" fill="var(--accent-silver)" opacity="0.4" />
      ))}
      <Chip x={92} y={284} label="ACTUS" />
      <circle cx="190" cy="230" r="6" fill={`url(#${id}-grad)`} />

      {/* one calculation */}
      <Flow id={id} d={`M190 230 L${engine.x} ${engine.y}`} width={2} />
      <Node cx={engine.x} cy={engine.y} r={8} id={id} />

      {/* reports */}
      {reports.map((r, i) => (
        <Flow key={`f${r.title}`} id={id} d={`M${engine.x + 8} ${engine.y} C 292 ${engine.y}, 292 ${r.y + 48}, 320 ${r.y + 48}`} delay={i * 0.3} width={2} />
      ))}
      {reports.map((r, i) => (
        <Pop key={r.title} delay={200 + i * 180}>
          <Card x={320} y={r.y} w={250} h={96} id={id} />
          <text x="340" y={r.y + 30} fontSize="12.5" fontWeight="700" fill="var(--ink)" fontFamily={FONT_HEAD}>
            {r.title}
          </text>
          <text x="340" y={r.y + 46} fontSize="10" fill="var(--ink-muted)" fontFamily={FONT_BODY}>
            {r.sub}
          </text>
          <Check cx={544} cy={r.y + 48} id={id} />
        </Pop>
      ))}

      {/* mini visuals, one per report */}
      {[10, 16, 8, 20, 14].map((h, i) => (
        <GrowBar key={`l${i}`} id={id} x={340 + i * 16} base={reports[0].y + 82} h={h} w={10} delay={500 + i * 80} />
      ))}
      <Flow
        id={id}
        d={`M340 ${reports[1].y + 80} C 380 ${reports[1].y + 80}, 400 ${reports[1].y + 60}, 450 ${reports[1].y + 62}`}
        width={2}
      />
      <rect className="hero-bar-x" style={{ animationDelay: '900ms' }} x="340" y={reports[2].y + 60} width="110" height="8" rx="4" fill={`url(#${id}-grad)`} />
      <rect
        className="hero-bar-x"
        style={{ animationDelay: '1000ms' }}
        x="340"
        y={reports[2].y + 74}
        width="84"
        height="8"
        rx="4"
        fill="var(--accent-silver)"
        opacity="0.7"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 9. Same results: two systems, one contract, identical cash flows     */
/* ------------------------------------------------------------------ */

export function ConsistencyIllustration() {
  const id = 'hx-same'
  const systems = [
    { x: 40, title: 'System A', sub: 'Bank' },
    { x: 340, title: 'System B', sub: 'Regulator' },
  ]
  const bars = [34, 58, 42, 76, 52]
  const base = 350
  return (
    <svg viewBox="0 0 600 460" role="img" aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-xl">
      <title id={`${id}-title`}>The same ACTUS contract computed by two different systems gives identical cash flows</title>
      <Defs id={id} />
      <Grid />

      {/* one contract */}
      <Card x={236} y={30} w={128} h={84} id={id} />
      <rect x="254" y="52" width="56" height="8" rx="4" fill="var(--grad-from)" />
      <rect x="254" y="68" width="90" height="6" rx="3" fill="var(--accent-silver)" opacity="0.4" />
      <Chip x={278} y={95} label="PAM" />

      {/* to both systems */}
      <Flow id={id} d="M300 114 C 300 150, 150 150, 150 186" width={2} />
      <Flow id={id} d="M300 114 C 300 150, 450 150, 450 186" delay={0.3} width={2} />

      {systems.map((s) => (
        <g key={s.title}>
          <Card x={s.x} y={186} w={220} h={196} id={id} />
          <text x={s.x + 20} y="216" fontSize="12.5" fontWeight="700" fill="var(--ink)" fontFamily={FONT_HEAD}>
            {s.title}
          </text>
          <text x={s.x + 20} y="232" fontSize="10" fill="var(--ink-muted)" fontFamily={FONT_BODY}>
            {s.sub}
          </text>
          <line x1={s.x + 20} x2={s.x + 200} y1={base} y2={base} stroke="var(--accent-silver)" strokeWidth="1.5" />
          {bars.map((h, i) => (
            <GrowBar key={i} id={id} x={s.x + 30 + i * 36} base={base} h={h} w={20} delay={300 + i * 100} />
          ))}
        </g>
      ))}

      {/* identical */}
      <Pop delay={900}>
        <circle cx="300" cy="284" r="30" fill="var(--grad-to)" opacity="0.12" />
        <circle cx="300" cy="284" r="20" fill="var(--grad-from)" />
        <text x="300" y="291" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--on-brand)" fontFamily={FONT_HEAD}>
          =
        </text>
      </Pop>
      <Pop delay={1050}>
        <Chip x={300} y={420} label="Identical cash flows" />
      </Pop>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* 10. Tokenized contracts: ACTUS logic carried onto a ledger           */
/* ------------------------------------------------------------------ */

export function TokenizedIllustration() {
  const id = 'hx-token'
  const coin = { x: 300, y: 230 }
  const blocks = [
    { x: 366, n: '#1201', ev: 'IP' },
    { x: 436, n: '#1202', ev: 'PR' },
    { x: 506, n: '#1203', ev: 'MD' },
  ]
  return (
    <svg viewBox="0 0 600 460" role="img" aria-labelledby={`${id}-title`} className="mx-auto w-full max-w-xl">
      <title id={`${id}-title`}>An ACTUS contract issued as a token whose interest, principal and maturity events settle in ledger blocks</title>
      <Defs id={id} />
      <Grid />

      {/* contract */}
      <Card x={40} y={140} w={150} h={180} id={id} />
      <rect x="60" y="166" width="70" height="9" rx="4.5" fill="var(--grad-from)" />
      {[190, 212, 234, 256].map((y) => (
        <rect key={y} x="60" y={y} width={y === 256 ? 60 : 104} height="6" rx="3" fill="var(--accent-silver)" opacity="0.4" />
      ))}
      <Chip x={92} y={294} label="ACTUS" />
      <circle cx="190" cy="230" r="6" fill={`url(#${id}-grad)`} />

      {/* contract -> token */}
      <Flow id={id} d={`M190 230 C 230 230, 240 230, ${coin.x - 40} ${coin.y}`} width={2} />
      <Pop delay={150}>
        <circle cx={coin.x} cy={coin.y} r="56" fill="var(--grad-to)" opacity="0.08" />
        <circle cx={coin.x} cy={coin.y} r="40" fill={`url(#${id}-grad-v)`} />
        <circle cx={coin.x} cy={coin.y} r="30" fill="none" stroke="var(--on-brand)" strokeWidth="1.5" opacity="0.5" />
        <text x={coin.x} y={coin.y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--on-brand)" fontFamily={FONT_HEAD}>
          TKN
        </text>
      </Pop>
      <Pop delay={300}>
        <Chip x={coin.x} y={154} label="Smart contract" />
      </Pop>

      {/* token -> ledger */}
      <Flow id={id} d={`M${coin.x + 40} ${coin.y} C 352 ${coin.y}, 356 ${coin.y}, 366 ${coin.y}`} width={2} />
      <text x="464" y="184" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-muted)" fontFamily={FONT_HEAD}>
        Ledger
      </text>
      {blocks.slice(1).map((b) => (
        <line key={`l${b.x}`} x1={b.x - 14} x2={b.x} y1={coin.y} y2={coin.y} stroke={`url(#${id}-grad)`} strokeWidth="2.5" />
      ))}
      {blocks.map((b, i) => (
        <Pop key={b.n} delay={450 + i * 150}>
          <g filter={`url(#${id}-shadow-sm)`}>
            <rect x={b.x} y={coin.y - 28} width="56" height="56" rx="10" fill="var(--elevated)" stroke="var(--border-color)" />
          </g>
          <rect x={b.x} y={coin.y - 28} width="56" height="4" rx="2" fill={`url(#${id}-grad)`} />
          <rect x={b.x + 12} y={coin.y - 10} width="32" height="5" rx="2.5" fill="var(--accent-silver)" opacity="0.5" />
          <rect x={b.x + 12} y={coin.y + 2} width="22" height="5" rx="2.5" fill="var(--accent-silver)" opacity="0.35" />
          <text x={b.x + 28} y={coin.y + 50} textAnchor="middle" fontSize="10" fill="var(--ink-muted)" fontFamily={FONT_MONO}>
            {b.n}
          </text>
          <Chip x={b.x + 28} y={coin.y + 90} label={b.ev} />
        </Pop>
      ))}
    </svg>
  )
}
