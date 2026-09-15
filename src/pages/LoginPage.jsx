import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { loginSchema } from '../schemas/authSchema'
import { getErrorMessage } from '../utils/helpers'
import { ROLES } from '../config/roles'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import './auth-pages.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    try {
      const user = await login(data.email, data.password)
      const from = location.state?.from?.pathname
      if (from) {
        navigate(from)
        return
      }
      const home = {
        [ROLES.ADMIN]: '/admin',
        [ROLES.OWNER]: '/owner',
        [ROLES.CLIENT]: '/'
      }
      navigate(home[user?.role] || '/')
    } catch (err) {
      const message = getErrorMessage(err, 'Email ou mot de passe incorrect')
      alert(message)
    }
  }

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <div className="auth-head">
          <span className="auth-logo">T</span>
          <h1 className="auth-title">Connexion</h1>
          <p className="auth-sub">
            Connectez-vous à votre compte Tomobilty.ma
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="vous@exemple.com"
            register={register}
            error={errors.email}
          />
          <Input
            label="Mot de passe"
            name="password"
            type="password"
            placeholder="••••••••"
            register={register}
            error={errors.password}
          />

          <Button type="submit" className="auth-submit">
            Se connecter
          </Button>
        </form>

        <p className="auth-footer">
          Pas encore de compte ?{' '}
          <a href="/register">
            S'inscrire
          </a>
        </p>
      </Card>
    </div>
  )
}