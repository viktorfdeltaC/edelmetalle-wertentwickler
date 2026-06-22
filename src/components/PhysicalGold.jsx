import { motion } from 'framer-motion'
import goldBar from '../assets/goldbar.webp'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const facts = [
  'Echtes Bruchteilseigentum auf Ihren Namen',
  'Versichert im Schweizer Hochsicherheitslager',
  'Jederzeit lieferbar — ab 1 g Gold',
]

export default function PhysicalGold() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <motion.span {...fadeUp(0)} className="block text-primary text-xs font-medium tracking-[0.15em] uppercase">
            Physischer Sachwert
          </motion.span>
          <motion.h2 {...fadeUp(0.06)} className="text-4xl sm:text-5xl tracking-tight font-semibold mt-4 mb-5 leading-tight">
            Gold, das Ihnen
            <span className="block text-primary">wirklich gehört.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.12)} className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
            Kein Zertifikat, kein bloßes Versprechen — echtes physisches Eigentum.
            Verwahrt, versichert und jederzeit für Sie verfügbar.
          </motion.p>

          <motion.ul {...fadeUp(0.18)} className="space-y-3 mb-9">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-3 text-[15px]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/[0.12] flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>{f}</span>
              </li>
            ))}
          </motion.ul>

          <motion.a {...fadeUp(0.24)} href="#prozess" className="group inline-flex items-center gap-1.5 text-primary text-base font-medium">
            So funktioniert es
            <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
          </motion.a>
        </div>

        {/* Image plate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 lg:order-2"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(60% 50% at 50% 50%, hsl(var(--primary) / 0.16) 0%, transparent 70%)' }}
          />
          <div className="relative rounded-3xl overflow-hidden ring-1 ring-border shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]">
            <motion.img
              src={goldBar}
              alt="Physischer 999.9 Feingold-Barren"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
              decoding="async"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Light sweep — softes Licht wandert langsam über das Gold */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.22) 50%, transparent 62%)',
                mixBlendMode: 'soft-light',
              }}
              initial={{ x: '-130%' }}
              animate={{ x: '130%' }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2.5 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
