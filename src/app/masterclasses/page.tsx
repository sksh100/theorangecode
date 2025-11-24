'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Video, Mail, ArrowRight, Check, Sparkles, X, Sparkle } from 'lucide-react'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import Link from 'next/link'
import Image from 'next/image'

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

  const onlineDays = [1, 3, 6] // Monday, Wednesday, Saturday
  const onlineTime = '10:00 AM - 1:00 PM'
  const offlineDays = [2, 4] // Tuesday, Thursday
  const offlineTime = '11:00 AM - 2:00 PM'

  for (let d = new Date(today); d <= fourWeeksLater; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay()
    const formattedDate = d.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })

    if (onlineDays.includes(dayOfWeek)) {
      slots.push({
        date: formattedDate,
        time: onlineTime,
        available: true,
        type: 'online'
      })
    }

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
  const [showMap, setShowMap] = useState(false)

  const availableSlots = generateAvailableDates()
  const filteredSlots = filterType === 'all' 
    ? availableSlots 
    : availableSlots.filter(slot => slot.type === filterType)

  const handleBookNow = () => {
    if (selectedMasterclass && selectedSlot) {
      const paymentLink = 'https://buy.stripe.com/5kQ3cv79cfH3byHdO08k800'
      const masterclassName = masterclasses.find(m => m.id === selectedMasterclass)?.title
      const bookingData = {
        masterclass: masterclassName,
        date: selectedSlot.date,
        time: selectedSlot.time,
        type: selectedSlot.type
      }
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData))
      window.location.href = paymentLink
    }
  }

  const selectedMasterclassData = selectedMasterclass 
    ? masterclasses.find(m => m.id === selectedMasterclass) 
    : null

  const isReadyToBook = selectedMasterclass !== null && selectedSlot !== null

  return (
    <div className="min-h-screen bg-primary-dark text-white">
      <ModernNavbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Hero Image Section */}
        <section className="relative overflow-hidden">
          <div className="relative h-[60vh] md:h-[70vh] w-full">
            <Image
              src="/theorangecode-masterclass.jpg"
              alt="The Orange Code Masterclass Boardroom"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/40 via-primary-dark/60 to-primary-dark/90" />
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-6 pb-12 md:pb-16 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-4xl"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                    <span className="text-white">Book Your </span>
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      Masterclass
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                    Experience our premium boardroom in Abu Dhabi or join us online. Choose your masterclass and preferred time. Secure your spot in seconds.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Tailormade Courses Section */}
        <section className="py-12 md:py-16 relative border-b border-white/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10 rounded-2xl p-8 md:p-10 border border-orange/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Sparkle className="w-8 h-8 text-orange" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                      Need a Tailormade Course?
                    </h2>
                    <p className="text-white/80 text-lg mb-4 leading-relaxed">
                      We understand that every organization and individual has unique needs. If you require a custom masterclass tailored to specific topics, industries, or learning objectives, we're here to create the perfect program for you.
                    </p>
                    <Link
                      href="mailto:contact@theorangecode.com?subject=Tailormade Course Inquiry"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange to-azure-blue text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange/30 transition-all duration-300"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email Us for Custom Courses</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Booking Section - Side by Side */}
        <section className="py-8 md:py-12 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
              
              {/* Left Side - Masterclass Selection */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange rounded-full"></span>
                    Step 1: Choose Your Masterclass
                  </h2>
                  <p className="text-white/60 text-sm mb-6">Select the masterclass that interests you most</p>
                </div>
                
                <div className="space-y-4">
                  {masterclasses.map((masterclass, index) => (
                    <motion.button
                      key={masterclass.id}
                      onClick={() => {
                        setSelectedMasterclass(masterclass.id)
                        if (selectedMasterclass !== masterclass.id) {
                          setSelectedSlot(null)
                        }
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: selectedMasterclass === masterclass.id ? 1.02 : 1
                      }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`relative w-full p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedMasterclass === masterclass.id
                          ? 'border-orange bg-gradient-to-br from-orange/20 to-orange/5 shadow-xl shadow-orange/20'
                          : 'border-white/10 bg-white/5 hover:border-orange/50 hover:bg-white/10'
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
                      <h3 className="text-lg font-bold mb-2 text-white pr-8">
                        {masterclass.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {masterclass.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Right Side - Time Selection */}
              <div className="space-y-6">
                {selectedMasterclass ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-azure-blue rounded-full"></span>
                        Step 2: Choose Your Time
                      </h2>
                      <p className="text-white/60 text-sm mb-6">Select your preferred date and session type</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-3 mb-6">
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

                    {/* Time Slots Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {filteredSlots.map((slot, index) => (
                        <motion.button
                          key={`${slot.date}-${slot.type}-${index}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setSelectedSlot(slot)
                          }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                          className={`relative p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                            selectedSlot?.date === slot.date && selectedSlot?.type === slot.type
                              ? 'border-orange bg-gradient-to-br from-orange/30 to-orange/10 shadow-lg shadow-orange/30 scale-105'
                              : 'border-white/10 bg-white/5 hover:border-orange/50 hover:bg-white/10'
                          }`}
                        >
                          {selectedSlot?.date === slot.date && selectedSlot?.type === slot.type && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-orange rounded-full flex items-center justify-center border-2 border-primary-dark"
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                          
                          <div className="flex flex-col items-center gap-1.5">
                            {slot.type === 'online' ? (
                              <Video className="w-4 h-4 text-azure-blue" />
                            ) : (
                              <MapPin className="w-4 h-4 text-orange" />
                            )}
                            <p className="text-white text-xs font-semibold leading-tight">{slot.date}</p>
                            <p className="text-white/70 text-[10px] leading-tight">{slot.time}</p>
                            {slot.type === 'offline' && (
                              <p className="text-white/50 text-[9px]">Abu Dhabi</p>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Location for Offline */}
                    {filterType === 'offline' && selectedSlot?.type === 'offline' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                      >
                        <button
                          onClick={() => setShowMap(true)}
                          className="w-full p-4 rounded-xl border-2 border-orange/30 bg-gradient-to-br from-orange/10 to-orange/5 hover:border-orange/50 hover:from-orange/20 transition-all duration-300 flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-6 h-6 text-orange" />
                            <div className="text-left">
                              <p className="text-white font-semibold text-sm">Etihad Towers Boardroom</p>
                              <p className="text-white/70 text-xs mt-0.5">Abu Dhabi, UAE</p>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-orange group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center h-full min-h-[400px] border-2 border-dashed border-white/10 rounded-xl bg-white/5"
                  >
                    <div className="text-center text-white/40">
                      <Calendar className="w-12 h-12 mx-auto mb-3" />
                      <p className="text-sm">Select a masterclass to view available times</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Fixed Checkout Button - Always Visible When Ready */}
        <AnimatePresence>
          {isReadyToBook && selectedMasterclassData && selectedSlot && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-dark via-primary-dark/98 to-primary-dark border-t-2 border-orange/40 backdrop-blur-2xl shadow-2xl"
            >
              <div className="container mx-auto px-6 py-5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
                  {/* Selection Summary */}
                  <div className="flex-1 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange rounded-full animate-pulse"></div>
                      <span className="text-white/90 font-semibold">{selectedMasterclassData.title}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-white/70">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedSlot.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span>{selectedSlot.time}</span>
                    </div>
                    {selectedSlot.type === 'offline' && (
                      <button
                        onClick={() => setShowMap(true)}
                        className="flex items-center gap-2 text-white/70 hover:text-orange transition-colors"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>Abu Dhabi</span>
                      </button>
                    )}
                  </div>
                  
                  {/* Checkout Button */}
                  <motion.button
                    onClick={handleBookNow}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-orange via-azure-blue to-orange text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-orange/50 transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Secure Your Spot → Checkout</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Google Maps Modal */}
        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowMap(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-primary-dark rounded-2xl overflow-hidden border-2 border-orange/30 shadow-2xl w-full max-w-4xl max-h-[90vh]"
              >
                <button
                  onClick={() => setShowMap(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-primary-dark/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange transition-colors border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="p-4 border-b border-white/10">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange" />
                    Etihad Towers, Abu Dhabi
                  </h3>
                  <p className="text-white/70 text-sm mt-1">Our premium boardroom location</p>
                </div>
                <div className="relative w-full h-[500px] md:h-[600px]">
                  <iframe
                    src="https://www.google.com/maps?q=Etihad+Towers+Abu+Dhabi&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4 border-t border-white/10 bg-primary-dark/50">
                  <a
                    href="https://www.google.com/maps/search/etihad+towers/@24.4585838,54.3194686,17z/data=!3m1!4b1?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange hover:text-orange/80 transition-colors text-sm font-semibold"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alternative Booking Option */}
        <section className="py-16 relative pb-32 md:pb-28">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Need a Different Time?
              </h3>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                We understand that schedules can be challenging. Contact us directly and we'll work together to find the perfect slot for you.
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
