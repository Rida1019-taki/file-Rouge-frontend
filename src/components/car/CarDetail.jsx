import { formatPrix, formatMontant } from '../../utils/format'
import { capitalize } from '../../utils/helpers'
import ImageGallery from './ImageGallery'
import ReservationForm from '../reservation/ReservationForm'
import StatusBadge from '../reservation/StatusBadge'
import ListingBadge from './ListingBadge'
import './CarDetail.css'

const SPECS = [
  { key: 'annee', label: 'Année', icon: 'calendar' },
  { key: 'transmission', label: 'Transmission', icon: 'gearbox' },
  { key: 'carburant', label: 'Carburant', icon: 'fuel' },
  { key: 'places', label: 'Places', icon: 'users' }
]

const ICONS = {
  calendar: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  ),
  gearbox: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  ),
  fuel: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm7-5l6 3v2l-6-3v-2z" />
  ),
  users: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  )
}

const CONTACT_MAIL = 'contact@tomobilty.ma'

export default function CarDetail({ voiture }) {
  const categorie = voiture.categorie?.nom || voiture.categorieName
  const ville = voiture.ville?.nom || voiture.ville
  const isSale = voiture.listingType === 'SALE'

  const phone = String(voiture.ownerPhone || '').replace(/[^+\d]/g, '')
  const subject = `Demande d'information - ${voiture.marque} ${voiture.modele}`
  const contactHref = phone
    ? `https://wa.me/${phone}?text=${encodeURIComponent(
        `Bonjour, je suis intéressé par votre ${voiture.marque} ${voiture.modele}.`
      )}`
    : `mailto:${CONTACT_MAIL}?subject=${encodeURIComponent(subject)}`

  return (
    <div className="car-detail">
      <div className="car-detail__main">
        <div className="car-detail__header">
          <h1 className="car-detail__title">
            {voiture.marque} {voiture.modele}
          </h1>
          <ListingBadge listingType={voiture.listingType} />
          {voiture.statut && <StatusBadge statut={voiture.statut} />}
        </div>
        <p className="car-detail__meta">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {ville}
          {categorie && (<><span className="car-detail__sep">•</span>{categorie}</>)}
        </p>

        <ImageGallery images={voiture.images} />

        <div className="car-detail__specs">
          {SPECS.map((spec) => {
            const value = voiture[spec.key]
            if (!value) return null
            return (
              <div key={spec.key} className="car-detail__spec">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="car-detail__spec-icon" aria-hidden="true">
                  {ICONS[spec.icon]}
                </svg>
                <p className="car-detail__spec-value">{capitalize(String(value))}</p>
                <p className="car-detail__spec-label">{spec.label}</p>
              </div>
            )
          })}
        </div>

        {voiture.description && (
          <div className="car-detail__section">
            <h2 className="car-detail__section-title">Description</h2>
            <p className="car-detail__desc">{voiture.description}</p>
          </div>
        )}
      </div>

      <div className="car-detail__sidebar">
        <div className="car-detail__price-card">
          {isSale ? (
            <>
              <p className="car-detail__price-label">Prix de vente</p>
              <p className="car-detail__price">{formatMontant(voiture.prixVente)}</p>
              <a href={contactHref} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--block car-detail__cta">
                Contacter le vendeur
              </a>
            </>
          ) : (
            <>
              <p className="car-detail__price-label">À partir de</p>
              <p className="car-detail__price">{formatPrix(voiture.prixParJour)}</p>
              <p className="car-detail__price-note">Hors assurance et carburant</p>

              <ReservationForm voiture={voiture} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}