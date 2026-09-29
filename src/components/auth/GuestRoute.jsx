import { Navigate, Outlet } from 'react-router-dom'

export default function GuestRoute() {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  if (!token) {
    return <Outlet />
  }

  const home = {
    ADMIN: '/admin',
    OWNER: '/owner',
    CLIENT: '/'
  }

  return <Navigate to={home[role] || '/'} replace />
}