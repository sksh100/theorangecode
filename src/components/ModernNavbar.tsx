'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Sparkles, Zap, Shield, Users, Settings, LogOut, LogIn, ShoppingBag } from 'lucide-react'
import { MegaDropdown } from './MegaDropdown'
import { AboutMegaDropdown } from './AboutMegaDropdown'
import { ContactMegaDropdown } from './ContactMegaDropdown'

export function ModernNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMegaDropdownOpen, setIsMegaDropdownOpen] = useState(false)
  const [isAboutMegaOpen, setIsAboutMegaOpen] = useState(false)
  const [isContactMegaOpen, setIsContactMegaOpen] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    {
      label: 'Services',
      href: '#services',
      dropdown: [
        { label: 'AI Concierge', icon: Sparkles, href: '#ai-concierge' },
        { label: 'Luxury Travel', icon: Zap, href: '#luxury-travel' },
        { label: 'Personal Assistant', icon: Users, href: '#personal-assistant' },
        { label: 'Security & Privacy', icon: Shield, href: '#security' },
      ]
    },
    {
      label: 'About',
      href: '#about',
      dropdown: [
        { label: 'Our Story', icon: Sparkles, href: '#story' },
        { label: 'Team', icon: Users, href: '#team' },
        { label: 'Mission', icon: Zap, href: '#mission' },
      ]
    },
    {
      label: 'Contact',
      href: '#contact',
      dropdown: [
        { label: 'Get Started', icon: Zap, href: '#get-started' },
        { label: 'Support', icon: Shield, href: '#support' },
        { label: 'Partnership', icon: Users, href: '#partnership' },
      ]
    }
  ]

  const handleDropdownToggle = (label: string) => {
    if (label === 'Services') {
      setIsMegaDropdownOpen(!isMegaDropdownOpen)
      setActiveDropdown(null)
      setIsAboutMegaOpen(false)
      setIsContactMegaOpen(false)
    } else if (label === 'About') {
      setIsAboutMegaOpen(!isAboutMegaOpen)
      setActiveDropdown(null)
      setIsMegaDropdownOpen(false)
      setIsContactMegaOpen(false)
    } else if (label === 'Contact') {
      setIsContactMegaOpen(!isContactMegaOpen)
      setActiveDropdown(null)
      setIsMegaDropdownOpen(false)
      setIsAboutMegaOpen(false)
    } else {
      setActiveDropdown(activeDropdown === label ? null : label)
      setIsMegaDropdownOpen(false)
      setIsAboutMegaOpen(false)
      setIsContactMegaOpen(false)
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-montserrat">
                Your Luxury Agent
              </h1>
              <p className="text-xs text-azure-blue/80 font-montserrat">
                AI-Powered Luxury
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <motion.button
                  className="flex items-center space-x-1 text-white/90 hover:text-white font-medium font-montserrat transition-colors duration-300 group"
                  onClick={() => handleDropdownToggle(item.label)}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span>{item.label}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      (activeDropdown === item.label || 
                       (item.label === 'Services' && isMegaDropdownOpen) ||
                       (item.label === 'About' && isAboutMegaOpen) ||
                       (item.label === 'Contact' && isContactMegaOpen)) ? 'rotate-180' : ''
                    }`} 
                  />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-64 dropdown-glass rounded-2xl overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="p-2">
                        {item.dropdown?.map((dropdownItem, index) => (
                          <motion.a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="flex items-center space-x-3 p-3 rounded-xl text-white/80 hover:text-white hover:bg-azure-blue-transparent transition-all duration-300 group"
                            whileHover={{ x: 4 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <dropdownItem.icon className="w-5 h-5 text-azure-blue group-hover:text-azure-luminous transition-colors duration-300" />
                            <span className="font-montserrat font-medium">{dropdownItem.label}</span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Shopping Basket */}
            <motion.button
              className="relative p-3 nav-button-glass text-white/80 hover:text-white transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={addToCart}
            >
              <ShoppingBag className="w-5 h-5" />
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

            {/* Login Button */}
            <motion.button
              className="flex items-center space-x-2 px-4 py-3 nav-button-glass text-white/80 hover:text-white transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => setIsLoggedIn(!isLoggedIn)}
            >
              <LogIn className="w-4 h-4 group-hover:text-azure-blue transition-colors duration-300" />
              <span className="font-montserrat font-medium text-sm">
                {isLoggedIn ? 'Dashboard' : 'Login'}
              </span>
            </motion.button>

            {/* Get Started Button */}
            <motion.button
              className="px-6 py-3 cta-button-glow text-white font-semibold font-montserrat rounded-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors duration-300"
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
                    <motion.button
                      className="w-full flex items-center justify-between p-3 text-white/80 hover:text-white hover:bg-azure-blue-transparent rounded-xl transition-all duration-300 font-montserrat font-medium"
                      onClick={() => handleDropdownToggle(item.label)}
                      whileHover={{ x: 4 }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          (activeDropdown === item.label || (item.label === 'Services' && isMegaDropdownOpen)) ? 'rotate-180' : ''
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

                  {/* Login Button - Mobile */}
                  <motion.button
                    className="w-full flex items-center justify-center space-x-2 p-3 nav-button-glass text-white/80 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsLoggedIn(!isLoggedIn)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="font-montserrat font-medium">
                      {isLoggedIn ? 'Dashboard' : 'Login'}
                    </span>
                  </motion.button>

                  {/* Get Started Button - Mobile */}
                  <motion.button
                    className="w-full px-6 py-3 cta-button-glow text-white font-semibold font-montserrat rounded-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-azure-blue/5 via-transparent to-orange/5 pointer-events-none" />
      
      {/* Mega Dropdowns */}
      <MegaDropdown 
        isOpen={isMegaDropdownOpen} 
        onClose={() => setIsMegaDropdownOpen(false)} 
      />
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
