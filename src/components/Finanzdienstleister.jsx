import { motion } from 'framer-motion'
import { ONBOARDING_URL } from '../lib/links'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

const benefits = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1m9-5a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    title: 'Attraktive Vergütung',
    text: 'Für jede erfolgreiche Vermittlung erhalten Sie eine transparente Provision — übersichtlich abgerechnet in Ihrem Dashboard.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
    title: 'Kein Aufwand, kein Risiko',
    text: 'Beratung, Vertragsabschluss und Verwahrung übernehmen Wertentwickler und MIDA. Sie geben nur Ihren persönlichen Link weiter.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM16 15a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2a1 1 0 01-1-1v-4z" />
    ),
    title: 'Eigenes Dashboard',
    text: 'Persönlicher Empfehlungslink, Kunden-Pipeline, Provisionsübersicht und alle Materialien an einem Ort.',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m-6 4h6m-7 8h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    ),
    title: 'Rechtssicher & seriös',
    text: 'Abwicklung über Wertentwickler als Handelsvertreter (§84 HGB) und MIDA als Verwahrer in der Schweiz. Compliance-konform, ganz ohne eigene Beratungspflicht.',
  },
]

export default function Finanzdienstleister() {
  return (
    <section id="finanzdienstleister" className="bg-secondary/30 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Intro */}
          <motion.div {...fadeUp(0)} className="lg:sticky lg:top-28">
            <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">
              Für Finanzdienstleister
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold mt-4 mb-5 leading-tight">
              Erweitern Sie Ihr Angebot
              <span className="block text-primary">um echte Sachwerte</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Als Finanzdienstleister, Makler oder Berater bieten Sie Ihren Mandanten einen
              krisensicheren Sachwert — ohne selbst zu beraten, zu verkaufen oder Verträge
              abzuschließen. Sie empfehlen, den Rest übernehmen wir.
            </p>
            <a
              href={ONBOARDING_URL}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground text-base font-medium shadow-[0_2px_16px_-2px_hsl(var(--primary)/0.35)] hover:-translate-y-px hover:brightness-110 transition-all duration-200"
            >
              Partner werden
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, idx) => (
              <motion.div
                key={b.title}
                {...fadeUp(idx * 0.08)}
                className="rounded-2xl border border-border bg-card p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              >
                <div className="w-11 h-11 rounded-full bg-primary/[0.08] flex items-center justify-center text-primary mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    {b.icon}
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2 tracking-tight">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
