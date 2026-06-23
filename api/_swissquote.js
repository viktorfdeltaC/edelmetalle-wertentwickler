// Gemeinsame Preis-Logik (Swissquote) für die Vercel-Funktion und den Vite-Dev-Proxy.
// Dateiname mit "_" → von Vercel nicht als Route behandelt.
const BASE = 'https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument'

function midPrice(data) {
  const sp = Array.isArray(data) ? data[0]?.spreadProfilePrices?.[0] : null
  if (!sp || typeof sp.bid !== 'number' || typeof sp.ask !== 'number') return null
  const mid = (sp.bid + sp.ask) / 2
  return mid > 0 ? mid : null
}

// Liefert Edelmetallkurse in EUR pro Feinunze (troy oz).
// Gold/Silber gibt es direkt in EUR; Platin/Palladium nur in USD,
// daher über den EUR/USD-Kurs in EUR umgerechnet (best effort).
export async function getPrices() {
  const [goldData, silverData, platUsdData, pallUsdData, eurUsdData] = await Promise.all([
    fetch(`${BASE}/XAU/EUR`).then((r) => r.json()),
    fetch(`${BASE}/XAG/EUR`).then((r) => r.json()),
    fetch(`${BASE}/XPT/USD`).then((r) => r.json()).catch(() => null),
    fetch(`${BASE}/XPD/USD`).then((r) => r.json()).catch(() => null),
    fetch(`${BASE}/EUR/USD`).then((r) => r.json()).catch(() => null),
  ])
  const gold = midPrice(goldData)
  const silver = midPrice(silverData)
  if (gold == null || silver == null) throw new Error('No price data')

  const eurUsd = midPrice(eurUsdData) // USD pro 1 EUR
  const toEur = (usd) => (usd != null && eurUsd ? usd / eurUsd : null)
  const platinum = toEur(midPrice(platUsdData))
  const palladium = toEur(midPrice(pallUsdData))

  return { gold, silver, platinum, palladium, ts: Date.now() }
}
