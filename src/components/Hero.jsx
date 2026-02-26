import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero({ onCtaClick, onSecondaryClick }) {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__gradient" />
      </div>
      <div className="hero__content">
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          FIND YOUR VIBE
        </motion.h1>
        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Match with roommates who share your lifestyle. Take the quiz and get paired with your ideal fit.
        </motion.p>
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            type="button"
            className="hero__cta hero__cta--primary"
            onClick={onCtaClick}
          >
            Take the Quiz
          </button>
          <button
            type="button"
            className="hero__cta hero__cta--secondary"
            onClick={onSecondaryClick}
          >
            Notify Me
          </button>
        </motion.div>
      </div>
    </section>
  )
}
