import { useState, useCallback } from 'react'
import { FALLBACK_CAR_IMAGE_GALLERY, normalizeImages } from '../../utils/carImage'
import './ImageGallery.css'

const PlaceholderImage = () => (
  <img
    src={FALLBACK_CAR_IMAGE_GALLERY}
    alt="Image non disponible"
    loading="lazy"
  />
)

export default function ImageGallery({ images = [] }) {
  const list = normalizeImages(images)
  const principalIndex = Math.max(
    0,
    list.findIndex((img) => img.principale)
  )
  const [activeIndex, setActiveIndex] = useState(principalIndex >= 0 ? principalIndex : 0)
  const [brokenImages, setBrokenImages] = useState({})

  const handleImageError = useCallback((index) => {
    setBrokenImages((prev) => ({ ...prev, [index]: true }))
  }, [])

  if (!list.length) {
    return (
      <div className="gallery__main">
        <PlaceholderImage />
      </div>
    )
  }

  const activeImage = list[Math.min(activeIndex, list.length - 1)] || list[0]
  const isBroken = brokenImages[activeIndex]

  return (
    <div className="gallery">
      <div className="gallery__main">
        {isBroken ? (
          <PlaceholderImage />
        ) : (
          <img
            src={activeImage.url}
            alt={`${activeImage.alt || 'Voiture'}`}
            onError={() => handleImageError(activeIndex)}
          />
        )}
      </div>
      {list.length > 1 && (
        <div className="gallery__thumbs">
          {list.map((image, index) => (
            <button
              key={image.id || index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`gallery__thumb${index === activeIndex ? ' gallery__thumb--active' : ''}`}
              aria-label={`Voir l'image ${index + 1}`}
            >
              {brokenImages[index] ? (
                <PlaceholderImage />
              ) : (
                <img
                  src={image.url}
                  alt=""
                  onError={() => handleImageError(index)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
