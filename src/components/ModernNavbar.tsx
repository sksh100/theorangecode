'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Menu, X, Sparkles, Zap, Shield, Users, Settings, LogOut, LogIn, ShoppingBag, CheckCircle, FileText } from 'lucide-react'
import { AboutMegaDropdown } from './AboutMegaDropdown'
import { ContactMegaDropdown } from './ContactMegaDropdown'
import { MasterclassesMegaDropdown } from './MasterclassesMegaDropdown'
import { ResourcesMegaDropdown } from './ResourcesMegaDropdown'
import { trackDropdownOpen, trackDropdownItemClick, trackButtonClick } from '@/lib/analytics'

export function ModernNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isAboutMegaOpen, setIsAboutMegaOpen] = useState(false)
  const [isContactMegaOpen, setIsContactMegaOpen] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Load user profile to get name
    const saved = localStorage.getItem('user-profile')
    if (saved) {
      try {
        const profile = JSON.parse(saved)
        const name = profile.firstName || profile.lastName 
          ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
          : ''
        setUserName(name)
      } catch (e) {
        console.error('Error loading user profile:', e)
      }
    }
  }, [])

  const navItems = [
    {
      label: 'Home',
      href: '/preview',
    },
    {
      label: 'About',
      href: '/about',
      dropdown: [
        { label: 'About Us', icon: Users, href: '/about' },
        { label: 'What is Cultural Intelligence (CQ)', icon: Sparkles, href: '/what-is-cq' },
        { label: 'WHY Cultural Intelligence Matters', icon: Zap, href: '/why-cultural-intelligence' },
      ]
    },
    {
      label: 'Masterclasses',
      href: '/masterclasses',
      dropdown: [
        { 
          label: 'UAE Cultural Foundations', 
          icon: Sparkles, 
          href: '/masterclasses',
          price: '950 د.إ',
          description: "A comprehensive introduction to the cultural foundations of the UAE. Participants explore the country's heritage, values, social codes, national identity, daily rhythms, dress etiquette, and the significance of traditions such as Ramadan."
        },
        { 
          label: 'Cultural Intelligence For Expats', 
          icon: Users, 
          href: '/masterclasses',
          price: '1450 د.إ',
          description: 'A transformative masterclass that helps expats recognise how their own communication style, decision making, and relationship-building habits impact their experience in the region.'
        },
        { 
          label: 'Business Culture & Professional Etiquette', 
          icon: Zap, 
          href: '/masterclasses',
          price: '2200 د.إ',
          description: 'A strategic masterclass focused on business etiquette and professional communication in the UAE and GCC-region. Learn how to navigate hierarchy, manage feedback, build trust and conduct meetings and negotiations in a relationship-driven environment.'
        },
      ]
    },
    {
      label: 'Resources',
      href: '#resources',
      dropdown: [
        { label: 'Ebook Coming Soon', icon: FileText, href: '#resources' },
      ]
    },
    {
      label: 'Contact',
      href: '/preview#contact',
    }
  ]

  const [isMasterclassesMegaOpen, setIsMasterclassesMegaOpen] = useState(false)
  const [isResourcesMegaOpen, setIsResourcesMegaOpen] = useState(false)

  const handleDropdownToggle = (label: string) => {
    if (label === 'About') {
      const isOpening = !isAboutMegaOpen
      setIsAboutMegaOpen(isOpening)
      setActiveDropdown(null)
      setIsContactMegaOpen(false)
      setIsMasterclassesMegaOpen(false)
      setIsResourcesMegaOpen(false)
      if (isOpening) trackDropdownOpen('About')
    } else if (label === 'Masterclasses') {
      const isOpening = !isMasterclassesMegaOpen
      setIsMasterclassesMegaOpen(isOpening)
      setActiveDropdown(null)
      setIsAboutMegaOpen(false)
      setIsContactMegaOpen(false)
      setIsResourcesMegaOpen(false)
      if (isOpening) trackDropdownOpen('Masterclasses')
    } else if (label === 'Resources') {
      const isOpening = !isResourcesMegaOpen
      setIsResourcesMegaOpen(isOpening)
      setActiveDropdown(null)
      setIsAboutMegaOpen(false)
      setIsContactMegaOpen(false)
      setIsMasterclassesMegaOpen(false)
      if (isOpening) trackDropdownOpen('Resources')
    } else if (label === 'Contact') {
      const isOpening = !isContactMegaOpen
      setIsContactMegaOpen(isOpening)
      setActiveDropdown(null)
      setIsAboutMegaOpen(false)
      setIsMasterclassesMegaOpen(false)
      setIsResourcesMegaOpen(false)
      if (isOpening) trackDropdownOpen('Contact')
    } else {
      const isOpening = activeDropdown !== label
      setActiveDropdown(isOpening ? label : null)
      setIsAboutMegaOpen(false)
      setIsContactMegaOpen(false)
      setIsMasterclassesMegaOpen(false)
      setIsResourcesMegaOpen(false)
      if (isOpening) trackDropdownOpen(label)
    }
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const addToCart = () => {
    setCartItems(prev => prev + 1)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        isScrolled 
          ? 'navbar-glass shadow-glow' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Logo at bottom left edge of page */}
      <div className="absolute bottom-0 left-0 z-50 h-20 -ml-0">
        <Image
          src="/coming-soon/logo-1.png"
          alt="The Orange Code Logo"
          width={200}
          height={80}
          className="h-full w-auto"
          priority
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo - text removed as requested */}
          <div className="flex-shrink-0 min-w-0 -ml-2 sm:-ml-4">
            {/* Logo only, no text */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-center mx-4">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.dropdown ? (
                  <>
                    <motion.button
                      className="flex items-center space-x-1 text-white/90 hover:text-white font-medium font-montserrat transition-colors duration-300 group"
                      onClick={() => handleDropdownToggle(item.label)}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span>{item.label}</span>
                      {item.dropdown && (
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            (activeDropdown === item.label || 
                             (item.label === 'About' && isAboutMegaOpen) ||
                             (item.label === 'Masterclasses' && isMasterclassesMegaOpen) ||
                             (item.label === 'Resources' && isResourcesMegaOpen) ||
                             (item.label === 'Contact' && isContactMegaOpen)) ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </motion.button>

                    {/* Mega Dropdowns */}
                    {item.label === 'About' && (
                      <AboutMegaDropdown 
                        isOpen={isAboutMegaOpen} 
                        onClose={() => setIsAboutMegaOpen(false)} 
                      />
                    )}
                    {item.label === 'Masterclasses' && (
                      <MasterclassesMegaDropdown 
                        isOpen={isMasterclassesMegaOpen} 
                        onClose={() => setIsMasterclassesMegaOpen(false)} 
                      />
                    )}
                    {item.label === 'Resources' && (
                      <ResourcesMegaDropdown 
                        isOpen={isResourcesMegaOpen} 
                        onClose={() => setIsResourcesMegaOpen(false)} 
                      />
                    )}
                    {item.label === 'Contact' && (
                      <ContactMegaDropdown 
                        isOpen={isContactMegaOpen} 
                        onClose={() => setIsContactMegaOpen(false)} 
                      />
                    )}
                  </>
                ) : (
                  <Link href={item.href || '#'}>
                    <motion.span
                      className="flex items-center text-white/90 hover:text-white font-medium font-montserrat transition-colors duration-300 cursor-pointer"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons - Always right aligned */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 ml-auto">
            {/* Shopping Basket */}
            <motion.button
              className="relative p-2 sm:p-3 nav-button-glass text-white/80 hover:text-white transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={addToCart}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartItems > 0 && (
                <motion.span
                  className="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {cartItems}
                </motion.span>
              )}
            </motion.button>

            {/* Login/Dashboard Button */}
            {isLoggedIn ? (
              <Link href="/dashboard">
                <motion.button
                  className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 nav-button-glass text-white/80 hover:text-white transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <LogIn className="w-4 h-4 group-hover:text-azure-blue transition-colors duration-300" />
                  <span className="font-montserrat font-medium text-xs sm:text-sm">Dashboard</span>
                </motion.button>
              </Link>
            ) : (
              <motion.button
                className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 nav-button-glass text-white/80 hover:text-white transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => {
                  const newLoggedInState = !isLoggedIn
                  setIsLoggedIn(newLoggedInState)
                  if (newLoggedInState) {
                    // Load user profile to get current name
                    const saved = localStorage.getItem('user-profile')
                    if (saved) {
                      try {
                        const profile = JSON.parse(saved)
                        const name = profile.firstName || profile.lastName 
                          ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
                          : 'there'
                        setUserName(name || 'there')
                      } catch (e) {
                        setUserName('there')
                      }
                    } else {
                      setUserName('there')
                    }
                    // Show welcome message when logging in
                    setShowWelcomeMessage(true)
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                      setShowWelcomeMessage(false)
                    }, 5000)
                  }
                }}
              >
                <LogIn className="w-4 h-4 group-hover:text-azure-blue transition-colors duration-300" />
                <span className="font-montserrat font-medium text-xs sm:text-sm">Login</span>
              </motion.button>
            )}

            {/* Get Started Button */}
            <Link href="/signup">
              <motion.button
                className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300 text-xs sm:text-sm md:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button - Only show when menu items need to be hidden */}
          <motion.button
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors duration-300 ml-2"
            onClick={handleMobileMenuToggle}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-4 mobile-menu-glass rounded-2xl overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.dropdown ? (
                      <>
                        <motion.button
                          className="w-full flex items-center justify-between p-3 text-white/80 hover:text-white hover:bg-azure-blue-transparent rounded-xl transition-all duration-300 font-montserrat font-medium"
                          onClick={() => handleDropdownToggle(item.label)}
                          whileHover={{ x: 4 }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown 
                            className={`w-4 h-4 transition-transform duration-300 ${
                              (activeDropdown === item.label) ? 'rotate-180' : ''
                            }`} 
                          />
                        </motion.button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              className="ml-4 space-y-1"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.dropdown?.map((dropdownItem) => (
                                <motion.a
                                  key={dropdownItem.label}
                                  href={dropdownItem.href}
                                  className="flex items-center space-x-3 p-2 text-white/60 hover:text-white hover:bg-azure-blue-transparent rounded-lg transition-all duration-300"
                                  whileHover={{ x: 4 }}
                                >
                                  <dropdownItem.icon className="w-4 h-4 text-azure-blue" />
                                  <span className="font-montserrat text-sm">{dropdownItem.label}</span>
                                </motion.a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link href={item.href || '#'}>
                        <motion.span
                          className="block p-3 text-white/80 hover:text-white hover:bg-azure-blue-transparent rounded-xl transition-all duration-300 font-montserrat font-medium"
                          whileHover={{ x: 4 }}
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="mt-4 space-y-3">
                  {/* Shopping Basket - Mobile */}
                  <motion.button
                    className="w-full flex items-center justify-center space-x-2 p-3 nav-button-glass text-white/80 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addToCart}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span className="font-montserrat font-medium">Shopping Cart</span>
                    {cartItems > 0 && (
                      <span className="cart-badge">
                        {cartItems}
                      </span>
                    )}
                  </motion.button>

                  {/* Login/Dashboard Button - Mobile */}
                  {isLoggedIn ? (
                    <Link href="/dashboard">
                      <motion.button
                        className="w-full flex items-center justify-center space-x-2 p-3 nav-button-glass text-white/80 hover:text-white transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <LogIn className="w-4 h-4" />
                        <span className="font-montserrat font-medium">Dashboard</span>
                      </motion.button>
                    </Link>
                  ) : (
                    <motion.button
                      className="w-full flex items-center justify-center space-x-2 p-3 nav-button-glass text-white/80 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const newLoggedInState = !isLoggedIn
                  setIsLoggedIn(newLoggedInState)
                  if (newLoggedInState) {
                    // Load user profile to get current name
                    const saved = localStorage.getItem('user-profile')
                    if (saved) {
                      try {
                        const profile = JSON.parse(saved)
                        const name = profile.firstName || profile.lastName 
                          ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
                          : 'there'
                        setUserName(name || 'there')
                      } catch (e) {
                        setUserName('there')
                      }
                    } else {
                      setUserName('there')
                    }
                    // Show welcome message when logging in
                    setShowWelcomeMessage(true)
                    // Auto-hide after 5 seconds
                    setTimeout(() => {
                      setShowWelcomeMessage(false)
                    }, 5000)
                  }
                }}
                    >
                      <LogIn className="w-4 h-4" />
                      <span className="font-montserrat font-medium">Login</span>
                    </motion.button>
                  )}

                  {/* Get Started Button - Mobile */}
                  <Link href="/signup">
                    <motion.button
                      className="w-full px-6 py-3 cta-button-glow text-white font-semibold font-montserrat rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-azure-blue/5 via-transparent to-orange/5 pointer-events-none" />
      
      {/* Welcome Message */}
      <AnimatePresence>
        {showWelcomeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] pointer-events-none"
          >
            <motion.div
              className="glass-card px-8 py-6 flex items-center gap-4 shadow-2xl"
              style={{ 
                background: 'rgba(0, 212, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 212, 255, 0.3)'
              }}
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Welcome{userName ? `, ${userName}` : '!'}
                </h3>
                <p className="text-white/80 text-sm">
                  You're successfully logged in
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowWelcomeMessage(false)}
                className="ml-4 text-white/60 hover:text-white transition-colors pointer-events-auto"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mega Dropdowns */}
      <AboutMegaDropdown 
        isOpen={isAboutMegaOpen} 
        onClose={() => setIsAboutMegaOpen(false)} 
      />
      <ContactMegaDropdown 
        isOpen={isContactMegaOpen} 
        onClose={() => setIsContactMegaOpen(false)} 
      />
    </motion.nav>
  )
}
