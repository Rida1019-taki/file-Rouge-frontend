import { formatPrix } from '../../utils/format'
import { capitalize } from '../../utils/helpers'
import ImageGallery from './ImageGallery'
import ReservationForm from '../reservation/ReservationForm'
import StatusBadge from '../reservation/StatusBadge'

const SPECS = [
  { key: 'annee', label: 'Année', icon: 'calendar' },
  { key: 'transmission', label: 'Transmission', icon: 'gearbox' },
  { key: 'carburant', label: 'Carburant', icon: 'fuel' },
  { key: 'places', label: 'Places', icon: 'users' }
]

const ICONS = {
  calendar: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

export default function CarDetail({ voiture }) {
  const categorie = voiture.categorie?.nom || voiture.categorieName
  const ville = voiture.ville?.nom || voiture.ville

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            {voiture.marque} {voiture.modele}
          </h1>
          {voiture.statut && <StatusBadge statut={voiture.statut} />}
        </div>
        <p className="mb-6 flex items-center gap-1.5 text-gray-500">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {ville}
          {categorie && <span className="mx-1">•</span>}
          {categorie}
        </p>

        <ImageGallery images={voiture.images} />

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SPECS.map((spec) => {
            const value = voiture[spec.key]
            if (!value) return null
            return (
              <div key={spec.key} className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-gray-200">
                <svg className="mx-auto h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  {ICONS[spec.icon]}
                </svg>
                <p className="mt-2 text-sm font-semibold text-gray-900">{capitalize(String(value))}</p>
                <p className="text-xs text-gray-500">{spec.label}</p>
              </div>
            )
          })}
        </div>

        {voiture.description && (
          <div className="mt-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Description</h2>
            <p className="leading-relaxed text-gray-600">{voiture.description}</p>
          </div>
        )}
      </div>

      <div>
        <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm text-gray-500">À partir de</p>
          <p className="mb-1 text-3xl font-bold text-primary-600">{formatPrix(voiture.prixParJour)}</p>
          <p className="mb-6 text-xs text-gray-400">Hors assurance et carburant</p>

          <ReservationForm voiture={voiture} />
        </div>
      </div>
    </div>
  )
}