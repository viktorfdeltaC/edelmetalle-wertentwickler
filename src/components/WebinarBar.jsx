import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { readConsent } from '../lib/consent'

// Selbst-enthaltener "Add to Google Calendar"-Link: legt beim Besucher einen NEUEN
// Termin an (Titel/Zeit/Details fest im Link). Funktioniert für jeden, anders als ein
// tmeid-Link, der ein bestehendes (privates) Event referenziert.
const CAL_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=' + encodeURIComponent('Partner-Webinar: Das Edelmetall-Konzept für Vermittler & Empfehlungsgeber') +
  '&dates=20260728T170000/20260728T180000' +
  '&ctz=Europe/Berlin' +
  '&details=' + encodeURIComponent('Kostenloses Live-Webinar, 60 Minuten, online. Veranstalter: Wertentwickler Edelmetalle.') +
  '&location=' + encodeURIComponent('Online')

// Pro Webinar eigener Key -> ein neues Webinar (neuer Key) zeigt die Bar erneut.
const DISMISS_KEY = 'ww_webinar_20260728_dismissed'
// Ende = 28.07.2026 17:00 + 60 Min (CEST). Danach blendet sich die Bar automatisch aus.
const ENDS_AT = new Date('2026-07-28T18:00:00+02:00').getTime()
const WEBINAR_ID = 'partner-webinar-2026-07-28'

// GA4-Event (gtag ist in index.html eingebunden). Consent Mode regelt cookie/cookieless.
function track(name) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, { webinar_id: WEBINAR_ID })
  }
}

export default function WebinarBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === '1'
    } catch {
      /* localStorage nicht verfügbar */
    }
    if (dismissed || Date.now() > ENDS_AT) return

    // Erst nach der Cookie-Entscheidung einblenden, damit sich beide Leisten nicht beissen.
    const tryShow = () => {
      if (readConsent() !== null) {
        setVisible(true)
        track('webinar_bar_impression')
        return true
      }
      return false
    }
    if (tryShow()) return
    const id = setInterval(() => {
      if (tryShow()) clearInterval(id)
    }, 800)
    return () => clearInterval(id)
  }, [])

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[90]"
          role="region"
          aria-label="Webinar-Hinweis"
        >
          <div className="relative bg-[#111014] text-white border-t border-white/10 shadow-[0_-10px_30px_-12px_rgba(0,0,0,0.5)]">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E2C97E]/60 to-transparent" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 sm:gap-5">
              <span className="hidden sm:inline-flex flex-shrink-0 items-center rounded-full border border-[#E2C97E]/30 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#E2C97E]">
                Partner-Webinar
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  <span className="sm:hidden text-[#E2C97E]">Partner-Webinar: </span>
                  Das Edelmetall-Konzept für Vermittler &amp; Empfehlungsgeber
                </p>
                <p className="text-xs text-white/60 truncate">28. Juli 2026 · 17:00 Uhr · 60 Minuten · online, kostenlos</p>
              </div>

              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('webinar_add_to_calendar')}
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 sm:px-5 py-2 text-sm font-medium shadow-[0_2px_16px_-2px_hsl(var(--primary)/0.4)] hover:brightness-110 hover:-translate-y-px transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
                  <path d="M3.5 9.5h17M8 3.2v3.6M16 3.2v3.6" />
                </svg>
                <span className="hidden sm:inline">In den Kalender</span>
                <span className="sm:hidden">Merken</span>
              </a>

              <button
                type="button"
                onClick={dismiss}
                aria-label="Hinweis schließen"
                className="flex-shrink-0 -mr-1 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
