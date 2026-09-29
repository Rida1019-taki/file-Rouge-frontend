import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const villeService = {
  getAll: async () => {
    try {
      const response = await api.get(ENDPOINTS.villes.list)
      return response.data
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) return []
      throw err
    }
  },
  create: async (data) => {
    const response = await api.post(ENDPOINTS.villes.create, data)
    return response.data
  }
}

export default villeService