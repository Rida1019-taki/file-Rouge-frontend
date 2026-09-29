import { useMemo } from 'react'
import useFilteredCars from '../../hooks/useFilteredCars'
import CarList from './CarList'
import CarFilter from './CarFilter'
import SearchBar from '../common/SearchBar'
import Spinner from '../ui/Spinner'
import EmptyState from '../ui/EmptyState'
import Pagination from '../ui/Pagination'
import './CarCatalog.css'

export default function CarCatalog({
  listingType,
  title,
  subtitle,
  eyebrow,
  priceLabel = 'Prix max (DH)'
}) {
  const {
    voitures,
    totalPages,
    page,
    setPage,
    filters,
    ville,
    loading,
    error,
    handleFiltersChange,
    handleSearch,
    clearVille
  } = useFilteredCars({ listingType })

  const onSearch = useMemo(
    () => (city) => {
      handleSearch(city)
      document.getElementById('catalog')?.scrollIntoView()
    },
    [handleSearch]
  )

  return (
    <>
      <section className="catalog-hero">
        <div className="container catalog-hero__inner">
          {eyebrow && <span className="catalog-hero__eyebrow">{eyebrow}</span>}
          <h1 className="catalog-hero__title">{title}</h1>
          <p className="catalog-hero__subtitle">{subtitle}</p>
          <div className="catalog-hero__search">
            <SearchBar onSearch={onSearch} />
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
                onClick={clearVille}
                className="catalog__chip"
              >
                {ville} ✕
              </button>
            )}
          </div>

          <div className="grid-aside">
            <aside>
              <CarFilter filters={filters} onChange={handleFiltersChange} priceLabel={priceLabel} />
            </aside>

            <div>
              {error ? (
                <EmptyState message="Impossible de charger les voitures. Vérifiez que le backend est démarré." />
              ) : loading ? (
                <Spinner label="Chargement des voitures..." />
              ) : (
                <>
                  <CarList voitures={voitures} />
                  <Pagination
                    page={page + 1}
                    totalPages={totalPages}
                    onChange={(nextPage) => setPage(nextPage - 1)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}