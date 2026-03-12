import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import heroBg from '../assets/hero-bg.png'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut', delay },
})

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -30])
  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Hero background image — parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPositionX: 'center',
          backgroundPositionY: bgY,
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-20">
        {/* Eyebrow label */}
        <motion.div {...fadeUp(0.2)} className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-10 bg-[#C9A84C]/50" />
          <span className="text-[#C9A84C] text-xs font-medium tracking-[0.3em] uppercase">
            Vermögenssicherung mit Substanz
          </span>
          <div className="h-px w-10 bg-[#C9A84C]/50" />
        </motion.div>

        {/* Main headline — two lines animated separately, drifts up on scroll */}
        <motion.h1
          style={{ y: headlineY }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
        >
          <motion.span {...fadeUp(0.5)} className="block text-white">
            Schützen Sie Ihr Vermögen.
          </motion.span>
          <motion.em {...fadeUp(0.8)} className="not-italic italic text-[#C9A84C] block">
            Für Generationen.
          </motion.em>
        </motion.h1>

        {/* Subtext */}
        <motion.p {...fadeUp(1.0)} className="max-w-2xl mx-auto text-gray-400 text-lg sm:text-xl leading-relaxed mb-12">
          Physisches Gold und Silber sind seit Jahrtausenden die bewährteste Form der Wertanlage.
          Wir helfen Ihnen, Ihr Kapital krisensicher und inflationsgeschützt anzulegen.
          Transparent, persönlich und vollständig unabhängig.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(1.2)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#kontakt"
            className="cta-pulse inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0A0A0A] text-base font-semibold tracking-wide transition-all duration-200 hover:shadow-[0_0_32px_rgba(201,168,76,0.35)] w-full sm:w-auto justify-center"
          >
            Jetzt Gespräch buchen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#warum"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#C9A84C]/30 hover:border-[#C9A84C]/60 text-[#C9A84C] text-base font-medium tracking-wide transition-all duration-200 w-full sm:w-auto justify-center"
          >
            Mehr erfahren
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div {...fadeUp(1.4)} className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-8 border-t border-white/5 text-sm text-gray-500">
          <TrustItem
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
            label="Über 15 Jahre Erfahrung"
          />
          <div className="hidden sm:block w-px h-6 bg-white/10" />
          <TrustItem
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />}
            label="500+ zufriedene Kunden"
          />
          <div className="hidden sm:block w-px h-6 bg-white/10" />
          <TrustItem
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />}
            label="Physische Lieferung"
          />
        </motion.div>
      </div>
    </section>
  )
}

function TrustItem({ icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <svg className="w-4 h-4 text-[#C9A84C] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
      <span>{label}</span>
    </div>
  )
}
