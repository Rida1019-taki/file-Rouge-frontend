import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { ROLES } from '../../config/roles'
import './Sidebar.css'

export default function Sidebar({ open = false, onNavigate }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === ROLES.ADMIN

  const linkClass = ({ isActive }) =>
    `sidebar__link${isActive ? ' sidebar__link--active' : ''}`

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const close = () => onNavigate?.()

  return (
    <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <Link to="/" className="flex items-center gap-2" onClick={close}>
          <span className="sidebar__logo">T</span>
          <span className="sidebar__name">
            Tomo<span className="sidebar__name-accent">bility.ma</span>
          </span>
        </Link>
      </div>

      <nav className="sidebar__nav">
        {isAdmin ? (
          <>
            <NavLink to="/admin" className={linkClass} end onClick={close}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </NavLink>
            <NavLink to="/admin/voitures" className={linkClass} onClick={close}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Toutes les voitures
            </NavLink>
            <NavLink to="/admin/utilisateurs" className={linkClass} onClick={close}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Gestion des utilisateurs
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/owner" className={linkClass} end onClick={close}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Mes voitures
            </NavLink>
            <NavLink to="/owner/voitures/nouvelle" className={linkClass} onClick={close}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter une voiture
            </NavLink>
            <NavLink to="/owner/reservations" className={linkClass} onClick={close}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Réservations
            </NavLink>
          </>
        )}

        <Link to="/" className="sidebar__link sidebar__link--back" onClick={close}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au site
        </Link>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <span className="sidebar__avatar">
            {(user?.prenom || user?.nom || 'U').charAt(0).toUpperCase()}
          </span>
          <div className="sidebar__user-info">
            <p className="sidebar__user-name truncate">
              {user?.prenom} {user?.nom}
            </p>
            <p className="sidebar__user-email truncate">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="btn btn--outline btn--block"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
