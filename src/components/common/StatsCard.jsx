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
  voitures: 'bg-blue-100 text-blue-600',
  reservations: 'bg-green-100 text-green-600',
  clients: 'bg-purple-100 text-purple-600',
  revenus: 'bg-amber-100 text-amber-600'
}

export default function StatsCard({ title, value, icon = 'voitures', hint }) {
  const displayValue = typeof value === 'number' && !Number.isInteger(value)
    ? value.toLocaleString('fr-MA', { maximumFractionDigits: 0 })
    : Number(value || 0).toLocaleString('fr-MA')

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${COLORS[icon] || COLORS.voitures}`}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {ICONS[icon] || ICONS.voitures}
          </svg>
        </span>
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-900">{displayValue}</p>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  )
}