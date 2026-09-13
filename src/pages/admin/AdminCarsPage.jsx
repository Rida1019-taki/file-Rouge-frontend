import { useMemo, useState } from 'react'
import voitureService from '../../services/voitureService'
import useList from '../../hooks/useList'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import StatusBadge from '../../components/reservation/StatusBadge'
import ListingBadge from '../../components/car/ListingBadge'
import { formatPrix, formatMontant } from '../../utils/format'
import { getCarImage } from '../../utils/carImage'
import useToast from '../../hooks/useToast'
import Toast from '../../components/ui/Toast'

const TABS = [
  { value: '', label: 'Toutes' },
  { value: 'SALE', label: 'Vente' },
  { value: 'RENTAL', label: 'Location' }
]

export default function AdminCarsPage() {
  const { data: voitures, loading, reload } = useList(voitureService.getAll)
  const { toast, show, hide } = useToast()
  const [tab, setTab] = useState('')

  const filtered = useMemo(
    () => (tab ? (voitures || []).filter((v) => v.listingType === tab) : voitures || []),
    [voitures, tab]
  )

  const handleDelete = async (voiture) => {
    if (!window.confirm(`Supprimer ${voiture.marque} ${voiture.modele} ? Cette action est irréversible.`)) return
    try {
      await voitureService.delete(voiture.id)
      show('Voiture supprimée')
      reload()
    } catch (err) {
      show(err?.response?.status === 403 ? 'Action réservée au propriétaire de l\'annonce' : 'Impossible de supprimer cette voiture', 'error')
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des voitures</h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === t.value ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner label="Chargement des voitures..." />
      ) : filtered.length ? (
        <div className="space-y-3">
          {filtered.map((voiture) => {
            const image = getCarImage(voiture)
            const isSale = voiture.listingType === 'SALE'
            const price = isSale ? formatMontant(voiture.prixVente) : formatPrix(voiture.prixParJour)
            return (
              <div
                key={voiture.id}
                className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 sm:flex-row sm:items-center"
              >
                <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-32">
                  {image ? (
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {voiture.marque} {voiture.modele}
                    </h3>
                    <ListingBadge listingType={voiture.listingType} />
                    {voiture.statut && <StatusBadge statut={voiture.statut} />}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {voiture.annee} • {price}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {voiture.ville?.nom || voiture.ville}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button variant="danger" onClick={() => handleDelete(voiture)}>
                    Supprimer
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState message="Aucune voiture ne correspond à ce filtre." />
      )}

      <Toast toast={toast} onClose={hide} />
    </div>
  )
}