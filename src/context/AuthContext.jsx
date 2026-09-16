import { useCallback, useState } from 'react'
import authService from '../services/authService'
import { clearToken, getToken, setToken } from '../api/interceptor'
import { AuthContext } from './contextSymbols'

const USER_KEY = 'tomobilty_user'

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [token, setTokenState] = useState(() => getToken())
  const [loading] = useState(false)

  const storeSession = useCallback((session) => {
    const nextToken = session?.token || session?.accessToken
    const nextUser = session?.user || session

    if (nextToken) {
      setToken(nextToken)
      setTokenState(nextToken)
    }
    if (nextUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
      setUser(nextUser)
    }
  }, [])

  const login = useCallback(
    async (email, password) => {
      const session = await authService.login(email, password)
      storeSession(session)
      return session?.user || session
    },
    [storeSession]
  )

  const register = useCallback(
    async (data) => {
      const session = await authService.register(data)
      storeSession(session)
      return session?.user || session
    },
    [storeSession]
  )

  const logout = useCallback(() => {
    clearToken()
    localStorage.removeItem(USER_KEY)
    setTokenState(null)
    setUser(null)
  }, [])

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
