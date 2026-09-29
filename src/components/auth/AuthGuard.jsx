import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthGuard() {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  useEffect(() => {
    const checkToken = () => setToken(localStorage.getItem('token'))
    checkToken()
    window.addEventListener('auth:unauthorized', checkToken)
    window.addEventListener('storage', checkToken)
    return () => {
      window.removeEventListener('auth:unauthorized', checkToken)
      window.removeEventListener('storage', checkToken)
    }
  }, [])

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}