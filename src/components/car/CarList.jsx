import CarCard from './CarCard'
import Spinner from '../ui/Spinner'
import EmptyState from '../ui/EmptyState'

export default function CarList({ voitures = [], loading = false, columns = 3 }) {
  if (loading) {
    return <Spinner label="Chargement des voitures..." />
  }

  if (!voitures.length) {
    return <EmptyState message="Aucune voiture ne correspond à vos critères." />
  }

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <div className={`grid ${gridCols[columns] || gridCols[3]} gap-5`}>
      {voitures.map((voiture) => (
        <CarCard key={voiture.id} voiture={voiture} />
      ))}
    </div>
  )
}