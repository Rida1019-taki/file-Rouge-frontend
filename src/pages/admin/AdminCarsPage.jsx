import { useMemo, useState } from 'react'
import voitureService from '../../services/voitureService'
import usePaginatedList from '../../hooks/usePaginatedList'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import Pagination from '../../components/ui/Pagination'
import StatusBadge from '../../components/reservation/StatusBadge'
import ListingBadge from '../../components/car/ListingBadge'
import { formatPrix, formatMontant } from '../../utils/format'
import { getCarImage } from '../../utils/carImage'
import useToast from '../../hooks/useToast'
import Toast from '../../components/ui/Toast'
import './admin-pages.css'

const TABS = [
  { value: '', label: 'Toutes' },
  { value: 'SALE', label: 'Vente' },
  { value: 'RENTAL', label: 'Location' }
]

export default function AdminCarsPage() {
  const { data: voitures, loading, reload, pagination, setPage } = usePaginatedList(voitureService.getAll)
  const { toast, show, hide } = useToast()
  const [tab, setTab] = useState('')

  const handleTabChange = (value) => {
    setTab(value)
    setPage(0)
  }

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
      <div className="dash-header">
        <h1 className="page-title">Gestion des voitures</h1>
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => handleTabChange(t.value)}
            className={`tab-btn${tab === t.value ? ' tab-btn--active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner label="Chargement des voitures..." />
      ) : filtered.length ? (
        <>
          <div className="car-rows">
            {filtered.map((voiture) => {
            const image = getCarImage(voiture)
            const isSale = voiture.listingType === 'SALE'
            const price = isSale ? formatMontant(voiture.prixVente) : formatPrix(voiture.prixParJour)
            return (
              <div
                key={voiture.id}
                className="car-row"
              >
                <div className="car-row__image">
                  <img src={image} alt="" />
                </div>

                <div className="car-row__body">
                  <div className="car-row__title-row">
                    <h3 className="car-row__title">
                      {voiture.marque} {voiture.modele}
                    </h3>
                    <ListingBadge listingType={voiture.listingType} />
                    {voiture.statut && <StatusBadge statut={voiture.statut} />}
                  </div>
                  <p className="car-row__meta">
                    {voiture.annee} • {price}
                  </p>
                  <p className="car-row__city">
                    {voiture.ville?.nom || voiture.ville}
                  </p>
                </div>

                <div className="car-row__actions">
                  <Button variant="danger" onClick={() => handleDelete(voiture)}>
                    Supprimer
                  </Button>
                </div>
              </div>
            )
            })}
          </div>
          <Pagination
            page={pagination.page + 1}
            totalPages={pagination.totalPages}
            onChange={(nextPage) => setPage(nextPage - 1)}
          />
        </>
      ) : (
        <EmptyState message="Aucune voiture ne correspond à ce filtre." />
      )}

      <Toast toast={toast} onClose={hide} />
    </div>
  )
}
