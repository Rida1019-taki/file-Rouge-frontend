export default function Select({
  label,
  name,
  options = [],
  placeholder = 'Sélectionner...',
  error,
  register,
  multiple = false,
  className = '',
  ...props
}) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        multiple={multiple}
        {...(register ? register(name) : {})}
        className={`form-control ${error ? 'form-control--error' : ''} ${className}`}
        {...props}
      >
        {!multiple && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="form-error">{error.message}</p>}
    </div>
  )
}