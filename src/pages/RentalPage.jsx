import CarCatalog from '../components/car/CarCatalog'

export default function RentalPage() {
  return (
    <CarCatalog
      listingType="RENTAL"
      title="Louez la voiture parfaite pour votre prochaine aventure"
      subtitle="Louez une voiture adaptée à vos besoins et à votre durée de location."
      priceLabel="Prix max (DH/jour)"
    />
  )
}