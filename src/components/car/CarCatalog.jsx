import { useMemo, useState } from 'react'
import voitureService from '../../services/voitureService'
import useList from '../../hooks/useList'
import CarList from './CarList'
import CarFilter from './CarFilter'
import SearchBar from '../common/SearchBar'
import Spinner from '../ui/Spinner'
import EmptyState from '../ui/EmptyState'

const normalize = (value) =>
  String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const EMPTY_FILTERS = { marque: '', categorieId: '', prixMax: '', transmission: '' }

export default function CarCatalog({
  listingType,
  title,
  subtitle,
  priceLabel = 'Prix max (DH)'
}) {
  const fetchFn = useMemo(
    () => (listingType ? () => voitureService.getByType(listingType) : () => voitureService.getAll()),
    [listingType]
  )
  const { data: voitures, loading, error } = useList(fetchFn)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [ville, setVille] = useState('')

  const filtered = useMemo(() => {
    return (voitures || []).filter((voiture) => {
      const villeName = voiture.ville?.nom || voiture.ville || ''
      if (ville && normalize(villeName) !== normalize(ville) && !normalize(villeName).includes(normalize(ville))) {
        return false
      }
      if (filters.marque && !normalize(`${voiture.marque} ${voiture.modele}`).includes(normalize(filters.marque))) {
        return false
      }
      if (filters.categorieId && String(voiture.categorieId || voiture.categorie?.id || voiture.categorie?.nom) !== String(filters.categorieId)) {
        return false
      }
      if (filters.prixMax && Number(voiture.prixParJour || voiture.prixVente) > Number(filters.prixMax)) {
        return false
      }
      if (filters.transmission && voiture.transmission !== filters.transmission) {
        return false
      }
      return true
    })
  }, [voitures, filters, ville])

  const handleSearch = (city) => {
    setVille(city)
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 pb-24 pt-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">{subtitle}</p>
          <div className="mt-8 flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto -mt-14 max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Nos voitures</h2>
          {ville && (
            <button
              type="button"
              onClick={() => setVille('')}
              className="rounded-full bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition hover:bg-primary-200"
            >
              {ville} ✕
            </button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside>
            <CarFilter filters={filters} onChange={setFilters} priceLabel={priceLabel} />
          </aside>

          <div>
            {error ? (
              <EmptyState message="Impossible de charger les voitures. Vérifiez que le backend est démarré." />
            ) : loading ? (
              <Spinner label="Chargement des voitures..." />
            ) : (
              <CarList voitures={filtered} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}