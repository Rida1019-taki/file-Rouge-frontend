import { STATUT_COLORS } from '../../utils/helpers'

export default function StatusBadge({ statut }) {
  const labels = {
    EN_ATTENTE: 'En attente',
    CONFIRMEE: 'Confirmée',
    ANNULEE: 'Annulée',
    TERMINEE: 'Terminée'
  }

  return (
    <span
      className={`badge ${
        STATUT_COLORS[statut] || 'badge--neutral'
      }`}
    >
      {labels[statut] || statut}
    </span>
  )
}
