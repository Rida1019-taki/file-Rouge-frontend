import { useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import voitureService from '../services/voitureService'
import useFetch from '../hooks/useFetch'
import CarDetail from '../components/car/CarDetail'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import './CarDetailPage.css'

export default function CarDetailPage() {
  const { id } = useParams()
  const fetchVoiture = useCallback(() => voitureService.getById(id), [id])
  const { data: voiture, loading, error } = useFetch(fetchVoiture)

  if (loading) {
    return (
      <div className="detail-page container">
        <Spinner label="Chargement de la voiture..." />
      </div>
    )
  }

  if (error || !voiture) {
    return (
      <div className="detail-page container">
        <EmptyState message="Cette voiture est introuvable ou n'est plus disponible.">
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </EmptyState>
      </div>
    )
  }

  return (
    <div className="detail-page container">
      <CarDetail voiture={voiture} />
    </div>
  )
}