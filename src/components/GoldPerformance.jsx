import { motion } from 'framer-motion'

// Gerundete Jahreswerte Gold in EUR/Unze — illustrativ, langfristiger Trend.
const data = [
  { year: 2000, value: 290 },
  { year: 2003, value: 330 },
  { year: 2006, value: 480 },
  { year: 2009, value: 760 },
  { year: 2011, value: 1180 },
  { year: 2013, value: 880 },
  { year: 2016, value: 1080 },
  { year: 2019, value: 1350 },
  { year: 2021, value: 1580 },
  { year: 2023, value: 1880 },
  { year: 2025, value: 2550 },
]

const W = 760
const H = 300
const PAD = { top: 20, right: 12, bottom: 30, left: 12 }
const Y_MAX = 2800

const minYear = data[0].year
const maxYear = data[data.length - 1].year
const plotW = W - PAD.left - PAD.right
const plotH = H - PAD.top - PAD.bottom

const x = (year) => PAD.left + ((year - minYear) / (maxYear - minYear)) * plotW
const y = (val) => PAD.top + (1 - val / Y_MAX) * plotH

const points = data.map((d) => ({ x: x(d.year), y: y(d.value) }))

// Catmull-Rom → kubische Bézier für eine weiche Kurve
function smoothPath(pts) {
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

const linePath = smoothPath(points)
const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(H - PAD.bottom).toFixed(1)} L ${points[0].x.toFixed(1)} ${(H - PAD.bottom).toFixed(1)} Z`

const gain = Math.round(((data[data.length - 1].value - data[0].value) / data[0].value) * 100)
const gridLines = [700, 1400, 2100, 2800]
const last = points[points.length - 1]

export default function GoldPerformance() {
  return (
    <section id="wertentwicklung" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
          {/* Intro + stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Wertentwicklung</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold mt-4 mb-5 leading-tight">
              Ein Sachwert, der
              <span className="block text-primary">Bestand hat</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Während Papiergeld an Kaufkraft verliert, hat Gold über Jahrzehnte real an Wert gewonnen.
              Kein Versprechen, sondern ein historischer Trend.
            </p>

            <div className="flex gap-8">
              <div>
                <div className="font-serif text-4xl sm:text-5xl font-semibold text-primary tabular-nums leading-none">
                  +{gain}%
                </div>
                <div className="text-muted-foreground text-sm mt-2">Gold in Euro, seit {minYear}</div>
              </div>
              <div>
                <div className="font-serif text-4xl sm:text-5xl font-semibold tabular-nums leading-none">
                  5.000+
                </div>
                <div className="text-muted-foreground text-sm mt-2">Jahre als Wertspeicher</div>
              </div>
            </div>

            {/* Kaufkraft-Kontrast: Euro verliert, Gold gewinnt */}
            <div className="mt-9 max-w-sm">
              <div className="flex items-baseline justify-between text-sm mb-2">
                <span className="text-muted-foreground">Kaufkraft von 100 € seit {minYear}</span>
                <span className="font-medium tabular-nums">≈ 65 €</span>
              </div>
              <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-muted-foreground/45"
                  initial={{ width: '100%' }}
                  whileInView={{ width: '65%' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </div>
              <p className="text-xs text-muted-foreground/70 mt-2 leading-relaxed">
                Der Euro verliert schleichend an Kaufkraft — Gold hat real zugelegt. Werte illustrativ.
              </p>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="rounded-2xl border border-border bg-card shadow-[0_1px_4px_rgba(0,0,0,0.04)] p-5 sm:p-7"
          >
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-sm font-medium">Goldpreis · EUR / Unze</span>
              <span className="text-xs text-muted-foreground tabular-nums">{minYear}–{maxYear}</span>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Goldpreis-Entwicklung ${minYear} bis ${maxYear}`}>
              <defs>
                <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Gridlines + y labels */}
              {gridLines.map((g) => (
                <g key={g}>
                  <line x1={PAD.left} x2={W - PAD.right} y1={y(g)} y2={y(g)} stroke="hsl(var(--border))" strokeWidth="1" />
                  <text x={PAD.left + 2} y={y(g) - 6} fontSize="20" fill="hsl(var(--muted-foreground))" className="tabular-nums">
                    {g.toLocaleString('de-DE')} €
                  </text>
                </g>
              ))}

              {/* Area */}
              <path d={areaPath} fill="url(#goldArea)" />

              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* End marker */}
              <circle cx={last.x} cy={last.y} r="5" fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth="2" />

              {/* X labels */}
              {data.filter((_, i) => i % 3 === 0).map((d) => {
                const isFirst = d.year === minYear
                return (
                  <text
                    key={d.year}
                    x={isFirst ? PAD.left : x(d.year)}
                    y={H - 6}
                    fontSize="20"
                    textAnchor={isFirst ? 'start' : 'middle'}
                    fill="hsl(var(--muted-foreground))"
                    className="tabular-nums"
                  >
                    {d.year}
                  </text>
                )
              })}
            </svg>

            <p className="text-xs text-muted-foreground/70 mt-4 leading-relaxed">
              Gerundete Jahreswerte, illustrativ. Wertentwicklung der Vergangenheit ist kein
              verlässlicher Indikator für die Zukunft.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
