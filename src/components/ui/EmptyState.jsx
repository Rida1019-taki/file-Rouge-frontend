export default function EmptyState({ message = 'Aucun résultat trouvé', action, children }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
      <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 9.75L14.25 3.75 6.75 12.75h5.25l-.75 9 8.25-12.75h-5.25z"
        />
      </svg>
      <p className="px-4 text-sm text-gray-500">{message}</p>
      {action}
      {children}
    </div>
  )
}