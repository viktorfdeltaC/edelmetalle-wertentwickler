const steps = [
  {
    number: '01',
    title: 'Persönliche Beratung',
    description:
      'In einem vertraulichen Erstgespräch — kostenlos und unverbindlich — analysieren wir gemeinsam Ihre finanzielle Situation, Ihre Ziele und Ihren Anlagehorizont.',
    badge: 'Kostenlos & Unverbindlich',
  },
  {
    number: '02',
    title: 'Maßgeschneiderte Auswahl',
    description:
      'Auf Basis Ihrer individuellen Bedürfnisse empfehlen wir Ihnen die passenden Edelmetalle — ob Goldbarren, Goldmünzen oder Silber — abgestimmt auf Budget und Strategie.',
    badge: 'Individuell & Transparent',
  },
  {
    number: '03',
    title: 'Sicheres Investment',
    description:
      'Sie erwerben Ihr Edelmetall zu fairen, transparenten Konditionen und entscheiden selbst über Verwahrung oder physische Lieferung. Wir begleiten Sie langfristig.',
    badge: 'Fair & Zuverlässig',
  },
]

export default function HowItWorks() {
  return (
    <section id="prozess" className="bg-[#0A0A0A] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-8 bg-[#C9A84C]/50" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.3em] uppercase">Der Prozess</span>
            <div className="h-px w-8 bg-[#C9A84C]/50" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4 leading-tight">
            Ihr Weg zur sicheren Wertanlage
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
            Drei klare Schritte — begleitet von erfahrenen Experten.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Step header */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-serif text-5xl font-bold text-[#D4AF37] leading-none select-none tabular-nums">
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#C9A84C]/40 to-transparent" />
              </div>

              <h3 className="font-serif text-xl text-white font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-[15px] leading-relaxed mb-5 flex-1">
                {step.description}
              </p>
              <span className="self-start text-[11px] text-[#C9A84C] tracking-[0.15em] uppercase border border-[#C9A84C]/20 px-3 py-1.5">
                {step.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <div className="mt-16 text-center">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 text-[#C9A84C] text-sm hover:text-[#E2C97E] transition-colors tracking-wide group"
          >
            Jetzt ersten Schritt machen
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
