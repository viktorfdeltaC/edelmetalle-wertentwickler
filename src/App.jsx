import { useScroll, useTransform, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import PriceTicker from './components/PriceTicker'
import Hero from './components/Hero'
import WhyPreciousMetals from './components/WhyPreciousMetals'
import HowItWorks from './components/HowItWorks'
import AboutUs from './components/AboutUs'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

const noiseBg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E"

const Divider = () => (
  <div className="h-px w-full bg-[#C9A84C]/30" />
)

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] h-[3px] pointer-events-none"
      style={{ width, background: 'linear-gradient(to right, #C9A84C, #F5D78E)' }}
    />
  )
}

export default function App() {
  return (
    <div className="bg-[#0A0A0A] text-gray-200">
      <ScrollProgressBar />
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{ backgroundImage: `url("${noiseBg}")`, opacity: 0.04 }}
      />
      <Navbar />
      <PriceTicker />
      <main>
        <Hero />
        <Divider />
        <WhyPreciousMetals />
        <Divider />
        <HowItWorks />
        <Divider />
        <AboutUs />
        <Divider />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
