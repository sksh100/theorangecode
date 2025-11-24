'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Video, Mail, ArrowRight, Check } from 'lucide-react'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import Link from 'next/link'

interface Masterclass {
  id: number
  title: string
  description: string
  gradient: string
}

interface TimeSlot {
  date: string
  time: string
  available: boolean
  type: 'online' | 'offline'
}

const masterclasses: Masterclass[] = [
  {
    id: 1,
    title: "UAE Cultural Foundations",
    description: "Step into your full potential with a masterclass that refines how you think, speak, move, and lead. From table manners and royal protocols to body language, tone of voice, and setting boundaries, this journey transforms ambition into presence.",
    gradient: "from-orange/20 to-bright-blue/20"
  },
  {
    id: 2,
    title: "Cultural Intelligence For Expats",
    description: "Belong socially and culturally in the Emirates. Learn Islamic etiquette, modesty codes, hospitality rituals, Arabic phrases, and the art of building lasting friendships with Emiratis. Break isolation and thrive with cultural confidence.",
    gradient: "from-bright-blue/20 to-light-blue/20"
  },
  {
    id: 3,
    title: "Cultural Intelligence In Business",
    description: "Unlock the unspoken rules of GCC business culture. From trust-building and negotiation rhythms to gifting, attire, and majlis etiquette, this masterclass gives executives and entrepreneurs the keys to succeed in UAE, Saudi Arabia, Qatar, and beyond.",
    gradient: "from-light-blue/20 to-orange/20"
  }
]

// Generate available dates for the next 4 weeks - compact format
const generateAvailableDates = (): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const today = new Date()
  const fourWeeksLater = new Date(today)
  fourWeeksLater.setDate(today.getDate() + 28)

  // Online slots: Monday, Wednesday, Saturday mornings (10:00 AM - 1:00 PM Dubai time)
  const onlineDays = [1, 3, 6] // Monday, Wednesday, Saturday
  const onlineTime = '10:00 AM - 1:00 PM'

  // Offline slots: Tuesday, Thursday (11:00 AM - 2:00 PM)
  const offlineDays = [2, 4] // Tuesday, Thursday
  const offlineTime = '11:00 AM - 2:00 PM'

  for (let d = new Date(today); d <= fourWeeksLater; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay()
    
    // Compact date format
    const formattedDate = d.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })

    // Add online slots
    if (onlineDays.includes(dayOfWeek)) {
      slots.push({
        date: formattedDate,
        time: onlineTime,
        available: true,
        type: 'online'
      })
    }

    // Add offline slots
    if (offlineDays.includes(dayOfWeek)) {
      slots.push({
        date: formattedDate,
        time: offlineTime,
        available: true,
        type: 'offline'
      })
    }
  }

  return slots
}

