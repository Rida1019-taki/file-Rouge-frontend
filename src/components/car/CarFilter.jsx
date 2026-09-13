import { useEffect, useState } from 'react'
import categorieService from '../../services/categorieService'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'

const TRANSMISSIONS = [
  { value: 'MANUELLE', label: 'Manuelle' },
  { value: 'AUTOMATIQUE', label: 'Automatique' }
]

export default function CarFilter({ filters, onChange, priceLabel = 'Prix max (DH)' }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    categorieService
      .getAll()
      .then((list) => setCategories(list || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const setFilter = (key, value) => {
    onChange?.({ ...filters, [key]: value })
  }

  const resetAll = () => {
    onChange?.({ marque: '', categorieId: '', prixMax: '', transmission: '' })
  }

  const selectClass =
    'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-100'

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Filtres</h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Marque</label>
          <input
            type="text"
            value={filters.marque || ''}
            onChange={(e) => setFilter('marque', e.target.value)}
            placeholder="Ex : Renault"
            className={selectClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Catégorie</label>
          {loading ? (
            <Spinner label="" />
          ) : (
            <select
              value={filters.categorieId || ''}
              onChange={(e) => setFilter('categorieId', e.target.value)}
              className={selectClass}
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

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">{priceLabel}</label>
          <input
            type="number"
            min="0"
            value={filters.prixMax || ''}
            onChange={(e) => setFilter('prixMax', e.target.value)}
            placeholder="Ex : 500"
            className={selectClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Transmission</label>
          <select
            value={filters.transmission || ''}
            onChange={(e) => setFilter('transmission', e.target.value)}
            className={selectClass}
          >
            <option value="">Toutes</option>
            {TRANSMISSIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <Button variant="outline" className="w-full" onClick={resetAll}>
          Réinitialiser
        </Button>
      </div>
    </div>
  )
}