import './EmptyState.css'

export default function EmptyState({ message = 'Aucun résultat trouvé', action, children }) {
  return (
    <div className="empty">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty__icon">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 9.75L14.25 3.75 6.75 12.75h5.25l-.75 9 8.25-12.75h-5.25z"
        />
      </svg>
      <p className="empty__message">{message}</p>
      {action}
      {children}
    </div>
  )
}
