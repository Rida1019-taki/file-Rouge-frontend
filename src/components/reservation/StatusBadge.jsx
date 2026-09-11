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
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        STATUT_COLORS[statut] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {labels[statut] || statut}
    </span>
  )
}