import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const imageService = {
  add: async (voitureId, url, principale) => {
    const response = await api.post(ENDPOINTS.images.add(voitureId), {
      url,
      principale
    })
    return response.data
  },
  remove: async (id) => {
    const response = await api.delete(ENDPOINTS.images.byId(id))
    return response.data
  }
}

export default imageService