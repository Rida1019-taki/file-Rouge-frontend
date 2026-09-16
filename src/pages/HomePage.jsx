import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import voitureService from '../services/voitureService'
import useList from '../hooks/useList'
import CarList from '../components/car/CarList'
import CarFilter from '../components/car/CarFilter'
import SearchBar from '../components/common/SearchBar'
import CategorySection from '../components/common/CategorySection'
import TrustSection from '../components/common/TrustSection'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import { FALLBACK_CAR_IMAGE_GALLERY } from '../utils/carImage'
import './HomePage.css'

const HERO_CAR_IMAGE =
  'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1600&auto=format&fit=crop'

const normalize = (value) =>
  String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const EMPTY_FILTERS = { marque: '', categorieId: '', prixMax: '', transmission: '' }

export default function HomePage() {
  const { data: voitures, loading, error } = useList(voitureService.getAll)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [ville, setVille] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const target = location.state?.scrollTo
    if (!target) return
    const timer = window.setTimeout(() => {
      document.getElementById(target)?.scrollIntoView()
      navigate(location.pathname, { replace: true, state: null })
    }, 0)
    return () => window.clearTimeout(timer)
  }, [location.state, location.pathname, navigate])

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
      {/* ──────────── Hero ──────────── */}
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__content">
            <span className="home-hero__label">Tomobilty.ma</span>
            <h1 className="home-hero__title">
              Votre voiture.
              <br />
              Votre choix.
            </h1>
            <p className="home-hero__subtitle">
              Achetez ou louez une voiture facilement au Maroc, partout entre les grandes villes du Royaume.
            </p>
            <div className="home-hero__cta">
              <Link to="/vente" className="btn btn--hero-primary btn--lg">
                Acheter une voiture
              </Link>
              <Link to="/location" className="btn btn--hero-outline btn--lg">
                Louer une voiture
              </Link>
            </div>
          </div>

          <div className="home-hero__media">
            <img
              src={HERO_CAR_IMAGE}
              alt="Voiture moderne Tomobilty.ma"
              loading="eager"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = FALLBACK_CAR_IMAGE_GALLERY
              }}
            />
          </div>
        </div>
      </section>

      {/* ──────────── Services ──────────── */}
      <section className="home-services">
        <div className="container home-services__grid">
          <article className="service-panel">
            <span className="service-panel__icon service-panel__icon--sale">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </span>
            <div>
              <h2 className="service-panel__title">Acheter une voiture</h2>
              <p className="service-panel__desc">Trouvez votre prochaine voiture parmi nos annonces.</p>
              <Link to="/vente" className="btn btn--lg service-panel__btn--sale">
                Voir les voitures à vendre
              </Link>
            </div>
          </article>

          <article className="service-panel">
            <span className="service-panel__icon service-panel__icon--rental">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </span>
            <div>
              <h2 className="service-panel__title">Louer une voiture</h2>
              <p className="service-panel__desc">Louez une voiture adaptée à vos besoins.</p>
              <Link to="/location" className="btn btn--lg service-panel__btn--rental">
                Voir les voitures à louer
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ──────────── Catégories ──────────── */}
      <CategorySection />

      {/* ──────────── Catalogue ──────────── */}
      <section id="catalog" className="catalog">
        <div className="container">
          <div className="catalog__header">
            <h2 className="catalog__title">Nos voitures disponibles</h2>
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
              <CarFilter filters={filters} onChange={setFilters} />
            </aside>

            <div>
              <div className="home-search">
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
        </div>
      </section>

      {/* ──────────── Confiance ──────────── */}
      <TrustSection />

      {/* ──────────── À propos ──────────── */}
      <section id="a-propos" className="home-section home-section--white">
        <div className="container">
          <h2 className="home-section__title">À propos de Tomobilty.ma</h2>
          <p className="home-section__text">
            Tomobilty.ma est la marketplace automobile marocaine qui vous permet d'acheter
            une voiture en toute simplicité ou de la louer pour vos déplacements. Comparez
            les offres, contactez les vendeurs et réservez votre location partout au Maroc.
          </p>
        </div>
      </section>

      {/* ──────────── Contact ──────────── */}
      <section id="contact" className="home-section">
        <div className="container">
          <h2 className="home-section__title">Contactez-nous</h2>
          <p className="home-section__text">
            Une question sur l'achat ou la location d'une voiture ? Notre équipe vous
            répond rapidement.
          </p>
          <div className="home-contact__items">
            <span className="home-contact__item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contact@tomobilty.ma
            </span>
            <span className="home-contact__item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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