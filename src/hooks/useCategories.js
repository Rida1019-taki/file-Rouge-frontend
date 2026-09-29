import { useEffect, useState } from 'react'
import categorieService from '../services/categorieService'
import voitureService from '../services/voitureService'

const fromVoitures = (voitures) => {
  const seen = new Map()
  for (const voiture of voitures || []) {
    const id = voiture.categorieId ?? voiture.categorie?.id
    const nom = voiture.categorie?.nom || voiture.categorie
    if (id != null && nom && !seen.has(Number(id))) {
      seen.set(Number(id), { id: Number(id), nom })
    }
  }
  return [...seen.values()].sort((a, b) => a.id - b.id)
}

export default function useCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const list = await categorieService.getAll()
        if (!cancelled) setCategories(Array.isArray(list) ? list : [])
      } catch {
        try {
          const voitures = await voitureService.getAll()
          if (!cancelled) setCategories(fromVoitures(voitures))
        } catch {
          if (!cancelled) setCategories([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { categories, loading }
}
