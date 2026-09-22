import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import userService from '../services/userService'
import { profileSchema } from '../schemas/authSchema'
import { getErrorMessage } from '../utils/helpers'
import useToast from '../hooks/useToast'
import Toast from '../components/ui/Toast'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import './profile-pages.css'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const { toast, show, hide } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      nom: user?.nom || '',
      prenom: user?.prenom || '',
      email: user?.email || '',
      telephone: user?.telephone || ''
    }
  })

  const onSubmit = async (data) => {
    try {
      const updated = await userService.updateProfile(user.id, data)
      updateUser({ ...user, ...data, ...(updated?.user || {}) })
      show('Profil mis à jour avec succès')
    } catch (err) {
      show(getErrorMessage(err, 'Impossible de mettre à jour le profil'), 'error')
    }
  }

  return (
    <div className="profile-page container container--narrow">
      <h1 className="page-title profile-page__title">Modifier mon profil</h1>

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-grid">
            <Input label="Nom" name="nom" register={register} error={errors.nom} />
            <Input label="Prénom" name="prenom" register={register} error={errors.prenom} />
          </div>
          <Input
            label="Téléphone"
            name="telephone"
            register={register}
            error={errors.telephone}
            placeholder="06 12 34 56 78"
          />
          <Input label="Email" name="email" type="email" register={register} error={errors.email} />

          <div className="profile-actions">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Annuler
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Enregistrer
            </Button>
          </div>
        </form>
      </Card>

      <Toast toast={toast} onClose={hide} />
    </div>
  )
}
