import { useEffect, useRef, useState } from 'react'
import villeService from '../../services/villeService'

export default function SearchBar({ onSearch }) {
  const [villes, setVilles] = useState([])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    villeService
      .getAll()
      .then((list) => setVilles(list || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const normalize = (v) => v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  const filtered = villes
    .filter((v) => normalize(v.nom || v.libelle || '').includes(normalize(query)))
    .slice(0, 8)

  const selectVille = (ville) => {
    setQuery(ville.nom)
    setOpen(false)
    onSearch?.(ville.nom)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOpen(false)
    const found = villes.find((v) => v.nom?.toLowerCase() === query.toLowerCase())
    onSearch?.(found?.nom || query.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl" ref={containerRef}>
      <div className="flex items-center rounded-full bg-white p-1.5 shadow-lg">
        <svg className="ml-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Où voulez-vous louer ? Ex : Casablanca"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          Rechercher
        </button>
      </div>

      {open && query && (
        <ul className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200">
          {filtered.length ? (
            filtered.map((ville) => (
              <li key={ville.id}>
                <button
                  type="button"
                  onClick={() => selectVille(ville)}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-primary-50"
                >
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {ville.nom || ville.libelle}
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-sm text-gray-400">Aucune ville trouvée</li>
          )}
        </ul>
      )}
    </form>
  )
}