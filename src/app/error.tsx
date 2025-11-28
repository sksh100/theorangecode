'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
    
    // Send error notification to Slack
    fetch('/api/report-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(err => {
      console.error('Failed to report error to Slack:', err)
    })
  }, [error])

  return (
    <div className="min-h-screen bg-primary-dark text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="px-6 py-3 bg-azure-blue text-white rounded-lg hover:bg-azure-blue/80 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

