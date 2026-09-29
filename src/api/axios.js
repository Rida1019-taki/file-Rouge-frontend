import axios from 'axios'
import { attachTokenInterceptor, handleUnauthorized } from './interceptor'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

attachTokenInterceptor(api)
handleUnauthorized(api)

export default api