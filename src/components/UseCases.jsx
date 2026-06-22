import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

const cases = [
  {
    // Wachstumskurve
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 17l5-5 4 3 8-8" />
        <path d="M17 7h4v4" />
      </svg>
    ),
    title: 'Vermögensaufbau',
    text: 'Ab 50 € im Monat in Gold und Silber sparen. Steuerfrei nach 12 Monaten Haltefrist (§23 EStG).',
  },
  {
    // Preis-Tag
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L3 13V5a2 2 0 012-2h8l7.59 7.59a2 2 0 010 2.82z" />
        <circle cx="7.5" cy="7.5" r="1.4" />
      </svg>
    ),
    title: 'Silber ohne Mehrwertsteuer',
    text: 'Physisches Silber erwerben, ohne die sonst üblichen 19 % Mehrwertsteuer.',
  },
  {
    // Sonne / goldene Jahre
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3.6" />
        <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6.05 6.05l1.4 1.4M16.55 16.55l1.4 1.4M6.05 17.95l1.4-1.4M16.55 7.45l1.4-1.4" />
      </svg>
    ),
    title: 'Ruhestandsgold',
    text: 'Im Ruhestand monatlich auszahlen lassen, ab 250 € pro Monat.',
  },
  {
    // Schlüssel
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.03 5.91c-.56-.1-1.16.03-1.56.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.82c0-.6.24-1.17.66-1.59l6.5-6.5c.4-.4.53-1 .43-1.56A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    title: 'Mietkautionsdepot',
    text: 'Die Mietkaution in Gold oder Silber hinterlegen, abgesichert über eine rechtssichere Verpfändungserklärung.',
  },
]

const conditions = [
  { value: 'ab 50 €', label: 'Sparplan pro Monat' },
  { value: 'ab 1.000 €', label: 'Einmalkauf' },
  { value: '§23 EStG', label: 'Steuerfrei nach 12 Monaten' },
]

export default function UseCases() {
  return (
    <section id="anwendungsfaelle" className="bg-secondary/30 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0)} className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Anwendungsfälle</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold mt-4 mb-4 leading-tight">
            Für jede Strategie der passende Baustein
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ob Vermögensaufbau, Ruhestand oder Absicherung. Edelmetalle lassen sich flexibel einsetzen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {cases.map((c, idx) => (
            <motion.div
              key={c.title}
              {...fadeUp(idx * 0.08)}
              className="rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_-18px_rgba(0,0,0,0.12)]"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5"
                style={{
                  background: 'linear-gradient(140deg, #F4D98B 0%, #E2BB63 38%, #C99B3E 68%, #A87B2B 100%)',
                  boxShadow: '0 8px 20px -6px rgba(168,123,43,0.55), inset 0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                {c.icon}
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2 tracking-tight">{c.title}</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Konditionen / Einstieg */}
        <motion.div {...fadeUp(0.1)} className="rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_-18px_rgba(0,0,0,0.12)] p-7 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {conditions.map((c) => (
            <div key={c.label}>
              <div className="font-serif text-2xl sm:text-3xl font-semibold text-primary tabular-nums tracking-tight">{c.value}</div>
              <div className="text-muted-foreground text-sm mt-1.5">{c.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
