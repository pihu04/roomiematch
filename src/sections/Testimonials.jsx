import { motion } from 'framer-motion'
import './Testimonials.css'

const ITEMS = [
  {
    quote: 'Finally found a roommate who actually sleeps at the same time as me. No more 3am kitchen runs.',
    author: 'Jordan M.',
    role: 'University of Texas',
  },
  {
    quote: 'The quiz nailed it. My roommate and I have the same cleanliness vibe and it’s made living together so easy.',
    author: 'Sam K.',
    role: 'NYU',
  },
  {
    quote: 'I was nervous about random matching. ROOMIEMATCH made it feel like we chose each other.',
    author: 'Alex R.',
    role: 'UC Berkeley',
  },
]

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="testimonials__inner">
        <motion.h2
          className="testimonials__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          WHAT PEOPLE SAY
        </motion.h2>
        <motion.p
          className="testimonials__subtitle"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Students who found their vibe with ROOMIEMATCH.
        </motion.p>
        <div className="testimonials__grid">
          {ITEMS.map((item, i) => (
            <motion.blockquote
              key={item.author}
              className="testimonials__card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <p className="testimonials__quote">"{item.quote}"</p>
              <footer className="testimonials__author">
                <strong>{item.author}</strong>
                <span>{item.role}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
