export function getCarImage(voiture) {
  const images = voiture?.images || []
  const principale = images.find((img) => img.principale)
  return principale?.url || images[0]?.url || null
}