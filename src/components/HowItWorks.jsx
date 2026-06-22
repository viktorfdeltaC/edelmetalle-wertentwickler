import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Persönliche Beratung',
    description:
      'In einem vertraulichen Erstgespräch, kostenlos und unverbindlich, analysieren wir gemeinsam Ihre finanzielle Situation, Ihre Ziele und Ihren Anlagehorizont.',
    badge: 'Kostenlos & Unverbindlich',
  },
  {
    number: '02',
    title: 'Maßgeschneiderte Auswahl',
    description:
      'Auf Basis Ihrer individuellen Bedürfnisse empfehlen wir Ihnen die passenden Edelmetalle. Ob Goldbarren oder Silber, abgestimmt auf Budget und Strategie.',
    badge: 'Individuell & Transparent',
  },
  {
    number: '03',
    title: 'Sicheres Investment',
    description:
      'Sie erwerben Ihr Edelmetall zu fairen, transparenten Konditionen und entscheiden selbst über Verwahrung oder physische Lieferung. Wir begleiten Sie langfristig.',
    badge: 'Fair & Zuverlässig',
  },
]

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}

export default function HowItWorks() {
  return (
    <section id="prozess" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Der Prozess</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold mt-4 mb-4 leading-tight">
            Ihr Weg zur sicheren Wertanlage
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg leading-relaxed">
            Drei klare Schritte, begleitet von erfahrenen Experten.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="font-serif text-5xl font-semibold text-primary leading-none select-none tabular-nums">
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              </div>

              <h3 className="font-serif text-xl font-semibold mb-3 tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-5 flex-1">
                {step.description}
              </p>
              <span className="self-start text-[11px] font-medium text-primary tracking-[0.1em] uppercase rounded-full bg-primary/[0.08] px-3 py-1.5">
                {step.badge}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-2 text-primary text-sm font-medium hover:brightness-110 transition-colors"
          >
            Jetzt ersten Schritt machen
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
