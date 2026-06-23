import { useState, useEffect, useRef, memo } from 'react'

function formatPrice(price) {
  return price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function PriceTicker() {
  const [gold, setGold] = useState(null)
  const [silver, setSilver] = useState(null)
  const [platinum, setPlatinum] = useState(null)
  const [palladium, setPalladium] = useState(null)
  const [error, setError] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const hasData = useRef(false)

  useEffect(() => {
    let cancelled = false
    const fetchPrices = async () => {
      try {
        const res = await fetch('/api/prices')
        if (!res.ok) throw new Error('API error')
        const data = await res.json()
        if (typeof data.gold !== 'number' || typeof data.silver !== 'number') throw new Error('No data')
        if (cancelled) return
        setGold(data.gold)
        setSilver(data.silver)
        // Platin/Palladium nur setzen, wenn vorhanden (sonst letzten Wert behalten).
        if (typeof data.platinum === 'number') setPlatinum(data.platinum)
        if (typeof data.palladium === 'number') setPalladium(data.palladium)
        setError(false)
        hasData.current = true
      } catch {
        // Bei einem späteren Fehlversuch die zuletzt gezeigten Kurse behalten.
        if (!cancelled && !hasData.current) setError(true)
      }
    }
    fetchPrices()
    const id = setInterval(fetchPrices, 60_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
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
        <span className={`text-xs ${scrolled ? 'text-muted-foreground' : 'text-white/60'}`}>Kurse momentan nicht verfügbar</span>
      ) : !gold || !silver ? (
        <span className={`text-xs animate-pulse ${scrolled ? 'text-muted-foreground' : 'text-white/50'}`}>Kurse werden geladen …</span>
      ) : (
        <div className="flex items-center gap-6 sm:gap-10 text-xs tabular-nums">
          <PriceItem label="Gold" price={gold} scrolled={scrolled} />
          <span className={`w-px h-3.5 ${scrolled ? 'bg-border' : 'bg-white/20'}`} />
          <PriceItem label="Silber" price={silver} scrolled={scrolled} />
          {platinum != null && (
            <>
              <span className={`hidden md:block w-px h-3.5 ${scrolled ? 'bg-border' : 'bg-white/20'}`} />
              <PriceItem className="hidden md:flex" label="Platin" price={platinum} scrolled={scrolled} />
            </>
          )}
          {palladium != null && (
            <>
              <span className={`hidden md:block w-px h-3.5 ${scrolled ? 'bg-border' : 'bg-white/20'}`} />
              <PriceItem className="hidden md:flex" label="Palladium" price={palladium} scrolled={scrolled} />
            </>
          )}
          {isLive && (
            <span className={`hidden sm:flex items-center gap-1.5 ${scrolled ? 'text-muted-foreground' : 'text-white/60'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          )}
        </div>
      )}
    </div>
  )
}

const PriceItem = memo(function PriceItem({ label, price, scrolled, className = '' }) {
  return (
    <span className={`flex items-center gap-1.5 ${className}`}>
      <span className={scrolled ? 'text-muted-foreground' : 'text-white/60'}>{label}</span>
      <span className={`font-medium ${scrolled ? 'text-foreground' : 'text-white'}`}>{formatPrice(price)} €/oz</span>
    </span>
  )
})
