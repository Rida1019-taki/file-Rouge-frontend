import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const authService = {
  login: async (email, password) => {
    const response = await api.post(ENDPOINTS.auth.login, { email, password })
    return response.data
  },
  register: async (data) => {
    const response = await api.post(ENDPOINTS.auth.register, data)
    return response.data
  }
}

export default authService
