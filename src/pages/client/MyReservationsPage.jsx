import { useState } from 'react'
import reservationService from '../../services/reservationService'
import useList from '../../hooks/useList'
import useToast from '../../hooks/useToast'
import Toast from '../../components/ui/Toast'
import ReservationCard from '../../components/reservation/ReservationCard'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import Button from '../../components/ui/Button'
import { getErrorMessage } from '../../utils/helpers'

export default function MyReservationsPage() {
  const { data: reservations, loading, reload } = useList(reservationService.getMy)
  const { toast, show, hide } = useToast()
  const [busyId, setBusyId] = useState(null)

  const handleCancel = async (reservation) => {
    setBusyId(reservation.id)
    try {
      await reservationService.cancel(reservation.id)
      show('Réservation annulée')
      reload()
    } catch (err) {
      show(getErrorMessage(err, "Impossible d'annuler"), 'error')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Mes réservations</h1>

      {loading ? (
        <Spinner label="Chargement de vos réservations..." />
      ) : reservations?.length ? (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onCancel={handleCancel}
              busyAction={busyId === reservation.id ? 'cancel' : null}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="Vous n'avez pas encore de réservation.">
          <a href="/#catalog">
            <Button>Parcourir les voitures</Button>
          </a>
        </EmptyState>
      )}

      <Toast toast={toast} onClose={hide} />
    </div>
  )
}