/**
 * Root loading component
 * Shows a loading state while pages are loading
 * Prevents white screens during navigation
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center">
      <div className="relative">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-white/20 border-t-orange rounded-full animate-spin" />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-orange rounded-full animate-spin blur-sm opacity-50" 
          style={{ animationDuration: '0.8s' }} 
        />
      </div>
    </div>
  )
}
