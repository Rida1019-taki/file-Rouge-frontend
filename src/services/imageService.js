import api from '../api/axios'
import { ENDPOINTS } from '../config/endpoints'

const imageService = {
  add: async (voitureId, fileOrUrl, principale) => {
    const payload = fileOrUrl instanceof File ? new FormData() : { url: fileOrUrl, principale }
    if (payload instanceof FormData) {
      payload.append('file', fileOrUrl)
      payload.append('principale', principale ?? false)
    }
    const response = await api.post(ENDPOINTS.images.add(voitureId), payload)
    return response.data
  },
  remove: async (id) => {
    const response = await api.delete(ENDPOINTS.images.byId(id))
    return response.data
  }
}

export default imageService