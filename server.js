// Produktions-Server für Coolify/Docker: liefert das statische Vite-Build aus UND
// stellt /api/prices bereit (server-seitiger Swissquote-Abruf, vermeidet Browser-CORS).
// Ersetzt das Vercel-Static-Hosting + die Vercel-Serverless-Funktion in einem Container.
import express from 'express'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPrices } from './api/_swissquote.js'

const dist = join(dirname(fileURLToPath(import.meta.url)), 'dist')
const app = express()

// Edelmetallpreise (EUR/Feinunze) – wie zuvor die Vercel-Funktion /api/prices.
app.get('/api/prices', async (_req, res) => {
  try {
    res.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300')
    res.json(await getPrices())
  } catch {
    res.status(502).json({ error: 'unavailable' })
  }
})

// Statische Assets + SPA-Fallback (alle übrigen Pfade → index.html).
app.use(express.static(dist))
app.use((_req, res) => res.sendFile(join(dist, 'index.html')))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Edelmetalle-Website läuft auf Port ${port}`))
