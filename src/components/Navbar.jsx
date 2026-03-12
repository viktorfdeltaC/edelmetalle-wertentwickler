import { useState, useEffect } from 'react'
import logoSrc from '../assets/logo.png'

function useWhiteRemoved(src) {
  const [result, setResult] = useState(src)
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const { data } = imageData
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
          data[i + 3] = 0
        }
      }
      ctx.putImageData(imageData, 0, 0)
      setResult(canvas.toDataURL())
    }
    img.src = src
  }, [src])
  return result
}

const navLinks = [
  { label: 'Warum Edelmetalle', href: '#warum' },
  { label: 'So funktioniert es', href: '#prozess' },
  { label: 'Über uns', href: '#ueber-uns' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const logo = useWhiteRemoved(logoSrc)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b border-[#C9A84C]/40 ${
        scrolled
          ? 'bg-[#0A0A0A]/85 backdrop-blur-[12px]'
          : 'bg-[#161616]/80'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img
              src={logo}
              alt="Edelmetalle Wertentwickler"
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-[#C9A84C] text-sm tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#kontakt"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0A0A0A] text-sm font-semibold tracking-wide transition-colors duration-200"
            >
              Gespräch buchen
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Menü öffnen"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#C9A84C]/10 py-5 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-3 text-gray-400 hover:text-[#C9A84C] text-sm tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="#kontakt"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-3 bg-[#C9A84C] text-[#0A0A0A] text-sm font-semibold tracking-wide"
              >
                Jetzt Gespräch buchen
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
