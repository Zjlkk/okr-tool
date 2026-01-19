/**
 * @file Providers Component
 * @description Wraps app with necessary providers (demo mode - no auth required)
 */

'use client'

import { useLoadingStore } from '@/stores/useLoadingStore'
import { useToastStore } from '@/stores/useToastStore'
import { LoadingBar, Toast } from '@/components/ui'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const { isLoading } = useLoadingStore()
  const { toasts, removeToast } = useToastStore()

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      {children}
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-[2000] flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  )
}
