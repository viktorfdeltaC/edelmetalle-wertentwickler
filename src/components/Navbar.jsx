import { useState, useEffect } from 'react'
import logoSrc from '../assets/logo.png'
import { useTheme } from '../lib/useTheme'

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
  { label: 'Finanzdienstleister', href: '#finanzdienstleister' },
  { label: 'Tippgeber', href: '#tippgeber' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const logo = useWhiteRemoved(logoSrc)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // "solid" = themed bar once scrolled / menu open; transparent with light text over the dark hero stage.
  const solid = scrolled || mobileOpen
  const linkClass = solid
    ? 'text-muted-foreground hover:text-foreground'
    : 'text-white/80 hover:text-white'
  const iconClass = solid
    ? 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
    : 'text-white/80 hover:text-white hover:bg-white/10'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'bg-background/85 backdrop-blur-xl border-border' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img src={logo} alt="Edelmetalle Wertentwickler" className="h-12 w-auto" />
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${linkClass}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Theme toggle + CTA + Mobile toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Zum hellen Modus wechseln' : 'Zum dunklen Modus wechseln'}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${iconClass}`}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <a
              href="#kontakt"
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-xl bg-primary hover:brightness-110 text-primary-foreground text-sm font-medium transition-all duration-200"
            >
              Gespräch buchen
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors ${iconClass}`}
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
          <div className="lg:hidden border-t border-border py-5 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-3 text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="#kontakt"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
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

function SunIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}
