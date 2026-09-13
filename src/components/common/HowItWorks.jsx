const STEPS = [
  {
    number: '1',
    title: 'Cherchez votre voiture',
    description: 'Parcourez les annonces de vente et de location : ville, modèle, prix et disponibilité.'
  },
  {
    number: '2',
    title: 'Achetez ou réservez',
    description: 'Contactez le vendeur pour un achat ou réservez votre location en quelques clics.'
  },
  {
    number: '3',
    title: 'Prenez la route',
    description: 'Récupérez votre voiture et profitez de votre achat ou de votre trajet partout au Maroc.'
  }
]

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Comment ça marche ?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-500">
          Achetez ou louez une voiture en 3 étapes simples, rapidement et en toute confiance.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="relative rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-200">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}