import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { REGISTER_URL } from '../lib/links'
import { openLegal } from '../lib/legal'
import { submitLead } from '../lib/booking'

// Provisionsrechner als Overlay (analog BookingModal/LegalModal). Rechnet mit den
// Farbtokens der Seite, damit Light/Dark und Schriften mitlaufen.
//
// Der Rechner zeigt Vermittler-Konditionen, die nicht für Endkunden gedacht sind.
// Deshalb liegt ein E-Mail-Gate davor. Wer über einen Partner-Link kommt
// (?partner=…), überspringt es — den Link verteilen wir gezielt an Vermittler.
const RATE = 0.025
const UNLOCK_KEY = 'ww_rechner_unlocked'

function readUnlocked() {
  try {
    if (localStorage.getItem(UNLOCK_KEY) === '1') return true
  } catch {
    /* localStorage nicht verfügbar */
  }
  return new URLSearchParams(window.location.search).has('partner')
}

function persistUnlock() {
  try {
    localStorage.setItem(UNLOCK_KEY, '1')
  } catch {
    /* ignore */
  }
}

// GA4-Event (gtag ist in index.html eingebunden), wie in WebinarBar.
function track(name) {
  if (typeof window.gtag === 'function') window.gtag('event', name)
}

const eurFmt = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const numFmt = new Intl.NumberFormat('de-DE')
const eur = (v) => eurFmt.format(Math.round(v)).replace(/\s/g, ' ')

const DEFAULTS = { kunden: 10, wachstum: 3, einmal: 5000, rate: 300, zukauf: 5000, jahre: 3 }

// Monat für Monat: Bestand wächst um die neuen Kunden, jeder Kauf bringt 2,5 %.
function compute({ kunden, wachstum, einmal, rate, zukauf, jahre }) {
  const months = jahre * 12
  const zukaufM = zukauf / 12
  const series = []
  let cumEinmal = 0
  let cumSpar = 0
  let cumZukauf = 0
  let year1 = 0

  for (let m = 1; m <= months; m++) {
    const active = kunden + wachstum * (m - 1)
    const joiners = m === 1 ? kunden : wachstum
    const recurring = active * (rate + zukaufM) * RATE
    const oneOff = joiners * einmal * RATE
    series.push(recurring)
    cumSpar += active * rate * RATE
    cumZukauf += active * zukaufM * RATE
    cumEinmal += oneOff
    if (m <= 12) year1 += recurring + oneOff
  }

  const activeEnd = kunden + wachstum * (months - 1)
  return {
    series,
    cumEinmal,
    cumSpar,
    cumZukauf,
    cumTotal: cumEinmal + cumSpar + cumZukauf,
    year1,
    activeEnd,
    laufendEnd: activeEnd * (rate + zukaufM) * RATE,
  }
}

