import './Button.css'

const VARIANTS = {
  primary: 'btn--primary',
  danger: 'btn--danger',
  outline: 'btn--outline',
  ghost: 'btn--ghost'
}

export default function Button({
  variant = 'primary',
  type = 'button',
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn ${VARIANTS[variant] || VARIANTS.primary} ${className}`}
      {...props}
    >
      {loading && (
        <svg
          className="btn__spinner"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
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
      )}
      {children}
    </button>
  )
}
