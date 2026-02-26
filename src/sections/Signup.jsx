import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Signup.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Signup() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [toast, setToast] = useState(false)

  const validate = () => {
    if (!email.trim()) {
      setError('Email is required.')
      return false
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError('Please enter a valid email address.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setToast(true)
    setEmail('')
    setError('')
    setTimeout(() => setToast(false), 4000)
  }

  return (
    <section className="section signup">
      <div className="signup__inner">
        <motion.h2
          className="signup__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          NOTIFY ME
        </motion.h2>
        <motion.p
          className="signup__subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Get early access when we launch. Enter your email below.
        </motion.p>
        <motion.form
          className="signup__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="signup__field">
            <label htmlFor="signup-email" className="signup__label">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              className="signup__input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {error && <span className="signup__error">{error}</span>}
          </div>
          <button type="submit" className="signup__submit">
            Notify Me
          </button>
        </motion.form>
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="signup__toast"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            You're on the list! We'll notify you when we launch.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
