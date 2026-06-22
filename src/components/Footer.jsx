import logoDark from '../assets/logo-dark.png'
import logoLight from '../assets/logo-light.png'

export default function Footer() {
  const year = new Date().getFullYear()

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

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/impressum" className="hover:text-foreground transition-colors duration-200">
              Impressum
            </a>
            <span className="text-border">·</span>
            <a href="/datenschutz" className="hover:text-foreground transition-colors duration-200">
              Datenschutz
            </a>
            <span className="text-border">·</span>
            <a href="#kontakt" className="hover:text-foreground transition-colors duration-200">
              Kontakt
            </a>
          </div>

          {/* Copyright */}
          <div className="text-muted-foreground text-xs text-center md:text-right leading-relaxed">
            <p>© {year} Wertentwickler Edelmetalle</p>
            <p className="mt-1 text-muted-foreground/60">edelmetalle-wertentwickler.de</p>
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
    </footer>
  )
}
