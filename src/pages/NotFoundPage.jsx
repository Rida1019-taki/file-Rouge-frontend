import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <p className="notfound__code">404</p>
      <h1 className="notfound__title">Page introuvable</h1>
      <p className="notfound__text">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <div className="notfound__action">
        <Link to="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  )
}
