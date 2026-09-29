import * as yup from 'yup'
import { ROLES } from '../config/roles'

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("L'email est obligatoire")
    .email('Adresse email invalide'),
  password: yup.string().required('Le mot de passe est obligatoire')
})

export const authSchema = yup.object({
  nom: yup.string().required('Le nom est obligatoire'),
  prenom: yup.string().required('Le prénom est obligatoire'),
  email: yup
    .string()
    .required("L'email est obligatoire")
    .email('Adresse email invalide'),
  telephone: yup
    .string()
    .required('Le téléphone est obligatoire')
    .matches(/^[0-9+\s-]{10,15}$/, 'Numéro de téléphone invalide'),
  password: yup
    .string()
    .required('Le mot de passe est obligatoire')
    .min(6, '6 caractères minimum'),
  role: yup
    .string()
    .oneOf([ROLES.CLIENT, ROLES.OWNER], 'Rôle invalide')
    .default(ROLES.CLIENT)
})

export const profileSchema = yup.object({
  nom: yup.string().required('Le nom est obligatoire'),
  prenom: yup.string().required('Le prénom est obligatoire'),
  email: yup
    .string()
    .required("L'email est obligatoire")
    .email('Adresse email invalide'),
  telephone: yup
    .string()
    .required('Le téléphone est obligatoire')
    .matches(/^[0-9+\s-]{10,15}$/, 'Numéro de téléphone invalide')
})

export default authSchema
