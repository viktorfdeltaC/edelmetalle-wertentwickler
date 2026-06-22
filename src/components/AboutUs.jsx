import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import aboutImg from '../assets/about-bg.jpg'

const stats = [
  { label: 'Jahre Erfahrung im Edelmetallmarkt', target: 15, suffix: '+' },
  { label: 'Privatanleger erfolgreich beraten', target: 500, suffix: '+' },
  { label: 'Unabhängig & herstellerneutral', target: 100, suffix: '%' },
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
      className="rounded-2xl border border-border bg-card p-6 flex items-center gap-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
    >
      <div className="flex-shrink-0 w-24 text-right">
        <span className="font-serif text-4xl text-primary font-semibold tabular-nums">
          {count}{stat.suffix}
        </span>
      </div>
      <div className="w-px h-10 bg-border flex-shrink-0" />
      <p className="text-muted-foreground text-sm leading-snug">{stat.label}</p>
    </motion.div>
  )
}

export default function AboutUs() {
  return (
    <section id="ueber-uns" className="bg-secondary/30 py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">

          {/* Image — first in DOM = top on mobile, right on desktop */}
          <motion.div
            className="relative overflow-hidden rounded-2xl min-h-[320px] lg:min-h-0 lg:order-last"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={aboutImg}
              alt="Edelmetall-Beratung"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
          </motion.div>

          {/* Text block + Stats — left on desktop, below image on mobile */}
          <div className="lg:order-first flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Über uns</span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight font-semibold mt-4 mb-7 leading-tight">
                Kompetenz, Diskretion
                <span className="block text-primary">und Vertrauen</span>
              </h2>

              <div className="space-y-5 text-muted-foreground text-[15px] leading-relaxed">
                <p>
                  Wir sind ein unabhängiger Anbieter für physische Edelmetallinvestments mit Sitz in Deutschland.
                  Unser Team berät seit über einem Jahrzehnt Privatanleger, die ihr Vermögen langfristig schützen
                  und erhalten möchten.
                </p>
                <p>
                  Wir verstehen uns nicht als Verkäufer, sondern als Berater. Unser Ziel ist es, Ihnen das
                  Wissen und die Werkzeuge an die Hand zu geben, um fundierte Entscheidungen für Ihre
                  finanzielle Zukunft zu treffen. Ohne Druck, ohne versteckte Interessen.
                </p>
                <p>
                  Diskretion, fachliche Kompetenz und vollständig transparente Konditionen sind die
                  Grundpfeiler unserer Arbeit. Seit dem ersten Tag.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="space-y-4">
              {stats.map((stat, idx) => (
                <StatItem key={idx} stat={stat} delay={idx * 0.08} />
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
                className="rounded-2xl border-l-2 border-primary bg-card px-7 py-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              >
                <blockquote className="font-serif text-lg italic text-foreground/90 leading-relaxed">
                  „Unser Versprechen: Wir beraten Sie so, wie wir es für unsere eigene Familie tun würden."
                </blockquote>
                <p className="mt-3 text-xs text-primary tracking-[0.1em] uppercase">— Das Edelmetalle-Wertentwickler-Team</p>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
