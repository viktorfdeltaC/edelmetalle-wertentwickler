import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

// PLATZHALTER — vor dem Launch durch echte, freigegebene Kundenstimmen ersetzen.
const testimonials = [
  {
    quote: 'Endlich eine Anlage, die ich anfassen kann. Die Beratung war ehrlich und völlig ohne Druck.',
    name: 'Thomas K.',
    role: 'Selbstständiger, Bayern',
    initials: 'TK',
  },
  {
    quote: 'Mir war wichtig, dass mein Gold wirklich mir gehört und sicher in der Schweiz liegt. Genau so ist es.',
    name: 'Andrea M.',
    role: 'Angestellte, Hamburg',
    initials: 'AM',
  },
  {
    quote: 'Vom ersten Gespräch bis zur Einlagerung lief alles transparent und unkompliziert.',
    name: 'Stefan L.',
    role: 'Privatanleger, Nordrhein-Westfalen',
    initials: 'SL',
  },
  {
    quote: 'Ich schätze die klaren Konditionen und dass ich jederzeit einen Ansprechpartner habe.',
    name: 'Petra & Michael R.',
    role: 'Privatanleger, Baden-Württemberg',
    initials: 'PR',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5 text-primary" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="stimmen" className="bg-secondary/30 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0)} className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Kundenstimmen</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold mt-4 leading-tight">
            Was unsere Kunden sagen
          </h2>
        </motion.div>

        {/* Mobil: horizontal swipebar (Scroll-Snap). Ab lg: gleichmäßige Reihe. */}
        <div className="flex gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-4 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              {...fadeUp(i * 0.08)}
              className="snap-start shrink-0 w-[80%] sm:w-[46%] lg:w-auto lg:flex-1 lg:basis-0 flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_-18px_rgba(0,0,0,0.12)]"
            >
              <Stars />
              <blockquote className="mt-4 flex-1 text-foreground/85 leading-relaxed text-[15px]">
                „{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{
                    background: 'linear-gradient(140deg, #F4D98B 0%, #E2BB63 38%, #C99B3E 68%, #A87B2B 100%)',
                    boxShadow: '0 6px 16px -6px rgba(168,123,43,0.55), inset 0 1px 0 rgba(255,255,255,0.5)',
                  }}
                  aria-hidden="true"
                >
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-medium">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
