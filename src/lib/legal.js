// Globales Öffnen der Rechtstexte (Impressum/Datenschutz als LegalModal-Overlay).
// So können z. B. das Cookie-Banner oder andere Komponenten die Datenschutzerklärung
// öffnen, ohne dass der Footer-State durchgereicht werden muss.
const EVENT = 'ww:open-legal'

/** @param {'impressum'|'datenschutz'} type */
export function openLegal(type) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: type }))
}

/** Auf „Rechtstext öffnen"-Anfragen hören. Gibt eine Cleanup-Funktion zurück. */
export function onOpenLegal(handler) {
  const listener = (e) => handler(e.detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
