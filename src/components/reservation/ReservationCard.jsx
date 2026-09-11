import { Link } from 'react-router-dom'
import { formatDate, formatMontant } from '../../utils/format'
import StatusBadge from './StatusBadge'
import Button from '../ui/Button'
import { getCarImage } from '../../utils/carImage'

export default function ReservationCard({
  reservation,
  onCancel,
  onConfirm,
  onRefuse,
  busyAction = null
}) {
  const voiture = reservation.voiture || {}
  const image = getCarImage(voiture)
  const canCancel =
    onCancel && reservation.statut === 'EN_ATTENTE'
  const canDecide =
    onConfirm && onRefuse && reservation.statut === 'EN_ATTENTE'

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 sm:flex-row sm:items-center">
      <Link
        to={voiture.id ? `/voitures/${voiture.id}` : '#'}
        className="h-24 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-40"
      >
        {image ? (
          <img src={image} alt="Voiture" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-gray-900">
            {voiture.marque} {voiture.modele || ''}
          </h3>
          <StatusBadge statut={reservation.statut} />
        </div>
        <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          <span>Du {formatDate(reservation.dateDebut)}</span>
          <span>au {formatDate(reservation.dateFin)}</span>
        </p>
        <p className="mt-0.5 text-sm text-gray-500">
          Client : {reservation.client?.prenom} {reservation.client?.nom}
        </p>
        <p className="mt-2 text-base font-bold text-primary-600">
          {formatMontant(reservation.montantTotal)}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col">
        {canCancel && (
          <Button
            variant="danger"
            loading={busyAction === 'cancel'}
            onClick={() => onCancel(reservation)}
          >
            Annuler
          </Button>
        )}
        {canDecide && (
          <>
            <Button
              variant="primary"
              loading={busyAction === 'confirm'}
              onClick={() => onConfirm(reservation)}
            >
              Accepter
            </Button>
            <Button
              variant="danger"
              loading={busyAction === 'refuse'}
              onClick={() => onRefuse(reservation)}
            >
              Refuser
            </Button>
          </>
        )}
      </div>
    </div>
  )
}