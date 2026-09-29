import * as yup from 'yup'

export const reservationSchema = yup.object({
  voitureId: yup
    .number()
    .typeError('Voiture obligatoire')
    .required('La voiture est obligatoire'),
  type: yup.string().oneOf(['LOCATION', 'ACHAT']).optional(),
  dateDebut: yup
    .string()
    .when('type', (type, schema) =>
      !type || type === 'LOCATION'
        ? schema.required('La date de début est obligatoire')
        : schema.notRequired()
    ),
  dateFin: yup
    .string()
    .when('type', (type, schema) =>
      !type || type === 'LOCATION'
        ? schema.required('La date de fin est obligatoire')
        : schema.notRequired()
    )
})

export default reservationSchema