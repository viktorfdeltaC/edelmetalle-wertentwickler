import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { bookPublic, BookingError, getPublicSlots } from '../lib/booking'

const TZ = 'Europe/Berlin'
const dayFmt = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long', timeZone: TZ })
const timeFmt = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: TZ })
const dayKeyFmt = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: TZ })

const emptyForm = { vorname: '', nachname: '', email: '', telefon: '', firma: '', modus: 'video', website: '' }

export default function BookingModal({ open, variant = 'kunde', onClose }) {
  const isPartner = variant === 'partner'
  const [step, setStep] = useState('slots') // 'slots' | 'details' | 'success'
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [advisor, setAdvisor] = useState({ id: null, name: '' })
  const [slots, setSlots] = useState([])
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [result, setResult] = useState(null)

  const loadSlots = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const data = await getPublicSlots(variant)
      setAdvisor({ id: data.advisorId, name: data.advisorName || '' })
      setSlots(Array.isArray(data.slots) ? data.slots : [])
    } catch (err) {
      setLoadError(err instanceof BookingError ? err.message : 'Termine konnten nicht geladen werden.')
    } finally {
      setLoading(false)
    }
  }, [variant])

  // Beim Öffnen: Zustand zurücksetzen + Slots laden.
  useEffect(() => {
    if (!open) return
    setStep('slots')
    setSelected(null)
    setForm(emptyForm)
    setSubmitError(null)
    setResult(null)
    loadSlots()
  }, [open, loadSlots])

  // Body-Scroll sperren + Escape zum Schließen.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const grouped = useMemo(() => {
    const map = new Map()
    for (const s of slots) {
      const d = new Date(s.start)
      const key = dayKeyFmt.format(d)
      if (!map.has(key)) map.set(key, { label: dayFmt.format(d), slots: [] })
      map.get(key).slots.push(s)
    }
    return [...map.values()]
  }, [slots])

  const selectSlot = (slot) => {
    setSelected(slot)
    setSubmitError(null)
    setStep('details')
  }

  const setField = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    if (!form.vorname.trim() || !form.nachname.trim() || !form.email.trim()) {
      setSubmitError('Bitte Vor- und Nachname sowie E-Mail angeben.')
      return
    }
    if (isPartner && !form.firma.trim()) {
      setSubmitError('Bitte geben Sie Ihr Unternehmen an.')
      return
    }
    if (form.modus === 'telefon' && !form.telefon.trim()) {
      setSubmitError('Für ein Telefongespräch brauchen wir Ihre Telefonnummer.')
      return
    }

    setSubmitting(true)
    try {
      const res = await bookPublic({
        advisorId: advisor.id,
        start: selected.start,
        variant,
        vorname: form.vorname.trim(),
        nachname: form.nachname.trim(),
        email: form.email.trim(),
        telefon: form.telefon.trim(),
        firma: form.firma.trim(),
        modus: form.modus,
        website: form.website, // Honeypot
      })
      setResult(res)
      setStep('success')
    } catch (err) {
      // Slot zwischenzeitlich vergeben → Nutzer zurück zur Auswahl schicken.
      if (err instanceof BookingError && err.status === 422 && err.errors?.start) {
        setStep('slots')
        setSelected(null)
        setSubmitError(null)
        loadSlots()
        return
      }
      setSubmitError(err instanceof BookingError ? err.message : 'Buchung fehlgeschlagen. Bitte erneut versuchen.')
    } finally {
      setSubmitting(false)
    }
  }

  const selectedLabel = selected
    ? `${dayFmt.format(new Date(selected.start))} um ${timeFmt.format(new Date(selected.start))} Uhr`
    : ''

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="relative w-full sm:max-w-lg bg-card text-card-foreground border border-border shadow-2xl rounded-t-3xl sm:rounded-3xl max-h-[92dvh] flex flex-col overflow-hidden"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-border">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary font-medium mb-1">
                  {isPartner ? 'Partnerschaft' : 'Kostenlos & unverbindlich'}
                </p>
                <h2 id="booking-title" className="font-serif text-2xl leading-tight">
                  {step === 'success'
                    ? 'Termin bestätigt'
                    : isPartner
                      ? 'Partner-Gespräch buchen'
                      : 'Gespräch buchen'}
                </h2>
                {step !== 'success' && advisor.name && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Ihr Berater: <span className="text-foreground">{advisor.name}</span>
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Schließen"
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-6 py-5">
              {step === 'slots' && (
                <SlotStep
                  loading={loading}
                  loadError={loadError}
                  grouped={grouped}
                  onRetry={loadSlots}
                  onSelect={selectSlot}
                />
              )}

              {step === 'details' && (
                <form onSubmit={submit} className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
                    <span className="text-sm">{selectedLabel}</span>
                    <button
                      type="button"
                      onClick={() => setStep('slots')}
                      className="text-sm text-primary hover:underline shrink-0 ml-3"
                    >
                      ändern
                    </button>
                  </div>

                  <ModusToggle value={form.modus} onChange={(modus) => setForm((f) => ({ ...f, modus }))} />

                  {isPartner && (
                    <Input label="Unternehmen" value={form.firma} onChange={setField('firma')} autoComplete="organization" required />
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Vorname" value={form.vorname} onChange={setField('vorname')} autoComplete="given-name" required />
                    <Input label="Nachname" value={form.nachname} onChange={setField('nachname')} autoComplete="family-name" required />
                  </div>
                  <Input label="E-Mail" type="email" value={form.email} onChange={setField('email')} autoComplete="email" required />
                  <Input
                    label={form.modus === 'telefon' ? 'Telefon' : 'Telefon (optional)'}
                    type="tel"
                    value={form.telefon}
                    onChange={setField('telefon')}
                    autoComplete="tel"
                    required={form.modus === 'telefon'}
                  />

                  {/* Honeypot – für Menschen unsichtbar */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={setField('website')}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] w-px h-px opacity-0"
                  />

                  {submitError && <p className="text-sm text-destructive">{submitError}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? <Spinner /> : null}
                    {submitting ? 'Wird gebucht…' : 'Termin verbindlich buchen'}
                  </button>
                  <p className="text-xs text-muted-foreground/70 text-center">
                    Keine Verpflichtungen · 100 % unverbindlich
                  </p>
                </form>
              )}

              {step === 'success' && (
                <SuccessStep result={result} onClose={onClose} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SlotStep({ loading, loadError, grouped, onRetry, onSelect }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
        <Spinner large />
        <p className="text-sm">Freie Termine werden geladen…</p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="text-center py-10 space-y-4">
        <p className="text-sm text-muted-foreground">{loadError}</p>
        <button onClick={onRetry} className="px-5 py-2.5 rounded-full bg-secondary text-foreground text-sm font-medium hover:brightness-95 transition">
          Erneut versuchen
        </button>
      </div>
    )
  }

  if (grouped.length === 0) {
    return (
      <div className="text-center py-10 space-y-3">
        <p className="text-foreground font-medium">Aktuell sind keine Termine online buchbar.</p>
        <p className="text-sm text-muted-foreground">
          Schreiben Sie uns kurz – wir melden uns zeitnah mit einem Terminvorschlag.
        </p>
        <a
          href="mailto:info@wertentwickler.de?subject=Terminanfrage%20Erstgespräch"
          className="inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition"
        >
          E-Mail schreiben
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">Wählen Sie einen Termin – das Gespräch dauert ca. 30 Minuten.</p>
      {grouped.map((day) => (
        <div key={day.label}>
          <p className="text-sm font-medium text-foreground mb-2 capitalize">{day.label}</p>
          <div className="grid grid-cols-3 gap-2">
            {day.slots.map((slot) => (
              <button
                key={slot.start}
                onClick={() => onSelect(slot)}
                className="px-2 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {timeFmt.format(new Date(slot.start))}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function SuccessStep({ result, onClose }) {
  const label = result?.start
    ? `${dayFmt.format(new Date(result.start))} um ${timeFmt.format(new Date(result.start))} Uhr`
    : ''
  const istVideo = result?.modus !== 'telefon'

  return (
    <div className="text-center py-6 space-y-4">
      <div className="mx-auto w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center">
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="font-serif text-xl">Ihr Termin steht!</p>
        <p className="text-foreground mt-1">{label}</p>
      </div>
      <p className="text-sm text-muted-foreground">
        {istVideo
          ? 'Eine Bestätigung mit dem Video-Link haben wir Ihnen per E-Mail geschickt.'
          : 'Wir rufen Sie zur vereinbarten Zeit an. Eine Bestätigung ist per E-Mail unterwegs.'}
      </p>
      {istVideo && result?.meetUrl && (
        <a
          href={result.meetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-5 py-2.5 rounded-full bg-secondary text-foreground text-sm font-medium hover:brightness-95 transition"
        >
          Video-Meeting öffnen
        </a>
      )}
      <div>
        <button onClick={onClose} className="mt-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-110 transition">
          Schließen
        </button>
      </div>
    </div>
  )
}

function ModusToggle({ value, onChange }) {
  const opt = (key, label, icon) => (
    <button
      type="button"
      onClick={() => onChange(key)}
      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
        value === key
          ? 'border-primary bg-primary/10 text-primary'
          : 'border-border bg-background text-muted-foreground hover:text-foreground'
      }`}
    >
      {icon}
      {label}
    </button>
  )
  return (
    <div className="flex gap-2">
      {opt(
        'video',
        'Video',
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      )}
      {opt(
        'telefon',
        'Telefon',
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
      )}
    </div>
  )
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm text-muted-foreground mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
      />
    </label>
  )
}

function Spinner({ large }) {
  return (
    <svg className={`animate-spin ${large ? 'w-7 h-7' : 'w-4 h-4'}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
