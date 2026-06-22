import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import heroVideo from '../assets/hero-bg.mp4'
import heroPoster from '../assets/hero-bg.webp'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
}
const rise = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const word = {
  hidden: { opacity: 0, y: '0.7em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const trust = ['Echtes Bruchteilseigentum', 'Versichert in der Schweiz', 'Steuerfrei nach §23 EStG']

function Words({ text, className = '' }) {
  return text.split(' ').map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom">
      <motion.span variants={word} className={`inline-block ${className}`}>
        {w}&nbsp;
      </motion.span>
    </span>
  ))
}

export default function Hero() {
  const videoRef = useRef(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Safari ist beim (stummen) Autoplay streng — muted/playsinline hart setzen.
    v.muted = true
    v.defaultMuted = true
    v.setAttribute('muted', '')
    v.playsInline = true
    v.setAttribute('playsinline', '')

    const tryPlay = () => v.play().catch(() => {})

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay()
        else v.pause()
      },
      { threshold: 0.1 }
    )
    io.observe(v)
    v.addEventListener('canplay', tryPlay)
    v.addEventListener('loadeddata', tryPlay)

    // Fallback: falls Safari den Autoplay blockt (z. B. Energiesparmodus),
    // beim ersten Nutzer-Input starten.
    const gestures = ['pointerdown', 'touchstart', 'keydown', 'scroll']
    const onGesture = () => {
      tryPlay()
      gestures.forEach((ev) => window.removeEventListener(ev, onGesture))
    }
    gestures.forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }))

    return () => {
      io.disconnect()
      v.removeEventListener('canplay', tryPlay)
      v.removeEventListener('loadeddata', tryPlay)
      gestures.forEach((ev) => window.removeEventListener(ev, onGesture))
    }
  }, [])

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Cinematic gold video stage */}
      <video
        ref={videoRef}
        src={heroVideo}
        poster={heroPoster}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Scrims for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(8,8,10,0.62) 0%, rgba(8,8,10,0.30) 38%, rgba(8,8,10,0.30) 60%, rgba(8,8,10,0.66) 100%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(58% 48% at 50% 44%, rgba(8,8,10,0.55) 0%, transparent 72%)' }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 text-center"
      >
        <motion.div variants={rise} className="inline-flex items-center gap-2.5 mb-9">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E2C97E]" />
          <span className="text-[#E2C97E] text-xs font-medium tracking-[0.2em] uppercase">
            Vermögenssicherung mit Substanz
          </span>
        </motion.div>

        <h1 className="text-white text-[2.5rem] sm:text-6xl lg:text-8xl font-semibold tracking-[-0.035em] leading-[1.02] sm:leading-[0.98] mb-8">
          <span className="block"><Words text="Schützen Sie Ihr Vermögen." /></span>
          <span className="block text-[#E2C97E]"><Words text="Für Generationen." /></span>
        </h1>

        <motion.p variants={rise} className="max-w-2xl mx-auto text-white/75 text-xl leading-relaxed mb-10">
          Physisches Gold und Silber — krisensicher, inflationsgeschützt und vollständig
          unabhängig von Staaten und Banken.
        </motion.p>

        <motion.div variants={rise} className="flex flex-col sm:flex-row items-center justify-center gap-x-7 gap-y-4">
          <a
            href="#kontakt"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground text-base font-medium shadow-[0_2px_24px_-4px_rgba(201,168,76,0.5)] hover:brightness-110 hover:-translate-y-px transition-all duration-200"
          >
            Jetzt Gespräch buchen
          </a>
          <a href="#warum" className="group inline-flex items-center gap-1.5 text-white text-base font-medium">
            Mehr erfahren
            <span className="transition-transform duration-200 group-hover:translate-x-1">›</span>
          </a>
        </motion.div>

        <motion.div variants={rise} className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/65">
          {trust.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#E2C97E] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
