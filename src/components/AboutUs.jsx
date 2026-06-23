import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import holger from '../assets/holger.webp'
import erik from '../assets/erik.webp'
import viktor from '../assets/viktor.webp'

const stats = [
  { label: 'Jahre Erfahrung im Edelmetallmarkt', target: 15, suffix: '+' },
  { label: 'Privatanleger erfolgreich beraten', target: 300, suffix: '+' },
  { label: 'Physisches Eigentum', target: 100, suffix: '%' },
]

// name = Vor- und Nachname (erscheint im Hover-Schleier).
const team = [
  { name: 'Holger Weller', img: holger, imgClass: '' },
  { name: 'Erik Eckert', img: erik, imgClass: 'origin-top scale-[1.3]' },
  { name: 'Viktor Fink', img: viktor, imgClass: 'scale-x-[-1]' }, // gespiegelt: alle blicken gleich
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

      {/* Team-Portraits: Gold-Rand-Medaillons mit gestaffelter Einblendung + Hover */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="flex justify-center gap-6 sm:gap-12">
          {team.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, boxShadow: '0 12px 30px -12px rgba(0,0,0,0.45)' }}
              whileHover={{ y: -6, scale: 1.05, boxShadow: '0 22px 46px -14px rgba(168,123,43,0.55)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
              className="group rounded-full p-[2.5px]"
              style={{ background: 'linear-gradient(140deg, #F4D98B 0%, #E2BB63 40%, #C99B3E 70%, #A87B2B 100%)' }}
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
                {m.img ? (
                  <img src={m.img} alt={m.name} loading="lazy" className={`w-full h-full object-cover object-top ${m.imgClass}`} />
                ) : (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/45" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2.2c-4.4 0-8 2.4-8 5.4V21h16v-1.4c0-3-3.6-5.4-8-5.4z" />
                  </svg>
                )}
                {/* Hover-Schleier mit Name */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/55">
                  <span className="px-3 text-center text-[11px] sm:text-xs font-medium leading-tight text-white opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {m.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
