import { motion } from 'framer-motion'

const bullets = [
  'Persönliche Beratung auf Augenhöhe',
  'Transparente Preisgestaltung',
  'Sichere Abwicklung in Deutschland',
]

export default function CTASection() {
  return (
    <section id="kontakt" className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.04] px-6 py-16 sm:px-12 sm:py-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Soft warmth from the top */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(70% 60% at 50% 0%, hsl(var(--primary) / 0.07) 0%, transparent 70%)' }}
          />

          <div className="relative">
            <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Kostenlos & unverbindlich</span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold mt-4 mb-5 leading-tight">
              Starten Sie noch heute
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
              Ein persönliches Gespräch mit einem unserer Experten kostet Sie nichts.
              Es könnte das Wichtigste sein, was Sie heute für Ihr Vermögen tun.
            </p>

            <a
              href="#kontakt-formular"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-primary text-primary-foreground text-base font-medium shadow-[0_2px_16px_-2px_hsl(var(--primary)/0.35)] hover:-translate-y-px hover:brightness-110 transition-all duration-200"
            >
              Jetzt Gespräch buchen
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <p className="mt-5 text-muted-foreground/70 text-sm">
              Keine Verpflichtungen · Keine versteckten Kosten · 100 % unverbindlich
            </p>

            {/* Feature bullets */}
            <div className="mt-12 pt-8 border-t border-primary/15 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              {bullets.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
