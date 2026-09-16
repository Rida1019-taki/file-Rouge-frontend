import { useEffect, useRef, useState } from 'react'
import useVilles from '../../hooks/useVilles'
import './SearchBar.css'

export default function SearchBar({ onSearch }) {
  const { villes } = useVilles()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

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
    <form onSubmit={handleSubmit} className="searchbar" ref={containerRef}>
      <div className="searchbar__box">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="searchbar__icon" aria-hidden="true">
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
          placeholder="Rechercher par ville — Ex : Casablanca"
          className="searchbar__input"
        />
        <button
          type="submit"
          className="searchbar__btn"
        >
          Rechercher
        </button>
      </div>

      {open && query && (
        <ul className="searchbar__dropdown">
          {filtered.length ? (
            filtered.map((ville) => (
              <li key={ville.id}>
                <button
                  type="button"
                  onClick={() => selectVille(ville)}
                  className="searchbar__item"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {ville.nom || ville.libelle}
                </button>
              </li>
            ))
          ) : (
            <li className="searchbar__empty">Aucune ville trouvée</li>
          )}
        </ul>
      )}
    </form>
  )
}
