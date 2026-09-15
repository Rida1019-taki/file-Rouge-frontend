import { useState } from 'react'
import './ImageGallery.css'

export default function ImageGallery({ images = [] }) {
  const list = images?.length ? images : []
  const principalIndex = Math.max(
    0,
    list.findIndex((img) => img.principale)
  )
  const [activeIndex, setActiveIndex] = useState(principalIndex >= 0 ? principalIndex : 0)

  if (!list.length) {
    return (
      <div className="gallery__main">
        <div className="gallery__placeholder">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      </div>
    )
  }

  const activeImage = list[Math.min(activeIndex, list.length - 1)] || list[0]

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img src={activeImage.url} alt="Voiture" />
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
              <img src={image.url} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}