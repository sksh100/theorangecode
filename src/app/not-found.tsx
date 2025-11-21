import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary-dark text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <p className="text-xl mb-6">Page Not Found</p>
        <Link
          href="/"
          className="px-6 py-3 bg-azure-blue text-white rounded-lg hover:bg-azure-blue/80 transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

