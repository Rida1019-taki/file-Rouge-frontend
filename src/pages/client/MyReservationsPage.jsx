import { useState } from 'react'
import reservationService from '../../services/reservationService'
import useList from '../../hooks/useList'
import useToast from '../../hooks/useToast'
import useHomeNavigation from '../../hooks/useHomeNavigation'
import Toast from '../../components/ui/Toast'
import ReservationCard from '../../components/reservation/ReservationCard'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import Button from '../../components/ui/Button'
import { getErrorMessage } from '../../utils/helpers'
import './client-pages.css'

export default function MyReservationsPage() {
  const { data: reservations, loading, reload } = useList(reservationService.getMy)
  const { toast, show, hide } = useToast()
  const goToSection = useHomeNavigation()
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
    <div className="reservations-page">
      <h1 className="page-title">Mes réservations</h1>

      {loading ? (
        <Spinner label="Chargement de vos réservations..." />
      ) : reservations?.length ? (
        <div className="reservations-page__list">
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
          <Button onClick={() => goToSection('catalog')}>
            Parcourir les voitures
          </Button>
        </EmptyState>
      )}

      <Toast toast={toast} onClose={hide} />
    </div>
  )
}
