import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

const cases = [
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 8-8m0 0h-4m4 0v4" />,
    title: 'Vermögensaufbau',
    text: 'Ab 50 € im Monat in Gold und Silber sparen. Steuerfrei nach 12 Monaten Haltefrist (§23 EStG).',
  },
  {
    icon: <><line x1="6" y1="18" x2="18" y2="6" strokeLinecap="round" /><circle cx="7.5" cy="7.5" r="2" /><circle cx="16.5" cy="16.5" r="2" /></>,
    title: 'Silber ohne Mehrwertsteuer',
    text: 'Physisches Silber erwerben, ohne die sonst üblichen 19 % Mehrwertsteuer.',
  },
  {
    icon: <><rect x="3" y="7" width="18" height="10" rx="2" /><circle cx="12" cy="12" r="2.5" /></>,
    title: 'Ruhestandsgold',
    text: 'Im Ruhestand monatlich auszahlen lassen, ab 250 € pro Monat.',
  },
  {
    icon: <><circle cx="8" cy="9" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M11 12l8 8m-3-3l2-2m1 5l2-2" /></>,
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
              <div className="w-11 h-11 rounded-full bg-primary/[0.08] flex items-center justify-center text-primary mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">{c.icon}</svg>
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
