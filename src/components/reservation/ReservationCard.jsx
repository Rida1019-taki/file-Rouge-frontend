import { Link } from 'react-router-dom'
import { formatDate, formatMontant } from '../../utils/format'
import StatusBadge from './StatusBadge'
import Button from '../ui/Button'
import { getCarImage } from '../../utils/carImage'
import './ReservationCard.css'

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
    <div className="res-card">
      <Link
        to={voiture.id ? `/voitures/${voiture.id}` : '#'}
        className="res-card__image"
      >
        {image ? (
          <img src={image} alt="Voiture" />
        ) : (
          <div className="res-card__placeholder">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        )}
      </Link>

      <div className="res-card__body">
        <div className="res-card__title-row">
          <h3 className="res-card__title">
            {voiture.marque} {voiture.modele || ''}
          </h3>
          <StatusBadge statut={reservation.statut} />
        </div>
        <p className="res-card__dates">
          <span>Du {formatDate(reservation.dateDebut)}</span>
          <span>au {formatDate(reservation.dateFin)}</span>
        </p>
        <p className="res-card__client">
          Client : {reservation.client?.prenom} {reservation.client?.nom}
        </p>
        <p className="res-card__amount">
          {formatMontant(reservation.montantTotal)}
        </p>
      </div>

      <div className="res-card__actions">
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