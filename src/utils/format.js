export function formatPrix(val) {
  const number = Number(val ?? 0)
  return `${number.toLocaleString('fr-MA')} DH/jour`
}

export function formatMontant(val) {
  const number = Number(val ?? 0)
  return `${number.toLocaleString('fr-MA')} DH`
}

export function formatDate(val) {
  if (!val) return '—'
  const date = new Date(val)
  if (Number.isNaN(date.getTime())) return val
  return date.toLocaleDateString('fr-MA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export function toInputDate(val) {
  if (!val) return ''
  const date = new Date(val)
  if (Number.isNaN(date.getTime())) return val
  return date.toISOString().split('T')[0]
}

export function calcMontant(prixParJour, dateDebut, dateFin) {
  const prix = Number(prixParJour ?? 0)
  const debut = dateDebut ? new Date(dateDebut) : null
  const fin = dateFin ? new Date(dateFin) : null

  if (!debut || !fin || prix <= 0) return 0
  const deltaTime = fin.getTime() - debut.getTime()
  if (deltaTime <= 0) return prix

  const jours = Math.ceil(deltaTime / (1000 * 60 * 60 * 24))
  return Math.max(jours, 0) * prix
}