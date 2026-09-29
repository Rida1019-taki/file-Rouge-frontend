import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import useCategories from '../../hooks/useCategories'
import './CarFilter.css'

const TRANSMISSIONS = [
  { value: 'MANUELLE', label: 'Manuelle' },
  { value: 'AUTOMATIQUE', label: 'Automatique' }
]

export default function CarFilter({ filters, onChange, priceLabel = 'Prix max (DH)' }) {
  const { categories, loading } = useCategories()

  const setFilter = (key, value) => {
    onChange?.({ ...filters, [key]: value })
  }

  const resetAll = () => {
    onChange?.({ marque: '', categorieId: '', prixMax: '', transmission: '' })
  }

  return (
    <div className="car-filter">
      <h3 className="car-filter__title">Filtres</h3>

      <div className="car-filter__body">
        <div className="form-field">
          <label className="form-label">Marque</label>
          <input
            type="text"
            value={filters.marque || ''}
            onChange={(e) => setFilter('marque', e.target.value)}
            placeholder="Ex : Renault"
            className="form-control"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Catégorie</label>
          {loading ? (
            <Spinner label="" className="spinner--inline" />
          ) : (
            <select
              value={filters.categorieId || ''}
              onChange={(e) => setFilter('categorieId', e.target.value)}
              className="form-control"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nom || cat.libelle}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">{priceLabel}</label>
          <input
            type="number"
            min="0"
            value={filters.prixMax || ''}
            onChange={(e) => setFilter('prixMax', e.target.value)}
            placeholder="Ex : 500"
            className="form-control"
          />
        </div>

        <div className="form-field">
          <label className="form-label">Transmission</label>
          <select
            value={filters.transmission || ''}
            onChange={(e) => setFilter('transmission', e.target.value)}
            className="form-control"
          >
            <option value="">Toutes</option>
            {TRANSMISSIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <Button variant="outline" className="btn--block" onClick={resetAll}>
          Réinitialiser
        </Button>
      </div>
    </div>
  )
}
