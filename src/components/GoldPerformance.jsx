import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Illustrative Jahreswerte in EUR/Unze — langfristiger Trend.
const goldData = [
  { year: 2000, value: 290 }, { year: 2003, value: 330 }, { year: 2006, value: 480 },
  { year: 2009, value: 760 }, { year: 2011, value: 1180 }, { year: 2013, value: 880 },
  { year: 2016, value: 1080 }, { year: 2019, value: 1350 }, { year: 2021, value: 1580 },
  { year: 2023, value: 1880 }, { year: 2025, value: 2550 },
]
const silverData = [
  { year: 2000, value: 5 }, { year: 2003, value: 6 }, { year: 2006, value: 10 },
  { year: 2009, value: 13 }, { year: 2011, value: 28 }, { year: 2013, value: 18 },
  { year: 2016, value: 16 }, { year: 2019, value: 14 }, { year: 2021, value: 22 },
  { year: 2023, value: 21 }, { year: 2025, value: 30 },
]

const W = 760
const H = 300
const PAD = { top: 24, right: 82, bottom: 30, left: 14 }
const Y_MAX = 900 // Prozent
const GOLD_BASE = goldData[0].value
const SILVER_BASE = silverData[0].value

const minYear = goldData[0].year
const maxYear = goldData[goldData.length - 1].year
const plotW = W - PAD.left - PAD.right
const plotH = H - PAD.top - PAD.bottom

const x = (year) => PAD.left + ((year - minYear) / (maxYear - minYear)) * plotW
const yP = (pct) => PAD.top + (1 - pct / Y_MAX) * plotH
const toPts = (arr, base) => arr.map((d) => ({ x: x(d.year), y: yP((d.value / base - 1) * 100), eur: d.value, year: d.year }))

const goldPoints = toPts(goldData, GOLD_BASE)
const silverPoints = toPts(silverData, SILVER_BASE)

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

const goldLinePath = smoothPath(goldPoints)
const silverLinePath = smoothPath(silverPoints)
const goldAreaPath = `${goldLinePath} L ${goldPoints[goldPoints.length - 1].x.toFixed(1)} ${(H - PAD.bottom).toFixed(1)} L ${goldPoints[0].x.toFixed(1)} ${(H - PAD.bottom).toFixed(1)} Z`

const gain = Math.round((goldData[goldData.length - 1].value / GOLD_BASE - 1) * 100)
const silverGain = Math.round((silverData[silverData.length - 1].value / SILVER_BASE - 1) * 100)
const gridPcts = [300, 600, 900]
const goldLast = goldPoints[goldPoints.length - 1]
const silverLast = silverPoints[silverPoints.length - 1]
const DASH = 1400
const cashValue = 65
const goldValue = Math.round(100 * (1 + gain / 100)) // 100 € in Gold seit 2000

