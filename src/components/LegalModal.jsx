import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { openConsentSettings } from '../lib/consent'

// Overlay für Impressum & Datenschutz (analog BookingModal). Wird zentral z. B. aus dem
// Footer geöffnet: <LegalModal type={'impressum'|'datenschutz'|null} onClose={…} />.
const TITLES = { impressum: 'Impressum', datenschutz: 'Datenschutzerklärung' }

export default function LegalModal({ type, onClose }) {
  const open = type === 'impressum' || type === 'datenschutz'

  // Body-Scroll sperren + Escape zum Schließen (wie BookingModal).
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
            aria-label={TITLES[type]}
            className="relative w-full sm:max-w-2xl bg-card text-card-foreground border border-border shadow-2xl rounded-t-3xl sm:rounded-3xl max-h-[92dvh] flex flex-col overflow-hidden"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-border">
              <h2 className="font-serif text-2xl leading-tight">{TITLES[type]}</h2>
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

            {/* Body (scrollbar — Rechtstexte können lang sein) */}
            <div className="overflow-y-auto px-6 py-6 space-y-5 text-[14px] leading-relaxed text-muted-foreground">
              {type === 'impressum' ? (
                <>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Angaben gemäß § 5 DDG</h3>
                    <p>
                      Wertentwickler c/o realxtrade GmbH<br />
                      Kreuzbergblick 8<br />
                      96120 Bischberg<br />
                      Deutschland
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">Vertreten durch</h3>
                    <p>Erik Eckert, Geschäftsführer</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">Kontakt</h3>
                    <p>
                      E-Mail:{' '}
                      <a href="mailto:info@wertentwickler.de" className="text-foreground hover:underline">
                        info@wertentwickler.de
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">Registereintrag</h3>
                    <p>
                      Eintragung im Handelsregister.<br />
                      Registergericht: Amtsgericht Bamberg<br />
                      Registernummer: HRB 11788
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">Umsatzsteuer-ID</h3>
                    <p>
                      Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE436397359
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">Aufsichtsbehörde</h3>
                    <p>
                      IHK München und Oberbayern – Industrie- und Handelskammer München und Oberbayern,
                      80323 München
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">Erlaubnis nach § 34c GewO</h3>
                    <p>
                      Erlaubnis nach § 34c Abs. 1 Satz 1 Nr. 1, 2, 3a und 3b GewO, erteilt durch die IHK
                      München und Oberbayern.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
                    </h3>
                    <p>Erik Eckert, Kreuzbergblick 8, 96120 Bischberg</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">EU-Streitschlichtung</h3>
                    <p>
                      Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                      bereit:{' '}
                      <a
                        href="https://ec.europa.eu/consumers/odr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline break-words"
                      >
                        https://ec.europa.eu/consumers/odr/
                      </a>
                      <br />
                      Unsere E-Mail-Adresse finden Sie oben im Impressum.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">Verbraucherstreitbeilegung</h3>
                    <p>
                      Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                      Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground mb-1">Haftung für Inhalte</h3>
                    <p>
                      Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
                      nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
                      Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                      Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                      rechtswidrige Tätigkeit hinweisen.
                    </p>
                    <p>
                      Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                      allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
                      erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
                      Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
                      entfernen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">Haftung für Links</h3>
                    <p>
                      Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                      Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
                      übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
                      Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
                      Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
                      Zeitpunkt der Verlinkung nicht erkennbar.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">Urheberrecht</h3>
                    <p>
                      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                      unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
                      und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
                      schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">1. Verantwortlicher</h3>
                    <p>
                      Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der
                      Datenschutz-Grundverordnung (DSGVO) ist:
                    </p>
                    <p className="mt-2">
                      Wertentwickler c/o realxtrade GmbH<br />
                      Kreuzbergblick 8<br />
                      96120 Bischberg<br />
                      Deutschland<br />
                      E-Mail:{' '}
                      <a href="mailto:info@wertentwickler.de" className="text-foreground hover:underline">
                        info@wertentwickler.de
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">2. Allgemeine Hinweise</h3>
                    <p>
                      Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst und behandeln sie
                      vertraulich sowie entsprechend den gesetzlichen Datenschutzvorschriften und dieser
                      Datenschutzerklärung. Personenbezogene Daten sind alle Daten, die auf Sie persönlich
                      beziehbar sind, z. B. Name, Adresse, E-Mail-Adressen oder Nutzerverhalten.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground mb-1">3. Server-Logfiles</h3>
                    <p>
                      Beim Aufruf dieser Website werden durch unseren Hosting-Provider automatisch
                      Informationen in sogenannten Server-Logfiles erhoben und gespeichert, die Ihr Browser
                      übermittelt. Dies sind:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Browsertyp und Browserversion</li>
                      <li>verwendetes Betriebssystem</li>
                      <li>Referrer-URL</li>
                      <li>Hostname des zugreifenden Rechners</li>
                      <li>Uhrzeit der Serveranfrage</li>
                      <li>IP-Adresse</li>
                    </ul>
                    <p>
                      Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die
                      Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber
                      hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der
                      Sicherheit seiner Website. Die Logfiles werden für maximal 7 Tage gespeichert und
                      anschließend gelöscht.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">4. Hosting</h3>
                    <p>
                      Diese Website wird gehostet bei: STRATO AG, Otto-Ostrowski-Straße 7, 10249 Berlin.
                    </p>
                    <p className="mt-2">
                      Die Verarbeitung erfolgt zum Zweck der Bereitstellung und Auslieferung der Website auf
                      Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO). Mit dem
                      Hosting-Provider besteht ein Vertrag über die Auftragsverarbeitung gemäß Art. 28 DSGVO.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">5. SSL- bzw. TLS-Verschlüsselung</h3>
                    <p>
                      Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
                      Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
                      daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und am
                      Schloss-Symbol in Ihrer Browserzeile.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground mb-1">6. Cookies</h3>
                    <p>
                      Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem
                      Endgerät gespeichert werden und keinen Schaden anrichten. Sie dienen dazu, unser
                      Angebot nutzerfreundlicher, effektiver und sicherer zu machen.
                    </p>
                    <p>
                      Wir unterscheiden zwischen technisch notwendigen Cookies und einwilligungspflichtigen
                      Cookies:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <span className="text-foreground">Technisch notwendige Cookies</span> sind
                        erforderlich, damit die Website technisch einwandfrei und optimiert funktioniert
                        (z. B. zur Speicherung Ihrer Cookie-Auswahl). Rechtsgrundlage ist unser berechtigtes
                        Interesse an einer technisch fehlerfreien Bereitstellung unserer Dienste
                        (Art. 6 Abs. 1 lit. f DSGVO bzw. § 25 Abs. 2 TDDDG). Diese Cookies werden ohne Ihre
                        Einwilligung gesetzt.
                      </li>
                      <li>
                        <span className="text-foreground">Einwilligungspflichtige Cookies</span> – insbesondere
                        Cookies zu Analyse-, Statistik- oder Marketingzwecken (z. B. durch Google Analytics,
                        siehe Ziffer 11) – werden ausschließlich mit Ihrer vorherigen ausdrücklichen
                        Einwilligung gesetzt. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a
                        DSGVO i. V. m. § 25 Abs. 1 TDDDG).
                      </li>
                    </ul>
                    <p>
                      Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen oder
                      anpassen (siehe Ziffer 7). Zudem können Sie Ihren Browser so einstellen, dass Sie über
                      das Setzen von Cookies informiert werden, Cookies nur im Einzelfall erlauben, die
                      Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das
                      automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der
                      Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground mb-1">
                      7. Einwilligungsverwaltung / Consent-Management
                    </h3>
                    <p>
                      Diese Website nutzt eine Technologie zur Einwilligungsverwaltung
                      (Consent-Management-Tool), um von Ihnen Einwilligungen zur Speicherung bestimmter
                      Cookies auf Ihrem Endgerät oder zum Einsatz bestimmter Technologien einzuholen und diese
                      datenschutzkonform zu dokumentieren. Beim Aufruf unserer Website wird Ihnen hierzu ein
                      Einwilligungsbanner („Cookie-Banner") angezeigt, über das Sie einwilligungspflichtige
                      Dienste aktiv auswählen und Ihre Einwilligung erteilen können.
                    </p>
                    <p>
                      Einwilligungspflichtige Dienste – insbesondere Google Analytics (siehe Ziffer 11) –
                      werden erst nach Ihrer aktiven Einwilligung geladen. Ohne bzw. bis zu Ihrer Einwilligung
                      werden keine entsprechenden Cookies gesetzt und keine Daten an die jeweiligen Anbieter
                      übermittelt.
                    </p>
                    <p>
                      Zur Steuerung der eingesetzten Google-Dienste verwenden wir den Google Consent Mode v2.
                      Dabei wird Ihr Einwilligungsstatus (erteilt / nicht erteilt) an Google übermittelt und
                      steuert, ob und in welchem Umfang die Google-Dienste Cookies setzen und Daten
                      verarbeiten. Erteilen Sie keine Einwilligung, werden Cookies unterdrückt; es können in
                      diesem Fall allenfalls anonymisierte, cookielose Signale (sogenannte
                      „Consent-Mode-Pings") ohne Personenbezug an Google übermittelt werden, um aggregierte,
                      modellierte Statistiken zu ermöglichen.
                    </p>
                    <p>
                      Ihre erteilte oder verweigerte Einwilligung wird gespeichert, damit Ihnen die Abfrage
                      nicht bei jedem Seitenaufruf erneut angezeigt werden muss. Die Speicherung erfolgt auf
                      Grundlage unserer gesetzlichen Verpflichtung zur Nachweisbarkeit von Einwilligungen
                      (Art. 6 Abs. 1 lit. c DSGVO i. V. m. Art. 7 Abs. 1 DSGVO). Sie können Ihre Einwilligung
                      jederzeit mit Wirkung für die Zukunft widerrufen oder Ihre Auswahl ändern, indem Sie die
                      Cookie-Einstellungen über den entsprechenden Link bzw. das Banner auf unserer Website
                      erneut aufrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung
                      bleibt vom Widerruf unberührt.
                    </p>
                    <button
                      type="button"
                      onClick={() => { onClose(); openConsentSettings() }}
                      className="inline-flex px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium hover:brightness-95 transition-colors"
                    >
                      Cookie-Einstellungen öffnen
                    </button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground mb-1">8. Kontaktformular</h3>
                    <p>
                      Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
                      dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten (Name,
                      E-Mail-Adresse, Angaben zu Ihrem Objekt bzw. Ihrer Situation) zwecks Bearbeitung der
                      Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                    </p>
                    <p>
                      Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
                      sowie zur Anbahnung bzw. Erfüllung eines Vertrages (Art. 6 Abs. 1 lit. b DSGVO). Sie
                      können diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, etwa per
                      E-Mail an{' '}
                      <a href="mailto:info@wertentwickler.de" className="text-foreground hover:underline">
                        info@wertentwickler.de
                      </a>
                      .
                    </p>
                    <p>
                      Zur Nachweisbarkeit Ihrer Einwilligung gemäß Art. 7 Abs. 1 DSGVO protokollieren wir zum
                      Zeitpunkt des Absendens des Formulars zusätzlich Ihre IP-Adresse und einen Zeitstempel.
                      Diese Angaben werden mit Ihrer Anfrage gemeinsam an{' '}
                      <a href="mailto:info@wertentwickler.de" className="text-foreground hover:underline">
                        info@wertentwickler.de
                      </a>{' '}
                      übermittelt und dort gespeichert. Rechtsgrundlage ist unser berechtigtes Interesse an
                      einem rechtssicheren Nachweis erteilter Einwilligungen (Art. 6 Abs. 1 lit. f DSGVO
                      i. V. m. Art. 7 Abs. 1 DSGVO).
                    </p>
                    <p>
                      Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur
                      Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die
                      Datenspeicherung entfällt. Zwingende gesetzliche Aufbewahrungsfristen – insbesondere
                      handels- und steuerrechtliche – bleiben unberührt.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">9. Anfragen per E-Mail oder Telefon</h3>
                    <p>
                      Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller
                      daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zweck der Bearbeitung
                      Ihres Anliegens bei uns gespeichert und verarbeitet (Art. 6 Abs. 1 lit. b bzw. f DSGVO).
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground mb-1">10. Bewerbungen</h3>
                    <p>
                      Wenn Sie sich per E-Mail auf eine ausgeschriebene Stelle oder initiativ bei uns
                      bewerben, verarbeiten wir die übermittelten personenbezogenen Daten ausschließlich zum
                      Zweck der Durchführung des Bewerbungsverfahrens (Art. 88 DSGVO i. V. m. § 26 BDSG sowie
                      Art. 6 Abs. 1 lit. b DSGVO).
                    </p>
                    <p>
                      Bewerbungsunterlagen werden bei einer Absage spätestens sechs Monate nach Abschluss des
                      Bewerbungsverfahrens gelöscht, sofern Sie nicht ausdrücklich in eine längere Speicherung
                      (z. B. Aufnahme in einen Bewerberpool) eingewilligt haben.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground mb-1">11. Webanalyse mit Google Analytics 4</h3>
                    <p>
                      Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics 4 (GA4). Anbieter
                      ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google").
                    </p>

                    <h4 className="font-medium text-foreground pt-1">Zweck und Umfang der Verarbeitung</h4>
                    <p>
                      Google Analytics ermöglicht es uns, das Verhalten der Websitebesucher zu analysieren und
                      statistisch auszuwerten. Dabei erfasst Google unter anderem Ihre (gekürzte) IP-Adresse,
                      Informationen zu Ihrem Endgerät und Browser, Ihren ungefähren Standort, die aufgerufenen
                      Seiten, Verweildauer, Interaktionen sowie den Zeitpunkt und die Herkunft des Zugriffs
                      (Referrer). Zu diesem Zweck setzt Google Analytics Cookies (u. a. _ga,
                      _ga_&lt;Container-ID&gt;) und vergleichbare Wiedererkennungstechnologien ein und weist
                      Ihrem Endgerät eine pseudonyme Kennung (Client-/User-ID) zu. Wir nutzen die so gewonnenen
                      Erkenntnisse ausschließlich zur Optimierung unseres Online-Angebots. Eine Zusammenführung
                      mit anderen Datenquellen erfolgt nicht.
                    </p>
                    <p>
                      Google Analytics 4 kürzt IP-Adressen innerhalb der EU/des EWR standardmäßig, bevor sie an
                      Server von Google übermittelt werden (IP-Anonymisierung). Nur in Ausnahmefällen wird die
                      volle IP-Adresse an einen Server von Google übertragen und dort gekürzt. Eine
                      Personenidentifizierung anhand der IP-Adresse durch uns findet nicht statt.
                    </p>

                    <h4 className="font-medium text-foreground pt-1">Rechtsgrundlage</h4>
                    <p>
                      Die Nutzung von Google Analytics erfolgt ausschließlich auf Grundlage Ihrer Einwilligung
                      (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG), die Sie über unser
                      Consent-Management-Tool (siehe Ziffer 7) erteilen. Ohne Ihre Einwilligung wird Google
                      Analytics nicht geladen und es werden keine Analyse-Cookies gesetzt. Sie können Ihre
                      Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie Ihre
                      Cookie-Einstellungen auf unserer Website erneut aufrufen und anpassen.
                    </p>

                    <h4 className="font-medium text-foreground pt-1">Datenübermittlung in die USA</h4>
                    <p>
                      Eine Übermittlung Ihrer Daten in die USA bzw. an die Google LLC (1600 Amphitheatre
                      Parkway, Mountain View, CA 94043, USA) kann nicht ausgeschlossen werden. Google LLC ist
                      unter dem EU-US Data Privacy Framework (DPF) zertifiziert; für Datenübermittlungen in die
                      USA besteht insoweit ein Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO).
                      Ergänzend hat Google zur Absicherung von Datenübermittlungen in Drittländer die
                      Standardvertragsklauseln der EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO) abgeschlossen.
                      Wir weisen darauf hin, dass bei einer Verarbeitung in den USA ein mit der EU
                      vergleichbares Datenschutzniveau nicht in jedem Fall gewährleistet werden kann und
                      insbesondere ein Zugriff durch US-Behörden nicht vollständig ausgeschlossen ist.
                    </p>

                    <h4 className="font-medium text-foreground pt-1">Auftragsverarbeitung</h4>
                    <p>
                      Wir haben mit Google einen Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO
                      abgeschlossen und setzen die Vorgaben der deutschen Datenschutzbehörden bei der Nutzung
                      von Google Analytics vollständig um.
                    </p>

                    <h4 className="font-medium text-foreground pt-1">Speicherdauer</h4>
                    <p>
                      Die bei Google Analytics erfassten Nutzer- und Ereignisdaten werden nach einer von uns
                      eingestellten Aufbewahrungsdauer von 14 Monaten automatisch
                      gelöscht. Die von Google Analytics gesetzten Cookies haben eine Speicherdauer von bis zu
                      2 Jahren, sofern Sie diese nicht vorher löschen.
                    </p>

                    <h4 className="font-medium text-foreground pt-1">Widerspruch / Deaktivierung</h4>
                    <p>
                      Sie können die Erfassung durch Google Analytics jederzeit verhindern, indem Sie in
                      unserem Cookie-Banner keine oder eine widerrufende Auswahl treffen. Darüber hinaus können
                      Sie die Erfassung und Verarbeitung Ihrer Daten durch das von Google bereitgestellte
                      Browser-Add-on zur Deaktivierung von Google Analytics verhindern:{' '}
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline break-words"
                      >
                        https://tools.google.com/dlpage/gaoptout
                      </a>
                      .
                    </p>
                    <p>
                      Weitere Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der
                      Datenschutzerklärung von Google:{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline break-words"
                      >
                        https://policies.google.com/privacy
                      </a>{' '}
                      sowie in den Hinweisen zu Google Analytics:{' '}
                      <a
                        href="https://support.google.com/analytics/answer/6004245"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline break-words"
                      >
                        https://support.google.com/analytics/answer/6004245
                      </a>
                      .
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-foreground mb-1">12. Google Fonts</h3>
                    <p>
                      Diese Website nutzt zur einheitlichen Darstellung von Schriftarten sogenannte Web Fonts,
                      die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die
                      benötigten Web Fonts in Ihren Browser-Cache, um Texte und Schriftarten korrekt
                      anzuzeigen. Dabei wird eine Verbindung zu Servern von Google (Google Ireland Limited,
                      Gordon House, Barrow Street, Dublin 4, Irland) hergestellt und Ihre IP-Adresse an Google
                      übermittelt.
                    </p>
                    <p>
                      Die Nutzung von Google Fonts erfolgt im Interesse einer einheitlichen und ansprechenden
                      Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von
                      Art. 6 Abs. 1 lit. f DSGVO dar. Weitere Informationen zu Google Fonts finden Sie in der
                      Datenschutzerklärung von Google:{' '}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline break-words"
                      >
                        https://policies.google.com/privacy
                      </a>
                      .
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground mb-1">13. Ihre Rechte als betroffene Person</h3>
                    <p>Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten folgende Rechte zu:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Auskunft (Art. 15 DSGVO)</li>
                      <li>Berichtigung (Art. 16 DSGVO)</li>
                      <li>Löschung (Art. 17 DSGVO)</li>
                      <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                      <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                      <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                      <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
                    </ul>
                    <p>
                      Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an{' '}
                      <a href="mailto:info@wertentwickler.de" className="text-foreground hover:underline">
                        info@wertentwickler.de
                      </a>
                      .
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      14. Beschwerderecht bei der Aufsichtsbehörde
                    </h3>
                    <p>
                      Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
                      Ihrer personenbezogenen Daten zu beschweren. Zuständig für uns ist:
                    </p>
                    <p className="mt-2">
                      Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br />
                      Promenade 18<br />
                      91522 Ansbach<br />
                      Telefon: +49 (0) 981 180093-0<br />
                      Telefax: +49 (0) 981 180093-800<br />
                      E-Mail:{' '}
                      <a href="mailto:poststelle@lda.bayern.de" className="text-foreground hover:underline">
                        poststelle@lda.bayern.de
                      </a>
                      <br />
                      Web:{' '}
                      <a
                        href="https://www.lda.bayern.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:underline"
                      >
                        www.lda.bayern.de
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      15. Aktualität und Änderung dieser Datenschutzerklärung
                    </h3>
                    <p>
                      Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer
                      Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es
                      notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Fassung
                      kann jederzeit auf dieser Website abgerufen werden.
                    </p>
                    <p className="mt-3 text-muted-foreground/70">Stand: Juli 2026</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
