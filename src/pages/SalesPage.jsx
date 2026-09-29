import CarCatalog from '../components/car/CarCatalog'

export default function SalesPage() {
  return (
    <CarCatalog
      listingType="SALE"
      eyebrow="Vente"
      title="Voitures à vendre"
      subtitle="Découvrez des véhicules disponibles à l'achat."
      priceLabel="Prix max (DH)"
    />
  )
}
