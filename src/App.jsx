import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ROLES } from './config/roles'
import PublicLayout from './components/layouts/PublicLayout'
import DashboardLayout from './components/layouts/DashboardLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import GuestRoute from './components/auth/GuestRoute'
import HomePage from './pages/HomePage'
import SalesPage from './pages/SalesPage'
import RentalPage from './pages/RentalPage'
import CarDetailPage from './pages/CarDetailPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import MyReservationsPage from './pages/client/MyReservationsPage'
import OwnerCarsPage from './pages/owner/OwnerCarsPage'
import CarFormPage from './pages/owner/CarFormPage'
import OwnerReservationsPage from './pages/owner/OwnerReservationsPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminCarsPage from './pages/admin/AdminCarsPage'
import UserManagement from './pages/admin/UserManagement'

function ScrollToTop() {
  const { pathname, hash, state } = useLocation()

  useEffect(() => {
    if (hash || state?.scrollTo) return
    window.scrollTo(0, 0)
  }, [pathname, hash, state])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/vente" element={<SalesPage />} />
        <Route path="/location" element={<RentalPage />} />
        <Route path="/voitures/:id" element={<CarDetailPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/profil" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={[ROLES.CLIENT]} />}>
        <Route path="/client/mes-reservations" element={<MyReservationsPage />} />
      </Route>

      <Route element={<ProtectedRoute roles={[ROLES.OWNER]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/owner" element={<OwnerCarsPage />} />
          <Route path="/owner/voitures/nouvelle" element={<CarFormPage />} />
          <Route path="/owner/voitures/:id/modifier" element={<CarFormPage />} />
          <Route path="/owner/reservations" element={<OwnerReservationsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/voitures" element={<AdminCarsPage />} />
          <Route path="/admin/utilisateurs" element={<UserManagement />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
