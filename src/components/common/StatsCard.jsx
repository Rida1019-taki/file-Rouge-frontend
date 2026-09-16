import './StatsCard.css'

const ICONS = {
  voitures: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  ),
  reservations: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  ),
  clients: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  ),
  revenus: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  )
}

const COLORS = {
  voitures: 'stat-card__icon--blue',
  reservations: 'stat-card__icon--green',
  clients: 'stat-card__icon--purple',
  revenus: 'stat-card__icon--amber'
}

export default function StatsCard({ title, value, icon = 'voitures', hint }) {
  const displayValue = typeof value === 'number' && !Number.isInteger(value)
    ? value.toLocaleString('fr-MA', { maximumFractionDigits: 0 })
    : Number(value || 0).toLocaleString('fr-MA')

  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <p className="stat-card__label">{title}</p>
        <span className={`stat-card__icon ${COLORS[icon] || COLORS.voitures}`}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {ICONS[icon] || ICONS.voitures}
          </svg>
        </span>
      </div>
      <p className="stat-card__value">{displayValue}</p>
      {hint && <p className="stat-card__hint">{hint}</p>}
    </div>
  )
}
