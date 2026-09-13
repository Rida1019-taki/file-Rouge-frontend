import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-lg transition ${
      isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-lg font-bold text-white">
            T
          </span>
          <span className="text-xl font-bold text-gray-900">
            Tomo<span className="text-primary-600">bility</span>
            <span className="text-primary-600">.ma</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={linkClass} end>
            Accueil
          </NavLink>
          <NavLink to="/vente" className={linkClass}>
            Vendre
          </NavLink>
          <NavLink to="/location" className={linkClass}>
            Louer
          </NavLink>
          <a href="/#a-propos" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg transition">
            À propos
          </a>
          <a href="/#contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg transition">
            Contact
          </a>
          {user && user.role === 'CLIENT' && (
            <NavLink to="/client/mes-reservations" className={linkClass}>
              Mes réservations
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden text-sm font-medium text-gray-600 sm:block">
                Salut, {user.prenom || user.nom || user.email}
              </span>
              {user.role !== 'CLIENT' && (
                <Link
                  to={user.role === 'ADMIN' ? '/admin' : '/owner'}
                  className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
                >
                  Tableau de bord
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:text-primary-600"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}