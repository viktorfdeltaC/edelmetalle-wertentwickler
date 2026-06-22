import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import orbitVideo from '../assets/gold-orbit.mp4'
import orbitPoster from '../assets/gold-orbit.webp'

const facts = ['Echtes Bruchteilseigentum', 'Versichert in der Schweiz', 'Jederzeit lieferbar — ab 1 g Gold']

export default function GoldSequence() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [coarse, setCoarse] = useState(false)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  const textOpacity = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.12], [24, 0])

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    setCoarse(isCoarse)
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.playsInline = true

    if (isCoarse) {
      // Mobile/Touch: scrubben ist hier unzuverlässig → einfach loopen.
      v.loop = true
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause() },
        { threshold: 0.2 }
      )
      io.observe(v)
      return () => io.disconnect()
    }

    // Desktop: Video-Position an Scroll koppeln (Scrubbing).
    let raf = 0
    const unsub = scrollYProgress.on('change', (p) => {
      const d = v.duration
      if (!d || Number.isNaN(d)) return
      const t = Math.min(Math.max(p, 0), 0.999) * d
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        try { v.currentTime = t } catch { /* seek noch nicht möglich */ }
      })
    })
    return () => { unsub(); cancelAnimationFrame(raf) }
  }, [scrollYProgress])

  return (
    <section ref={sectionRef} className={coarse ? 'relative' : 'relative h-[250vh]'}>
      <div className="sticky top-0 h-dvh overflow-hidden bg-[#08080a] flex flex-col">
        <video
          ref={videoRef}
          src={orbitVideo}
          poster={orbitPoster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Scrims oben/unten für Lesbarkeit */}
        <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(8,8,10,0.85), transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,8,10,0.9), transparent)' }} />

        {/* Überschrift oben */}
        <motion.div style={{ opacity: textOpacity, y: textY }} className="relative z-10 pt-28 sm:pt-32 px-6 text-center">
          <span className="text-[#E2C97E] text-xs font-medium tracking-[0.2em] uppercase">Physischer Sachwert</span>
          <h2 className="text-white text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.04] mt-4">
            Gold, das Ihnen
            <span className="block">wirklich gehört.</span>
          </h2>
          <p className="text-white/75 text-lg leading-relaxed mt-5 max-w-xl mx-auto">
            Kein Zertifikat, kein bloßes Versprechen — echtes physisches Eigentum.
            Verwahrt, versichert und jederzeit für Sie verfügbar.
          </p>
        </motion.div>

        {/* Fakten unten */}
        <motion.div style={{ opacity: textOpacity }} className="relative z-10 mt-auto pb-12 sm:pb-14 px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            {facts.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#E2C97E] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="#prozess" className="group inline-flex items-center gap-1.5 text-[#E2C97E] text-base font-medium">
              So funktioniert es
              <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
