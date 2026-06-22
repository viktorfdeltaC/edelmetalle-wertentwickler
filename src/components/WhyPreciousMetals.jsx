import { motion } from 'framer-motion'

const reasons = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Krisenresistenz',
    text: 'Edelmetalle haben Kriege, Währungsreformen und Börsencrashs überstanden. Gold ist die einzige Anlageform, die über Jahrtausende hinweg ihren Wert bewahrt hat. Vollständig unabhängig von Staaten oder Banken.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Schutz vor Inflation',
    text: 'Während Papiergeld durch Inflation schleichend entwertet wird, behält physisches Gold seine Kaufkraft. Historisch hat Gold die Inflation langfristig stets kompensiert. Und oft übertroffen.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Physischer Besitz',
    text: 'Anders als Wertpapiere oder digitale Anlagen halten Sie etwas Greifbares in der Hand. Kein Gegenparteirisiko, keine Bankabhängigkeit. Ihr Edelmetall gehört einzig und allein Ihnen.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Bewährte Wertstabilität',
    text: 'Gold hat seinen Wert über mehr als 5.000 Jahre bewahrt. Langfristig ist es eine der verlässlichsten Anlageformen. Ein bewährter Grundpfeiler jedes ausgewogenen Portfolios.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
}

export default function WhyPreciousMetals() {
  return (
    <section id="warum" className="bg-secondary/30 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Warum Edelmetalle</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold mt-4 mb-4 leading-tight">
            Warum kluge Anleger auf
            <span className="text-primary"> Edelmetalle</span> setzen
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg leading-relaxed">
            Gold und Silber sind die einzigen Anlageformen, die keine Gegenpartei brauchen. Kein Institut, das pleite gehen kann. Kein Vertrag, der sich ändert. Nur physischer Wert.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group rounded-2xl border border-border bg-card p-7 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)] hover:-translate-y-1"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary/[0.08] flex items-center justify-center text-primary">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-2.5 tracking-tight">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">{reason.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
