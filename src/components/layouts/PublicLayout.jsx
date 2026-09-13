import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center sm:px-6">
          <span className="text-lg font-bold text-gray-900">
            Tomo<span className="text-primary-600">bility</span>.ma
          </span>
          <p className="text-sm text-gray-500">
            Achat et location de voitures partout au Maroc — Casablanca, Rabat,
            Marrakech, Tanger et plus.
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Tomobilty.ma. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}