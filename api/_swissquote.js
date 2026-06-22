// Gemeinsame Preis-Logik (Swissquote) für die Vercel-Funktion und den Vite-Dev-Proxy.
// Dateiname mit "_" → von Vercel nicht als Route behandelt.
const BASE = 'https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument'

function midPrice(data) {
  const sp = Array.isArray(data) ? data[0]?.spreadProfilePrices?.[0] : null
  if (!sp || typeof sp.bid !== 'number' || typeof sp.ask !== 'number') return null
  const mid = (sp.bid + sp.ask) / 2
  return mid > 0 ? mid : null
}

// Liefert Gold-/Silberkurs in EUR pro Feinunze (troy oz).
export async function getPrices() {
  const [goldData, silverData] = await Promise.all([
    fetch(`${BASE}/XAU/EUR`).then((r) => r.json()),
    fetch(`${BASE}/XAG/EUR`).then((r) => r.json()),
  ])
  const gold = midPrice(goldData)
  const silver = midPrice(silverData)
  if (gold == null || silver == null) throw new Error('No price data')
  return { gold, silver, ts: Date.now() }
}
