import * as yup from 'yup'

export const reservationSchema = yup.object({
  voitureId: yup
    .number()
    .typeError('Voiture obligatoire')
    .required('La voiture est obligatoire'),
  dateDebut: yup
    .string()
    .required('La date de début est obligatoire'),
  dateFin: yup
    .string()
    .required('La date de fin est obligatoire')
})

export default reservationSchema