import { Outlet, Link } from 'react-router-dom'
import Navbar from './Navbar'
import useHomeNavigation from '../../hooks/useHomeNavigation'
import './PublicLayout.css'

export default function PublicLayout() {
  const goToSection = useHomeNavigation()

  return (
    <div className="public-layout">
      <Navbar />
      <main className="public-layout__main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container site-footer__grid">
          <div className="site-footer__brand-col">
            <span className="site-footer__brand">
              Tomo<span>bility.ma</span>
            </span>
            <p className="site-footer__tagline">
              Achat et location de voitures partout au Maroc.
            </p>
          </div>
          <nav className="site-footer__nav" aria-label="Navigation pied de page">
            <span className="site-footer__nav-title">Navigation</span>
            <Link to="/vente" className="site-footer__link">
              Vente
            </Link>
            <Link to="/location" className="site-footer__link">
              Location
            </Link>
            <button
              type="button"
              className="site-footer__link"
              onClick={() => goToSection('a-propos')}
            >
              À propos
            </button>
            <button
              type="button"
              className="site-footer__link"
              onClick={() => goToSection('contact')}
            >
              Contact
            </button>
          </nav>
        </div>
        <div className="container site-footer__bottom">
          <p className="site-footer__copy">
            © 2026 Tomobilty.ma. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}