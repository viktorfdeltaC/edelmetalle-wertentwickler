import { motion } from 'framer-motion'

// Eigene, kräftigere Edelmetall-Icons (duotone, currentColor → text-primary)
const reasons = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path fill="currentColor" fillOpacity="0.18" d="M12 2.4l7.5 2.8v6.2c0 4.8-3.3 8-7.5 9.4-4.2-1.4-7.5-4.6-7.5-9.4V5.2L12 2.4z" />
        <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M12 2.4l7.5 2.8v6.2c0 4.8-3.3 8-7.5 9.4-4.2-1.4-7.5-4.6-7.5-9.4V5.2L12 2.4z" />
        <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M8.7 12.1l2.4 2.4 4.3-4.6" />
      </svg>
    ),
    title: 'Krisenresistenz',
    text: 'Edelmetalle haben Kriege, Währungsreformen und Börsencrashs überstanden. Gold ist die einzige Anlageform, die über Jahrtausende hinweg ihren Wert bewahrt hat. Vollständig unabhängig von Staaten oder Banken.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <rect x="3" y="13.5" width="4" height="7.5" rx="1" fill="currentColor" fillOpacity="0.35" />
        <rect x="10" y="9.5" width="4" height="11.5" rx="1" fill="currentColor" fillOpacity="0.6" />
        <rect x="17" y="4.5" width="4" height="16.5" rx="1" fill="currentColor" />
        <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M3 9.5l5.5-4 4 2.5 6-5" />
      </svg>
    ),
    title: 'Schutz vor Inflation',
    text: 'Während Papiergeld durch Inflation schleichend entwertet wird, behält physisches Gold seine Kaufkraft. Historisch hat Gold die Inflation langfristig stets kompensiert. Und oft übertroffen.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <ellipse cx="12" cy="7" rx="7.5" ry="3" fill="currentColor" fillOpacity="0.35" />
        <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M4.5 7v5c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V7" />
        <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M4.5 12v5c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-5" />
        <ellipse cx="12" cy="7" rx="7.5" ry="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    title: 'Physischer Besitz',
    text: 'Anders als Wertpapiere oder digitale Anlagen halten Sie etwas Greifbares in der Hand. Kein Gegenparteirisiko, keine Bankabhängigkeit. Ihr Edelmetall gehört einzig und allein Ihnen.',
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path fill="currentColor" fillOpacity="0.3" d="M12 3l9 4.5H3z" />
        <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 4.5H3z" />
        <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M3.5 9.5h17M4 20.5h16M7 10v9.5M12 10v9.5M17 10v9.5" />
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
              className="group rounded-2xl border border-border bg-card p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_14px_36px_-18px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_18px_44px_-16px_rgba(0,0,0,0.20)] hover:-translate-y-1.5"
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
