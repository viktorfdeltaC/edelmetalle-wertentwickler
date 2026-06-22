import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import orbitVideo from '../assets/gold-orbit.mp4'
import orbitPoster from '../assets/gold-orbit.webp'

const facts = ['Echtes Bruchteilseigentum', 'Versichert in der Schweiz', 'Jederzeit lieferbar ab 1 g Gold']

function Check({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function GoldSequence() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  // Gerätetyp synchron beim ersten Render bestimmen → kein Layout-Flackern.
  const [coarse] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  )
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const textOpacity = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0, 1, 1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.12], [24, 0])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.playsInline = true

    if (coarse) {
      v.loop = true
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause() },
        { threshold: 0.2 }
      )
      io.observe(v)
      return () => io.disconnect()
    }

    let raf = 0
    const unsub = scrollYProgress.on('change', (p) => {
      const d = v.duration
      if (!d || Number.isNaN(d)) return
      const t = Math.min(Math.max(p, 0), 0.999) * d
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => { try { v.currentTime = t } catch { /* noch nicht seekbar */ } })
    })
    return () => { unsub(); cancelAnimationFrame(raf) }
  }, [coarse, scrollYProgress])

  // ── Mobile / Touch: normale, gerahmte Sektion (Vollbild-Scrub passt hier nicht) ──
  if (coarse) {
    return (
      <section ref={sectionRef} className="py-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Physischer Sachwert</span>
          <h2 className="text-4xl sm:text-5xl tracking-tight font-semibold mt-4 mb-5 leading-tight">
            Gold, das Ihnen <span className="text-primary">wirklich gehört.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Kein Zertifikat, kein bloßes Versprechen, sondern echtes physisches Eigentum.
            Verwahrt, versichert und jederzeit für Sie verfügbar.
          </p>

          <div className="relative rounded-3xl overflow-hidden ring-1 ring-border shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)] mb-8 bg-[#08080a]">
            <video
              ref={videoRef}
              src={orbitVideo}
              poster={orbitPoster}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="w-full aspect-video object-cover"
            />
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-7">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <a href="#prozess" className="group inline-flex items-center gap-1.5 text-primary text-base font-medium">
            So funktioniert es
            <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
          </a>
        </div>
      </section>
    )
  }

  // ── Desktop: Vollbild-Scroll-Sequenz (Video an Scroll gekoppelt) ──
  return (
    <section ref={sectionRef} className="relative h-[250vh]">
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
        <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(8,8,10,0.85), transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,8,10,1) 6%, rgba(8,8,10,0.85), transparent)' }} />

        <motion.div style={{ opacity: textOpacity, y: textY }} className="relative z-10 pt-28 sm:pt-32 px-6 text-center">
          <span className="text-[#E2C97E] text-xs font-medium tracking-[0.2em] uppercase">Physischer Sachwert</span>
          <h2 className="text-white text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.04] mt-4">
            Gold, das Ihnen
            <span className="block">wirklich gehört.</span>
          </h2>
          <p className="text-white/75 text-lg leading-relaxed mt-5 max-w-xl mx-auto">
            Kein Zertifikat, kein bloßes Versprechen, sondern echtes physisches Eigentum.
            Verwahrt, versichert und jederzeit für Sie verfügbar.
          </p>
        </motion.div>

        <motion.div style={{ opacity: textOpacity }} className="relative z-10 mt-auto pb-12 sm:pb-14 px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            {facts.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E2C97E] flex-shrink-0" />
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
