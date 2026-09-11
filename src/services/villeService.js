import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const villeService = {
  getAll: async () => {
    const response = await api.get(ENDPOINTS.villes.list)
    return response.data
  },
  create: async (data) => {
    const response = await api.post(ENDPOINTS.villes.create, data)
    return response.data
  }
}

export default villeService