import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import categorieService from '../../services/categorieService'
import villeService from '../../services/villeService'
import voitureService from '../../services/voitureService'
import { voitureSchema } from '../../schemas/voitureSchema'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Spinner from '../ui/Spinner'
import './CarForm.css'

const fromVoitures = (voitures, kind) => {
  const seen = new Map()
  for (const voiture of voitures || []) {
    const isVille = kind === 'ville'
    const id = isVille ? voiture.villeId ?? voiture.ville?.id : voiture.categorieId ?? voiture.categorie?.id
    const nom = isVille ? voiture.ville?.nom || voiture.ville : voiture.categorie?.nom || voiture.categorie
    if (id != null && nom && !seen.has(Number(id))) {
      seen.set(Number(id), { id: Number(id), nom })
    }
  }
  return [...seen.values()].sort((a, b) => a.id - b.id)
}

function useOptions(fetchFn, kind) {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const list = await fetchFn()
        if (mounted) {
          setOptions((list || []).map((item) => ({ value: item.id, label: item.nom || item.libelle })))
        }
      } catch {
        try {
          const voitures = await voitureService.getAll()
          const derived = fromVoitures(voitures, kind)
          if (mounted) {
            setOptions(derived.map((item) => ({ value: item.id, label: item.nom })))
          }
        } catch {
          if (mounted) setOptions([])
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [fetchFn, kind])

  return { options, loading }
}

export default function CarForm({ initialData, onSubmit, submitting = false }) {
  const { options: categories } = useOptions(categorieService.getAll, 'categorie')
  const { options: villes } = useOptions(villeService.getAll, 'ville')
  const [pendingFiles, setPendingFiles] = useState([])
  const [removedImageIds, setRemovedImageIds] = useState([])
  const existingImages = initialData?.images || []

  const defaultValues = useMemo(
    () => ({
      listingType: initialData?.listingType || 'RENTAL',
      marque: initialData?.marque || '',
      modele: initialData?.modele || '',
      annee: initialData?.annee || new Date().getFullYear(),
      prixVente: initialData?.prixVente || '',
      prixParJour: initialData?.prixParJour || '',
      transmission: initialData?.transmission || '',
      carburant: initialData?.carburant || '',
      places: initialData?.places || '',
      description: initialData?.description || '',
      categorieId: initialData?.categorieId || initialData?.categorie?.id || '',
      villeId: initialData?.villeId || initialData?.ville?.id || ''
    }),
    [initialData]
  )

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(voitureSchema),
    defaultValues
  })

  const listingType = watch('listingType')
  const isSale = listingType === 'SALE'

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  const handleFiles = (event) => {
    const chosen = Array.from(event.target.files || [])
    setPendingFiles((prev) => [
      ...prev,
      ...chosen.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
    ])
    event.target.value = ''
  }

  const removePendingFile = (index) => {
    setPendingFiles((prev) => {
      URL.revokeObjectURL(prev[index]?.preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const removeExistingImage = (imageId) => {
    setRemovedImageIds((prev) => [...prev, imageId])
  }

  const submitForm = handleSubmit((values) =>
    onSubmit({ ...values, _files: pendingFiles, _removedImageIds: removedImageIds })
  )

  if (!categories.length && !villes.length) {
    return <Spinner label="Chargement du formulaire..." />
  }

  return (
    <form onSubmit={submitForm} noValidate>
      <div className="form-field">
        <label className="form-label">Type d'annonce</label>
        <div className="announce-type">
          <label
            className={`announce-type__option${isSale ? ' announce-type__option--sale' : ''}`}
          >
            <input type="radio" value="SALE" {...register('listingType')} />
            <span className="announce-type__meta">
              <span className="announce-type__name">Vente</span>
              <span className="announce-type__hint">Prix de vente fixe</span>
            </span>
          </label>
          <label
            className={`announce-type__option${!isSale ? ' announce-type__option--rental' : ''}`}
          >
            <input type="radio" value="RENTAL" {...register('listingType')} />
            <span className="announce-type__meta">
              <span className="announce-type__name">Location</span>
              <span className="announce-type__hint">Prix par jour</span>
            </span>
          </label>
        </div>
      </div>

      <div className="form-grid">
        <Input label="Marque" name="marque" register={register} error={errors.marque} placeholder="Ex : Renault" />
        <Input label="Modèle" name="modele" register={register} error={errors.modele} placeholder="Ex : Clio" />
        <Input
          label="Année"
          name="annee"
          type="number"
          register={register}
          registerOptions={{ valueAsNumber: true }}
          error={errors.annee}
        />
        {isSale ? (
          <Input
            label="Prix de vente (DH)"
            name="prixVente"
            type="number"
            step="0.01"
            register={register}
            registerOptions={{ valueAsNumber: true }}
            error={errors.prixVente}
          />
        ) : (
          <Input
            label="Prix par jour (DH)"
            name="prixParJour"
            type="number"
            step="0.01"
            register={register}
            registerOptions={{ valueAsNumber: true }}
            error={errors.prixParJour}
          />
        )}

        <Select
          label="Catégorie"
          name="categorieId"
          register={register}
          error={errors.categorieId}
          options={categories}
          placeholder="Choisir une catégorie"
        />
        <Select
          label="Ville"
          name="villeId"
          register={register}
          error={errors.villeId}
          options={villes}
          placeholder="Choisir une ville"
        />
        <Select
          label="Transmission"
          name="transmission"
          register={register}
          options={[
            { value: 'MANUELLE', label: 'Manuelle' },
            { value: 'AUTOMATIQUE', label: 'Automatique' }
          ]}
          placeholder="Non précisée"
        />
        <Select
          label="Carburant"
          name="carburant"
          register={register}
          options={[
            { value: 'ESSENCE', label: 'Essence' },
            { value: 'DIESEL', label: 'Diesel' },
            { value: 'HYBRIDE', label: 'Hybride' },
            { value: 'ELECTRIQUE', label: 'Électrique' }
          ]}
          placeholder="Non précisé"
        />
        <Input
          label="Nombre de places"
          name="places"
          type="number"
          register={register}
          registerOptions={{ valueAsNumber: true }}
          error={errors.places}
        />
      </div>

      <div className="form-field">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          {...register('description')}
          className={`form-control ${errors.description ? 'form-control--error' : ''}`}
        />
        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-field">
        <span className="form-label">Photos de la voiture</span>
        <label className="form-control form-control--file">
          <span>Choisir des photos</span>
          <input type="file" accept="image/*" multiple onChange={handleFiles} />
        </label>
        {(existingImages.filter((img) => !removedImageIds.includes(img.id)).length > 0 ||
          pendingFiles.length > 0) && (
          <div className="image-grid">
            {existingImages
              .filter((img) => !removedImageIds.includes(img.id))
              .map((img) => (
                <div key={img.id} className="image-cell">
                  <img src={img.url} alt="" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img.id)}
                    className="image-cell__remove"
                    aria-label="Supprimer cette photo"
                  >
                    ✕
                  </button>
                </div>
              ))}
            {pendingFiles.map((file, index) => (
              <div key={`${file.name}-${index}`} className="image-cell">
                <img src={file.preview} alt="" />
                <button
                  type="button"
                  onClick={() => removePendingFile(index)}
                  className="image-cell__remove"
                  aria-label="Retirer cette photo"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <Button type="submit" loading={submitting}>
          {initialData ? 'Mettre à jour' : 'Créer la voiture'}
        </Button>
      </div>
    </form>
  )
}