import './Card.css'

export default function Card({ children, className = '', title, subtitle }) {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle) && (
        <div className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
