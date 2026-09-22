import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const userService = {
  getAll: async (params = {}) => {
    const response = await api.get(ENDPOINTS.users.list, { params })
    return response.data
  },
  updateProfile: async (id, data) => {
    const response = await api.put(ENDPOINTS.users.byId(id), data)
    return response.data
  }
}

export default userService
