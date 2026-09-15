const DEFAULT_COLOR = 'badge--neutral'

export const LISTING_LABELS = {
  SALE: 'À vendre',
  RENTAL: 'À louer'
}

export const LISTING_COLORS = {
  SALE: 'badge--sale',
  RENTAL: 'badge--rental'
}

export function listingLabel(type) {
  return LISTING_LABELS[type] || (type === 'SALE' ? 'À vendre' : type === 'RENTAL' ? 'À louer' : '')
}

export function listingColor(type) {
  return LISTING_COLORS[type] || 'badge--neutral'
}

export const STATUT_COLORS = {
  EN_ATTENTE: 'badge--pending',
  CONFIRMEE: 'badge--confirmed',
  ANNULEE: 'badge--cancelled',
  TERMINEE: 'badge--done'
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