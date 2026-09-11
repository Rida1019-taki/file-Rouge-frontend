import { Link } from 'react-router-dom'
import { formatPrix } from '../../utils/format'
import { getCarImage } from '../../utils/carImage'
import StatusBadge from '../reservation/StatusBadge'

export default function CarCard({ voiture }) {
  const image = getCarImage(voiture)

  return (
    <Link
      to={`/voitures/${voiture.id}`}
      className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={`${voiture.marque} ${voiture.modele}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100">
            <svg className="h-14 w-14 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        )}
        {voiture.statut && (
          <div className="absolute right-3 top-3">
            <StatusBadge statut={voiture.statut} />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
          {voiture.annee}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900">
              {voiture.marque} {voiture.modele}
            </h3>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-gray-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {voiture.ville?.nom || voiture.ville}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-sm font-bold text-primary-600">{formatPrix(voiture.prixParJour)}</span>
          <span className="text-xs font-medium text-gray-400 group-hover:text-primary-600 transition">
            Voir détails →
          </span>
        </div>
      </div>
    </Link>
  )
}