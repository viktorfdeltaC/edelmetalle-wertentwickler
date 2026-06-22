import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
})

const faqs = [
  {
    q: 'Gehört mir das Gold wirklich?',
    a: 'Ja. Sie erwerben echtes physisches Eigentum, das auf Ihren Namen testiert wird. Ihr Bestand ist getrennt vom Vermögen jeder Bank und im Insolvenzfall geschützt.',
  },
  {
    q: 'Wo werden meine Edelmetalle gelagert?',
    a: 'Im Schweizer Hochsicherheitslager der Secure Swiss Storage AG, vollständig versichert und durch einen unabhängigen Treuhänder laufend geprüft.',
  },
  {
    q: 'Komme ich jederzeit an mein Gold?',
    a: 'Ja. Es gibt keine Laufzeitbindung. Sie können jederzeit Teil- oder Vollverkäufe beauftragen oder sich Ihre Edelmetalle weltweit physisch ausliefern lassen, ab 1 g Gold.',
  },
  {
    q: 'Was kostet die Verwahrung?',
    a: 'Eine transparente, laufende Gebühr auf den Depotbestand. Einlagerung, Transport und Versicherung sind darin enthalten und in einem nachvollziehbaren Kostenverzeichnis aufgeführt.',
  },
  {
    q: 'Ab welchem Betrag kann ich starten?',
    a: 'Einmalkauf ab 1.000 €, Sparplan ab 50 € pro Monat, Zukäufe ab 250 €. Die Kaufhöhe ist jederzeit änderbar.',
  },
  {
    q: 'Wie ist das mit der Steuer?',
    a: 'Der Einkauf Ihrer Edelmetalle erfolgt steuerfrei. Wertsteigerungen sind nach einer Haltedauer von mehr als einem Jahr steuerfrei (§23 EStG).',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <span className="text-primary text-xs font-medium tracking-[0.15em] uppercase">Häufige Fragen</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-semibold mt-4 leading-tight">
            Antworten auf die wichtigsten Fragen
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={item.q}
                {...fadeUp(0.04 * i)}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                >
                  <span className="font-serif text-base sm:text-lg font-medium tracking-tight">{item.q}</span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full bg-primary/[0.08] flex items-center justify-center text-primary transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-muted-foreground text-[15px] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
