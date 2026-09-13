import CarCatalog from '../components/car/CarCatalog'

export default function SalesPage() {
  return (
    <CarCatalog
      listingType="SALE"
      title="Achetez votre prochaine voiture au Maroc"
      subtitle="Trouvez votre prochaine voiture parmi les véhicules disponibles à la vente."
      priceLabel="Prix max (DH)"
    />
  )
}