import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import voitureService from '../services/voitureService'
import useList from '../hooks/useList'
import CarList from '../components/car/CarList'
import CarFilter from '../components/car/CarFilter'
import SearchBar from '../components/common/SearchBar'
import HowItWorks from '../components/common/HowItWorks'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'

const normalize = (value) =>
  String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const EMPTY_FILTERS = { marque: '', categorieId: '', prixMax: '', transmission: '' }

export default function HomePage() {
  const { data: voitures, loading, error } = useList(voitureService.getAll)
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
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 pb-32 pt-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
            Achetez ou louez votre voiture au Maroc
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
            Des centaines de voitures disponibles à Casablanca, Rabat, Marrakech,
            Tanger et dans tout le Royaume.
          </p>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <Link
              to="/vente"
              className="group flex flex-col items-start rounded-2xl bg-white p-8 text-left shadow-lg transition hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100">
                <svg className="h-8 w-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                <span className="mr-1">🚘</span> Acheter une voiture
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Trouvez votre prochaine voiture parmi les véhicules disponibles à la vente.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700">
                Voir les voitures à vendre
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h14" />
                </svg>
              </span>
            </Link>

            <Link
              to="/location"
              className="group flex flex-col items-start rounded-2xl bg-white p-8 text-left shadow-lg transition hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                <svg className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                <span className="mr-1">🚗</span> Louer une voiture
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Louez une voiture adaptée à vos besoins et à votre durée de location.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700">
                Voir les voitures à louer
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h14" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section id="catalog" className="mx-auto -mt-16 max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-gray-900">Nos voitures disponibles</h2>
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
            <CarFilter filters={filters} onChange={setFilters} />
          </aside>

          <div>
            <div className="mb-4">
              <SearchBar onSearch={handleSearch} />
            </div>
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

      <HowItWorks />

      <section id="a-propos" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">À propos de Tomobilty.ma</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-gray-500">
            Tomobilty.ma est la marketplace automobile marocaine qui vous permet d'acheter
            une voiture en toute simplicité ou de la louer pour vos déplacements. Comparez
            les offres, contactez les vendeurs et réservez votre location partout au Maroc.
          </p>
        </div>
      </section>

      <section id="contact" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900">Contactez-nous</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Une question sur l'achat ou la location d'une voiture ? Notre équipe vous
            répond rapidement.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2">
              <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contact@tomobilty.ma
            </span>
            <span className="inline-flex items-center gap-2">
              <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +212 6 00 00 00 00
            </span>
          </div>
        </div>
      </section>
    </>
  )
}