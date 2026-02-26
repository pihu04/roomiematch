import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactGA from 'react-ga4'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import HowItWorks from './sections/HowItWorks'
import Pricing from './sections/Pricing'
import Testimonials from './sections/Testimonials'
import Signup from './sections/Signup'
import Quiz from './components/Quiz'
import NotifyMePopup from './components/NotifyMePopup'
import './App.css'

const GA_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX'

const SECTIONS = [
  'home',
  'how-it-works',
  'quiz',
  'pricing',
  'testimonials',
  'signup',
]

function App() {
  const [section, setSection] = useState('home')
  const [quizOpen, setQuizOpen] = useState(false)

  useEffect(() => {
    if (GA_ID && GA_ID !== 'G-XXXXXXXXXX') {
      ReactGA.initialize(GA_ID)
      ReactGA.send({ hitType: 'page_view', page: '/', title: 'ROOMIEMATCH Home' })
    }
  }, [])

  useEffect(() => {
    if (GA_ID && GA_ID !== 'G-XXXXXXXXXX') {
      ReactGA.send({
        hitType: 'page_view',
        page: `/${section}`,
        title: `ROOMIEMATCH - ${section}`,
      })
    }
  }, [section])

  const goTo = (target) => {
    if (SECTIONS.includes(target)) setSection(target)
  }

  const openQuiz = () => setQuizOpen(true)
  const closeQuiz = () => setQuizOpen(false)

  const renderSection = () => {
    switch (section) {
      case 'home':
        return (
          <Hero onCtaClick={() => goTo('quiz')} onSecondaryClick={() => goTo('signup')} />
        )
      case 'how-it-works':
        return <HowItWorks />
      case 'quiz':
        return (
          <section className="section">
            <Quiz onClose={() => goTo('home')} embedded />
          </section>
        )
      case 'pricing':
        return <Pricing onNavigate={goTo} />
      case 'testimonials':
        return <Testimonials />
      case 'signup':
        return <Signup />
      default:
        return (
          <Hero onCtaClick={() => goTo('quiz')} onSecondaryClick={() => goTo('signup')} />
        )
    }
  }

  return (
    <div className="app">
      <Navbar
        currentSection={section}
        onNavigate={goTo}
        onQuizClick={openQuiz}
      />
      <main className="app__main">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={goTo} />
      {quizOpen && (
        <Quiz onClose={closeQuiz} asModal />
      )}
      <NotifyMePopup />
    </div>
  )
}

export default App
