import { useState } from 'react'
import reservationService from '../../services/reservationService'
import useList from '../../hooks/useList'
import ReservationCard from '../../components/reservation/ReservationCard'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import useToast from '../../hooks/useToast'
import Toast from '../../components/ui/Toast'
import { getErrorMessage } from '../../utils/helpers'
import './owner-pages.css'

export default function OwnerReservationsPage() {
  const { data: reservations, loading, reload } = useList(reservationService.getOwner)
  const { toast, show, hide } = useToast()
  const [busy, setBusy] = useState({ id: null, action: null })

  const handleConfirm = async (reservation) => {
    setBusy({ id: reservation.id, action: 'confirm' })
    try {
      await reservationService.updateStatus(reservation.id, 'CONFIRMEE')
      show('Réservation confirmée')
      reload()
    } catch (err) {
      show(getErrorMessage(err, "Erreur lors de la confirmation"), 'error')
    } finally {
      setBusy({ id: null, action: null })
    }
  }

  const handleRefuse = async (reservation) => {
    setBusy({ id: reservation.id, action: 'refuse' })
    try {
      await reservationService.updateStatus(reservation.id, 'ANNULEE')
      show('Réservation refusée')
      reload()
    } catch (err) {
      show(getErrorMessage(err, "Erreur lors du refus"), 'error')
    } finally {
      setBusy({ id: null, action: null })
    }
  }

  return (
    <div>
      <h1 className="page-title page-title--spaced">Réservations reçues</h1>

      {loading ? (
        <Spinner label="Chargement des réservations..." />
      ) : reservations?.length ? (
        <div className="owner-list">
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onConfirm={handleConfirm}
              onRefuse={handleRefuse}
              busyAction={
                busy.id === reservation.id ? busy.action : null
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState message="Aucune réservation reçue pour le moment." />
      )}

      <Toast toast={toast} onClose={hide} />
    </div>
  )
}
