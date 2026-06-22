import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Aufwärts-Linien (Wertzuwachs-Motiv) — zeichnen sich beim Laden, driften dann sanft.
const lines = [
  { d: 'M -60 640 C 240 600, 500 470, 720 400 S 1060 250, 1260 170', opacity: 0.10, width: 1.5, delay: 0.1 },
  { d: 'M -60 720 C 260 690, 520 560, 760 480 S 1080 330, 1260 250', opacity: 0.18, width: 2, delay: 0.25 },
  { d: 'M -60 560 C 220 510, 480 360, 700 300 S 1060 150, 1260 90', opacity: 0.08, width: 1.5, delay: 0.4 },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}
const rise = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const word = {
  hidden: { opacity: 0, y: '0.7em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const trust = ['Echtes Bruchteilseigentum', 'Versichert in der Schweiz', 'Steuerfrei nach §23 EStG']

function Words({ text, className = '' }) {
  return text.split(' ').map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom">
      <motion.span variants={word} className={`inline-block ${className}`}>
        {w}&nbsp;
      </motion.span>
    </span>
  ))
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 90])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Soft warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(60% 50% at 50% 8%, hsl(var(--primary) / 0.08) 0%, transparent 62%)' }}
      />

      {/* Animated "living value" lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <motion.g animate={{ y: [0, -16, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}>
          {lines.map((l, i) => (
            <motion.path
              key={i}
              d={l.d}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={l.width}
              strokeLinecap="round"
              strokeOpacity={l.opacity}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: l.delay },
                opacity: { duration: 1, delay: l.delay },
              }}
            />
          ))}
        </motion.g>
      </svg>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ y, opacity }}
        className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 text-center"
      >
        <motion.div variants={rise} className="inline-flex items-center gap-2.5 mb-9">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-primary text-xs font-medium tracking-[0.2em] uppercase">
            Vermögenssicherung mit Substanz
          </span>
        </motion.div>

        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.035em] leading-[0.98] mb-8">
          <span className="block"><Words text="Schützen Sie Ihr Vermögen." /></span>
          <span className="block text-primary"><Words text="Für Generationen." /></span>
        </h1>

        <motion.p variants={rise} className="max-w-2xl mx-auto text-muted-foreground text-xl leading-relaxed mb-10">
          Physisches Gold und Silber — krisensicher, inflationsgeschützt und vollständig
          unabhängig von Staaten und Banken.
        </motion.p>

        <motion.div variants={rise} className="flex flex-col sm:flex-row items-center justify-center gap-x-7 gap-y-4">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground text-base font-medium hover:brightness-110 hover:-translate-y-px transition-all duration-200"
          >
            Jetzt Gespräch buchen
          </a>
          <a
            href="#warum"
            className="group inline-flex items-center gap-1.5 text-primary text-base font-medium"
          >
            Mehr erfahren
            <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
          </a>
        </motion.div>

        <motion.div variants={rise} className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {trust.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
