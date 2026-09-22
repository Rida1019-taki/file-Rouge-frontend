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
import './ReservationForm.css'

export default function ReservationForm({ voiture }) {
  const isSale = voiture.listingType === 'SALE'
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
      type: isSale ? 'ACHAT' : 'LOCATION',
      dateDebut: '',
      dateFin: ''
    }
  })

  const dateDebut = watch('dateDebut')
  const dateFin = watch('dateFin')
  const montant = isSale
    ? Number(voiture.prixVente ?? 0)
    : calcMontant(voiture.prixParJour, dateDebut, dateFin)

  const toDate = (val) => (val ? new Date(val) : null)

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError(null)
    setSuccess(false)
    try {
      const payload = { voitureId: data.voitureId, type: data.type }
      if (data.type !== 'ACHAT') {
        payload.dateDebut = data.dateDebut
        payload.dateFin = data.dateFin
      }
      await reservationService.create(payload)
      setSuccess(true)
      reset({
        voitureId: voiture.id,
        type: isSale ? 'ACHAT' : 'LOCATION',
        dateDebut: '',
        dateFin: ''
      })
    } catch (err) {
      setError(getErrorMessage(err, 'Impossible de créer la réservation'))
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="res-success">
        <p>{isSale ? 'Demande d\'achat envoyée !' : 'Réservation envoyée !'}</p>
        <p className="res-success__text">
          {isSale
            ? 'Le vendeur va confirmer votre demande. Suivez-la dans « Mes réservations ».'
            : 'Le propriétaire va confirmer votre demande. Suivez-la dans « Mes réservations ».'}
        </p>
        <Button
          variant="outline"
          onClick={() => setSuccess(false)}
        >
          Nouvelle demande
        </Button>
      </div>
    )
  }

  const datePickerClass = (hasError) =>
    `form-control ${hasError ? 'form-control--error' : ''}`

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="res-form">
        {isSale ? (
          <div className="res-summary">
            <span className="res-summary__label">Prix de vente</span>
            <span className="res-summary__value">{formatMontant(voiture.prixVente)}</span>
          </div>
        ) : (
          <>
            <div className="form-field">
              <label className="form-label">Date de début</label>
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
                    className={datePickerClass(errors.dateDebut)}
                  />
                )}
              />
              {errors.dateDebut && (
                <p className="form-error">{errors.dateDebut.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label">Date de fin</label>
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
                    className={datePickerClass(errors.dateFin)}
                  />
                )}
              />
              {errors.dateFin && (
                <p className="form-error">{errors.dateFin.message}</p>
              )}
            </div>

            <div className="res-summary">
              <span className="res-summary__label">Montant estimé</span>
              <span className="res-summary__value">{formatMontant(montant)}</span>
            </div>
          </>
        )}

        {error && <p className="res-form__error">{error}</p>}

        <Button type="submit" className="btn--block" loading={submitting}>
          {submitting
            ? 'Envoi...'
            : isSale
              ? 'Réserver l\'achat'
              : 'Réserver cette voiture'}
        </Button>
      </div>
    </form>
  )
}