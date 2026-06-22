import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

const trust = [
  {
    label: 'Echtes Bruchteilseigentum',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
  {
    label: 'Versichert im Schweizer Hochsicherheitslager',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />,
  },
  {
    label: 'Steuerfrei nach 12 Monaten (§23 EStG)',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m-6 4h6m-7 8h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
  },
]

export default function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Soft radial warmth, anchored to the primary tone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-36 sm:pt-44 pb-24">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">
            Vermögenssicherung mit Substanz
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.06)}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-tight leading-[1.08] mb-6"
        >
          Schützen Sie Ihr Vermögen.
          <span className="block text-primary">Für Generationen.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.12)}
          className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed mb-10"
        >
          Physisches Gold und Silber sind seit Jahrtausenden die bewährteste Form der Wertanlage.
          Wir helfen Ihnen, Ihr Kapital krisensicher und inflationsgeschützt anzulegen —
          transparent, persönlich und vollständig unabhängig.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.18)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <a
            href="#kontakt"
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary text-primary-foreground text-base font-medium shadow-[0_2px_16px_-2px_hsl(var(--primary)/0.35)] hover:-translate-y-px hover:brightness-110 transition-all duration-200"
          >
            Jetzt Gespräch buchen
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#warum"
            className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-xl border border-border text-foreground text-base font-medium hover:bg-secondary/60 transition-colors duration-200"
          >
            Mehr erfahren
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          {...fadeUp(0.24)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-border text-sm text-muted-foreground"
        >
          {trust.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                {item.icon}
              </svg>
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
