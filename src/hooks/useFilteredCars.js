import { useMemo, useState } from 'react'
import voitureService from '../services/voitureService'
import useList from './useList'

const normalize = (value) =>
  String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const EMPTY_FILTERS = { marque: '', categorieId: '', prixMax: '', transmission: '' }
const DEFAULT_PAGE_SIZE = 9

export default function useFilteredCars({ listingType, pageSize = DEFAULT_PAGE_SIZE } = {}) {
  const [page, setPage] = useState(0)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [ville, setVille] = useState('')

  const fetchFn = useMemo(
    () => (listingType ? () => voitureService.getByType(listingType) : () => voitureService.getAll()),
    [listingType]
  )

  const { data: voitures, loading, error } = useList(fetchFn)

  const filtered = useMemo(() => {
    return (voitures || []).filter((voiture) => {
      const villeName = voiture.ville?.nom || voiture.ville || ''
      if (ville && !normalize(villeName).includes(normalize(ville))) {
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

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages - 1)

  const visible = useMemo(
    () => filtered.slice(safePage * pageSize, safePage * pageSize + pageSize),
    [filtered, safePage, pageSize]
  )

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters)
    setPage(0)
  }

  const handleSearch = (city) => {
    setVille(city)
    setPage(0)
  }

  const clearVille = () => {
    setVille('')
    setPage(0)
  }

  return {
    voitures: visible,
    totalCount: filtered.length,
    totalPages,
    page: safePage,
    setPage,
    filters,
    ville,
    loading,
    error,
    handleFiltersChange,
    handleSearch,
    clearVille
  }
}