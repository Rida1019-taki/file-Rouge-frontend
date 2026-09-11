import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import categorieService from '../../services/categorieService'
import villeService from '../../services/villeService'
import { voitureSchema } from '../../schemas/voitureSchema'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Spinner from '../ui/Spinner'

function useOptions(fetchFn) {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetchFn()
      .then((list) => {
        if (mounted) {
          setOptions((list || []).map((item) => ({ value: item.id, label: item.nom || item.libelle })))
        }
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [fetchFn])

  return { options, loading }
}

export default function CarForm({ initialData, onSubmit, submitting = false }) {
  const { options: categories } = useOptions(categorieService.getAll)
  const { options: villes } = useOptions(villeService.getAll)

  const defaultValues = useMemo(
    () => ({
      marque: initialData?.marque || '',
      modele: initialData?.modele || '',
      annee: initialData?.annee || new Date().getFullYear(),
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
    formState: { errors }
  } = useForm({
    resolver: yupResolver(voitureSchema),
    defaultValues
  })

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  if (!categories.length && !villes.length) {
    return <Spinner label="Chargement du formulaire..." />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-x-5 md:grid-cols-2">
        <Input label="Marque" name="marque" register={register} error={errors.marque} placeholder="Ex : Renault" />
        <Input label="Modèle" name="modele" register={register} error={errors.modele} placeholder="Ex : Clio" />
        <Input label="Année" name="annee" type="number" register={register} error={errors.annee} />
        <Input label="Prix par jour (DH)" name="prixParJour" type="number" step="0.01" register={register} error={errors.prixParJour} />

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
        <Input label="Nombre de places" name="places" type="number" register={register} error={errors.places} />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          {...register('description')}
          className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 ${
            errors.description
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border-gray-300 focus:border-primary-600 focus:ring-primary-100'
          } min-h-20`}
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button type="submit" loading={submitting}>
          {initialData ? 'Mettre à jour' : 'Créer la voiture'}
        </Button>
      </div>
    </form>
  )
}