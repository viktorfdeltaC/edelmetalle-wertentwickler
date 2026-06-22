import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import bandVideo from '../assets/band.mp4'
import bandPoster from '../assets/band.webp'

export default function GoldBand() {
  const videoRef = useRef(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.playsInline = true
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause() },
      { threshold: 0.2 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <section className="relative h-[62vh] min-h-[440px] overflow-hidden flex items-center justify-center">
      <video
        ref={videoRef}
        src={bandVideo}
        poster={bandPoster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Scrims für Lesbarkeit der zentrierten Aussage */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(70% 75% at 50% 50%, rgba(8,8,10,0.62) 0%, transparent 78%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(8,8,10,0.55), transparent 55%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
          5.000 Jahre <span className="text-[#E2C97E]">Wertspeicher.</span>
        </h2>
        <p className="text-white/75 text-lg leading-relaxed mt-5 max-w-xl mx-auto">
          Gold überdauert, was Währungen nicht überstehen — Krisen, Reformen, Jahrhunderte.
        </p>
      </motion.div>
    </section>
  )
}
