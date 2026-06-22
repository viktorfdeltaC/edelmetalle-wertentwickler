import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import poster from '../assets/edelvideo-poster.webp'
import video from '../assets/edelvideo-web.mp4'

export default function VideoFeature() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  // Synchron im Klick-Gesture starten -> Browser erlaubt Wiedergabe mit Ton.
  // preload="none": die 46-MB-Datei lädt erst hier, nicht beim Seitenaufruf.
  const start = () => {
    const v = videoRef.current
    if (!v) return
    v.play().catch(() => {})
    setPlaying(true)
  }

  return (
    <section className="relative bg-[#0b0b0d] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-[#E2C97E] text-xs font-medium tracking-[0.15em] uppercase">Einblick</span>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold mt-4 mb-4 leading-tight">
            So sieht echtes Vermögen aus.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto">
            Physisches Gold und Silber als Barren. Greifbar, beständig und vollständig Ihr Eigentum.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 rounded-2xl overflow-hidden ring-1 ring-[#E2C97E]/25 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]"
        >
          <video
            ref={videoRef}
            src={video}
            poster={poster}
            preload="none"
            controls={playing}
            playsInline
            className="w-full aspect-[21/9] object-cover bg-black"
            aria-label="Gold- und Silberbarren im Schweizer Hochsicherheitslager"
          />

          {!playing && (
            <button
              type="button"
              onClick={start}
              aria-label="Video abspielen"
              className="group absolute inset-0 flex items-center justify-center bg-black/15 hover:bg-black/5 transition-colors duration-300"
            >
              <span className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <svg className="w-7 h-7 text-white translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  )
}
