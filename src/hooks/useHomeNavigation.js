import { useLocation, useNavigate } from 'react-router-dom'

export default function useHomeNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const goToSection = (sectionId) => {
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    navigate('/', { state: { scrollTo: sectionId } })
  }

  return goToSection
}