export default function MasterclassesPage() {
  const [selectedMasterclass, setSelectedMasterclass] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'online' | 'offline'>('all')
  const [showSummary, setShowSummary] = useState(false)

  const availableSlots = generateAvailableDates()
  const filteredSlots = filterType === 'all' 
    ? availableSlots 
    : availableSlots.filter(slot => slot.type === filterType)

  // Show summary when both are selected
  useEffect(() => {
    setShowSummary(selectedMasterclass !== null && selectedSlot !== null)
  }, [selectedMasterclass, selectedSlot])

  const handleBookNow = () => {
    if (selectedMasterclass && selectedSlot) {
      // Redirect directly to Stripe checkout
      const paymentLink = 'https://buy.stripe.com/5kQ3cv79cfH3byHdO08k800'
      
      // Store booking data for reference
      const masterclassName = masterclasses.find(m => m.id === selectedMasterclass)?.title
      const bookingData = {
        masterclass: masterclassName,
        date: selectedSlot.date,
        time: selectedSlot.time,
        type: selectedSlot.type
      }
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData))
      
      // Immediate redirect to checkout
      window.location.href = paymentLink
    }
  }

  const selectedMasterclassData = selectedMasterclass 
    ? masterclasses.find(m => m.id === selectedMasterclass) 
    : null


  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <ModernNavbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid-pattern-animated" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-white">Book Your </span>
                <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                  Masterclass
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                Secure your spot for an immersive cultural intelligence experience. Choose from online sessions or join us in person at our Abu Dhabi location.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Masterclasses Selection */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Select Your Masterclass
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {masterclasses.map((masterclass, index) => (
                <motion.button
                  key={masterclass.id}
                  onClick={() => {
                    setSelectedMasterclass(masterclass.id)
                    // Reset slot when masterclass changes
                    if (selectedMasterclass !== masterclass.id) {
                      setSelectedSlot(null)
                    }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: selectedMasterclass === masterclass.id ? 1.02 : 1
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedMasterclass === masterclass.id
                      ? 'border-orange bg-gradient-to-br from-orange/20 to-orange/5 shadow-2xl shadow-orange/20 ring-2 ring-orange/30'
                      : 'border-white/10 bg-gradient-to-br from-primary-dark/80 to-primary-dark/60 hover:border-orange/50'
                  }`}
                >
                  {selectedMasterclass === masterclass.id && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-orange rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {masterclass.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {masterclass.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky Summary Bar - Shows when both selected */}
        <AnimatePresence>
          {showSummary && selectedMasterclassData && selectedSlot && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-dark via-primary-dark/95 to-primary-dark border-t border-orange/30 backdrop-blur-xl shadow-2xl"
            >
              <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-orange" />
                      <span className="text-white/90 font-semibold">{selectedMasterclassData.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedSlot.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span>{selectedSlot.time}</span>
                    </div>
                    {selectedSlot.type === 'offline' && (
                      <div className="flex items-center gap-2 text-white/70">
                        <MapPin className="w-4 h-4" />
                        <span>Abu Dhabi</span>
                      </div>
                    )}
                  </div>
                  <motion.button
                    onClick={handleBookNow}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange via-azure-blue to-orange text-white font-bold rounded-xl shadow-2xl hover:shadow-orange/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Secure Your Spot → Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Date & Time Selection - Compact */}
        {selectedMasterclass && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-12 relative pb-24 md:pb-12"
          >
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                {/* Filter Tabs - Compact */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      filterType === 'all'
                        ? 'bg-gradient-to-r from-orange to-azure-blue text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType('online')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                      filterType === 'online'
                        ? 'bg-gradient-to-r from-azure-blue to-bright-blue text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    Online
                  </button>
                  <button
                    onClick={() => setFilterType('offline')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                      filterType === 'offline'
                        ? 'bg-gradient-to-r from-orange to-light-blue text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    In-Person
                  </button>
                </div>

                {/* Compact Time Slots - Grid Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {filteredSlots.map((slot, index) => (
                    <motion.button
                      key={`${slot.date}-${slot.type}-${index}`}
                      onClick={() => {
                        setSelectedSlot(slot)
                        // Scroll to show summary
                        setTimeout(() => {
                          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                        }, 100)
                      }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className={`relative p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                        selectedSlot?.date === slot.date && selectedSlot?.type === slot.type
                          ? 'border-orange bg-gradient-to-br from-orange/30 to-orange/10 shadow-lg shadow-orange/30 scale-105'
                          : 'border-white/10 bg-white/5 hover:border-orange/50 hover:bg-white/10'
                      } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={!slot.available}
                    >
                      {selectedSlot?.date === slot.date && selectedSlot?.type === slot.type && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-orange rounded-full flex items-center justify-center border-2 border-primary-dark"
                        >
                          <Check className="w-2.5 h-2.5 text-white" />
                        </motion.div>
                      )}
                      
                      <div className="flex flex-col items-center gap-1">
                        {slot.type === 'online' ? (
                          <Video className="w-4 h-4 text-azure-blue" />
                        ) : (
                          <MapPin className="w-4 h-4 text-orange" />
                        )}
                        <p className="text-white text-xs font-semibold leading-tight">{slot.date}</p>
                        <p className="text-white/60 text-[10px] leading-tight">{slot.time}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Abu Dhabi Location - Only show when offline selected */}
                {filterType === 'offline' && selectedSlot?.type === 'offline' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 max-w-2xl mx-auto"
                  >
                    <div className="relative rounded-xl overflow-hidden border border-white/10">
                      <div className="aspect-video bg-gradient-to-br from-orange/20 to-light-blue/20 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 text-orange/50 mx-auto mb-2" />
                          <p className="text-white/70">Etihad Towers Boardroom</p>
                          <p className="text-white/50 text-sm mt-1">Abu Dhabi, UAE</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>
        )}


        {/* Alternative Booking Option */}
        <section className="py-16 relative pb-32 md:pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Need a Different Time?
              </h3>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                We understand that schedules can be challenging. If you'd like to attend at a different time, 
                we'd be happy to accommodate you. Contact us directly and we'll work together to find the perfect slot for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="mailto:contact@theorangecode.com"
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 hover:border-orange/50 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </Link>
                <Link
                  href="/#contact"
                  className="px-8 py-4 bg-gradient-to-r from-azure-blue/20 to-orange/20 border border-azure-blue/30 rounded-xl text-white font-semibold hover:from-azure-blue/30 hover:to-orange/30 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <span>Contact Form</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <ModernFooter />
    </div>
  )
}

