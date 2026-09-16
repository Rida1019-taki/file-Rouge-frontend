import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const reservationService = {
  create: async (data) => {
    const response = await api.post(ENDPOINTS.reservations.create, data)
    return response.data
  },
  getMy: async () => {
    const response = await api.get(ENDPOINTS.reservations.my)
    return response.data
  },
  getOwner: async () => {
    const response = await api.get(ENDPOINTS.reservations.owner)
    return response.data
  },
  updateStatus: async (id, statut) => {
    const response = await api.patch(ENDPOINTS.reservations.status(id, statut))
    return response.data
  },
  cancel: async (id) => {
    const response = await api.patch(ENDPOINTS.reservations.cancel(id))
    return response.data
  }
}

export default reservationService
