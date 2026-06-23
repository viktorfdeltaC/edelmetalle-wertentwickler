import Navbar from './components/Navbar'
import PriceTicker from './components/PriceTicker'
import Hero from './components/Hero'
import GoldSequence from './components/GoldSequence'
import SwissStorage from './components/SwissStorage'
import WhyPreciousMetals from './components/WhyPreciousMetals'
import GoldPerformance from './components/GoldPerformance'
import GoldBand from './components/GoldBand'
import HowItWorks from './components/HowItWorks'
import UseCases from './components/UseCases'
import FAQ from './components/FAQ'
import AboutUs from './components/AboutUs'
import VideoFeature from './components/VideoFeature'
import Testimonials from './components/Testimonials'
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
        <GoldSequence />
        <SwissStorage />
        <WhyPreciousMetals />
        <GoldPerformance />
        <GoldBand />
        <HowItWorks />
        <UseCases />
        <FAQ />
        <AboutUs />
        <VideoFeature />
        <Testimonials />
        <CTASection />
        <Finanzdienstleister />
        <Tippgeber />
      </main>
      <Footer />
    </div>
  )
}
