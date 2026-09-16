import './Pagination.css'

export default function Pagination({ page, totalPages = 1, onChange }) {
  if (totalPages <= 1) return null

  const pageNumber = (number, label, active) => (
    <button
      key={number}
      type="button"
      onClick={() => onChange?.(number)}
      className={`pagination__page${active ? ' pagination__page--active' : ''}`}
    >
      {label}
    </button>
  )

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
        className="pagination__nav"
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
        className="pagination__nav"
      >
        Suivant
      </button>
    </div>
  )
}
