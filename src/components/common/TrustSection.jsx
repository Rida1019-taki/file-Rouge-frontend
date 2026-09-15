import './TrustSection.css'

const ITEMS = [
  {
    title: 'Recherche simple',
    description: 'Filtrez par marque, catégorie, ville ou budget en quelques secondes.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    )
  },
  {
    title: 'Annonces variées',
    description: 'Citadines, SUV, berlines ou utilitaires : un large choix de véhicules.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    )
  },
  {
    title: 'Propriétaires et agences',
    description: 'Annonces déposées par des particuliers et des professionnels vérifiés.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-3-3 3 3 0 003 3zM9 20v-2a4 4 0 00-4-4H3m13-1a3 3 0 00-3 3v2H7"
      />
    )
  },
  {
    title: 'Réservation facile',
    description: 'Réservez votre location en ligne et partez avec votre véhicule.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    )
  }
]

export default function TrustSection() {
  return (
    <section className="trust">
      <div className="container">
        <div className="trust__head">
          <h2 className="trust__title">Pourquoi Tomobilty.ma</h2>
          <p className="trust__sub">
            La marketplace automobile marocaine, simple et fiable pour acheter ou louer.
          </p>
        </div>

        <div className="trust__grid">
          {ITEMS.map((item) => (
            <div key={item.title} className="trust__item">
              <span className="trust__icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </span>
              <h3 className="trust__item-title">{item.title}</h3>
              <p className="trust__item-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}