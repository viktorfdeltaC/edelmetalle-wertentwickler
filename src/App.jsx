import Navbar from './components/Navbar'
import PriceTicker from './components/PriceTicker'
import Hero from './components/Hero'
import PhysicalGold from './components/PhysicalGold'
import SwissStorage from './components/SwissStorage'
import WhyPreciousMetals from './components/WhyPreciousMetals'
import GoldPerformance from './components/GoldPerformance'
import HowItWorks from './components/HowItWorks'
import AboutUs from './components/AboutUs'
import CTASection from './components/CTASection'
import Finanzdienstleister from './components/Finanzdienstleister'
import Tippgeber from './components/Tippgeber'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-dvh bg-background text-foreground grain">
      <Navbar />
      <PriceTicker />
      <main>
        <Hero />
        <PhysicalGold />
        <SwissStorage />
        <WhyPreciousMetals />
        <GoldPerformance />
        <HowItWorks />
        <AboutUs />
        <CTASection />
        <Finanzdienstleister />
        <Tippgeber />
      </main>
      <Footer />
    </div>
  )
}
