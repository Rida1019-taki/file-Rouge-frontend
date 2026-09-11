import useFetch from '../../hooks/useFetch'
import api from '../../api/axios'
import StatsCard from '../../components/common/StatsCard'
import Spinner from '../../components/ui/Spinner'
import { formatMontant } from '../../utils/format'

export default function AdminDashboardPage() {
  const { data: stats, loading, error } = useFetch(async () => {
    const response = await api.get('/admin/stats')
    return response.data
  })

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl py-10">
        <Spinner label="Chargement des statistiques..." />
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          Impossible de charger les statistiques. Vérifiez que le backend est démarré.
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>

      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Voitures" value={stats.voituresCount ?? stats.totalVoitures ?? 0} icon="voitures" />
        <StatsCard title="Réservations" value={stats.reservationsCount ?? stats.totalReservations ?? 0} icon="reservations" />
        <StatsCard title="Utilisateurs" value={stats.usersCount ?? stats.totalUsers ?? 0} icon="clients" />
        <StatsCard
          title="Revenu total"
          value={formatMontant(stats.revenue ?? stats.totalRevenu ?? 0)}
          icon="revenus"
          hint="Chiffre d'affaires global"
        />
      </div>

      {stats.reservationsByMonth && Array.isArray(stats.reservationsByMonth) && stats.reservationsByMonth.length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Réservations par mois
          </h2>
          <div className="flex h-48 items-end gap-2">
            {stats.reservationsByMonth.map((entry, index) => {
              const maxCount = Math.max(...stats.reservationsByMonth.map((e) => e.count ?? e.nombre ?? 1))
              const count = entry.count ?? entry.nombre ?? 0
              const heightPercent = maxCount > 0 ? (count / maxCount) * 100 : 0

              return (
                <div key={entry.mois || entry.month || index} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs font-medium text-gray-500">{count}</span>
                  <div
                    className="w-full rounded-t bg-primary-600 transition-all"
                    style={{ height: `${Math.max(heightPercent, 4)}%` }}
                  />
                  <span className="text-xs text-gray-400">
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