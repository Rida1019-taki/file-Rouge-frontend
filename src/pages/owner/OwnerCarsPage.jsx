import { Link } from 'react-router-dom'
import voitureService from '../../services/voitureService'
import useList from '../../hooks/useList'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import StatusBadge from '../../components/reservation/StatusBadge'
import { formatPrix } from '../../utils/format'
import { getCarImage } from '../../utils/carImage'
import useToast from '../../hooks/useToast'
import Toast from '../../components/ui/Toast'

export default function OwnerCarsPage() {
  const { data: voitures, loading, reload } = useList(voitureService.getMine)
  const { toast, show, hide } = useToast()

  const handleDelete = async (voiture) => {
    if (!window.confirm(`Supprimer ${voiture.marque} ${voiture.modele} ? Cette action est irréversible.`)) return
    try {
      await voitureService.delete(voiture.id)
      show('Voiture supprimée')
      reload()
    } catch {
      show("Impossible de supprimer cette voiture", 'error')
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Mes voitures</h1>
        <Link to="/owner/voitures/nouvelle">
          <Button>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une voiture
          </Button>
        </Link>
      </div>

      {loading ? (
        <Spinner label="Chargement de vos voitures..." />
      ) : voitures?.length ? (
        <div className="space-y-3">
          {voitures.map((voiture) => {
            const image = getCarImage(voiture)
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
                    {voiture.statut && <StatusBadge statut={voiture.statut} />}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {voiture.annee} • {formatPrix(voiture.prixParJour)}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {voiture.ville?.nom || voiture.ville}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link to={`/owner/voitures/${voiture.id}/modifier`}>
                    <Button variant="outline">Modifier</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(voiture)}>
                    Supprimer
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState message="Vous n'avez pas encore ajouté de voiture.">
          <Link to="/owner/voitures/nouvelle">
            <Button>Ajouter une voiture</Button>
          </Link>
        </EmptyState>
      )}

      <Toast toast={toast} onClose={hide} />
    </div>
  )
}