import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useHomeNavigation from '../../hooks/useHomeNavigation'
import { ROLES } from '../../config/roles'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const goToSection = useHomeNavigation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const close = () => setOpen(false)

  const linkClass = ({ isActive }) =>
    `navbar__link${isActive ? ' navbar__link--active' : ''}`

  return (
    <header className="navbar">
      <nav className="navbar__nav container">
        <Link
          to="/"
          className="navbar__brand"
          onClick={() => {
            close()
            window.scrollTo({ top: 0 })
          }}
        >
          <span className="navbar__name">Tomobility</span>
        </Link>

        <div className="navbar__links">
          <NavLink
            to="/"
            className={linkClass}
            end
            onClick={() => window.scrollTo({ top: 0 })}
          >
            Accueil
          </NavLink>
          <NavLink to="/vente" className={linkClass}>
            Acheter
          </NavLink>
          <NavLink to="/location" className={linkClass}>
            Louer
          </NavLink>
          <button
            type="button"
            className="navbar__link"
            onClick={() => goToSection('a-propos')}
          >
            À propos
          </button>
          <button
            type="button"
            className="navbar__link"
            onClick={() => goToSection('contact')}
          >
            Contact
          </button>
          {user && user.role === ROLES.CLIENT && (
            <NavLink to="/client/mes-reservations" className={linkClass}>
              Mes réservations
            </NavLink>
          )}
        </div>

        <div className="navbar__actions">
          {user ? (
            <>
              <span className="navbar__greeting">
                {user.prenom || user.nom || user.email}
              </span>
              {user.role !== 'CLIENT' && (
                <Link
                  to={user.role === 'ADMIN' ? '/admin' : '/owner'}
                  className="btn btn--primary btn--sm"
                >
                  Tableau de bord
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn--outline btn--sm"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost btn--sm">
                Connexion
              </Link>
              <Link to="/register" className="btn btn--primary btn--sm">
                S'inscrire
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className={`navbar__toggle${open ? ' navbar__toggle--open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {open && (
        <div className="navbar__mobile">
          <NavLink
            to="/"
            className={linkClass}
            end
            onClick={() => {
              close()
              window.scrollTo({ top: 0 })
            }}
          >
            Accueil
          </NavLink>
          <NavLink to="/vente" className={linkClass} onClick={close}>
            Acheter
          </NavLink>
          <NavLink to="/location" className={linkClass} onClick={close}>
            Louer
          </NavLink>
          <button
            type="button"
            className="navbar__link"
            onClick={() => {
              close()
              goToSection('a-propos')
            }}
          >
            À propos
          </button>
          <button
            type="button"
            className="navbar__link"
            onClick={() => {
              close()
              goToSection('contact')
            }}
          >
            Contact
          </button>
          {user && user.role === ROLES.CLIENT && (
            <NavLink to="/client/mes-reservations" className={linkClass} onClick={close}>
              Mes réservations
            </NavLink>
          )}

          <div className="navbar__mobile-actions">
            {user ? (
              <>
                {user.role !== 'CLIENT' && (
                  <Link
                    to={user.role === 'ADMIN' ? '/admin' : '/owner'}
                    className="btn btn--primary btn--block"
                    onClick={close}
                  >
                    Tableau de bord
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    close()
                    handleLogout()
                  }}
                  className="btn btn--outline btn--block"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn--outline btn--block" onClick={close}>
                  Connexion
                </Link>
                <Link to="/register" className="btn btn--primary btn--block" onClick={close}>
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
