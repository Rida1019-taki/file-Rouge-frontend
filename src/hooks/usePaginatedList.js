import { useMemo, useState } from 'react'
import useList from './useList'

export default function usePaginatedList(fetchFn, size = 9) {
  const [page, setPage] = useState(0)

  const paginatedFetch = useMemo(
    () => async () => {
      const result = await fetchFn({ page, size })

      if (Array.isArray(result)) {
        const totalElements = result.length
        const totalPages = Math.max(1, Math.ceil(totalElements / size))
        const start = page * size
        return {
          content: result.slice(start, start + size),
          number: page,
          size,
          totalElements,
          totalPages
        }
      }

      return result
    },
    [fetchFn, page, size]
  )

  const list = useList(paginatedFetch)

  return { ...list, page, setPage, size }
}
