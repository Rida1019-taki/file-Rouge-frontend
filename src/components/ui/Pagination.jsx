export default function Pagination({ page, totalPages = 1, onChange }) {
  if (totalPages <= 1) return null

  const pageNumber = (number, label, active) => (
    <button
      key={number}
      type="button"
      onClick={() => onChange?.(number)}
      className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition ${
        active
          ? 'bg-primary-600 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="flex items-center justify-center gap-1.5 py-6">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
        className="h-9 rounded-lg px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Précédent
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 10).map((n) =>
        pageNumber(n, n, n === page)
      )}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange?.(page + 1)}
        className="h-9 rounded-lg px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Suivant
      </button>
    </div>
  )
}