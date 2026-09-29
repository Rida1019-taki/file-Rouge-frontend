import { LISTING_LABELS, LISTING_COLORS } from '../../utils/helpers'

export default function ListingBadge({ listingType }) {
  if (!listingType) return null
  return (
    <span
      className={`badge ${
        LISTING_COLORS[listingType] || 'badge--neutral'
      }`}
    >
      {LISTING_LABELS[listingType] || listingType}
    </span>
  )
}
