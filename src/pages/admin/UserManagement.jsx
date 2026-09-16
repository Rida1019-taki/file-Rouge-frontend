import { useEffect, useState } from 'react'
import api from '../../api/axios'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
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

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [roleTab, setRoleTab] = useState('')
  const { toast, show, hide } = useToast()

  useEffect(() => {
    let cancelled = false
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.get('/users')
        if (!cancelled && Array.isArray(response.data)) {
          setUsers(response.data)
        } else if (!cancelled) {
          setUsers([])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err)
          setUsers([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchUsers()
    return () => {
      cancelled = true
    }
  }, [])

  const reload = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get('/users')
      setUsers(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      setError(err)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const filtered = roleTab
    ? users.filter((u) => u.role === roleTab)
    : users

  const handleDelete = async (user) => {
    const label = `${user.prenom || ''} ${user.nom || ''}`.trim() || user.email
    if (!window.confirm(`Supprimer ${label} ? Cette action est irréversible.`)) return
    try {
      await api.delete(`/admin/users/${user.id}`)
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

      <div className="tabs">
        {ROLE_TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setRoleTab(t.value)}
            className={`tab-btn${roleTab === t.value ? ' tab-btn--active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner label="Chargement des utilisateurs..." />
      ) : filtered.length ? (
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
      ) : (
        <EmptyState message="Aucun utilisateur ne correspond à ce filtre." />
      )}

      <Toast toast={toast} onClose={hide} />
    </div>
  )
}