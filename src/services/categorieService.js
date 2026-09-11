import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const categorieService = {
  getAll: async () => {
    const response = await api.get(ENDPOINTS.categories.list)
    return response.data
  },
  create: async (data) => {
    const response = await api.post(ENDPOINTS.categories.create, data)
    return response.data
  }
}

export default categorieService