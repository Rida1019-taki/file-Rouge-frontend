import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Spinner from '../ui/Spinner'
import { ROLES } from '../../config/roles'

export default function GuestRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner label="Chargement..." />
      </div>
    )
  }

  if (user) {
    const home = { [ROLES.ADMIN]: '/admin', [ROLES.OWNER]: '/owner', [ROLES.CLIENT]: '/' }
    return <Navigate to={home[user.role] || '/'} replace />
  }

  return <Outlet />
}