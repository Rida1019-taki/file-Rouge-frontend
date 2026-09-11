export default function Card({ children, className = '', title, subtitle }) {
  return (
    <div
      className={`rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200 ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}