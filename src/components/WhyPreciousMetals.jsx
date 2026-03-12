import { motion } from 'framer-motion'

const reasons = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Krisenresistenz',
    text: 'Edelmetalle haben Kriege, Währungsreformen und Börsencrashs überstanden. Gold ist die einzige Anlageform, die über Jahrtausende hinweg ihren Wert bewahrt hat. Vollständig unabhängig von Staaten oder Banken.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Schutz vor Inflation',
    text: 'Während Papiergeld durch Inflation schleichend entwertet wird, behält physisches Gold seine Kaufkraft. Historisch hat Gold die Inflation langfristig stets kompensiert. Und oft übertroffen.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: 'Physischer Besitz',
    text: 'Anders als Wertpapiere oder digitale Anlagen halten Sie etwas Greifbares in der Hand. Kein Gegenparteirisiko, keine Bankabhängigkeit. Ihr Edelmetall gehört einzig und allein Ihnen.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Bewährte Wertstabilität',
    text: 'Gold hat seinen Wert über mehr als 5.000 Jahre bewahrt. Langfristig ist es eine der verlässlichsten Anlageformen. Ein bewährter Grundpfeiler jedes ausgewogenen Portfolios.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: i * 0.15 },
  }),
}

export default function WhyPreciousMetals() {
  return (
    <section id="warum" className="bg-[#0D0D0D] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-8 bg-[#C9A84C]/50" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.3em] uppercase">Warum Edelmetalle</span>
            <div className="h-px w-8 bg-[#C9A84C]/50" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4 leading-tight">
            Warum kluge Anleger auf
            <br className="hidden sm:block" />
            <em className="not-italic italic text-[#C9A84C]"> Edelmetalle</em> setzen
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
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
              className="group bg-[#111111] border border-white/5 p-8 hover:border-[#C9A84C]/20 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-11 h-11 border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] group-hover:border-[#C9A84C]/50 transition-colors duration-300">
                  {reason.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl text-white font-semibold mb-3">{reason.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-[15px]">{reason.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
