import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import reservationService from '../../services/reservationService'
import { reservationSchema } from '../../schemas/reservationSchema'
import { calcMontant, formatMontant } from '../../utils/format'
import { getErrorMessage } from '../../utils/helpers'
import Button from '../ui/Button'

export default function ReservationForm({ voiture }) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(reservationSchema),
    defaultValues: {
      voitureId: voiture.id,
      dateDebut: '',
      dateFin: ''
    }
  })

  const dateDebut = watch('dateDebut')
  const dateFin = watch('dateFin')
  const montant = calcMontant(voiture.prixParJour, dateDebut, dateFin)

  const toDate = (val) => (val ? new Date(val) : null)

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError(null)
    setSuccess(false)
    try {
      await reservationService.create(data)
      setSuccess(true)
      reset({ voitureId: voiture.id, dateDebut: '', dateFin: '' })
    } catch (err) {
      setError(getErrorMessage(err, "Impossible de créer la réservation"))
    } finally {
      setSubmitting(false)
    }
  }

  const dateErrorMessage = (message) => (
    <p className="mt-1 text-xs text-red-600">{message}</p>
  )

  if (success) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-sm text-green-700">
        <p className="font-semibold">Réservation envoyée !</p>
        <p className="mt-1">Le propriétaire va confirmer votre demande. Suivez-la dans « Mes réservations ».</p>
        <Button
          variant="outline"
          className="mt-3"
          onClick={() => setSuccess(false)}
        >
          Nouvelle réservation
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Date de début</label>
          <Controller
            name="dateDebut"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={toDate(field.value)}
                onChange={(date) => field.onChange(date ? date.toISOString() : '')}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Choisir une date"
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 ${
                  errors.dateDebut
                    ? 'border-red-400 focus:ring-red-100'
                    : 'border-gray-300 focus:border-primary-600 focus:ring-primary-100'
                }`}
              />
            )}
          />
          {errors.dateDebut && dateErrorMessage(errors.dateDebut.message)}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Date de fin</label>
          <Controller
            name="dateFin"
            control={control}
            render={({ field }) => (
              <DatePicker
                selected={toDate(field.value)}
                onChange={(date) => field.onChange(date ? date.toISOString() : '')}
                dateFormat="dd/MM/yyyy"
                minDate={toDate(dateDebut) || new Date()}
                placeholderText="Choisir une date"
                className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 ${
                  errors.dateFin
                    ? 'border-red-400 focus:ring-red-100'
                    : 'border-gray-300 focus:border-primary-600 focus:ring-primary-100'
                }`}
              />
            )}
          />
          {errors.dateFin && dateErrorMessage(errors.dateFin.message)}
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
          <span className="text-sm text-gray-600">Montant estimé</span>
          <span className="text-lg font-bold text-primary-600">{formatMontant(montant)}</span>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <Button type="submit" className="w-full" loading={submitting}>
          {submitting ? 'Envoi...' : 'Réserver cette voiture'}
        </Button>
      </div>
    </form>
  )
}