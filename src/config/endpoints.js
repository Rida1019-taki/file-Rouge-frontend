export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register'
  },
  voitures: {
    list: '/voitures',
    byType: (type) => `/voitures?listingType=${type}`,
    byId: (id) => `/voitures/${id}`,
    mine: '/voitures/mine'
  },
  reservations: {
    create: '/reservations',
    my: '/reservations/my',
    owner: '/reservations/owner',
    status: (id, statut) => `/reservations/${id}/status/${statut}`,
    cancel: (id) => `/reservations/${id}/annuler`
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
    stats: '/admin/stats',
    users: '/admin/users'
  }
}
