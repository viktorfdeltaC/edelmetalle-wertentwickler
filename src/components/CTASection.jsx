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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Metallische Gold-Randkante (Gradient-Rim) + Tiefe */}
          <div
            className="rounded-[30px] p-[1.5px] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_44px_90px_-45px_rgba(168,123,43,0.55)]"
            style={{
              background:
                'linear-gradient(155deg, rgba(244,217,139,0.95) 0%, rgba(201,155,62,0.55) 26%, rgba(201,155,62,0.06) 52%, rgba(201,155,62,0.55) 100%)',
            }}
          >
            <div className="relative overflow-hidden rounded-[29px] bg-card px-6 py-16 sm:px-12 sm:py-20 text-center">
              {/* Gold-Schein von oben */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(78% 58% at 50% 0%, hsl(var(--primary) / 0.13) 0%, transparent 66%)' }}
              />

              <div className="relative">
                {/* Gold-Medaillon als Anker */}
                <div
                  className="mx-auto mb-7 w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                  style={{
                    background: 'linear-gradient(140deg, #F4D98B 0%, #E2BB63 38%, #C99B3E 68%, #A87B2B 100%)',
                    boxShadow: '0 10px 24px -8px rgba(168,123,43,0.6), inset 0 1px 0 rgba(255,255,255,0.5)',
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
                    <path d="M3.5 9.5h17M8 3.2v3.6M16 3.2v3.6" />
                    <path d="M8.6 14.6l2.2 2.2 4.4-4.5" />
                  </svg>
                </div>

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
                  className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground text-base font-medium shadow-[0_10px_30px_-6px_hsl(var(--primary)/0.5)] hover:-translate-y-px hover:brightness-110 transition-all duration-200"
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
