import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyPreciousMetals from './components/WhyPreciousMetals'
import HowItWorks from './components/HowItWorks'
import AboutUs from './components/AboutUs'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-gray-200">
      <Navbar />
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
