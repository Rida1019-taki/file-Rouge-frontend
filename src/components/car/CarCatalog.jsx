import { useMemo, useState } from 'react'
import voitureService from '../../services/voitureService'
import useList from '../../hooks/useList'
import CarList from './CarList'
import CarFilter from './CarFilter'
import SearchBar from '../common/SearchBar'
import Spinner from '../ui/Spinner'
import EmptyState from '../ui/EmptyState'
import './CarCatalog.css'

const normalize = (value) =>
  String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const EMPTY_FILTERS = { marque: '', categorieId: '', prixMax: '', transmission: '' }

export default function CarCatalog({
  listingType,
  title,
  subtitle,
  eyebrow,
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
    document.getElementById('catalog')?.scrollIntoView()
  }

  return (
    <>
      <section className="catalog-hero">
        <div className="container catalog-hero__inner">
          {eyebrow && <span className="catalog-hero__eyebrow">{eyebrow}</span>}
          <h1 className="catalog-hero__title">{title}</h1>
          <p className="catalog-hero__subtitle">{subtitle}</p>
          <div className="catalog-hero__search">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      <section id="catalog" className="catalog">
        <div className="container">
          <div className="catalog__header">
            <h2 className="catalog__title">Nos voitures</h2>
            {ville && (
              <button
                type="button"
                onClick={() => setVille('')}
                className="catalog__chip"
              >
                {ville} ✕
              </button>
            )}
          </div>

          <div className="grid-aside">
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
        </div>
      </section>
    </>
  )
}
