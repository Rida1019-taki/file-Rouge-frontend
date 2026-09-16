const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1503377215942-5085674c930e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=800&auto=format&fit=crop'
]

export const FALLBACK_CAR_IMAGE = FALLBACK_IMAGES[0]

export const FALLBACK_CAR_IMAGE_GALLERY =
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop'

const hashCode = (str) => {
  let hash = 0
  for (let i = 0; i < String(str).length; i++) {
    hash = (hash << 5) - hash + String(str).charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function pickCarFallback(seed) {
  const key = seed ? String(seed) : 'tomobilty'
  return FALLBACK_IMAGES[hashCode(key) % FALLBACK_IMAGES.length]
}

export function getCarImage(voiture) {
  const images = voiture?.images || []
  const principale = images.find((img) => img.principale)
  if (principale?.url || images[0]?.url) {
    return principale?.url || images[0].url
  }
  const seed = `${voiture?.id || ''}${voiture?.marque || ''}${voiture?.modele || ''}`
  return pickCarFallback(seed)
}