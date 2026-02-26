import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'signup', label: 'Notify Me' },
]

export default function Navbar({ currentSection, onNavigate, onQuizClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (id) => {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <button
          className="navbar__logo"
          onClick={() => handleNav('home')}
          type="button"
          aria-label="Go to home"
        >
          ROOMIEMATCH
        </button>
        <nav className="navbar__desktop">
          {LINKS.map((link) => (
            <button
              key={link.id}
              className={`navbar__link ${currentSection === link.id ? 'navbar__link--active' : ''}`}
              onClick={() => handleNav(link.id)}
              type="button"
            >
              {link.label}
            </button>
          ))}
          <button
            className="navbar__cta"
            onClick={() => {
              setMenuOpen(false)
              onQuizClick()
            }}
            type="button"
          >
            Take the Quiz
          </button>
        </nav>
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {LINKS.map((link) => (
              <button
                key={link.id}
                className={`navbar__mobile-link ${currentSection === link.id ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => handleNav(link.id)}
                type="button"
              >
                {link.label}
              </button>
            ))}
            <button
              className="navbar__mobile-cta"
              onClick={() => {
                onQuizClick()
                setMenuOpen(false)
              }}
              type="button"
            >
              Take the Quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
