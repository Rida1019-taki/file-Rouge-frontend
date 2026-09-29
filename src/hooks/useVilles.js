import { useEffect, useState } from 'react'
import villeService from '../services/villeService'
import voitureService from '../services/voitureService'

const fromVoitures = (voitures) => {
  const seen = new Map()
  for (const voiture of voitures || []) {
    const id = voiture.villeId ?? voiture.ville?.id
    const nom = voiture.ville?.nom || voiture.ville
    if (id != null && nom && !seen.has(Number(id))) {
      seen.set(Number(id), { id: Number(id), nom })
    }
  }
  return [...seen.values()].sort((a, b) => a.id - b.id)
}

export default function useVilles() {
  const [villes, setVilles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const list = await villeService.getAll()
        if (!cancelled) setVilles(Array.isArray(list) ? list : [])
      } catch {
        try {
          const voitures = await voitureService.getAll()
          if (!cancelled) setVilles(fromVoitures(voitures))
        } catch {
          if (!cancelled) setVilles([])
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

  return { villes, loading }
}
