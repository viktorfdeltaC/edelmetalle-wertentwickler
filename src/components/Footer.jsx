import { useState } from 'react'
import logoDark from '../assets/logo-dark.png'
import logoLight from '../assets/logo-light.png'
import LegalModal from './LegalModal'

export default function Footer() {
  const year = new Date().getFullYear()
  const [legal, setLegal] = useState(null) // null | 'impressum' | 'datenschutz'
  const loginUrl = import.meta.env.VITE_EM_LOGIN_URL || 'http://127.0.0.1:8000/edelmetalle/login'

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <a href="#" className="block">
              <img src={logoLight} alt="Wertentwickler Edelmetalle" className="h-10 w-auto dark:hidden" />
              <img src={logoDark} alt="Wertentwickler Edelmetalle" className="h-10 w-auto hidden dark:block" />
            </a>
            <p className="text-muted-foreground text-xs max-w-[220px] text-center md:text-left leading-relaxed">
              Physisches Gold und Silber für langfristigen Vermögenserhalt.
            </p>
          </div>

          {/* Links — Impressum/Datenschutz öffnen als Overlay (LegalModal) */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={() => setLegal('impressum')}
              className="cursor-pointer hover:text-foreground transition-colors duration-200"
            >
              Impressum
            </button>
            <span className="text-border">·</span>
            <button
              type="button"
              onClick={() => setLegal('datenschutz')}
              className="cursor-pointer hover:text-foreground transition-colors duration-200"
            >
              Datenschutz
            </button>
            <span className="text-border">·</span>
            <a href="#kontakt" className="hover:text-foreground transition-colors duration-200">
              Kontakt
            </a>
          </div>

          {/* Copyright */}
          <div className="flex flex-col text-muted-foreground text-xs text-center md:text-right leading-relaxed md:self-stretch">
            <p>© {year} Wertentwickler Edelmetalle</p>
            <p className="mt-1 text-muted-foreground/60">edelmetalle-wertentwickler.de</p>
            {/* Unscheinbarer Login-Link ins Edelmetall-Backend (umgebungsabhängig via VITE_EM_LOGIN_URL).
                md:mt-auto schiebt ihn auf Desktop ans untere Ende der Spalte → bündig mit der Tagline links. */}
            <a
              href={loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 md:mt-auto flex items-center justify-center md:justify-end gap-1.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z" />
              </svg>
              Login
            </a>
          </div>
        </div>

        {/* Bottom line + disclaimer */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-muted-foreground/70 text-xs text-center leading-relaxed max-w-3xl mx-auto">
            Hinweis: Investitionen in Edelmetalle sind mit Risiken verbunden. Vergangene Wertentwicklungen sind kein
            verlässlicher Indikator für zukünftige Ergebnisse. Alle Beratungsleistungen erfolgen unverbindlich und
            stellen keine Anlageberatung im Sinne des WpHG dar.
          </p>
        </div>
      </div>

      <LegalModal type={legal} onClose={() => setLegal(null)} />
    </footer>
  )
}
