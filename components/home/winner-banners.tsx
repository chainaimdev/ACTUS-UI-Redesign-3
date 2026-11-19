/**
 * MOCK product-screenshot banners for the winners carousel.
 *
 * Drawn as SVG so they follow the active theme's colours. All figures, IDs and
 * labels are sample values for illustration only. Replace any banner with a real
 * image by setting `image` on the winner in data/showcase.ts.
 *
 * Composition: the app window sits top-right; the lower-left area is kept calm
 * so the slide's text overlay stays readable.
 */

export type WinnerBannerId = 'loan' | 'bond' | 'registry' | 'risk'

const FONT = { fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif' }
const INK = { fill: 'var(--ink)' }
const MUTED = { fill: 'var(--ink-muted)' }

/* ---------- Shared frame: backdrop + app window ---------- */

function Frame({
  uid,
  title,
  tag,
  label,
  children,
}: {
  uid: string
  title: string
  tag: string
  label: string
  children: React.ReactNode
}) {
  const bg = `${uid}-bg`
  const glow = `${uid}-glow`
  const shadow = `${uid}-shadow`
  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMaxYMin slice"
      className="h-full w-full"
      role="img"
      aria-label={label}
      style={FONT}
    >
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: 'var(--footer-bg)' }} />
          <stop offset="100%" style={{ stopColor: 'var(--grad-from)' }} />
        </linearGradient>
        <radialGradient id={glow} cx="0.78" cy="0.15" r="0.55">
          <stop offset="0%" style={{ stopColor: 'var(--grad-to)', stopOpacity: 0.45 }} />
          <stop offset="100%" style={{ stopColor: 'var(--grad-to)', stopOpacity: 0 }} />
        </radialGradient>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="24" stdDeviation="24" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>

      <rect width="1200" height="520" fill={`url(#${bg})`} />
      <rect width="1200" height="520" fill={`url(#${glow})`} />

      {/* ACTUS tile motif, faint, upper left */}
      {[
        [40, 40], [84, 40], [128, 40], [84, 84], [128, 84], [172, 84], [128, 128], [216, 40], [40, 128],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="36" height="36" rx="7" fill="#fff" fillOpacity="0.05" />
      ))}

      {/* App window (right side; the left side stays clear for the text overlay) */}
      <g transform="translate(560 44)" filter={`url(#${shadow})`}>
        <rect width="600" height="432" rx="18" style={{ fill: 'var(--elevated)' }} />
        <rect width="600" height="52" rx="18" style={{ fill: 'var(--surface)' }} />
        <rect y="34" width="600" height="18" style={{ fill: 'var(--surface)' }} />
        <line x1="0" y1="52" x2="600" y2="52" style={{ stroke: 'var(--border-color)' }} />
        {[22, 42, 62].map((cx, i) => (
          <circle key={cx} cx={cx} cy="26" r="5.5" fill={['#ff5f57', '#febc2e', '#28c840'][i]} />
        ))}
        <text x="88" y="31" fontSize="14" fontWeight="600" style={INK}>
          {title}
        </text>
        <rect x={528 - tag.length * 7} y="15" width={tag.length * 7 + 48} height="22" rx="11" style={{ fill: 'var(--grad-via)' }} />
        <text x={552 - tag.length * 3.5} y="30.5" fontSize="11.5" fontWeight="700" textAnchor="middle" style={{ fill: 'var(--on-brand)' }}>
          {tag}
        </text>
        {/* content is laid out on a 604-wide grid, scaled to fit the 600-wide window */}
        <g transform="translate(26 74) scale(0.905)">{children}</g>
      </g>
    </svg>
  )
}

function Kpi({ x, label, value, w = 186 }: { x: number; label: string; value: string; w?: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect width={w} height="62" rx="12" style={{ fill: 'var(--surface)', stroke: 'var(--border-color)' }} />
      <text x="16" y="24" fontSize="12" style={MUTED}>
        {label}
      </text>
      <text x="16" y="48" fontSize="19" fontWeight="700" style={INK}>
        {value}
      </text>
    </g>
  )
}

