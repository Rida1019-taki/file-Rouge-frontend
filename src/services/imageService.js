import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const imageService = {
  add: async (voitureId, file, principale) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('principale', principale ?? false)
    const response = await api.post(ENDPOINTS.images.upload(voitureId), formData)
    return response.data
  },
  addFromUrl: async (voitureId, url, principale) => {
    const response = await api.post(ENDPOINTS.images.upload(voitureId), { url, principale })
    return response.data
  },
  remove: async (id) => {
    const response = await api.delete(ENDPOINTS.images.byId(id))
    return response.data
  }
}

export default imageService
