// Zentrale externe Links.

// Registrierungsseite der Edelmetall-Pipeline (Tippgeber-/FDL-Onboarding, separate App).
// Kommt aus VITE_EM_REGISTER_URL (Build-Zeit), damit Live/Staging/lokal je auf die
// richtige Domain zeigen. Fallback = lokales Laravel-Backend.
//
//   Live    → https://app.wertentwickler.de/edelmetalle/register
//   Staging → https://dev.wertentwickler.de/edelmetalle/register
//   lokal   → http://127.0.0.1:8000/edelmetalle/register
export const REGISTER_URL =
  import.meta.env.VITE_EM_REGISTER_URL || 'http://127.0.0.1:8000/edelmetalle/register'
