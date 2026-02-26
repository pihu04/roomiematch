import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactGA from 'react-ga4'
import './Quiz.css'

const STEPS_CONFIG = [
  {
    id: 'sleep',
    title: 'Sleep Schedule',
    icon: '🌙',
    options: [
      { id: 'early', label: 'Early bird', value: 'structured', icon: '🌅' },
      { id: 'night', label: 'Night owl', value: 'flexible', icon: '🦉' },
      { id: 'flex', label: 'Flexible', value: 'balanced', icon: '😴' },
    ],
  },
  {
    id: 'social',
    title: 'Social Preferences',
    icon: '👥',
    options: [
      { id: 'intro', label: 'Introvert', value: 'quiet', icon: '📚' },
      { id: 'extra', label: 'Extrovert', value: 'social', icon: '🎉' },
      { id: 'bal', label: 'Balanced', value: 'balanced', icon: '⚖️' },
    ],
  },
  {
    id: 'cleanliness',
    title: 'Cleanliness',
    icon: '✨',
    options: [
      { id: 'minimal', label: 'Minimalist', value: 'structured', icon: '🧹' },
      { id: 'tidy', label: 'Tidy', value: 'balanced', icon: '📦' },
      { id: 'relaxed', label: 'Relaxed', value: 'flexible', icon: '🛋️' },
    ],
  },
  {
    id: 'study',
    title: 'Study Style',
    icon: '📖',
    options: [
      { id: 'quiet', label: 'Quiet focus', value: 'structured', icon: '🔇' },
      { id: 'noise', label: 'Background noise ok', value: 'flexible', icon: '🎧' },
      { id: 'group', label: 'Group study', value: 'social', icon: '👩‍🏫' },
    ],
  },
  {
    id: 'expenses',
    title: 'Expenses / Budget Style',
    icon: '💰',
    options: [
      { id: 'split', label: 'Split everything', value: 'structured', icon: '🧾' },
      { id: 'flexible', label: 'Flexible', value: 'balanced', icon: '🤝' },
      { id: 'separate', label: 'Keep separate', value: 'flexible', icon: '📌' },
    ],
  },
]

const PROFILES = {
  structured: {
    title: 'Structured Harmony',
    icon: '🏠',
    description: 'You thrive with clear routines and a tidy space. You prefer roommates who respect boundaries and keep things organized. Early risers and split-the-bill types are your vibe.',
  },
  flexible: {
    title: 'Chill & Adaptable',
    icon: '🌿',
    description: 'You go with the flow and don’t sweat the small stuff. You’re fine with different sleep schedules and a relaxed approach to cleaning. Your ideal roommate is easygoing and low-drama.',
  },
  balanced: {
    title: 'Balanced Connection',
    icon: '⚖️',
    description: 'You like a mix of structure and flexibility. You value communication and compromise. Your ideal roommate is someone who meets you in the middle on cleanliness, noise, and shared expenses.',
  },
  social: {
    title: 'Social Synergy',
    icon: '🎯',
    description: 'You enjoy having people around and don’t mind a busier space. Your ideal roommate is someone who’s up for hanging out but also respects when you need to focus.',
  },
  quiet: {
    title: 'Quiet Focus',
    icon: '📚',
    description: 'You prefer a calm, low-stimulation environment. Your ideal roommate respects quiet hours and keeps shared spaces uncluttered so you can concentrate.',
  },
}

function getProfileType(answers) {
  const values = Object.values(answers).filter(Boolean)
  if (values.length === 0) return 'balanced'
  const counts = {}
  values.forEach((v) => { counts[v] = (counts[v] || 0) + 1 })
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted[0][0]
}

const GA_ID = import.meta.env.VITE_GA_ID

export default function Quiz({ onClose, asModal, embedded }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const [profileType, setProfileType] = useState(null)

  const currentStepConfig = STEPS_CONFIG[step]
  const isLastStep = step === STEPS_CONFIG.length - 1
  const totalSteps = STEPS_CONFIG.length

  const selectOption = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option.value }))
  }

  const next = () => {
    if (isLastStep) {
      const result = getProfileType(answers)
      setProfileType(result)
      setDone(true)
      if (GA_ID && GA_ID !== 'G-XXXXXXXXXX') {
        ReactGA.event({
          category: 'Quiz',
          action: 'quiz_completed',
          label: result,
        })
      }
    } else {
      setStep((s) => s + 1)
    }
  }

  const canNext = answers[currentStepConfig?.id] != null

  useEffect(() => {
    if (asModal) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [asModal])

  const content = (
    <div className={`quiz ${asModal ? 'quiz--modal' : ''} ${embedded ? 'quiz--embedded' : ''}`}>
      {asModal && (
        <button
          type="button"
          className="quiz__backdrop"
          onClick={onClose}
          aria-label="Close quiz"
        />
      )}
      <div className="quiz__panel">
        {asModal && (
          <button
            type="button"
            className="quiz__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={`step-${step}`}
              className="quiz__step"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="quiz__progress">
                <span className="quiz__progress-text">
                  {step + 1} of {totalSteps}
                </span>
                <div className="quiz__progress-bar">
                  <motion.span
                    className="quiz__progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <h2 className="quiz__question-title">
                <span className="quiz__question-icon" aria-hidden="true">
                  {currentStepConfig.icon}
                </span>
                {currentStepConfig.title}
              </h2>
              <div className="quiz__options">
                {currentStepConfig.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`quiz__option ${answers[currentStepConfig.id] === opt.value ? 'quiz__option--selected' : ''}`}
                    onClick={() => selectOption(currentStepConfig.id, opt)}
                  >
                    <span className="quiz__option-icon">{opt.icon}</span>
                    <span className="quiz__option-label">{opt.label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="quiz__next"
                onClick={next}
                disabled={!canNext}
              >
                {isLastStep ? 'See my profile' : 'Next'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              className="quiz__summary"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <span className="quiz__summary-icon" aria-hidden="true">
                {PROFILES[profileType]?.icon || '🏠'}
              </span>
              <h2 className="quiz__summary-title">
                {PROFILES[profileType]?.title || 'Your Profile'}
              </h2>
              <p className="quiz__summary-desc">
                {PROFILES[profileType]?.description || ''}
              </p>
              <button type="button" className="quiz__summary-cta" onClick={onClose}>
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )

  if (embedded) {
    return (
      <div className="quiz-wrap quiz-wrap--embedded">
        {content}
      </div>
    )
  }

  return content
}
