import { useCallback, useEffect, useState } from 'react'

export default function useFetch(fetchFn) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(Boolean(fetchFn))
  const [error, setError] = useState(null)

  const load = useCallback(
    async (...args) => {
      if (!fetchFn) return null
      setError(null)
      try {
        const result = await fetchFn(...args)
        setData(result ?? null)
        return result ?? null
      } catch (err) {
        setError(err)
        throw err
      }
    },
    [fetchFn]
  )

  useEffect(() => {
    if (!fetchFn) return
    let cancelled = false
    const run = async () => {
      try {
        const result = await fetchFn()
        if (!cancelled) setData(result ?? null)
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

  return { data, loading, error, load, reload: load }
}