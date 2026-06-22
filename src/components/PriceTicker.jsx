import { useState, useEffect, memo } from 'react'

function formatPrice(price) {
  return price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function PriceTicker() {
  const [gold, setGold] = useState(null)
  const [silver, setSilver] = useState(null)
  const [error, setError] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const [goldRes, silverRes] = await Promise.all([
          fetch('https://v6.exchangerate-api.com/v6/bcd7b182b4890fffe5b7b990/latest/XAU'),
          fetch('https://v6.exchangerate-api.com/v6/bcd7b182b4890fffe5b7b990/latest/XAG'),
        ])
        if (!goldRes.ok || !silverRes.ok) throw new Error('API error')
        const [goldData, silverData] = await Promise.all([goldRes.json(), silverRes.json()])
        setGold(goldData.conversion_rates.EUR)
        setSilver(silverData.conversion_rates.EUR)
      } catch {
        setError(true)
      }
    }
    fetchPrices()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLive = gold && silver && !error

  return (
    <div
      className={`fixed z-40 left-0 right-0 top-14 md:top-16 h-9 flex items-center justify-center border-b transition-colors duration-300 ${
        scrolled ? 'bg-card/80 backdrop-blur-md border-border' : 'bg-transparent border-transparent'
      }`}
    >
      {error ? (
        <span className="text-xs text-muted-foreground">Kurse momentan nicht verfügbar</span>
      ) : !gold || !silver ? (
        <span className="text-xs text-muted-foreground animate-pulse">Kurse werden geladen …</span>
      ) : (
        <div className="flex items-center gap-6 sm:gap-10 text-xs tabular-nums">
          <PriceItem label="Gold" price={gold} />
          <span className="w-px h-3.5 bg-border" />
          <PriceItem label="Silber" price={silver} />
          {isLive && (
            <span className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          )}
        </div>
      )}
    </div>
  )
}

const PriceItem = memo(function PriceItem({ label, price }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{formatPrice(price)} €/oz</span>
    </span>
  )
})
