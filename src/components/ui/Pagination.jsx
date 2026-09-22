import './Pagination.css'

const getPageNumbers = (page, totalPages, windowSize = 5) => {
  if (totalPages <= windowSize) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  let start = Math.max(1, page - Math.floor(windowSize / 2))
  const end = Math.min(totalPages, start + windowSize - 1)
  start = Math.max(1, end - windowSize + 1)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

export default function Pagination({ page = 1, totalPages = 1, onChange }) {
  if (totalPages <= 1) return null

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
        className="pagination__nav"
      >
        Précédent
      </button>

      <span className="pagination__info">
        Page {page} sur {totalPages}
      </span>

      <div className="pagination__pages">
        {getPageNumbers(page, totalPages).map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => onChange?.(number)}
            aria-current={number === page ? 'page' : undefined}
            className={`pagination__page${number === page ? ' pagination__page--active' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange?.(page + 1)}
        className="pagination__nav"
      >
        Suivant
      </button>
    </nav>
  )
}
