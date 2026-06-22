import { motion } from 'framer-motion'
import { ONBOARDING_URL } from '../lib/links'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

const steps = [
  {
    number: '01',
    title: 'Kostenlos registrieren',
    text: 'In wenigen Minuten anmelden und die Tippgebervereinbarung digital bestätigen.',
  },
  {
    number: '02',
    title: 'Ihren Link teilen',
    text: 'Sie erhalten einen persönlichen Empfehlungslink, den Sie an Interessierte weitergeben.',
  },
  {
    number: '03',
    title: 'Vergütung erhalten',
    text: 'Für jede erfolgreiche Empfehlung werden Sie vergütet — transparent und zuverlässig.',
  },
]

export default function Tippgeber() {
  return (
    <section id="tippgeber" className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Tippgeber-Programm</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold mt-4 mb-5 leading-tight">
            Empfehlen Sie weiter.
            <span className="block text-primary">Verdienen Sie mit.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
            Sie müssen kein Profi sein. Kennen Sie jemanden, der sein Vermögen schützen möchte?
            Empfehlen Sie Wertentwickler weiter und erhalten Sie für jede erfolgreiche Empfehlung
            eine Vergütung — ganz ohne selbst zu beraten oder zu verkaufen.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              {...fadeUp(idx * 0.08)}
              className="rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_-18px_rgba(0,0,0,0.12)]"
            >
              <span className="font-serif text-3xl font-semibold text-primary leading-none tabular-nums">
                {step.number}
              </span>
              <h3 className="font-serif text-lg font-semibold mt-4 mb-2 tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp(0.1)} className="text-center">
          <a
            href={ONBOARDING_URL}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground text-base font-medium shadow-[0_2px_16px_-2px_hsl(var(--primary)/0.35)] hover:-translate-y-px hover:brightness-110 transition-all duration-200"
          >
            Jetzt als Tippgeber registrieren
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="mt-5 text-muted-foreground/70 text-sm">
            Registrierung in wenigen Minuten · kostenlos & unverbindlich
          </p>
        </motion.div>
      </div>
    </section>
  )
}
