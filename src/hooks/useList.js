import { useCallback, useEffect, useState } from 'react'

export default function useList(fetchFn) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setError(null)
    try {
      const result = await fetchFn()
      setData(Array.isArray(result) ? result : [])
      return result
    } catch (err) {
      setError(err)
      return []
    }
  }, [fetchFn])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const result = await fetchFn()
        if (!cancelled) setData(Array.isArray(result) ? result : [])
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
  }, [fetchFn])

  return { data, loading, error, reload: load }
}
