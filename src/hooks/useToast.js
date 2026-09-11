import { useEffect, useRef, useState } from 'react'

export default function useToast() {
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const show = (message, type = 'success') => {
    setToast({ message, type })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 3500)
  }

  const hide = () => {
    clearTimeout(timer.current)
    setToast(null)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  return { toast, show, hide }
}