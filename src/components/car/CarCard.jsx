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
        <img
          src={image}
          alt={`${voiture.marque} ${voiture.modele}`}
          loading="lazy"
        />
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

        <div className="car-card__footer">
          <span className="car-card__price">{price}</span>
          <span className="car-card__location">
            {voiture.ville?.nom || voiture.ville}
          </span>
        </div>
      </div>
    </Link>
  )
}
