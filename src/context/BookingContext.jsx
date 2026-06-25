import { createContext, useCallback, useContext, useState } from 'react'
import BookingModal from '../components/BookingModal'

// Globaler Zugriff auf das Buchungs-Modal: alle „Gespräch buchen"-Buttons rufen
// openBooking() auf, das Modal wird einmal zentral gerendert.
const BookingContext = createContext(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) {
    throw new Error('useBooking muss innerhalb von <BookingProvider> verwendet werden.')
  }
  return ctx
}

export function BookingProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [variant, setVariant] = useState('kunde') // 'kunde' | 'partner'

  // openBooking('partner') öffnet die Partner-Variante (mit Unternehmensfeld).
  const openBooking = useCallback((nextVariant = 'kunde') => {
    setVariant(typeof nextVariant === 'string' ? nextVariant : 'kunde')
    setOpen(true)
  }, [])
  const closeBooking = useCallback(() => setOpen(false), [])

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}
      <BookingModal open={open} variant={variant} onClose={closeBooking} />
    </BookingContext.Provider>
  )
}