/* ---------- 1. Loan cash-flow engine ---------- */

function LoanBanner({ uid }: { uid: string }) {
  const principal = [38, 44, 50, 56, 62, 68, 74, 80, 86, 92, 98, 104]
  return (
    <Frame uid={uid} title="Payment schedule · Amortising loan" tag="ANN" label="Mock dashboard: loan payment schedule">
      <Kpi x={0} label="Notional" value="250,000 USD" />
      <Kpi x={202} label="Interest rate" value="5.25 %" />
      <Kpi x={404} label="Term" value="60 months" />

      <text x="0" y="98" fontSize="13" fontWeight="600" style={INK}>
        Monthly payments
      </text>
      <rect x="430" y="88" width="10" height="10" rx="2" style={{ fill: 'var(--grad-via)' }} />
      <text x="446" y="97" fontSize="11" style={MUTED}>Principal</text>
      <rect x="508" y="88" width="10" height="10" rx="2" style={{ fill: 'var(--grad-to)', opacity: 0.45 }} />
      <text x="524" y="97" fontSize="11" style={MUTED}>Interest</text>
      {principal.map((p, i) => {
        const x = i * 50
        const total = 132
        return (
          <g key={i}>
            <rect x={x} y={250 - total} width="32" height={total - p} rx="4" style={{ fill: 'var(--grad-to)', opacity: 0.45 }} />
            <rect x={x} y={250 - p} width="32" height={p} rx="4" style={{ fill: 'var(--grad-via)' }} />
          </g>
        )
      })}
      <line x1="0" y1="252" x2="604" y2="252" style={{ stroke: 'var(--border-color)' }} />

      {[
        ['15 Jan 2027', 'Payment #13', '4,746.38'],
        ['15 Feb 2027', 'Payment #14', '4,746.38'],
      ].map(([d, n, a], i) => (
        <g key={d} transform={`translate(0 ${276 + i * 34})`}>
          <text x="0" y="0" fontSize="13" style={INK}>{d}</text>
          <text x="180" y="0" fontSize="13" style={MUTED}>{n}</text>
          <text x="604" y="0" fontSize="13" fontWeight="700" textAnchor="end" style={INK}>{a}</text>
          {i === 0 && <line x1="0" y1="14" x2="604" y2="14" style={{ stroke: 'var(--border-color)' }} />}
        </g>
      ))}
    </Frame>
  )
}

/* ---------- 2. Bond analytics dashboard ---------- */

