import { LISTING_LABELS, LISTING_COLORS } from '../../utils/helpers'

export default function ListingBadge({ listingType }) {
  if (!listingType) return null
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        LISTING_COLORS[listingType] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {LISTING_LABELS[listingType] || listingType}
    </span>
  )
}