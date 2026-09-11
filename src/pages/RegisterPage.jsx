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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-xl font-bold text-white">
            T
          </span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p className="mt-1 text-sm text-gray-500">
            Rejoignez Tomobilty.ma en quelques secondes
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">Je suis</label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div className="flex gap-3">
                  {[ROLES.CLIENT, ROLES.OWNER].map((role) => {
                    const active = field.value === role
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => field.onChange(role)}
                        className={`flex-1 rounded-lg border-2 px-4 py-3 text-center text-sm font-medium transition ${
                          active
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-gray-300 bg-white text-gray-500 hover:border-primary-300'
                        }`}
                      >
                        {ROLE_LABELS[role]}
                      </button>
                    )
                  })}
                </div>
              )}
            />
          </div>

          <div className="grid gap-x-5 md:grid-cols-2">
            <Input label="Nom" name="nom" register={register} error={errors.nom} />
            <Input label="Prénom" name="prenom" register={register} error={errors.prenom} />
          </div>
          <Input label="Téléphone" name="telephone" register={register} error={errors.telephone} placeholder="06 12 34 56 78" />
          <Input label="Email" name="email" type="email" register={register} error={errors.email} />
          <Input label="Mot de passe" name="password" type="password" register={register} error={errors.password} placeholder="6 caractères minimum" />

          <Button type="submit" className="mt-2 w-full">
            Créer mon compte
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Déjà inscrit ?{' '}
          <a href="/login" className="font-semibold text-primary-600 hover:underline">
            Se connecter
          </a>
        </p>
      </Card>
    </div>
  )
}