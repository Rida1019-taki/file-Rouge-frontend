import { useState } from 'react'
import reservationService from '../../services/reservationService'
import usePaginatedList from '../../hooks/usePaginatedList'
import useToast from '../../hooks/useToast'
import useHomeNavigation from '../../hooks/useHomeNavigation'
import Toast from '../../components/ui/Toast'
import ReservationCard from '../../components/reservation/ReservationCard'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import Pagination from '../../components/ui/Pagination'
import Button from '../../components/ui/Button'
import { getErrorMessage } from '../../utils/helpers'
import './client-pages.css'

export default function MyReservationsPage() {
  const { data: reservations, loading, error, reload, pagination, setPage } = usePaginatedList(reservationService.getMy)
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

  if (loading) {
    return (
      <div className="reservations-page">
        <h1 className="page-title">Mes réservations</h1>
        <Spinner label="Chargement de vos réservations..." />
        <Toast toast={toast} onClose={hide} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="reservations-page">
        <h1 className="page-title">Mes réservations</h1>
        <div className="form-alert-error" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: '#dc2626', marginBottom: '1rem' }}>
            Erreur: {getErrorMessage(error, 'Impossible de charger les réservations')}
          </p>
          <Button variant="outline" onClick={reload}>
            Réessayer
          </Button>
        </div>
        <Toast toast={toast} onClose={hide} />
      </div>
    )
  }

  return (
    <div className="reservations-page">
      <h1 className="page-title">Mes réservations</h1>

      {reservations?.length ? (
        <>
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
          <Pagination
            page={pagination.page + 1}
            totalPages={pagination.totalPages}
            onChange={(nextPage) => setPage(nextPage - 1)}
          />
        </>
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