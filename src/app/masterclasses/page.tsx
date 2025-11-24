'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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

// Generate available dates for the next 4 weeks
const generateAvailableDates = (): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const today = new Date()
  const fourWeeksLater = new Date(today)
  fourWeeksLater.setDate(today.getDate() + 28)

  // Online slots: Monday, Wednesday, Saturday mornings (10:00 AM - 1:00 PM Dubai time)
  const onlineDays = [1, 3, 6] // Monday, Wednesday, Saturday
  const onlineTime = '10:00 AM - 1:00 PM (Dubai Time)'

  // Offline slots: Tuesday, Thursday (11:00 AM - 2:00 PM)
  const offlineDays = [2, 4] // Tuesday, Thursday
  const offlineTime = '11:00 AM - 2:00 PM'

  for (let d = new Date(today); d <= fourWeeksLater; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay()
    const dateStr = d.toISOString().split('T')[0]
    const formattedDate = d.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
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
  const [isBooking, setIsBooking] = useState(false)

  const availableSlots = generateAvailableDates()
  const filteredSlots = filterType === 'all' 
    ? availableSlots 
    : availableSlots.filter(slot => slot.type === filterType)

  const handleBookNow = () => {
    if (selectedMasterclass && selectedSlot) {
      setIsBooking(true)
      // Here you would integrate with your booking system
      // For now, we'll redirect to contact form with pre-filled data
      const masterclassName = masterclasses.find(m => m.id === selectedMasterclass)?.title
      const bookingData = {
        masterclass: masterclassName,
        date: selectedSlot.date,
        time: selectedSlot.time,
        type: selectedSlot.type
      }
      // Store in sessionStorage and redirect to contact form
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData))
      window.location.href = '/#contact'
    }
  }


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
                  onClick={() => setSelectedMasterclass(masterclass.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedMasterclass === masterclass.id
                      ? 'border-orange bg-gradient-to-br from-orange/20 to-orange/5 shadow-2xl shadow-orange/20'
                      : 'border-white/10 bg-gradient-to-br from-primary-dark/80 to-primary-dark/60 hover:border-orange/50'
                  }`}
                >
                  {selectedMasterclass === masterclass.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
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

        {/* Date & Time Selection */}
        {selectedMasterclass && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 relative"
          >
            <div className="container mx-auto px-6">
              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    filterType === 'all'
                      ? 'bg-gradient-to-r from-orange to-azure-blue text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  All Sessions
                </button>
                <button
                  onClick={() => setFilterType('online')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    filterType === 'online'
                      ? 'bg-gradient-to-r from-azure-blue to-bright-blue text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Online
                </button>
                <button
                  onClick={() => setFilterType('offline')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    filterType === 'offline'
                      ? 'bg-gradient-to-r from-orange to-light-blue text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  In-Person (Abu Dhabi)
                </button>
              </div>

              {/* Available Slots */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {filteredSlots.map((slot, index) => (
                  <motion.button
                    key={`${slot.date}-${slot.type}-${index}`}
                    onClick={() => setSelectedSlot(slot)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`relative p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedSlot?.date === slot.date && selectedSlot?.type === slot.type
                        ? 'border-orange bg-gradient-to-br from-orange/20 to-orange/5 shadow-xl shadow-orange/20'
                        : 'border-white/10 bg-white/5 hover:border-orange/50 hover:bg-white/10'
                    } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!slot.available}
                  >
                    {selectedSlot?.date === slot.date && selectedSlot?.type === slot.type && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-3 right-3 w-5 h-5 bg-orange rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                    
                    <div className="flex items-start gap-3 mb-2">
                      {slot.type === 'online' ? (
                        <Video className="w-5 h-5 text-azure-blue flex-shrink-0 mt-0.5" />
                      ) : (
                        <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm mb-1">
                          {slot.type === 'online' ? 'Online Session' : 'In-Person Session'}
                        </p>
                        <p className="text-white/80 text-xs mb-2">{slot.date}</p>
                        <div className="flex items-center gap-2 text-white/70 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{slot.time}</span>
                        </div>
                        {slot.type === 'offline' && (
                          <div className="flex items-center gap-2 text-white/70 text-xs mt-2">
                            <MapPin className="w-3 h-3" />
                            <span>Etihad Towers, Abu Dhabi</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Abu Dhabi Location Image */}
              {filterType === 'offline' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-12 max-w-4xl mx-auto"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/10">
                    <div className="aspect-video bg-gradient-to-br from-orange/20 to-light-blue/20 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 text-orange/50 mx-auto mb-4" />
                        <p className="text-white/70 text-lg">Etihad Towers Boardroom</p>
                        <p className="text-white/50 text-sm mt-2">Abu Dhabi, UAE</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* Booking CTA */}
        {selectedMasterclass && selectedSlot && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 relative"
          >
            <div className="container mx-auto px-6">
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-gradient-to-br from-orange/20 via-azure-blue/20 to-orange/20 rounded-3xl p-8 md:p-12 border border-white/10">
                  <h3 className="text-3xl font-bold mb-4">Ready to Secure Your Spot?</h3>
                  <p className="text-white/80 mb-8 text-lg">
                    {selectedSlot.type === 'online' 
                      ? 'Join us online from anywhere in the world'
                      : 'Experience our masterclass in our premium Abu Dhabi location'}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center gap-3 text-white/90">
                      <Calendar className="w-5 h-5 text-orange" />
                      <span>{selectedSlot.date}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-white/90">
                      <Clock className="w-5 h-5 text-azure-blue" />
                      <span>{selectedSlot.time}</span>
                    </div>
                    {selectedSlot.type === 'offline' && (
                      <div className="flex items-center justify-center gap-3 text-white/90">
                        <MapPin className="w-5 h-5 text-orange" />
                        <span>Etihad Towers, Abu Dhabi</span>
                      </div>
                    )}
                  </div>

                  <motion.button
                    onClick={handleBookNow}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-orange via-azure-blue to-orange text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-orange/50 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
                  >
                    <span>Secure Your Spot</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Alternative Booking Option */}
        <section className="py-16 relative">
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

