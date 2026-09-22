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

export function getImageUrl(image) {
  if (!image) return ''
  if (typeof image === 'string') return image
  return image.url || image.imageUrl || image.chemin || ''
}

export function normalizeImages(images) {
  if (!Array.isArray(images)) return []
  return images
    .map((image, index) => {
      const url = getImageUrl(image)
      if (!url) return null
      if (typeof image === 'string') {
        return { id: null, url, principale: index === 0 }
      }
      return {
        id: image.id ?? null,
        url,
        principale: Boolean(image.principale ?? image.isPrincipale),
        alt: image.alt
      }
    })
    .filter(Boolean)
}

export function getCarImage(voiture) {
  const images = normalizeImages(voiture?.images)
  const principale = images.find((img) => img.principale) || images[0]
  if (principale?.url) {
    return principale.url
  }
  const seed = `${voiture?.id || ''}${voiture?.marque || ''}${voiture?.modele || ''}`
  return pickCarFallback(seed)
}
