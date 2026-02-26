import './Footer.css'

const QUICK_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'quiz', label: 'Compatibility Quiz' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'signup', label: 'Notify Me' },
]

const LEGAL = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__col">
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__list">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    className="footer__link"
                    onClick={() => onNavigate(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__heading">Legal & Support</h3>
            <ul className="footer__list">
              {LEGAL.map((item) => (
                <li key={item.label}>
                  <a className="footer__link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} ROOMIEMATCH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
