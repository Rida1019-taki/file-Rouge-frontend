import { useState } from 'react'
import userService from '../../services/userService'
import usePaginatedList from '../../hooks/usePaginatedList'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import Pagination from '../../components/ui/Pagination'
import Toast from '../../components/ui/Toast'
import useToast from '../../hooks/useToast'
import { ROLES, ROLE_LABELS } from '../../config/roles'
import './admin-pages.css'

const ROLE_TABS = [
  { value: '', label: 'Tous' },
  { value: ROLES.CLIENT, label: 'Clients' },
  { value: ROLES.OWNER, label: 'Propriétaires' },
  { value: ROLES.ADMIN, label: 'Administrateurs' }
]

const normalize = (value) =>
  (value || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export default function UserManagement() {
  const { data: users, loading, error, reload, pagination, setPage } = usePaginatedList(userService.getAll)
  const [roleTab, setRoleTab] = useState('')
  const [search, setSearch] = useState('')
  const { toast, show, hide } = useToast()

  const handleRoleChange = (value) => {
    setRoleTab(value)
    setPage(0)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setPage(0)
  }

  const query = search.trim()
  const filtered = (users || []).filter((user) => {
    if (roleTab && user.role !== roleTab) return false
    if (!query) return true
    const haystack = normalize(
      `${user.prenom || ''} ${user.nom || ''} ${user.email || ''} ${user.telephone || ''}`
    )
    return haystack.includes(normalize(query))
  })

  const handleDelete = async (user) => {
    const label = `${user.prenom || ''} ${user.nom || ''}`.trim() || user.email
    if (!window.confirm(`Supprimer ${label} ? Cette action est irréversible.`)) return
    try {
      await userService.delete(user.id)
      show('Utilisateur supprimé')
      await reload()
    } catch {
      show('Impossible de supprimer cet utilisateur', 'error')
    }
  }

  if (error) {
    return (
      <div>
        <div className="dash-header">
          <h1 className="page-title">Gestion des utilisateurs</h1>
        </div>
        <div className="form-alert-error">
          Impossible de charger les utilisateurs. Vérifiez que le backend est démarré et réessayez.
          <button type="button" className="btn btn--outline btn--sm um-retry" onClick={reload}>
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="dash-header">
        <h1 className="page-title">Gestion des utilisateurs</h1>
      </div>

      <div className="um-toolbar">
        <div className="tabs">
          {ROLE_TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => handleRoleChange(t.value)}
              className={`tab-btn${roleTab === t.value ? ' tab-btn--active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="um-search">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="um-search__icon"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Rechercher un utilisateur..."
            className="form-control um-search__input"
            aria-label="Rechercher un utilisateur"
          />
        </div>
      </div>

      {loading ? (
        <Spinner label="Chargement des utilisateurs..." />
      ) : filtered.length ? (
        <>
          <div className="um-table-wrap">
            <table className="um-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id}>
                    <td className="um-table__name">
                      {user.prenom || user.nom
                        ? `${user.prenom || ''} ${user.nom || ''}`.trim()
                        : '—'}
                    </td>
                    <td>{user.email || '—'}</td>
                    <td>{user.telephone || '—'}</td>
                    <td>
                      <span className={`badge ${
                        user.role === ROLES.ADMIN
                          ? 'badge--admin'
                          : user.role === ROLES.OWNER
                            ? 'badge--owner'
                            : 'badge--client'
                      }`}>
                        {ROLE_LABELS[user.role] || user.role}
                      </span>
                    </td>
                    <td className="um-table__actions">
                      <button
                        type="button"
                        className="btn btn--danger btn--sm"
                        onClick={() => handleDelete(user)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            page={pagination.page + 1}
            totalPages={pagination.totalPages}
            onChange={(nextPage) => setPage(nextPage - 1)}
          />
        </>
      ) : (
        <EmptyState message="Aucun utilisateur ne correspond à ce filtre." />
      )}

      <Toast toast={toast} onClose={hide} />
    </div>
  )
}
