import { motion } from 'framer-motion'
import './HowItWorks.css'

const STEPS = [
  {
    step: 1,
    title: 'Take the Quiz',
    description: 'Answer a few questions about your sleep, social style, cleanliness, and budget. We use this to find your vibe.',
    icon: '📋',
  },
  {
    step: 2,
    title: 'Get Matched',
    description: 'Our algorithm pairs you with roommates who share your lifestyle preferences. No more awkward surprises.',
    icon: '🎯',
  },
  {
    step: 3,
    title: 'Connect & Move In',
    description: 'Chat with your matches, pick your ideal roommate, and move in with confidence.',
    icon: '🏠',
  },
]

export default function HowItWorks() {
  return (
    <section className="section how-it-works">
      <div className="how-it-works__inner">
        <motion.h2
          className="how-it-works__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          HOW IT WORKS
        </motion.h2>
        <motion.p
          className="how-it-works__subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Three simple steps to find your perfect roommate.
        </motion.p>
        <div className="how-it-works__grid">
          {STEPS.map((item, i) => (
            <motion.article
              key={item.step}
              className="how-it-works__card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <span className="how-it-works__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="how-it-works__step-num">Step {item.step}</span>
              <h3 className="how-it-works__card-title">{item.title}</h3>
              <p className="how-it-works__card-desc">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
