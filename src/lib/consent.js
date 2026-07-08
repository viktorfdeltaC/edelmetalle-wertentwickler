// Cookie-/Consent-Verwaltung (Google Consent Mode v2).
//
// Speichert die Nutzerentscheidung in localStorage und meldet sie via gtag an Google.
// Der frühe Bootstrap in index.html liest denselben Schlüssel/Format, um wiederkehrende
// Besucher ohne Flackern korrekt einzustufen.

export const STORAGE_KEY = 'ww_consent_v1'
const VERSION = 1
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 365 // 12 Monate → danach erneut fragen
const OPEN_EVENT = 'ww:open-consent'

/**
 * Gültige gespeicherte Entscheidung oder null (fehlt / veraltete Version / abgelaufen).
 * @returns {{v:number, analytics:boolean, ts:number} | null}
 */
export function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const c = JSON.parse(raw)
    if (!c || c.v !== VERSION) return null
    if (typeof c.ts !== 'number' || Date.now() - c.ts > MAX_AGE_MS) return null
    return c
  } catch {
    return null
  }
}

/** Entscheidung speichern + an Google melden. */
export function saveConsent(analytics) {
  const consent = { v: VERSION, analytics: !!analytics, ts: Date.now() }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  } catch {
    /* Speicherung nicht möglich (z. B. Private Mode) – Consent gilt nur für diese Sitzung. */
  }
  applyConsent(consent.analytics)
  return consent
}

/** Consent-Signal an gtag durchreichen (granted/denied für analytics_storage). */
export function applyConsent(analytics) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied',
    })
  }
}

/** Banner erneut öffnen (Widerruf/Änderung) – z. B. aus Footer oder Datenschutz. */
export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

/** Auf „Einstellungen öffnen"-Anfragen hören. Gibt eine Cleanup-Funktion zurück. */
export function onOpenConsent(handler) {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}
