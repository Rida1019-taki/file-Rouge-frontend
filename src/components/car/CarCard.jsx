import { Link } from 'react-router-dom'
import { formatPrix, formatMontant } from '../../utils/format'
import { getCarImage } from '../../utils/carImage'
import ListingBadge from './ListingBadge'
import './CarCard.css'

const CARBURANT_LABELS = {
  DIESEL: 'Diesel',
  ESSENCE: 'Essence',
  HYBRIDE: 'Hybride',
  ELECTRIQUE: 'Électrique'
}

const TRANSMISSION_LABELS = {
  MANUELLE: 'Manuelle',
  AUTOMATIQUE: 'Automatique'
}

export default function CarCard({ voiture }) {
  const image = getCarImage(voiture)
  const isSale = voiture.listingType === 'SALE'
  const price = isSale ? formatMontant(voiture.prixVente) : formatPrix(voiture.prixParJour)

  const carburant = CARBURANT_LABELS[voiture.carburant] || voiture.carburant
  const transmission = TRANSMISSION_LABELS[voiture.transmission] || voiture.transmission

  return (
    <Link to={`/voitures/${voiture.id}`} className="car-card">
      <div className="car-card__media">
        {image ? (
          <img
            src={image}
            alt={`${voiture.marque} ${voiture.modele}`}
            loading="lazy"
          />
        ) : (
          <div className="car-card__placeholder">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        )}
        <span className="car-card__badge">
          <ListingBadge listingType={voiture.listingType} />
        </span>
      </div>

      <div className="car-card__body">
        <h3 className="car-card__title">
          {voiture.marque} {voiture.modele}
        </h3>
        <p className="car-card__specs">
          {[voiture.annee, carburant, transmission].filter(Boolean).join(' · ')}
        </p>
        <p className="car-card__location">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {voiture.ville?.nom || voiture.ville}
        </p>

        <div className="car-card__footer">
          <span className="car-card__price">{price}</span>
          <span className="car-card__action">
            {isSale ? 'Voir les détails' : 'Réserver'} →
          </span>
        </div>
      </div>
    </Link>
  )
}