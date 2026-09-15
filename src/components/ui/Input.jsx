export default function Input({
  label,
  name,
  error,
  register,
  registerOptions = {},
  type = 'text',
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
      <input
        id={name}
        name={name}
        type={type}
        {...(register ? register(name, registerOptions) : {})}
        className={`form-control ${error ? 'form-control--error' : ''} ${className}`}
        {...props}
      />
      {error && <p className="form-error">{error.message}</p>}
    </div>
  )
}