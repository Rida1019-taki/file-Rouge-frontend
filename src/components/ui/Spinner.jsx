import './Spinner.css'

export default function Spinner({ label = 'Chargement...', className = '' }) {
  return (
    <div className={`spinner ${className}`}>
      <svg className="spinner__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      {label && <p className="text-sm text-muted">{label}</p>}
    </div>
  )
}
