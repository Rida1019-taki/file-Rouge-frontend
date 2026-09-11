import { useState } from 'react'

export default function ImageGallery({ images = [] }) {
  const list = images?.length ? images : []
  const principalIndex = Math.max(
    0,
    list.findIndex((img) => img.principale)
  )
  const [activeIndex, setActiveIndex] = useState(principalIndex >= 0 ? principalIndex : 0)

  if (!list.length) {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-gray-100 ring-1 ring-gray-200">
        <svg className="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </div>
    )
  }

  const activeImage = list[Math.min(activeIndex, list.length - 1)] || list[0]

  return (
    <div>
      <div className="h-80 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200">
        <img
          src={activeImage.url}
          alt="Voiture"
          className="h-full w-full object-cover"
        />
      </div>
      {list.length > 1 && (
        <div className="mt-3 flex gap-3">
          {list.map((image, index) => (
            <button
              key={image.id || index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-20 w-28 overflow-hidden rounded-lg ring-2 transition ${
                index === activeIndex
                  ? 'ring-primary-600'
                  : 'ring-transparent hover:ring-gray-300'
              }`}
            >
              <img src={image.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}