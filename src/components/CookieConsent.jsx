import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { onOpenConsent, readConsent, saveConsent } from '../lib/consent'
import { openLegal } from '../lib/legal'

// Cookie-Consent-Banner (Google Consent Mode v2). Erscheint beim Erstbesuch und kann
// jederzeit über „Cookie-Einstellungen" (Footer/Datenschutz) wieder geöffnet werden.
// Nicht-blockierend (kein Cookie-Wall): dezente Karte unten, kein Overlay-Scrim.
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  // Erstbesuch: nur zeigen, wenn noch keine gültige Entscheidung vorliegt.
  useEffect(() => {
    if (!readConsent()) setVisible(true)
  }, [])

  // Erneutes Öffnen (Widerruf/Ändern) via openConsentSettings() – mit aktueller Auswahl.
  useEffect(() => {
    return onOpenConsent(() => {
      const existing = readConsent()
      setAnalytics(existing?.analytics ?? false)
      setShowSettings(true)
      setVisible(true)
    })
  }, [])

  const decide = (analyticsChoice) => {
    saveConsent(analyticsChoice)
    setVisible(false)
    setShowSettings(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[120] flex justify-center px-3 pb-3 sm:px-4 sm:pb-4 safe-bottom"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Cookie-Einstellungen"
          aria-live="polite"
        >
          <div className="w-full max-w-2xl bg-card text-card-foreground border border-border rounded-2xl shadow-2xl p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-lg leading-tight mb-1">Datenschutz &amp; Cookies</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Notwendige Cookies sind für den Betrieb der Website immer aktiv. Für die anonyme
                  Reichweitenmessung (Google Analytics) setzen wir Cookies nur mit Ihrer Einwilligung.
                  Mehr dazu in unserer{' '}
                  <button
                    type="button"
                    onClick={() => openLegal('datenschutz')}
                    className="text-primary hover:underline"
                  >
                    Datenschutzerklärung
                  </button>
                  .
                </p>

                {showSettings && (
                  <div className="mt-4 space-y-3 border-t border-border pt-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">Notwendig</p>
                        <p className="text-xs text-muted-foreground">Für den Betrieb der Website erforderlich.</p>
                      </div>
                      <span className="text-xs text-muted-foreground/70 shrink-0">Immer aktiv</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">Statistik</p>
                        <p className="text-xs text-muted-foreground">Anonyme Reichweitenmessung mit Google Analytics.</p>
                      </div>
                      <Toggle checked={analytics} onChange={setAnalytics} label="Statistik-Cookies erlauben" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:justify-end">
              {!showSettings ? (
                <>
                  <button
                    type="button"
                    onClick={() => decide(false)}
                    className="px-5 py-2.5 rounded-full border border-border bg-background text-foreground text-sm font-medium hover:bg-secondary transition-colors order-2 sm:order-1"
                  >
                    Ablehnen
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="px-5 py-2.5 rounded-full border border-border bg-background text-foreground text-sm font-medium hover:bg-secondary transition-colors order-3 sm:order-2"
                  >
                    Einstellungen
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(true)}
                    className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all order-1 sm:order-3"
                  >
                    Alle akzeptieren
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => decide(analytics)}
                    className="px-5 py-2.5 rounded-full border border-border bg-background text-foreground text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    Auswahl speichern
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(true)}
                    className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all"
                  >
                    Alle akzeptieren
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
        checked ? 'bg-primary' : 'bg-secondary border border-border'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : ''
        }`}
      />
    </button>
  )
}
