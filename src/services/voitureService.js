import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const voitureService = {
  getAll: async () => {
    const response = await api.get(ENDPOINTS.voitures.list)
    return response.data
  },
  getByType: async (type) => {
    const response = await api.get(ENDPOINTS.voitures.byType(type))
    return response.data
  },
  getById: async (id) => {
    const response = await api.get(ENDPOINTS.voitures.byId(id))
    return response.data
  },
  getMine: async () => {
    const response = await api.get(ENDPOINTS.voitures.mine)
    return response.data
  },
  create: async (data) => {
    const response = await api.post(ENDPOINTS.voitures.list, data)
    return response.data
  },
  update: async (id, data) => {
    const response = await api.put(ENDPOINTS.voitures.byId(id), data)
    return response.data
  },
  delete: async (id) => {
    const response = await api.delete(ENDPOINTS.voitures.byId(id))
    return response.data
  }
}

export default voitureService