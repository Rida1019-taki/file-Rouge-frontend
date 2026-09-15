import { Link } from 'react-router-dom'
import useCategories from '../../hooks/useCategories'
import './CategorySection.css'

export default function CategorySection() {
  const { categories } = useCategories()

  if (!categories.length) return null

  return (
    <section className="categories">
      <div className="container">
        <h2 className="categories__title">Explorer par catégorie</h2>
        <div className="categories__grid">
          {categories.map((cat) => (
            <Link key={cat.id} to="/vente" className="category-chip">
              {cat.nom || cat.libelle}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}