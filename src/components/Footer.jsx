export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 border border-[#C9A84C]/50 flex items-center justify-center">
                <span className="font-serif text-[#C9A84C] text-[10px] font-bold tracking-wider">EW</span>
              </div>
              <div className="leading-tight">
                <div className="text-white text-xs font-semibold tracking-[0.2em] uppercase">Edelmetalle</div>
                <div className="text-[#C9A84C] text-[9px] tracking-[0.3em] uppercase">Wertentwickler</div>
              </div>
            </div>
            <p className="text-gray-600 text-xs max-w-[220px] text-center md:text-left leading-relaxed">
              Physisches Gold und Silber für langfristigen Vermögenserhalt.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="/impressum" className="hover:text-[#C9A84C] transition-colors duration-200">
              Impressum
            </a>
            <span className="text-gray-700">·</span>
            <a href="/datenschutz" className="hover:text-[#C9A84C] transition-colors duration-200">
              Datenschutz
            </a>
            <span className="text-gray-700">·</span>
            <a href="#kontakt" className="hover:text-[#C9A84C] transition-colors duration-200">
              Kontakt
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-600 text-xs text-center md:text-right leading-relaxed">
            <p>© {year} Edelmetalle Wertentwickler</p>
            <p className="mt-1 text-gray-700">edelmetalle-wertentwickler.de</p>
          </div>
        </div>

        {/* Bottom line + disclaimer */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="text-gray-700 text-xs text-center leading-relaxed max-w-3xl mx-auto">
            Hinweis: Investitionen in Edelmetalle sind mit Risiken verbunden. Vergangene Wertentwicklungen sind kein
            verlässlicher Indikator für zukünftige Ergebnisse. Alle Beratungsleistungen erfolgen unverbindlich und
            stellen keine Anlageberatung im Sinne des WpHG dar.
          </p>
        </div>
      </div>
    </footer>
  )
}
