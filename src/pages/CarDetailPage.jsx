import { useParams, Link } from 'react-router-dom'
import voitureService from '../services/voitureService'
import useFetch from '../hooks/useFetch'
import CarDetail from '../components/car/CarDetail'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

export default function CarDetailPage() {
  const { id } = useParams()
  const { data: voiture, loading, error } = useFetch(() => voitureService.getById(id))

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Spinner label="Chargement de la voiture..." />
      </div>
    )
  }

  if (error || !voiture) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <EmptyState message="Cette voiture est introuvable ou n'est plus disponible.">
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </EmptyState>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <CarDetail voiture={voiture} />
    </div>
  )
}