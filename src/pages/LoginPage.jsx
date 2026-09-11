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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-xl font-bold text-white">
            T
          </span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Connexion</h1>
          <p className="mt-1 text-sm text-gray-500">
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

          <Button type="submit" className="mt-2 w-full">
            Se connecter
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Pas encore de compte ?{' '}
          <a href="/register" className="font-semibold text-primary-600 hover:underline">
            S'inscrire
          </a>
        </p>
      </Card>
    </div>
  )
}