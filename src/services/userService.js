import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

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

const userService = {
  getAll: async (params = {}) => {
    const response = await api.get(ENDPOINTS.users.list, { params })
    return response.data
  },
  getProfile: async () => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No token')

    const payload = decodeJwtPayload(token)
    if (!payload) throw new Error('Invalid token')

    // Try to get numeric user ID from JWT claims
    const numericId = payload.id || payload.userId || payload.user_id
    if (numericId && !isNaN(Number(numericId))) {
      try {
        const response = await api.get(ENDPOINTS.users.byId(numericId))
        return response.data
      } catch (err) {
        if (err.response?.status !== 404) throw err
      }
    }

    // Use email from sub claim to find user
    const email = payload.sub || payload.email
    if (email) {
      try {
        const response = await api.get(ENDPOINTS.users.list)
        const users = Array.isArray(response.data) ? response.data : response.data.content || []
        const user = users.find(u => u.email === email)
        if (user) return user
      } catch (err) {
        if (err.response?.status !== 500) throw err
      }
    }

    // Fallback: try common endpoints (skip 500)
    const endpoints = ['/users/me', '/users/profile', '/auth/me', '/auth/profile']
    for (const endpoint of endpoints) {
      try {
        const response = await api.get(endpoint)
        return response.data
      } catch (err) {
        if (err.response?.status === 500) continue
      }
    }

    throw new Error('Unable to fetch user profile')
  },
  updateProfile: async (id, data) => {
    const response = await api.put(ENDPOINTS.users.byId(id), data)
    return response.data
  },
  delete: async (id) => {
    const response = await api.delete(ENDPOINTS.users.byId(id))
    return response.data
  }
}

export default userService