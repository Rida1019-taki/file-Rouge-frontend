import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import voitureService from '../../services/voitureService'
import useFetch from '../../hooks/useFetch'
import CarForm from '../../components/car/CarForm'
import Spinner from '../../components/ui/Spinner'
import useToast from '../../hooks/useToast'
import Toast from '../../components/ui/Toast'
import { getErrorMessage } from '../../utils/helpers'

export default function CarFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast, show, hide } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const isEdit = Boolean(id)
  const { data: voiture, loading } = useFetch(
    isEdit ? () => voitureService.getById(id) : null
  )

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      if (isEdit) {
        await voitureService.update(id, data)
        show('Voiture mise à jour avec succès')
      } else {
        const created = await voitureService.create(data)
        show('Voiture créée avec succès')
        navigate(`/owner/voitures/${created.id}/modifier`)
        return
      }
      navigate('/owner')
    } catch (err) {
      show(getErrorMessage(err, 'Une erreur est survenue'), 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (isEdit && loading) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <Spinner label="Chargement de la voiture..." />
      </div>
    )
  }

  if (isEdit && !voiture) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          Impossible de charger cette voiture. Elle est peut-être introuvable.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        {isEdit ? 'Modifier la voiture' : 'Ajouter une voiture'}
      </h1>
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <CarForm
          initialData={isEdit ? voiture : null}
          onSubmit={onSubmit}
          submitting={submitting}
        />
      </div>
      <Toast toast={toast} onClose={hide} />
    </div>
  )
}