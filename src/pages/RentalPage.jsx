import CarCatalog from '../components/car/CarCatalog'

export default function RentalPage() {
  return (
    <CarCatalog
      listingType="RENTAL"
      eyebrow="Location"
      title="Voitures à louer"
      subtitle="Trouvez une voiture disponible pour votre prochain déplacement."
      priceLabel="Prix max (DH/jour)"
    />
  )
}
