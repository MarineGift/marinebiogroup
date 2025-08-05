'use client'

import { useState, useCallback } from 'react'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

let toastCount = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description, variant = 'default' }: Omit<Toast, 'id'>) => {
    const id = (++toastCount).toString()
    const newToast: Toast = { id, title, description, variant }
    
    setToasts((prevToasts) => [...prevToasts, newToast])
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
    }, 5000)
    
    return {
      id,
      dismiss: () => setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id)),
    }
  }, [])

  return {
    toast,
    toasts,
    dismiss: (toastId: string) =>
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== toastId)),
  }
}