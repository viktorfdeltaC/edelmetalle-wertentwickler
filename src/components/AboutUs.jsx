import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Jahre Erfahrung im Edelmetallmarkt', target: 15, suffix: '+' },
  { label: 'Privatanleger erfolgreich beraten', target: 300, suffix: '+' },
  { label: 'Physisches Eigentum', target: 100, suffix: '%' },
]

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const tick = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}

function StatItem({ stat, delay }) {
  const [count, ref] = useCountUp(stat.target)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="text-center"
    >
      <div className="text-5xl sm:text-6xl font-semibold text-primary tabular-nums tracking-tight leading-none">
        {count}{stat.suffix}
      </div>
      <div className="text-muted-foreground text-sm mt-3 max-w-[12rem] mx-auto leading-snug">{stat.label}</div>
    </motion.div>
  )
}

export default function AboutUs() {
  return (
    <section id="ueber-uns" className="bg-secondary/30 py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Über uns</span>
          <h2 className="text-4xl sm:text-5xl tracking-tight font-semibold mt-4 mb-8 leading-tight">
            Kompetenz, Diskretion
            <span className="block text-primary">und Vertrauen</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="space-y-5 text-muted-foreground text-lg leading-relaxed text-left sm:text-center"
        >
          <p>
            Wir sind ein unabhängiger Spezialist für physische Edelmetalle mit Sitz in Deutschland.
            Seit über 15 Jahren begleiten wir Privatanleger dabei, ihr Vermögen langfristig zu sichern
            und zu bewahren.
          </p>
          <p>
            Wir verstehen uns nicht als Verkäufer, sondern als Berater. Ohne Druck, ohne versteckte Interessen,
            mit dem Ziel, Ihnen fundierte Entscheidungen für Ihre finanzielle Zukunft zu ermöglichen.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
        {stats.map((stat, idx) => (
          <StatItem key={idx} stat={stat} delay={idx * 0.1} />
        ))}
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 text-center"
      >
        <blockquote className="text-2xl sm:text-3xl font-medium tracking-tight leading-snug text-foreground/90">
          „Wir beraten Sie so, wie wir es für unsere eigene Familie tun würden."
        </blockquote>
        <p className="mt-5 text-sm text-primary tracking-[0.1em] uppercase">
          Das Wertentwickler-Edelmetalle-Team
        </p>
      </motion.div>
    </section>
  )
}
