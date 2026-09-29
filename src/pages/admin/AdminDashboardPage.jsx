import { useCallback } from 'react'
import useFetch from '../../hooks/useFetch'
import api from '../../api/axios'
import StatsCard from '../../components/common/StatsCard'
import Spinner from '../../components/ui/Spinner'
import './admin-pages.css'

export default function AdminDashboardPage() {
  const fetchStats = useCallback(async () => {
    const response = await api.get('/admin/stats')
    return response.data
  }, [])

  const { data: stats, loading, error } = useFetch(fetchStats)

  if (loading) {
    return (
      <div className="admin-loading">
        <Spinner label="Chargement des statistiques..." />
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div>
        <h1 className="page-title">Dashboard Administrateur</h1>
        <div className="form-alert-error">
          Impossible de charger les statistiques. Vérifiez que le backend est démarré.
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="page-title">Dashboard Administrateur</h1>

      <div className="stats-grid">
        <StatsCard title="Voitures" value={stats.voituresCount ?? stats.totalVoitures ?? stats.cars ?? 0} icon="voitures" />
        <StatsCard title="Réservations" value={stats.reservationsCount ?? stats.totalReservations ?? 0} icon="reservations" />
        <StatsCard title="Utilisateurs" value={stats.usersCount ?? stats.totalUsers ?? stats.users ?? 0} icon="clients" />
      </div>

      <div className="admin-panels">
        <div className="admin-panel">
          <h2 className="admin-panel__title">Annonces de vente</h2>
          <p className="admin-panel__value admin-panel__value--sale">{stats.carsSale ?? 0}</p>
          <p className="admin-panel__hint">Voitures destinées à la vente</p>
        </div>
        <div className="admin-panel">
          <h2 className="admin-panel__title">Annonces de location</h2>
          <p className="admin-panel__value admin-panel__value--rental">{stats.carsRental ?? 0}</p>
          <p className="admin-panel__hint">Voitures destinées à la location</p>
        </div>
      </div>

      {stats.reservationsByMonth && Array.isArray(stats.reservationsByMonth) && stats.reservationsByMonth.length > 0 && (
        <div className="chart-card">
          <h2 className="chart-card__title">
            Réservations par mois
          </h2>
          <div className="chart">
            {stats.reservationsByMonth.map((entry, index) => {
              const maxCount = Math.max(...stats.reservationsByMonth.map((e) => e.count ?? e.nombre ?? 1))
              const count = entry.count ?? entry.nombre ?? 0
              const heightPercent = maxCount > 0 ? (count / maxCount) * 100 : 0

              return (
                <div key={entry.mois || entry.month || index} className="chart__col">
                  <span className="chart__val">{count}</span>
                  <div
                    className="chart__bar"
                    style={{ height: `${Math.max(heightPercent, 4)}%` }}
                  />
                  <span className="chart__label">
                    {(entry.mois || entry.month || entry.label || '').toString().slice(0, 3)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
