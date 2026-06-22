import { getPrices } from './_swissquote.js'

// Vercel Serverless Function: /api/prices → { gold, silver, ts } in EUR/Feinunze.
export default async function handler(req, res) {
  try {
    const data = await getPrices()
    // Am Edge 60s cachen, danach im Hintergrund erneuern.
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
    res.status(200).json(data)
  } catch {
    res.status(502).json({ error: 'unavailable' })
  }
}
