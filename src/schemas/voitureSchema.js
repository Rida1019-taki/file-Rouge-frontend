import * as yup from 'yup'

export const voitureSchema = yup.object({
  marque: yup.string().required('La marque est obligatoire'),
  modele: yup.string().required('Le modèle est obligatoire'),
  annee: yup
    .number()
    .typeError("L'année doit être un nombre")
    .required("L'année est obligatoire")
    .min(1990, 'Année minimum 1990')
    .max(2026, 'Année maximum 2026'),
  prixParJour: yup
    .number()
    .typeError('Le prix doit être un nombre')
    .required('Le prix journalier est obligatoire')
    .positive('Le prix doit être positif'),
  categorieId: yup
    .number()
    .typeError('Catégorie obligatoire')
    .required('La catégorie est obligatoire'),
  villeId: yup
    .number()
    .typeError('Ville obligatoire')
    .required('La ville est obligatoire'),
  transmission: yup.string().optional(),
  carburant: yup.string().optional(),
  places: yup.number().typeError('Nombre de places invalide').optional(),
  description: yup.string().optional()
})

export default voitureSchema