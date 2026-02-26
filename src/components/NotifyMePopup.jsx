import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './NotifyMePopup.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const POPUP_INTERVAL_MS = 30 * 1000 // 30 seconds

export default function NotifyMePopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [toast, setToast] = useState(false)

  useEffect(() => {
    const show = () => setVisible(true)
    const id = setInterval(show, POPUP_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  const handleClose = () => setVisible(false)

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
    setVisible(false)
    setTimeout(() => setToast(false), 4000)
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="notify-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="notify-popup__backdrop"
              onClick={handleClose}
              aria-label="Close"
            />
            <motion.div
              className="notify-popup__panel"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button
                type="button"
                className="notify-popup__close"
                onClick={handleClose}
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="notify-popup__title">Stay in the loop</h3>
              <p className="notify-popup__subtitle">
                Get notified when we launch. Enter your email below.
              </p>
              <form className="notify-popup__form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="notify-popup__input"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                {error && <span className="notify-popup__error">{error}</span>}
                <button type="submit" className="notify-popup__submit">
                  Notify Me
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="notify-popup__toast"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            You're on the list! We'll notify you when we launch.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
