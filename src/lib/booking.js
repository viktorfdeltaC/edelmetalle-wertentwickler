// API-Client für die öffentliche Beratungs-Terminbuchung (Edelmetall-Backend).
//
// Spricht die leadlosen Public-Endpunkte des CRM an (api/em/public/*). Die Basis-URL
// kommt aus VITE_EM_API_BASE (Build-Zeit), damit Live/Staging/lokal je auf das richtige
// Backend zeigen. Fallback = lokaler Laravel-Dev-Server.
//
//   Live    → https://app.wertentwickler.de/api/em
//   Staging → https://dev.wertentwickler.de/api/em
//   lokal   → http://127.0.0.1:8000/api/em
const API_BASE = import.meta.env.VITE_EM_API_BASE || 'http://127.0.0.1:8000/api/em'

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      },
      ...options,
    })
  } catch {
    // Netzwerk-/CORS-Fehler
    throw new BookingError('Verbindung zum Buchungsdienst fehlgeschlagen.', 0)
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new BookingError(
      data?.message || 'Die Anfrage konnte nicht verarbeitet werden.',
      res.status,
      data?.errors,
    )
  }

  return data
}

export class BookingError extends Error {
  constructor(message, status, errors) {
    super(message)
    this.name = 'BookingError'
    this.status = status
    this.errors = errors || null
  }
}

/**
 * Auto-Berater + dessen freie Slots.
 * @param {'kunde'|'partner'} [variant]
 */
export function getPublicSlots(variant = 'kunde') {
  return request(`/public/slots?variant=${encodeURIComponent(variant)}`)
}

/**
 * Leadlose Buchung.
 * @param {{advisorId:string,start:string,variant?:'kunde'|'partner',vorname:string,nachname:string,email:string,telefon?:string,firma?:string,modus?:'video'|'telefon',website?:string}} payload
 */
export function bookPublic(payload) {
  return request('/public/book', { method: 'POST', body: JSON.stringify(payload) })
}

/**
 * Lead ohne Termin — schaltet den Provisionsrechner frei (nur E-Mail).
 * `website` ist der Honeypot wie bei der Buchung.
 * @param {{email:string,quelle:string,website?:string}} payload
 */
export function submitLead(payload) {
  return request('/public/lead', { method: 'POST', body: JSON.stringify(payload) })
}
