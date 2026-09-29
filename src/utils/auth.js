const TOKEN_KEY = 'token'
const ROLE_KEY = 'role'
const USER_KEY = 'user'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export const getRole = () => localStorage.getItem(ROLE_KEY)

export const setRole = (role) => localStorage.setItem(ROLE_KEY, role)

export const clearRole = () => localStorage.removeItem(ROLE_KEY)

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null
  } catch {
    return null
  }
}

export const setUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

export const clearUser = () => localStorage.removeItem(USER_KEY)

export const clearAuth = () => {
  clearToken()
  clearRole()
  clearUser()
}

export const isAuthenticated = () => !!getToken()