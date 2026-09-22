const TOKEN_KEY = 'tomobilty_token'
export const USER_KEY = 'tomobilty_user'

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
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (!token) return null
  if (!isTokenValid(token)) {
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(USER_KEY)
    return null
  }
  return token
}

export const setToken = (token) => sessionStorage.setItem(TOKEN_KEY, token)

export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY)

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
      if (error.response?.status === 401) {
        clearToken()
        sessionStorage.removeItem(USER_KEY)
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
      return Promise.reject(error)
    }
  )
}
