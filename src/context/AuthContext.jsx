import { useCallback, useState } from 'react'
import authService from '../services/authService'
import { clearToken, getToken, setToken, USER_KEY } from '../api/interceptor'
import { AuthContext } from './contextSymbols'

const readStoredUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem(USER_KEY)) || null
  } catch {
    sessionStorage.removeItem(USER_KEY)
    return null
  }
}

const readStoredSession = () => {
  const storedToken = getToken()
  if (!storedToken) {
    sessionStorage.removeItem(USER_KEY)
    return { token: null, user: null }
  }
  return { token: storedToken, user: readStoredUser() }
}

export default function AuthProvider({ children }) {
  const [initialSession] = useState(readStoredSession)
  const [user, setUser] = useState(initialSession.user)
  const [token, setTokenState] = useState(initialSession.token)
  const [loading] = useState(false)

  const storeSession = useCallback((session) => {
    const nextToken = session?.token || session?.accessToken
    const nextUser = session?.user || session

    if (nextToken) {
      setToken(nextToken)
      setTokenState(nextToken)
    }
    if (nextUser) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(nextUser))
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
    sessionStorage.removeItem(USER_KEY)
    setTokenState(null)
    setUser(null)
  }, [])

  const updateUser = useCallback((nextUser) => {
    if (!nextUser) return
    sessionStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
  }, [])

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
