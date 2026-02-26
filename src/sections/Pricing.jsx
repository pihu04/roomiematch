import { motion } from 'framer-motion'
import './Pricing.css'

const PLANS = [
  {
    name: 'Finding a Roommate',
    description: 'Take the quiz, get matched, and find your ideal roommate.',
    price: 'Free',
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Listing a Room',
    description: 'Post your room and get matched with compatible roommates looking for a place.',
    price: 'Free',
    cta: 'List Your Room',
    highlight: true,
  },
]

export default function Pricing({ onNavigate }) {
  return (
    <section className="section pricing">
      <div className="pricing__inner">
        <motion.h2
          className="pricing__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          SIMPLE PRICING
        </motion.h2>
        <motion.p
          className="pricing__subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Join the waitlist — we're launching soon. Early access is free.
        </motion.p>
        <div className="pricing__grid">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              className={`pricing__card ${plan.highlight ? 'pricing__card--highlight' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h3 className="pricing__card-title">{plan.name}</h3>
              <p className="pricing__card-desc">{plan.description}</p>
              <p className="pricing__card-price">{plan.price}</p>
              <button
                type="button"
                className="pricing__card-cta"
                onClick={() => onNavigate?.(plan.highlight ? 'signup' : 'quiz')}
              >
                {plan.cta}
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
