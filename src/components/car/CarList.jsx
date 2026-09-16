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
    1: 'grid grid-cols-1',
    2: 'grid grid-cols-2',
    3: 'grid grid-cols-3'
  }

  return (
    <div className={gridCols[columns] || gridCols[3]}>
      {voitures.map((voiture) => (
        <CarCard key={voiture.id} voiture={voiture} />
      ))}
    </div>
  )
}
