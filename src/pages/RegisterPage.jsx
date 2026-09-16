import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { authSchema } from '../schemas/authSchema'
import { ROLES, ROLE_LABELS } from '../config/roles'
import { getErrorMessage } from '../utils/helpers'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import './auth-pages.css'

export default function RegisterPage() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(authSchema),
    defaultValues: { role: ROLES.CLIENT }
  })

  const onSubmit = async (data) => {
    try {
      await registerUser(data)
      navigate('/')
    } catch (err) {
      alert(getErrorMessage(err, "Erreur lors de l'inscription"))
    }
  }

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <div className="auth-head">
          <span className="auth-logo">T</span>
          <h1 className="auth-title">Créer un compte</h1>
          <p className="auth-sub">
            Rejoignez Tomobilty.ma en quelques secondes
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-field">
            <label className="form-label">Je suis</label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="role-select">
                  {[ROLES.CLIENT, ROLES.OWNER].map((role) => {
                    const active = field.value === role
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => field.onChange(role)}
                        className={`role-btn ${active ? 'role-btn--active' : ''}`}
                      >
                        {ROLE_LABELS[role]}
                      </button>
                    )
                  })}
                </div>
              )}
            />
          </div>

          <div className="form-grid">
            <Input label="Nom" name="nom" register={register} error={errors.nom} />
            <Input label="Prénom" name="prenom" register={register} error={errors.prenom} />
          </div>
          <Input label="Téléphone" name="telephone" register={register} error={errors.telephone} placeholder="06 12 34 56 78" />
          <Input label="Email" name="email" type="email" register={register} error={errors.email} />
          <Input label="Mot de passe" name="password" type="password" register={register} error={errors.password} placeholder="6 caractères minimum" />

          <Button type="submit" className="auth-submit">
            Créer mon compte
          </Button>
        </form>

        <p className="auth-footer">
          Déjà inscrit ?{' '}
          <a href="/login">
            Se connecter
          </a>
        </p>
      </Card>
    </div>
  )
}
