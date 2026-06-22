import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getPrices } from './api/_swissquote.js'

// Dev-only: bedient /api/prices lokal (wie die Vercel-Funktion in Prod).
function pricesDevApi() {
  return {
    name: 'prices-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/prices', async (_req, res) => {
        res.setHeader('Content-Type', 'application/json')
        try {
          res.end(JSON.stringify(await getPrices()))
        } catch {
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'unavailable' }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), pricesDevApi()],
})
