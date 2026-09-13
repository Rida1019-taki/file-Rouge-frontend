const DEFAULT_COLOR = 'bg-gray-100 text-gray-700'

export const LISTING_LABELS = {
  SALE: 'À vendre',
  RENTAL: 'À louer'
}

export const LISTING_COLORS = {
  SALE: 'bg-amber-100 text-amber-800',
  RENTAL: 'bg-blue-100 text-blue-800'
}

export function listingLabel(type) {
  return LISTING_LABELS[type] || (type === 'SALE' ? 'À vendre' : type === 'RENTAL' ? 'À louer' : '')
}

export function listingColor(type) {
  return LISTING_COLORS[type] || 'bg-gray-100 text-gray-700'
}

export const STATUT_COLORS = {
  EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
  CONFIRMEE: 'bg-green-100 text-green-800',
  ANNULEE: 'bg-red-100 text-red-800',
  TERMINEE: 'bg-blue-100 text-blue-800'
}

export const STATUT_LABELS = {
  EN_ATTENTE: 'En attente',
  CONFIRMEE: 'Confirmée',
  ANNULEE: 'Annulée',
  TERMINEE: 'Terminée'
}

export function statutColor(statut) {
  return STATUT_COLORS[statut] || DEFAULT_COLOR
}

export function statutLabel(statut) {
  return STATUT_LABELS[statut] || capitalize(statut?.replace('_', ' ') || '')
}

export function capitalize(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

export function getErrorMessage(error, fallback = 'Une erreur est survenue') {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  )
}