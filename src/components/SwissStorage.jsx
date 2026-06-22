import { motion } from 'framer-motion'
import vault from '../assets/vault.webp'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
})

const facts = [
  'Secure Swiss Storage AG · Zollfreilager bei Zürich',
  'Vollständig versichert',
  'Halbjährlich durch einen unabhängigen Wirtschaftsprüfer geprüft',
]

export default function SwissStorage() {
  return (
    <section className="bg-secondary/30 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image plate (left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden ring-1 ring-border shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)]">
            <motion.img
              src={vault}
              alt="Hochsicherheitslager in der Schweiz"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
              decoding="async"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* Text (right) */}
        <div>
          <motion.span {...fadeUp(0)} className="block text-primary text-xs font-medium tracking-[0.15em] uppercase">
            Verwahrung
          </motion.span>
          <motion.h2 {...fadeUp(0.06)} className="text-4xl sm:text-5xl tracking-tight font-semibold mt-4 mb-5 leading-tight">
            Sicher verwahrt.
            <span className="block text-primary">In der Schweiz.</span>
          </motion.h2>
          <motion.p {...fadeUp(0.12)} className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
            Ihre Edelmetalle lagern im Hochsicherheitslager der Secure Swiss Storage AG im Zollfreilager
            bei Zürich — getrennt vom Vermögen jeder Bank und auf Ihren Namen testiert.
          </motion.p>

          <motion.ul {...fadeUp(0.18)} className="space-y-3">
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
        </div>
      </div>
    </section>
  )
}
