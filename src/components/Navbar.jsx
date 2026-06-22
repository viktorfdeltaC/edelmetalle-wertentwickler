import { useState, useEffect } from 'react'
import logoDark from '../assets/logo-dark.png'
import logoLight from '../assets/logo-light.png'
import { useTheme } from '../lib/useTheme'

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
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // "solid" = themed bar once scrolled / menu open; transparent with light text over the dark hero stage.
  const solid = scrolled || mobileOpen
  // Heller Hintergrund nur bei gescrolltem Light-Mode → dunkle Logo-Variante; sonst helle.
  const lightBg = solid && theme === 'light'
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
            <img src={lightBg ? logoLight : logoDark} alt="Wertentwickler Edelmetalle" className="h-11 w-auto" />
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
              className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-primary hover:brightness-110 text-primary-foreground text-sm font-medium transition-all duration-200"
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
                className="block text-center px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium"
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
