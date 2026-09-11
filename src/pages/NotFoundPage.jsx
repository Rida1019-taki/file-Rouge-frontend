import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-black text-primary-600">404</p>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">Page introuvable</h1>
      <p className="mt-2 max-w-md text-gray-500">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="mt-6">
        <Button>Retour à l'accueil</Button>
      </Link>
    </div>
  )
}