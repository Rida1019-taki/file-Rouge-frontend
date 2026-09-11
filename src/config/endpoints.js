export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register'
  },
  voitures: {
    list: '/voitures',
    byId: (id) => `/voitures/${id}`,
    mine: '/voitures/mine'
  },
  reservations: {
    create: '/reservations',
    my: '/reservations/my',
    owner: '/reservations/owner',
    status: (id) => `/reservations/${id}/statut`
  },
  categories: {
    list: '/categories',
    create: '/categories'
  },
  villes: {
    list: '/villes',
    create: '/villes'
  },
  images: {
    add: (voitureId) => `/voitures/${voitureId}/images`,
    byId: (id) => `/images/${id}`
  },
  admin: {
    stats: '/admin/stats'
  }
}