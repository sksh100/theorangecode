'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollRestoration() {
  const pathname = usePathname()
  const prevPathnameRef = useRef<string>('')

  useEffect(() => {
    // Check if pathname actually changed (not just a re-render)
    const pathnameChanged = prevPathnameRef.current !== pathname
    prevPathnameRef.current = pathname

    // Get current hash
    const hash = window.location.hash
    const isContactForm = hash === '#contact' || hash === '#contact-form'

    if (isContactForm) {
      // For contact form links, wait for page to render then scroll to form
      const scrollToContact = () => {
        const contactElement = document.getElementById('contact') || document.getElementById('contact-form')
        if (contactElement) {
          const navbarHeight = 80
          const elementPosition = contactElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = Math.max(0, elementPosition - navbarHeight)
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
          return true
        }
        return false
      }

      // Try immediately, then retry if element not found
      if (!scrollToContact()) {
        const timer = setTimeout(() => {
          scrollToContact()
        }, 200)
        return () => clearTimeout(timer)
      }
    } else if (pathnameChanged) {
      // For all other route changes, scroll to top
      // Wait a bit longer to ensure page content is rendered
      setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'instant' })
        })
      }, 100)
    }

    // Also handle hash changes on the same page
    const handleHashChange = () => {
      const newHash = window.location.hash
      if (newHash === '#contact' || newHash === '#contact-form') {
        setTimeout(() => {
          const contactElement = document.getElementById('contact') || document.getElementById('contact-form')
          if (contactElement) {
            const navbarHeight = 80
            const elementPosition = contactElement.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = Math.max(0, elementPosition - navbarHeight)
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [pathname])

  return null
}

