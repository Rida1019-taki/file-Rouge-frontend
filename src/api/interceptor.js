const TOKEN_KEY = 'token'

const decodeJwtPayload = (token) => {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

export const isTokenValid = (token) => {
  if (!token) return false
  const payload = decodeJwtPayload(token)
  if (!payload) return false
  if (typeof payload.exp !== 'number') return true
  return payload.exp * 1000 > Date.now()
}

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!token) return null
  if (!isTokenValid(token)) {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    return null
  }
  return token
}

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem('role')
  localStorage.removeItem('user')
}

export function attachTokenInterceptor(api) {
  api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}

export function handleUnauthorized(api) {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Only handle 401 (unauthenticated), NOT 403 (forbidden)
      // 403 means authenticated but not authorized - don't log out
      if (error.response?.status === 401) {
        clearToken()
        window.dispatchEvent(new CustomEvent('auth:unauthorized'))
      }
      return Promise.reject(error)
    }
  )
}