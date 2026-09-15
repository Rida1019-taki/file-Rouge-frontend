import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import './DashboardLayout.css'

export default function DashboardLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="dash">
      {open && (
        <div className="dash__overlay" onClick={() => setOpen(false)} />
      )}
      <Sidebar open={open} onNavigate={() => setOpen(false)} />
      <main className="dash__main">
        <div className="dash__topbar">
          <button
            type="button"
            className="dash__toggle"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  )
}