function BondBanner({ uid }: { uid: string }) {
  const pts = [
    [0, 120], [40, 112], [80, 116], [120, 98], [160, 104], [200, 86], [240, 90], [280, 70], [320, 76], [360, 52],
  ]
  const line = pts.map(([x, y]) => `${x},${y + 96}`).join(' ')
  const area = `0,${96 + 150} ${line} 360,${96 + 150}`
  return (
    <Frame uid={uid} title="Portfolio · Fixed income" tag="PAM" label="Mock dashboard: bond portfolio analytics">
      <Kpi x={0} label="Market value" value="48.2M USD" />
      <Kpi x={202} label="Yield to maturity" value="4.18 %" />
      <Kpi x={404} label="Duration" value="6.4 yrs" />

      <text x="0" y="98" fontSize="13" fontWeight="600" style={INK}>Projected coupon income</text>
      <polygon points={area} style={{ fill: 'var(--grad-to)', opacity: 0.18 }} />
      <polyline points={line} fill="none" strokeWidth="3" strokeLinejoin="round" style={{ stroke: 'var(--grad-via)' }} />
      {pts.filter((_, i) => i % 3 === 0).map(([x, y]) => (
        <circle key={x} cx={x} cy={y + 96} r="4.5" style={{ fill: 'var(--elevated)', stroke: 'var(--grad-via)' }} strokeWidth="2.5" />
      ))}
      <line x1="0" y1="246" x2="360" y2="246" style={{ stroke: 'var(--border-color)' }} />

      <text x="392" y="98" fontSize="13" fontWeight="600" style={INK}>Holdings</text>
      {[
        ['UST 2031', '12.4M'],
        ['Bund 2033', '9.8M'],
        ['Corp A 2029', '7.1M'],
        ['Muni 2035', '5.6M'],
      ].map(([n, v], i) => (
        <g key={n} transform={`translate(392 ${118 + i * 32})`}>
          <rect width="212" height="26" rx="6" style={{ fill: 'var(--surface)' }} />
          <text x="10" y="17.5" fontSize="12" style={INK}>{n}</text>
          <text x="202" y="17.5" fontSize="12" fontWeight="700" textAnchor="end" style={INK}>{v}</text>
        </g>
      ))}

      <text x="0" y="282" fontSize="12" style={MUTED}>Maturity ladder</text>
      {[28, 46, 64, 52, 38, 58, 30, 22, 40, 34].map((h, i) => (
        <rect key={i} x={i * 60} y={330 - h} width="44" height={h} rx="4" style={{ fill: 'var(--grad-via)', opacity: 0.35 + (i % 3) * 0.2 }} />
      ))}
    </Frame>
  )
}

/* ---------- 3. Tokenised contract registry ---------- */

function RegistryBanner({ uid }: { uid: string }) {
  const rows = [
    ['0x4f2a…91c3', 'PAM', '1,000,000', 'Verified'],
    ['0x9b17…e40d', 'ANN', '250,000', 'Verified'],
    ['0x31cc…7a52', 'SWAPS', '5,000,000', 'Pending'],
    ['0xd08e…1f6b', 'LAM', '780,000', 'Verified'],
    ['0x6a45…c2e9', 'PAM', '2,400,000', 'Verified'],
  ]
  return (
    <Frame uid={uid} title="Contract registry · On-chain" tag="ACTUS" label="Mock dashboard: tokenised contract registry">
      <rect width="604" height="40" rx="10" style={{ fill: 'var(--surface)', stroke: 'var(--border-color)' }} />
      <circle cx="22" cy="20" r="6" fill="none" strokeWidth="2" style={{ stroke: 'var(--ink-muted)' }} />
      <line x1="26.5" y1="24.5" x2="31" y2="29" strokeWidth="2" style={{ stroke: 'var(--ink-muted)' }} />
      <text x="44" y="25" fontSize="13" style={MUTED}>Search contracts by token, type or counterparty…</text>

      {['Token', 'Contract type', 'Notional', 'Status'].map((h, i) => (
        <text key={h} x={[0, 200, 340, 500][i]} y="76" fontSize="11.5" fontWeight="700" letterSpacing="0.6" style={MUTED}>
          {h.toUpperCase()}
        </text>
      ))}
      <line x1="0" y1="88" x2="604" y2="88" style={{ stroke: 'var(--border-color)' }} />
      {rows.map(([t, type, n, s], i) => {
        const y = 118 + i * 46
        const ok = s === 'Verified'
        return (
          <g key={t}>
            <text x="0" y={y} fontSize="13.5" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" style={INK}>{t}</text>
            <rect x="200" y={y - 16} width={type.length * 9 + 22} height="24" rx="12" style={{ fill: 'var(--grad-via)', opacity: 0.14 }} />
            <text x={211} y={y} fontSize="12" fontWeight="700" style={{ fill: 'var(--grad-via)' }}>{type}</text>
            <text x="340" y={y} fontSize="13.5" style={INK}>{n}</text>
            <circle cx="506" cy={y - 4.5} r="4.5" style={{ fill: ok ? 'var(--grad-to)' : 'var(--accent-silver)' }} />
            <text x="518" y={y} fontSize="13" style={ok ? INK : MUTED}>{s}</text>
            {i < rows.length - 1 && <line x1="0" y1={y + 18} x2="604" y2={y + 18} style={{ stroke: 'var(--border-color)' }} />}
          </g>
        )
      })}
    </Frame>
  )
}

