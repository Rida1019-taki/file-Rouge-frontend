import { useCallback, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import voitureService from '../../services/voitureService'
import imageService from '../../services/imageService'
import useFetch from '../../hooks/useFetch'
import CarForm from '../../components/car/CarForm'
import Spinner from '../../components/ui/Spinner'
import useToast from '../../hooks/useToast'
import Toast from '../../components/ui/Toast'
import { getErrorMessage } from '../../utils/helpers'
import './owner-pages.css'

export default function CarFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast, show, hide } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const isEdit = Boolean(id)
  const fetchEditVoiture = useCallback(() => voitureService.getById(id), [id])
  const fetchVoiture = isEdit ? fetchEditVoiture : null
  const { data: voiture, loading } = useFetch(fetchVoiture)

  const saveImages = async (voitureId, files, removedImageIds, existingCount) => {
    if (removedImageIds?.length) {
      await Promise.all(removedImageIds.map((imageId) => imageService.remove(imageId)))
    }
    if (files?.length) {
      await Promise.all(
        files.map((file, index) => imageService.add(voitureId, file, existingCount + index === 0))
      )
    }
  }

  const onSubmit = async ({ _files, _removedImageIds, ...data }) => {
    setSubmitting(true)
    try {
      if (isEdit) {
        await voitureService.update(id, data)
        await saveImages(id, _files, _removedImageIds, voiture?.images?.length ?? 0)
        show('Voiture mise à jour avec succès')
      } else {
        const created = await voitureService.create(data)
        await saveImages(created.id, _files, _removedImageIds, 0)
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
      <div className="owner-loading">
        <Spinner label="Chargement de la voiture..." />
      </div>
    )
  }

  if (isEdit && !voiture) {
    return (
      <div className="owner-loading">
        <p className="form-alert-error">
          Impossible de charger cette voiture. Elle est peut-être introuvable.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="page-title page-title--spaced">
        {isEdit ? 'Modifier la voiture' : 'Ajouter une voiture'}
      </h1>
      <div className="form-sheet">
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
