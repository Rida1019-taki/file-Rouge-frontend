import { useCallback, useEffect, useState } from 'react'

const DEFAULT_PAGINATION = {
  page: 0,
  size: 0,
  totalPages: 1,
  totalElements: 0
}

const toResult = (result) => {
  if (Array.isArray(result)) {
    return {
      items: result,
      pagination: { ...DEFAULT_PAGINATION, size: result.length, totalElements: result.length }
    }
  }

  const items = Array.isArray(result?.content) ? result.content : []
  return {
    items,
    pagination: {
      page: result?.number ?? result?.pageable?.pageNumber ?? 0,
      size: result?.size ?? result?.pageable?.pageSize ?? items.length,
      totalPages: result?.totalPages ?? 1,
      totalElements: result?.totalElements ?? items.length
    }
  }
}

export default function useList(fetchFn) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION)

  const applyResult = useCallback((result) => {
    const { items, pagination: meta } = toResult(result)
    setData(items)
    setPagination(meta)
    return items
  }, [])

  const load = useCallback(async () => {
    setError(null)
    try {
      const result = await fetchFn()
      return applyResult(result)
    } catch (err) {
      setError(err)
      return []
    }
  }, [fetchFn, applyResult])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchFn()
        if (!cancelled) applyResult(result)
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [fetchFn, applyResult])

  return { data, loading, error, pagination, reload: load }
}
