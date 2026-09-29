import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import userService from '../services/userService'
import { loginSchema } from '../schemas/authSchema'
import { getErrorMessage } from '../utils/helpers'
import { ROLES } from '../config/roles'
import { setToken, setRole, setUser } from '../utils/auth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import './auth-pages.css'

const extractRoleFromToken = (token) => {
  if (!token) return null
  try {
    const payload = token.split('.')[1]
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    const parsed = JSON.parse(json)
    return parsed.role || parsed.authorities?.[0]?.replace('ROLE_', '') || null
  } catch {
    return null
  }
}

export default function LoginPage() {
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
      const session = await authService.login(data.email, data.password)
      const token = session?.token || session?.accessToken
      const user = session?.user || session

      if (token) setToken(token)
      
      let role = user?.role
      if (!role && token) {
        role = extractRoleFromToken(token)
      }
      if (role) setRole(role)

      // If user from response doesn't have id, fetch full profile
      if (user) {
        if (!user.id && token) {
          try {
            const fullUser = await userService.getProfile()
            setUser(fullUser)
          } catch {
            setUser(user)
          }
        } else {
          setUser(user)
        }
      }

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
      navigate(home[role] || '/')
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