/* ---------- 4. Scenario risk simulator ---------- */

function RiskBanner({ uid }: { uid: string }) {
  const grid = [
    [0.1, 0.15, 0.2, 0.3, 0.35, 0.45, 0.5, 0.55],
    [0.15, 0.2, 0.3, 0.4, 0.5, 0.55, 0.65, 0.7],
    [0.2, 0.3, 0.4, 0.55, 0.65, 0.72, 0.8, 0.85],
    [0.3, 0.4, 0.55, 0.65, 0.78, 0.85, 0.9, 0.95],
    [0.35, 0.5, 0.62, 0.75, 0.86, 0.92, 0.97, 1],
  ]
  const tenors = ['1Y', '2Y', '5Y', '10Y', '30Y']
  return (
    <Frame uid={uid} title="Scenario analysis · Rate shocks" tag="RISK" label="Mock dashboard: interest-rate scenario risk">
      {['+100 bp', '−50 bp', 'Steepener', 'Flattener'].map((c, i) => {
        const active = i === 0
        const w = c.length * 8 + 28
        const x = [0, 96, 186, 290][i]
        return (
          <g key={c} transform={`translate(${x} 0)`}>
            <rect width={w} height="30" rx="15" style={active ? { fill: 'var(--grad-via)' } : { fill: 'var(--surface)', stroke: 'var(--border-color)' }} />
            <text x={w / 2} y="20" fontSize="12.5" fontWeight="600" textAnchor="middle" style={active ? { fill: 'var(--on-brand)' } : INK}>
              {c}
            </text>
          </g>
        )
      })}

      <text x="0" y="64" fontSize="13" fontWeight="600" style={INK}>Value change by tenor</text>
      {grid.map((row, r) =>
        row.map((v, c) => (
          <rect
            key={`${r}-${c}`}
            x={44 + c * 38}
            y={80 + r * 36}
            width="34"
            height="32"
            rx="5"
            style={{ fill: v > 0.8 ? 'var(--destructive)' : 'var(--grad-to)', opacity: v > 0.8 ? 0.35 + (v - 0.8) * 3 : 0.15 + v * 0.75 }}
          />
        )),
      )}
      {tenors.map((t, i) => (
        <text key={t} x="0" y={101 + i * 36} fontSize="12" style={MUTED}>{t}</text>
      ))}

      {/* Fan chart */}
      <text x="372" y="64" fontSize="13" fontWeight="600" style={INK}>Projected P&amp;L</text>
      <polygon points="372,190 604,96 604,284" style={{ fill: 'var(--grad-to)', opacity: 0.12 }} />
      <polygon points="372,190 604,126 604,254" style={{ fill: 'var(--grad-to)', opacity: 0.2 }} />
      <polygon points="372,190 604,158 604,222" style={{ fill: 'var(--grad-to)', opacity: 0.32 }} />
      <polyline points="372,190 430,186 488,178 546,182 604,170" fill="none" strokeWidth="3" style={{ stroke: 'var(--grad-via)' }} />

      <g transform="translate(0 270)">
        <Kpi x={0} label="VaR (99%)" value="1.84M USD" w={290} />
        <Kpi x={314} label="Expected loss" value="0.42M USD" w={290} />
      </g>
    </Frame>
  )
}

export function WinnerBanner({ banner, uid }: { banner: WinnerBannerId; uid: string }) {
  switch (banner) {
    case 'loan':
      return <LoanBanner uid={uid} />
    case 'bond':
      return <BondBanner uid={uid} />
    case 'registry':
      return <RegistryBanner uid={uid} />
    case 'risk':
      return <RiskBanner uid={uid} />
  }
}
