import Navbar from './components/Navbar'
import PriceTicker from './components/PriceTicker'
import Hero from './components/Hero'
import WhyPreciousMetals from './components/WhyPreciousMetals'
import HowItWorks from './components/HowItWorks'
import AboutUs from './components/AboutUs'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-dvh bg-background text-foreground grain">
      <Navbar />
      <PriceTicker />
      <main>
        <Hero />
        <WhyPreciousMetals />
        <HowItWorks />
        <AboutUs />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
