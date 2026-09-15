import * as yup from 'yup'

const numberOrUndefined = (value) =>
  value === '' || value === null || Number.isNaN(value) ? undefined : value

export const voitureSchema = yup.object({
  listingType: yup
    .string()
    .oneOf(['SALE', 'RENTAL'], 'Type d\'annonce invalide')
    .required("Le type d'annonce est obligatoire"),
  marque: yup.string().required('La marque est obligatoire'),
  modele: yup.string().required('Le modèle est obligatoire'),
  annee: yup
    .number("L'année doit être un nombre")
    .transform(numberOrUndefined)
    .required("L'année est obligatoire")
    .min(1990, 'Année minimum 1990')
    .max(2026, 'Année maximum 2026'),
  prixParJour: yup
    .number('Le prix doit être un nombre')
    .transform(numberOrUndefined)
    .positive('Le prix doit être positif')
    .when('listingType', {
      is: 'RENTAL',
      then: (schema) => schema.required('Le prix journalier est obligatoire'),
      otherwise: (schema) => schema.notRequired().nullable()
    }),
  prixVente: yup
    .number('Le prix doit être un nombre')
    .transform(numberOrUndefined)
    .positive('Le prix doit être positif')
    .when('listingType', {
      is: 'SALE',
      then: (schema) => schema.required('Le prix de vente est obligatoire'),
      otherwise: (schema) => schema.notRequired().nullable()
    }),
  categorieId: yup
    .number('Catégorie obligatoire')
    .required('La catégorie est obligatoire'),
  villeId: yup
    .number('Ville obligatoire')
    .required('La ville est obligatoire'),
  transmission: yup.string().optional(),
  carburant: yup.string().optional(),
  places: yup.number('Nombre de places invalide').transform(numberOrUndefined).optional(),
  description: yup.string().optional()
})

export default voitureSchema