export default function ProvisionsrechnerModal({ open, onClose }) {
  const [inputs, setInputs] = useState(DEFAULTS)
  const [unlocked, setUnlocked] = useState(readUnlocked)
  const set = (key) => (value) => setInputs((prev) => ({ ...prev, [key]: value }))

  useEffect(() => {
    if (unlocked) persistUnlock()
  }, [unlocked])

  // Body-Scroll sperren + Escape zum Schließen (wie BookingModal).
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const r = useMemo(() => compute(inputs), [inputs])
  const total = r.cumTotal > 0 ? r.cumTotal : 1
  const jahreLabel = inputs.jahre === 1 ? '1 Jahr' : `${inputs.jahre} Jahre`
  const jahreDativ = inputs.jahre === 1 ? '1 Jahr' : `${inputs.jahre} Jahren`

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rechner-title"
            className={`relative w-full ${unlocked ? 'sm:max-w-5xl' : 'sm:max-w-md'} bg-card text-card-foreground border border-border shadow-2xl rounded-t-3xl sm:rounded-3xl max-h-[92dvh] flex flex-col overflow-hidden`}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-border">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary font-medium mb-1">Provisionsrechner</p>
                <h2 id="rechner-title" className="font-serif text-2xl sm:text-3xl leading-tight">
                  Einmal empfehlen.
                  <span className="block text-primary">Immer wieder verdienen.</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Schließen"
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body: erst freischalten, dann rechnen */}
            {!unlocked ? (
              <EmailGate onUnlock={() => setUnlocked(true)} />
            ) : (
            <div className="overflow-y-auto px-6 py-6">
              <p className="text-muted-foreground max-w-[54ch] leading-relaxed">
                Sie empfehlen, wir übernehmen den Rest. Für{' '}
                <span className="text-foreground font-medium">jeden Kauf</span> Ihres Kunden erhalten Sie{' '}
                <span className="text-foreground font-medium">2,5&nbsp;%</span>, ob Einmalkauf, monatlicher
                Sparplan oder späterer Zukauf. Aus einer Empfehlung wird laufende Provision.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-6 lg:gap-8 mt-8 items-start">
                {/* Eingaben */}
                <section className="rounded-2xl border border-border bg-background p-6" aria-label="Eingaben">
                  <Group>Kundenstamm</Group>
                  <Slider
                    label="Vermittelte Kunden heute"
                    display={numFmt.format(inputs.kunden)}
                    min={1}
                    max={300}
                    value={inputs.kunden}
                    onChange={set('kunden')}
                  />
                  <Slider
                    label="Neue Kunden / Monat"
                    display={numFmt.format(inputs.wachstum)}
                    min={0}
                    max={30}
                    value={inputs.wachstum}
                    onChange={set('wachstum')}
                    hint="0 = konstanter Bestand, keine neuen Empfehlungen."
                  />

                  <Group divider>Kaufverhalten je Kunde</Group>
                  <Slider
                    label="Ø Einmalkauf beim Start"
                    display={eur(inputs.einmal)}
                    min={0}
                    max={50000}
                    step={100}
                    value={inputs.einmal}
                    onChange={set('einmal')}
                    hint="Einmalige Anlage zu Beginn (ab 1.000 €). 0 = nur Sparplan."
                  />
                  <Slider
                    label="Ø Sparrate / Monat"
                    display={`${numFmt.format(inputs.rate)} €`}
                    min={0}
                    max={1000}
                    step={100}
                    value={inputs.rate}
                    onChange={set('rate')}
                    hint="Ab 50 €/Monat möglich. Jede Rate ist ein Kauf."
                  />
                  <Slider
                    label="Ø Zukauf pro Jahr"
                    display={eur(inputs.zukauf)}
                    min={0}
                    max={20000}
                    step={100}
                    value={inputs.zukauf}
                    onChange={set('zukauf')}
                    hint="Spätere Nachkäufe, z. B. aus Boni oder Erbschaften."
                  />

                  <Group divider>Zeitraum</Group>
                  <Slider
                    label="Betrachtung"
                    display={jahreLabel}
                    min={1}
                    max={10}
                    value={inputs.jahre}
                    onChange={set('jahre')}
                    last
                  />

                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between gap-3">
                    <span className="text-sm text-muted-foreground">Ihre Vergütung je Kauf</span>
                    <span className="text-base font-bold text-primary tabular-nums">2,5&nbsp;%</span>
                  </div>
                </section>

                {/* Ergebnisse */}
                <div className="flex flex-col gap-4">
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-7">
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-primary" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground/70">
                      Provision gesamt · {jahreLabel}
                    </p>
                    <AnimatedEuro
                      value={r.cumTotal}
                      className="block font-serif font-bold tracking-tight text-primary tabular-nums leading-none mt-3 text-[clamp(2.25rem,6vw,3.75rem)]"
                    />
                    <p className="text-[13px] text-muted-foreground mt-3">
                      Summe aus Einmalkäufen, Sparplänen und Zukäufen
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl border border-border bg-background overflow-hidden">
                    <div className="p-6">
                      <p className="text-[12.5px] text-muted-foreground">Provision im 1. Jahr</p>
                      <AnimatedEuro
                        value={r.year1}
                        className="block font-serif text-2xl sm:text-3xl font-bold tracking-tight tabular-nums leading-none mt-2"
                      />
                      <p className="text-xs text-muted-foreground/70 mt-2">inkl. Einmalkäufe (Sofort-Schub)</p>
                    </div>
                    <div className="p-6 border-t sm:border-t-0 sm:border-l border-border">
                      <p className="text-[12.5px] text-muted-foreground">
                        Laufend / Monat nach {inputs.jahre} J.
                      </p>
                      <AnimatedEuro
                        value={r.laufendEnd}
                        className="block font-serif text-2xl sm:text-3xl font-bold tracking-tight tabular-nums leading-none mt-2"
                      />
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        bei {numFmt.format(r.activeEnd)} aktiven Kunden
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-6">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap mb-3">
                      <span className="text-sm font-semibold tracking-tight">Laufende Provision pro Monat</span>
                      <span className="text-[12.5px] text-muted-foreground">
                        wächst mit Ihrem <span className="text-primary">Bestand</span>
                      </span>
                    </div>
                    <Chart series={r.series} />
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-6">
                    <span className="text-sm font-semibold tracking-tight">
                      Woraus sich Ihre Provision zusammensetzt
                    </span>
                    <div aria-hidden="true" className="flex h-3.5 rounded-full overflow-hidden bg-secondary my-4">
                      <span className="bg-primary/40 transition-[width] duration-300" style={{ width: `${(r.cumEinmal / total) * 100}%` }} />
                      <span className="bg-primary/70 transition-[width] duration-300" style={{ width: `${(r.cumSpar / total) * 100}%` }} />
                      <span className="bg-primary transition-[width] duration-300" style={{ width: `${(r.cumZukauf / total) * 100}%` }} />
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-muted-foreground">
                      <LegendItem dot="bg-primary/40" label="Einmalkäufe" value={r.cumEinmal} />
                      <LegendItem dot="bg-primary/70" label="Sparpläne" value={r.cumSpar} />
                      <LegendItem dot="bg-primary" label="Zukäufe" value={r.cumZukauf} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Abschluss */}
              <div className="mt-6 rounded-2xl bg-[#111014] text-white border border-white/10 p-7 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E2C97E]">
                    Ihr Verdienstpotenzial
                  </p>
                  <p className="font-serif font-bold tracking-tight leading-none mt-2.5">
                    <AnimatedEuro value={r.cumTotal} className="text-[clamp(1.875rem,5vw,2.875rem)]" />{' '}
                    <span className="text-[17px] font-semibold text-white/60">in {jahreDativ}</span>
                  </p>
                  <p className="flex items-start gap-2.5 text-[13.5px] text-white/75 mt-3.5 max-w-[44ch]">
                    <svg className="w-4 h-4 shrink-0 mt-0.5 text-[#E2C97E]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>
                      Ihr Aufwand: <span className="text-white font-medium">ein Empfehlungslink.</span> Kein
                      Zeitaufwand, kein Risiko. Den Rest übernehmen wir.
                    </span>
                  </p>
                </div>
                {/* Ziel wie beim Tippgeber-Button: Registrierung in der Pipeline-App. */}
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all duration-200 w-full sm:w-auto justify-center"
                >
                  Jetzt Partner werden
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <p className="mt-7 pt-5 border-t border-border text-[11.5px] leading-relaxed text-muted-foreground/70">
                Beispielrechnung zur Veranschaulichung, keine Zusage künftiger Erträge. Grundlage: 2,5 % von
                jedem Kauf des Kunden, also Einmalkauf beim Start, jede Sparplan-Monatsrate sowie Zukäufe
                (hier gleichmäßig übers Jahr verteilt). Ohne Berücksichtigung von Kündigungen,
                Ratenänderungen, Preisentwicklung oder Steuern. Provisionsabrechnung transparent über Ihr
                persönliches Dashboard. Abwicklung über Wertentwickler als Handelsvertreter (§84 HGB) und den
                Edelmetallhändler MIDA, Verwahrung bei Secure Swiss Storage AG (Schweiz).
              </p>
            </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// E-Mail-Gate vor dem Rechner. Hält keinen entschlossenen Endkunden ab, bremst aber
// den zufälligen Mitleser und liefert bei echten Interessenten einen Lead.
function EmailGate({ onUnlock }) {
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      await submitLead({ email, quelle: 'provisionsrechner', website: honeypot })
      track('rechner_unlock')
      onUnlock()
    } catch (err) {
      // 422 = Server sagt konkret was falsch ist (z. B. Adresse ungültig).
      setError(
        err?.status === 422
          ? err.message
          : 'Das hat gerade nicht geklappt. Bitte versuchen Sie es noch einmal.',
      )
      setSending(false)
    }
  }

  return (
    <form onSubmit={submit} className="overflow-y-auto px-6 py-6">
      <p className="text-muted-foreground leading-relaxed">
        <span className="text-foreground font-medium">Sie empfehlen einmal, wir zahlen dauerhaft.</span>{' '}
        Jeder Kauf Ihres Mandanten bringt Ihnen Provision, auch der zehnte Sparplanmonat und jeder
        Zukauf danach. Sehen Sie, was das bei Ihrem Bestand ergibt.
      </p>

      <label className="block mt-6">
        <span className="block text-sm text-muted-foreground mb-1.5">Ihre E-Mail-Adresse</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@kanzlei.de"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
        />
      </label>

      {/* Honeypot — für Menschen unsichtbar */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

      {error ? (
        <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="mt-5 w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium shadow-[0_2px_16px_-2px_hsl(var(--primary)/0.35)] hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? 'Einen Moment …' : 'Rechner öffnen'}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground/70">
        Ihre Adresse nutzen wir nur, um mit Ihnen über eine Partnerschaft zu sprechen. Kein
        Newsletter, keine Weitergabe an Dritte. Näheres in der{' '}
        <button
          type="button"
          onClick={() => openLegal('datenschutz')}
          className="underline hover:text-foreground transition-colors"
        >
          Datenschutzerklärung
        </button>
        .
      </p>
    </form>
  )
}

function Group({ children, divider }) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground/70 mb-5 ${
        divider ? 'mt-7 pt-6 border-t border-border' : ''
      }`}
    >
      {children}
    </p>
  )
}

function Slider({ label, display, hint, value, min, max, step = 1, onChange, last }) {
  const id = useId()
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div className={last ? '' : 'mb-6'}>
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <label htmlFor={id} className="text-[15px] font-medium">{label}</label>
        <span className="text-base font-bold tabular-nums whitespace-nowrap">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-gold"
        style={{ '--fill': `${fill}%` }}
      />
      {hint ? <p className="text-xs text-muted-foreground/70 mt-2">{hint}</p> : null}
    </div>
  )
}

function LegendItem({ dot, label, value }) {
  return (
    <span className="inline-flex items-center gap-2">
      <i aria-hidden="true" className={`w-2.5 h-2.5 rounded-sm shrink-0 ${dot}`} />
      {label} <b className="text-foreground tabular-nums font-semibold">{eur(value)}</b>
    </span>
  )
}

// Zählt den Wert weich hoch, ohne den Rest des Rechners neu zu rendern.
function AnimatedEuro({ value, className }) {
  const [display, setDisplay] = useState(0)
  const current = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      current.current = value
      setDisplay(value)
      return
    }
    let raf = 0
    const tick = () => {
      const delta = value - current.current
      if (Math.abs(delta) > Math.max(1, Math.abs(value) * 0.003)) {
        current.current += delta * 0.16
        setDisplay(current.current)
        raf = requestAnimationFrame(tick)
      } else {
        current.current = value
        setDisplay(value)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return <span className={className}>{eur(display)}</span>
}

const CHART = { w: 640, h: 210, padL: 58, padR: 16, padT: 14, padB: 24 }
const GRADIENT_ID = 'rechner-chart-fill'

function Chart({ series }) {
  const { grid, area, line, ticks, endX, endY } = useMemo(() => {
    const { w, h, padL, padR, padT, padB } = CHART
    const innerW = w - padL - padR
    const innerH = h - padT - padB

    let maxV = 0
    for (const v of series) if (v > maxV) maxV = v
    if (maxV <= 0) maxV = 1
    const step = 10 ** Math.floor(Math.log10(maxV))
    const niceMax = Math.ceil(maxV / step) * step || 1

    const n = series.length
    const x = (k) => padL + (k / Math.max(n - 1, 1)) * innerW
    const y = (v) => padT + innerH - (v / niceMax) * innerH

    let linePath = ''
    let areaPath = `M ${padL} ${padT + innerH}`
    series.forEach((v, i) => {
      const px = x(i).toFixed(1)
      const py = y(v).toFixed(1)
      linePath += `${i === 0 ? 'M' : 'L'} ${px} ${py} `
      areaPath += `L ${px} ${py} `
    })
    areaPath += `L ${x(n - 1).toFixed(1)} ${padT + innerH} Z`

    const years = Math.round(n / 12)
    return {
      grid: [0, 0.5, 1].map((f) => ({ value: niceMax * f, y: y(niceMax * f) })),
      area: areaPath,
      line: linePath,
      ticks: Array.from({ length: years }, (_, i) => ({
        label: `J${i + 1}`,
        x: x(Math.min((i + 1) * 12, n) - 1),
      })),
      endX: x(n - 1),
      endY: y(series[n - 1]),
    }
  }, [series])

  return (
    <svg
      viewBox={`0 0 ${CHART.w} ${CHART.h}`}
      className="w-full h-auto text-primary"
      role="img"
      aria-label="Diagramm der laufenden monatlichen Provision"
    >
      <defs>
        <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {grid.map((g) => (
        <g key={g.value}>
          <line x1={CHART.padL} y1={g.y} x2={CHART.w - CHART.padR} y2={g.y} className="stroke-border" />
          <text
            x={CHART.padL - 10}
            y={g.y + 3}
            textAnchor="end"
            className="fill-muted-foreground text-[11px] tabular-nums"
          >
            {eur(g.value)}
          </text>
        </g>
      ))}
      <path d={area} fill={`url(#${GRADIENT_ID})`} />
      <path d={line} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {ticks.map((t) => (
        <text
          key={t.label}
          x={t.x}
          y={CHART.h - 5}
          textAnchor="middle"
          className="fill-muted-foreground text-[11px] tabular-nums"
        >
          {t.label}
        </text>
      ))}
      <circle cx={endX} cy={endY} r="4" fill="currentColor" className="stroke-background" strokeWidth="2" />
    </svg>
  )
}
