import ctaBg from '../assets/cta-bg.png'

export default function CTASection() {
  return (
    <section id="kontakt" className="relative bg-[#0A0A0A] py-24 lg:py-36 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${ctaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Gold glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)' }}
        />
      </div>

      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-[#C9A84C]/40" />
          <svg className="w-4 h-4 text-[#C9A84C]/50" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0L9.797 5.753H16L10.902 9.247L12.699 15L8 11.506L3.301 15L5.098 9.247L0 5.753H6.203L8 0Z" />
          </svg>
          <div className="h-px w-12 bg-[#C9A84C]/40" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
          Starten Sie noch heute —
          <br className="hidden sm:block" />
          <em className="not-italic italic text-[#C9A84C]"> kostenlos und unverbindlich</em>
        </h2>

        <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          Ein persönliches Gespräch mit einem unserer Experten kostet Sie nichts.
          Es könnte das Wichtigste sein, was Sie heute für Ihr Vermögen tun.
        </p>

        <a
          href="#kontakt-formular"
          className="inline-flex items-center gap-3 px-10 py-5 bg-[#C9A84C] hover:bg-[#E2C97E] text-[#0A0A0A] text-base font-semibold tracking-wide transition-all duration-200 hover:shadow-[0_0_48px_rgba(201,168,76,0.4)]"
        >
          Jetzt Gespräch buchen
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        <p className="mt-6 text-gray-600 text-sm">
          Keine Verpflichtungen · Keine versteckten Kosten · 100% unverbindlich
        </p>

        {/* Feature bullets */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
          {[
            'Persönliche Beratung auf Augenhöhe',
            'Transparente Preisgestaltung',
            'Sichere Abwicklung in Deutschland',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#C9A84C]/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/10 to-transparent" />
    </section>
  )
}