function CompareBar({ label, valueText, pct, gold, delay }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium">{label}</span>
        <span className={`text-sm font-semibold tabular-nums ${gold ? 'text-primary' : 'text-foreground'}`}>{valueText}</span>
      </div>
      <div className="relative h-3 rounded-full bg-secondary overflow-hidden ring-1 ring-inset ring-border/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
        <div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
          style={{
            width: inView ? `${pct}%` : '0%',
            transition: `width 1.8s cubic-bezier(0.33, 1, 0.68, 1) ${delay}s`,
            background: gold
              ? 'linear-gradient(90deg, #B0832F, #E7C36C, #F6DD93)'
              : 'linear-gradient(90deg, hsl(var(--muted-foreground) / 0.5), hsl(var(--muted-foreground) / 0.85))',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-[45%] rounded-t-full" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)' }} />
        </div>
      </div>
    </div>
  )
}

function useCountUp(target, active, duration = 1500) {
  const [n, setN] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return n
}

export default function GoldPerformance() {
  const chartRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [hover, setHover] = useState(null)
  const [coarse] = useState(() => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)

  const goldPctN = useCountUp(gain, inView)
  const yearsN = useCountUp(5000, inView)

  useEffect(() => {
    const el = chartRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function handleMove(e) {
    if (coarse) return
    const rect = chartRef.current.getBoundingClientRect()
    const relX = ((e.clientX - rect.left) / rect.width) * W
    let best = 0
    let bestD = Infinity
    for (let i = 0; i < goldPoints.length; i++) {
      const dist = Math.abs(goldPoints[i].x - relX)
      if (dist < bestD) { bestD = dist; best = i }
    }
    setHover(best)
  }

  const drawGold = { strokeDasharray: DASH, strokeDashoffset: inView ? 0 : DASH, transition: 'stroke-dashoffset 2.1s cubic-bezier(0.33, 1, 0.68, 1)' }
  const drawSilver = { strokeDasharray: DASH, strokeDashoffset: inView ? 0 : DASH, transition: 'stroke-dashoffset 2.1s cubic-bezier(0.33, 1, 0.68, 1) 0.25s' }

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
              Während Papiergeld an Kaufkraft verliert, haben Gold und Silber über Jahrzehnte real an
              Wert gewonnen. Kein Versprechen, sondern ein historischer Trend.
            </p>

            <div className="flex gap-8">
              <div>
                <div className="font-serif text-4xl sm:text-5xl font-semibold text-primary tabular-nums leading-none">
                  +{goldPctN}%
                </div>
                <div className="text-muted-foreground text-sm mt-2">Gold in Euro, seit {minYear}</div>
              </div>
              <div>
                <div className="font-serif text-4xl sm:text-5xl font-semibold tabular-nums leading-none">
                  {yearsN.toLocaleString('de-DE')}+
                </div>
                <div className="text-muted-foreground text-sm mt-2">Jahre als Wertspeicher</div>
              </div>
            </div>

            {/* Vergleich: 100 € als Bargeld vs. in Gold (seit 2000) */}
            <div className="mt-10 max-w-sm">
              <p className="text-sm text-muted-foreground mb-4">Aus <span className="text-foreground font-medium">100 €</span> im Jahr {minYear} wurden …</p>
              <div className="space-y-5">
                <CompareBar
                  label="Als Bargeld gehalten"
                  valueText="≈ 65 €"
                  pct={Math.round((cashValue / goldValue) * 100)}
                  gold={false}
                  delay={0.2}
                />
                <CompareBar
                  label="In Gold angelegt"
                  valueText={`≈ ${goldValue.toLocaleString('de-DE')} €`}
                  pct={100}
                  gold
                  delay={0.38}
                />
              </div>
              <p className="text-xs text-muted-foreground/70 mt-4 leading-relaxed">
                Bargeld verliert durch Inflation an Kaufkraft. Gold hat real zugelegt. Werte illustrativ.
              </p>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_-18px_rgba(0,0,0,0.12)] p-5 sm:p-7"
          >
            {/* Legende */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-[3px] rounded-full" style={{ background: '#D4A94E' }} />Gold</span>
                <span className="flex items-center gap-1.5"><span className="w-3.5 h-[3px] rounded-full" style={{ background: '#B7BFC9' }} />Silber</span>
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">Wachstum seit {minYear} · in %</span>
            </div>

            <svg
              ref={chartRef}
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto overflow-visible"
              role="img"
              aria-label={`Wertentwicklung Gold (+${gain}%) und Silber (+${silverGain}%) seit ${minYear}`}
              onMouseMove={handleMove}
              onMouseLeave={() => setHover(null)}
            >
              <defs>
                <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.30" />
                  <stop offset="55%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#B0832F" />
                  <stop offset="55%" stopColor="#E7C36C" />
                  <stop offset="100%" stopColor="#F6DD93" />
                </linearGradient>
                <filter id="lineGlow" x="-20%" y="-60%" width="140%" height="220%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              {/* Gridlines + y labels (%) */}
              {gridPcts.map((g) => (
                <g key={g}>
                  <line x1={PAD.left} x2={W - PAD.right} y1={yP(g)} y2={yP(g)} stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 7" opacity="0.7" />
                  <text x={PAD.left + 2} y={yP(g) - 7} fontSize="19" fill="hsl(var(--muted-foreground))" fillOpacity="0.8" className="tabular-nums">+{g} %</text>
                </g>
              ))}

              {/* Gold-Fläche */}
              <path d={goldAreaPath} fill="url(#goldArea)" style={{ opacity: inView ? 1 : 0, transition: 'opacity 1.4s ease 0.3s' }} />

              {/* Silber-Linie */}
              <path d={silverLinePath} fill="none" stroke="#B7BFC9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={drawSilver} />

              {/* Gold: Glow + Linie */}
              <path d={goldLinePath} fill="none" stroke="url(#goldLine)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#lineGlow)" opacity="0.45" style={drawGold} />
              <path d={goldLinePath} fill="none" stroke="url(#goldLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={drawGold} />

              {/* End-Punkte + Endwerte rechts daneben */}
              <g style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 1.9s' }}>
                <circle cx={goldLast.x} cy={goldLast.y} r="9" fill="hsl(var(--primary))" opacity="0.25" filter="url(#lineGlow)" />
                <circle cx={goldLast.x} cy={goldLast.y} r="5.5" fill="#F6DD93" stroke="hsl(var(--card))" strokeWidth="2.5" />
                <circle cx={silverLast.x} cy={silverLast.y} r="4.5" fill="#C3CAD4" stroke="hsl(var(--card))" strokeWidth="2" />
                <text x={goldLast.x + 12} y={goldLast.y + 6} fontSize="21" fontWeight="700" textAnchor="start" fill="hsl(var(--primary))" className="tabular-nums">+{gain} %</text>
                <text x={silverLast.x + 12} y={silverLast.y + 6} fontSize="19" fontWeight="600" textAnchor="start" fill="#9aa3ad" className="tabular-nums">+{silverGain} %</text>
              </g>

              {/* Hover-Tooltip (Desktop) */}
              {hover != null && (
                <g pointerEvents="none">
                  <line x1={goldPoints[hover].x} x2={goldPoints[hover].x} y1={PAD.top} y2={H - PAD.bottom} stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 4" opacity="0.5" />
                  <circle cx={goldPoints[hover].x} cy={goldPoints[hover].y} r="5" fill="#F6DD93" stroke="hsl(var(--card))" strokeWidth="2" />
                  <circle cx={silverPoints[hover].x} cy={silverPoints[hover].y} r="5" fill="#C3CAD4" stroke="hsl(var(--card))" strokeWidth="2" />
                  {(() => {
                    const tw = 196, th = 100
                    const tx = Math.max(PAD.left, Math.min(goldPoints[hover].x - tw / 2, W - PAD.right - tw))
                    return (
                      <g transform={`translate(${tx}, 6)`}>
                        <rect width={tw} height={th} rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
                        <text x="16" y="30" fontSize="19" fontWeight="600" fill="hsl(var(--foreground))" className="tabular-nums">{goldData[hover].year}</text>
                        <text x="16" y="58" fontSize="17" fill="hsl(var(--muted-foreground))">Gold <tspan fontWeight="600" fill="hsl(var(--foreground))" className="tabular-nums">{goldData[hover].value.toLocaleString('de-DE')} €</tspan></text>
                        <text x="16" y="84" fontSize="17" fill="hsl(var(--muted-foreground))">Silber <tspan fontWeight="600" fill="hsl(var(--foreground))" className="tabular-nums">{silverData[hover].value.toLocaleString('de-DE')} €</tspan></text>
                      </g>
                    )
                  })()}
                </g>
              )}

              {/* X labels */}
              {goldData.filter((_, i) => i % 3 === 0).map((d) => {
                const isFirst = d.year === minYear
                return (
                  <text key={d.year} x={isFirst ? PAD.left : x(d.year)} y={H - 6} fontSize="19" textAnchor={isFirst ? 'start' : 'middle'} fill="hsl(var(--muted-foreground))" fillOpacity="0.8" className="tabular-nums">
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
