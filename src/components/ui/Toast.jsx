import './Toast.css'

const STYLES = {
  success: 'toast--success',
  error: 'toast--error',
  info: 'toast--info'
}

export default function Toast({ toast, onClose }) {
  if (!toast) return null

  const style = STYLES[toast.type] || STYLES.success

  return (
    <div className="toast-wrap">
      <div className={`toast ${style}`}>
        {toast.type === 'error' ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="toast__icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="toast__icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        <span>{toast.message}</span>
        <button
          type="button"
          onClick={onClose}
          className="toast__close"
          aria-label="Fermer"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
