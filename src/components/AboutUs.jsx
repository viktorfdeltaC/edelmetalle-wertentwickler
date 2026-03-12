const stats = [
  { value: '15+', label: 'Jahre Erfahrung im Edelmetallmarkt' },
  { value: '500+', label: 'Privatanleger erfolgreich beraten' },
  { value: '100%', label: 'Unabhängig & herstellerneutral' },
]

export default function AboutUs() {
  return (
    <section id="ueber-uns" className="bg-[#0D0D0D] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Text block */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]/50" />
              <span className="text-[#C9A84C] text-xs font-medium tracking-[0.3em] uppercase">Über uns</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-7 leading-tight">
              Kompetenz, Diskretion
              <br />
              <em className="not-italic italic text-[#C9A84C]">und Vertrauen</em>
            </h2>

            <div className="space-y-5 text-gray-400 text-[15px] leading-relaxed">
              <p>
                Wir sind ein unabhängiger Anbieter für physische Edelmetallinvestments mit Sitz in Deutschland.
                Unser Team berät seit über einem Jahrzehnt Privatanleger, die ihr Vermögen langfristig schützen
                und erhalten möchten.
              </p>
              <p>
                Wir verstehen uns nicht als Verkäufer, sondern als Berater. Unser Ziel ist es, Ihnen das
                Wissen und die Werkzeuge an die Hand zu geben, um fundierte Entscheidungen für Ihre
                finanzielle Zukunft zu treffen — ohne Druck, ohne versteckte Interessen.
              </p>
              <p>
                Diskretion, fachliche Kompetenz und vollständig transparente Konditionen sind die
                Grundpfeiler unserer Arbeit — seit dem ersten Tag.
              </p>
            </div>

            {/* Divider ornament */}
            <div className="flex items-center gap-3 mt-10">
              <div className="h-px w-6 bg-[#C9A84C]/40" />
              <svg className="w-3 h-3 text-[#C9A84C]/40" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0L9.797 5.753H16L10.902 9.247L12.699 15L8 11.506L3.301 15L5.098 9.247L0 5.753H6.203L8 0Z" />
              </svg>
              <div className="h-px flex-1 bg-[#C9A84C]/10" />
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#111111] border border-white/5 p-7 flex items-center gap-6 hover:border-[#C9A84C]/15 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="font-serif text-4xl text-[#C9A84C] font-bold">{stat.value}</span>
                </div>
                <div className="w-px h-10 bg-[#C9A84C]/15 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-snug">{stat.label}</p>
              </div>
            ))}

            <div className="bg-[#111111] border border-[#C9A84C]/10 p-7 mt-2">
              <blockquote className="font-serif text-lg italic text-gray-300 leading-relaxed">
                "Unser Versprechen: Wir beraten Sie so, wie wir es für unsere eigene Familie tun würden."
              </blockquote>
              <p className="mt-3 text-xs text-[#C9A84C] tracking-[0.15em] uppercase">— Das Edelmetalle-Wertentwickler-Team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
