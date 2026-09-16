import axios from 'axios'
import { attachTokenInterceptor, handleUnauthorized } from './interceptor'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

attachTokenInterceptor(api)
handleUnauthorized(api)

export default api
