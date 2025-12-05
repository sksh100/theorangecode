'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Mail, ArrowRight, Check, Sparkles, X, Sparkle, Send, MessageSquare } from 'lucide-react'
import { ModernNavbar } from '@/components/ModernNavbar'
import { ModernFooter } from '@/components/ModernFooter'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { trackMasterclassSelect, trackTimeSlotSelect, trackCheckoutStart, trackButtonClick, trackFormStart, trackFormComplete } from '@/lib/analytics'
import { trackMasterclassInterest, trackCTAClick, trackFunnelStep, trackMasterclassView } from '@/lib/tracking'

interface Masterclass {
  id: number
  title: string
  description: string
  gradient: string
  price: number
  paymentLink?: string
  learningObjectives?: string[]
  outcomes?: string[]
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
    description: "A comprehensive introduction to the cultural foundations of the UAE. Participants explore the country's heritage, values, social codes, national identity, daily rhythms, dress etiquette, and the significance of traditions such as Ramadan. Designed as an essential integration experience for anyone living in or relocating to the Emirates.",
    gradient: "from-orange/20 to-bright-blue/20",
    price: 950,
    paymentLink: 'https://book.stripe.com/9B63cvalo66t46f7pC8k802',
    learningObjectives: [
      "Understand the cultural DNA and identity of the UAE",
      "Recognise key values that shape social and professional behaviour",
      "Learn appropriate dress codes, greetings, and etiquette",
      "Appreciate the role of heritage, religion, and national symbols",
      "Gain confidence in navigating daily life respectfully and tactfully"
    ],
    outcomes: [
      "A strong cultural foundation to integrate smoothly into UAE society",
      "Increased awareness of what is respectful and appropriate in local contexts",
      "Practical knowledge that prevents misunderstandings and supports meaningful relationships",
      "Confidence to participate in social and community life with ease"
    ]
  },
  {
    id: 2,
    title: "Cultural Intelligence For Expats",
    description: "A transformative masterclass that helps expats recognise how their own communication style, decision making, and relationship-building habits impact their experience in the region. Using globally recognised cultural frameworks (without naming them), participants learn how to adapt, connect, and thrive across cultures.",
    gradient: "from-bright-blue/20 to-light-blue/20",
    price: 1450,
    paymentLink: 'https://book.stripe.com/9B67sLfFIcuRfOX11e8k803',
    learningObjectives: [
      "Identify their own cultural communication patterns",
      "Understand how different cultures interpret clarity, feedback, trust, and hierarchy",
      "Learn how to adjust style without losing authenticity",
      "Improve connection, collaboration, and rapport with diverse teams",
      "Develop emotional and cultural awareness in daily interactions"
    ],
    outcomes: [
      "A higher level of cultural intelligence and interpersonal awareness",
      "Stronger relationships at work and in personal life",
      "Practical tools to communicate clearly and respectfully across cultures",
      "The ability to avoid common cultural misunderstandings"
    ]
  },
  {
    id: 3,
    title: "Business Culture & Professional Etiquette",
    description: "A strategic masterclass focused on business etiquette and professional communication in the UAE and the wider region. Learn how to navigate hierarchy, manage feedback, build trust, and conduct meetings and negotiations in a relationship-driven environment. Ideal for executives, entrepreneurs, and professionals aiming to succeed in the local market or expand business across the Gulf.",
    gradient: "from-light-blue/20 to-orange/20",
    price: 2200,
    paymentLink: 'https://book.stripe.com/6oUeVd1OSeCZcCL25i8k804',
    learningObjectives: [
      "Understand business expectations, hierarchy, and workplace dynamics",
      "Learn how to communicate with clarity and respect",
      "Master culturally appropriate feedback styles",
      "Navigate negotiations, partnerships, and long-term business relationships",
      "Recognise the importance of trust, discretion, and reputation"
    ],
    outcomes: [
      "The confidence to conduct business professionally and effectively",
      "Improved communication in meetings, negotiations, and client relationships",
      "Stronger rapport with local and regional partners",
      "A strategic understanding of how business decisions are influenced by culture"
    ]
  }
]

// Generate available dates for the next 4 weeks
// Masterclass day mapping:
// 1 = UAE Cultural Foundations -> Monday
// 2 = Cultural Intelligence For Expats -> Tuesday
// 3 = Business Culture & Professional Etiquette -> Thursday
const generateAvailableDates = (masterclassId: number | null): TimeSlot[] => {
  const slots: TimeSlot[] = []

  // Map masterclass ID to day of week (0 = Sunday, 1 = Monday, 2 = Tuesday, etc.)
  const masterclassDays: Record<number, number> = {
    1: 1, // UAE Cultural Foundations -> Monday
    2: 2, // Cultural Intelligence For Expats -> Tuesday
    3: 4  // Business Culture & Professional Etiquette -> Thursday
  }

  const offlineDays = masterclassId && masterclassDays[masterclassId]
    ? [masterclassDays[masterclassId]]
    : []
  const offlineTime = '11:00 AM - 2:00 PM'

  // Business rule: until Tuesday 6 January (fixed date), all sessions are sold out
  // except that single day, which is the only available in-person slot.
  // NOTE: JavaScript months are 0-indexed, so 0 = January.
  const today = new Date()
  const targetYear = 2026
  const firstAvailableDate = new Date(targetYear, 0, 6) // Tuesday 6 January 2026
  const endDate = new Date(targetYear, 0, 13) // Tuesday 13 January 2026 (fully booked)

  // Loop from today up to and including the end date
  for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay()

    if (!offlineDays.includes(dayOfWeek)) {
      continue
    }

    const formattedDate = d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })

    const isTarget =
      d.getFullYear() === firstAvailableDate.getFullYear() &&
      d.getMonth() === firstAvailableDate.getMonth() &&
      d.getDate() === firstAvailableDate.getDate()

    slots.push({
      date: formattedDate,
      time: offlineTime,
      available: isTarget,
      type: 'offline',
    })
  }

  return slots
}

export default function MasterclassesPage() {
  const [selectedMasterclass, setSelectedMasterclass] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [filterType, setFilterType] = useState<'offline'>('offline')
  const [showTailormadeForm, setShowTailormadeForm] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  // Restore last booking selection if user returns from Stripe or navigates back
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = sessionStorage.getItem('bookingData')
      if (!stored) return

      const data = JSON.parse(stored) as {
        masterclass?: string
        date?: string
        time?: string
        type?: 'online' | 'offline'
      }

      if (!data.masterclass) return
      const mc = masterclasses.find(m => m.title === data.masterclass)
      if (!mc) return

      setSelectedMasterclass(mc.id)

      if (data.date && data.time && data.type) {
        setSelectedSlot({
          date: data.date,
          time: data.time,
          type: data.type,
          available: true,
        })
      }
    } catch (e) {
      console.error('Error restoring booking data from sessionStorage:', e)
    }
  }, [])

  // Track masterclass views when page loads or masterclass is selected
  useEffect(() => {
    if (selectedMasterclass) {
      const masterclass = masterclasses.find(m => m.id === selectedMasterclass);
      if (masterclass) {
        trackMasterclassView(masterclass.id.toString(), masterclass.title);
        trackFunnelStep('masterclass_selected', 3, {
          masterclass: masterclass.title,
          price: masterclass.price,
        });
      }
    } else {
      // Track viewing all masterclasses
      trackMasterclassView('all', 'All Masterclasses');
    }
  }, [selectedMasterclass])
  const [tailormadeFormData, setTailormadeFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmittingTailormade, setIsSubmittingTailormade] = useState(false)
  const [isSubmittingContact, setIsSubmittingContact] = useState(false)
  const [tailormadeStatusMessage, setTailormadeStatusMessage] = useState<string | null>(null)
  const [contactStatusMessage, setContactStatusMessage] = useState<string | null>(null)

  const availableSlots = generateAvailableDates(selectedMasterclass)
  const filteredSlots = availableSlots.filter(slot => slot.type === 'offline')

        const handleBookNow = () => {
          if (selectedMasterclass && selectedSlot) {
            const masterclassData = masterclasses.find(m => m.id === selectedMasterclass)
            const paymentLink = masterclassData?.paymentLink || 'https://buy.stripe.com/5kQ3cv79cfH3byHdO08k800'
            const masterclassName = masterclassData?.title || ''
            const bookingData = {
              masterclass: masterclassName,
              date: selectedSlot.date,
              time: selectedSlot.time,
              type: selectedSlot.type
            }
            sessionStorage.setItem('bookingData', JSON.stringify(bookingData))
            
            // Track checkout start
            trackCheckoutStart(
              masterclassName,
              masterclassData?.price || 0,
              selectedSlot.date,
              selectedSlot.time
            )
            
            trackButtonClick('Secure Your Spot', 'Masterclasses Page Checkout Bar')
            
            // Track masterclass interest (payment link click)
            if (masterclassData) {
              trackMasterclassInterest(
                masterclassData.id.toString(),
                masterclassData.title,
                'payment_link_click'
              );
              trackFunnelStep('payment_click', 5, {
                masterclass: masterclassData.title,
                price: masterclassData.price,
                date: selectedSlot.date,
                time: selectedSlot.time,
              });
            }
            
            // Track CTA click
            trackCTAClick('Book Masterclass', window.location.pathname, {
              masterclass: masterclassData?.title,
              price: masterclassData?.price,
            });
            
            window.location.href = paymentLink
          }
        }

  const handleTailormadeFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTailormadeFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleTailormadeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    trackFormStart('Tailormade Course Inquiry', 'Masterclasses Page')
    setIsSubmittingTailormade(true)
    setTailormadeStatusMessage(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: tailormadeFormData.name,
          email: tailormadeFormData.email,
          phone: tailormadeFormData.phone,
          subject: "Tailormade Course Inquiry",
          message: tailormadeFormData.message || `I'm interested in a tailormade course. Please contact me to discuss my specific needs.`
        }),
      })

      const data = await res.json()

      if (res.ok) {
        trackFormComplete('Tailormade Course Inquiry', 'Masterclasses Page', {
          form_name: tailormadeFormData.name,
          form_email: tailormadeFormData.email,
        })
        setTailormadeStatusMessage("Thank you! We've received your inquiry and will contact you soon to discuss your tailormade course needs.")
        setTailormadeFormData({ name: '', email: '', phone: '', message: '' })
        setShowTailormadeForm(false)
      } else {
        setTailormadeStatusMessage(data.error || "Something went wrong, please try again.")
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setTailormadeStatusMessage("Something went wrong, please try again.")
    } finally {
      setIsSubmittingTailormade(false)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmittingContact(true)
    setContactStatusMessage(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactFormData),
      })

      const data = await res.json()

      if (res.ok) {
        setContactStatusMessage("Thank you! We've received your message and will contact you soon to find the perfect time slot for you.")
        setContactFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        setShowContactForm(false)
      } else {
        setContactStatusMessage(data.error || "Something went wrong, please try again.")
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setContactStatusMessage("Something went wrong, please try again.")
    } finally {
      setIsSubmittingContact(false)
    }
  }

  const selectedMasterclassData = selectedMasterclass 
    ? masterclasses.find(m => m.id === selectedMasterclass) 
    : null

  const isReadyToBook = selectedMasterclass !== null && selectedSlot !== null

  return (
    <>
      {/* Explicit canonical tag */}
      <link rel="canonical" href="https://www.theorangecode.com/masterclasses" />
      
      {/* Hreflang tags for UK and Netherlands */}
      <link rel="alternate" hreflang="en-GB" href="https://www.theorangecode.com/masterclasses" />
      <link rel="alternate" hreflang="en-NL" href="https://www.theorangecode.com/masterclasses" />
      <link rel="alternate" hreflang="nl-NL" href="https://www.theorangecode.com/masterclasses" />
      
      {/* UK and Netherlands Meta Tags */}
      <meta name="geo.region" content="GB" />
      <meta name="geo.region" content="NL" />
      <meta name="geo.placename" content="United Kingdom, Netherlands" />
      <meta name="target" content="UK, United Kingdom, Netherlands, Nederland, British professionals, Dutch professionals, Nederlandse professionals" />
      
      {/* Structured Data - Course Schemas */}
      <Script
        id="masterclasses-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Cultural Intelligence Masterclasses",
            "provider": {
              "@type": "Organization",
              "name": "The Orange Code",
              "url": "https://www.theorangecode.com"
            },
            "areaServed": [
              {
                "@type": "Country",
                "name": "United Arab Emirates"
              },
              {
                "@type": "Country",
                "name": "United Kingdom"
              },
              {
                "@type": "Country",
                "name": "Netherlands"
              },
              {
                "@type": "Country",
                "name": "Italy"
              },
              {
                "@type": "Country",
                "name": "France"
              }
            ],
            "audience": {
              "@type": "Audience",
              "audienceType": "Professionals, Expatriates, Government Employees, International Organizations",
              "geographicArea": [
                {
                  "@type": "Country",
                  "name": "United Kingdom"
                },
                {
                  "@type": "Country",
                  "name": "Netherlands"
                },
                {
                  "@type": "Country",
                  "name": "Italy"
                },
                {
                  "@type": "Country",
                  "name": "France"
                },
                {
                  "@type": "Country",
                  "name": "United Arab Emirates"
                }
              ]
            },
            // Government Collaboration
            "serviceAudience": {
              "@type": "Audience",
              "audienceType": "Government Organizations, Public Sector, International Cooperation",
              "description": "Cultural intelligence training for government employees, public sector professionals, and international cooperation initiatives"
            },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Cultural Intelligence Masterclasses",
                "itemListElement": masterclasses.map((masterclass) => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Course",
                    "name": masterclass.title,
                    "description": masterclass.description,
                    "provider": {
                      "@type": "Organization",
                      "name": "The Orange Code"
                    },
                    "courseCode": `CI-MASTERCLASS-${masterclass.id}`,
                    "educationalLevel": "Professional Development",
                    "image": "https://www.theorangecode.com/og-image",
                    "offers": {
                      "@type": "Offer",
                      "price": masterclass.price.toString(),
                      "priceCurrency": "AED",
                      "availability": "https://schema.org/InStock",
                      "url": masterclass.paymentLink || "https://www.theorangecode.com/masterclasses",
                      "seller": {
                        "@type": "Organization",
                        "name": "The Orange Code",
                        "url": "https://www.theorangecode.com"
                      }
                    }
                  }
                }))
              }
          })
        }}
      />
      {masterclasses.map((masterclass) => (
        <Script
          key={`course-schema-${masterclass.id}`}
          id={`course-schema-${masterclass.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": masterclass.title,
              "description": masterclass.description,
              "provider": {
                "@type": "Organization",
                "name": "The Orange Code",
                "url": "https://www.theorangecode.com"
              },
              "courseCode": `CI-MASTERCLASS-${masterclass.id}`,
              "educationalLevel": "Professional Development",
              "teaches": masterclass.learningObjectives || [],
              "image": "https://www.theorangecode.com/og-image",
              "offers": {
                "@type": "Offer",
                "price": masterclass.price.toString(),
                "priceCurrency": "AED",
                "availability": "https://schema.org/InStock",
                "url": masterclass.paymentLink || "https://www.theorangecode.com/masterclasses",
                "seller": {
                  "@type": "Organization",
                  "name": "The Orange Code",
                  "url": "https://www.theorangecode.com"
                }
              }
            })
          }}
        />
      ))}

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
          <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full">
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
                  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                    <span className="text-white">Book Your </span>
                    <span className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent">
                      Masterclass
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
                    Experience our Orange Code Masterclasses at Etihad Towers in Abu Dhabi. Choose your masterclass and preferred time. Secure your spot in seconds.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Booking Section - Side by Side */}
        <section className="py-6 sm:py-8 md:py-12 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
              
              {/* Left Side - Masterclass Selection */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange rounded-full"></span>
                    Step 1: <span className="text-orange">Choose</span> Your Masterclass
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm mb-6">Select the masterclass that interests you most</p>
                </div>
                
                <div className="space-y-4">
                  {masterclasses.map((masterclass, index) => (
                          <motion.button
                            key={masterclass.id}
                            onClick={() => {
                              if (selectedMasterclass !== masterclass.id) {
                                trackMasterclassSelect(masterclass.title, masterclass.id.toString(), masterclass.price)
                                setSelectedSlot(null)
                              }
                              setSelectedMasterclass(masterclass.id)
                            }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        scale: selectedMasterclass === masterclass.id ? 1.02 : 1
                      }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`relative w-full p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 text-left ${
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
                      <div className="flex items-start justify-between gap-4 mb-2 pr-8">
                        <h3 className="text-base sm:text-lg font-bold text-white flex-1">
                          {masterclass.title}
                        </h3>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-xl sm:text-2xl font-bold text-orange">{masterclass.price} د.إ</p>
                          <p className="text-white/50 text-xs">per person</p>
                        </div>
                      </div>
                      <div className="text-white/70 text-xs sm:text-sm leading-relaxed space-y-3 sm:space-y-4">
                        <p>{masterclass.description}</p>
                        
                        {masterclass.learningObjectives && masterclass.learningObjectives.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Learning Objectives</h4>
                            <p className="text-white/80 text-xs mb-2">By the end of this masterclass, participants will:</p>
                            <ul className="space-y-1.5 ml-3 sm:ml-4">
                              {masterclass.learningObjectives.map((objective, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-orange mt-1.5 text-xs">•</span>
                                  <span className="text-white/70 text-xs sm:text-sm">{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {masterclass.outcomes && masterclass.outcomes.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">Outcomes</h4>
                            <p className="text-white/80 text-xs mb-2">Participants will leave with:</p>
                            <ul className="space-y-1.5 ml-3 sm:ml-4">
                              {masterclass.outcomes.map((outcome, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-orange mt-1.5 text-xs">•</span>
                                  <span className="text-white/70 text-xs sm:text-sm">{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
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
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-azure-blue rounded-full"></span>
                        Step 2: <span className="text-orange">Choose</span> Your Time
                      </h2>
                      <p className="text-white/60 text-xs sm:text-sm mb-6">Select your preferred date and session type</p>
                    </div>

                    {/* Filter Tabs - Only In-Person Available */}
                    <div className="flex gap-3 mb-6">
                      <div className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange to-light-blue text-white flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        In-Person Sessions
                      </div>
                    </div>

                    {/* Time Slots Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {filteredSlots.map((slot, index) => (
                        <motion.button
                          key={`${slot.date}-${slot.type}-${index}`}
                            onClick={(e) => {
                              e.preventDefault()
                              if (slot.available) {
                                trackTimeSlotSelect(slot.date, slot.time, slot.type)
                                setSelectedSlot(slot)
                              }
                            }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                          className={`relative p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                            !slot.available
                              ? 'border-red-500/30 bg-red-500/10 opacity-50 cursor-not-allowed'
                              : selectedSlot?.date === slot.date && selectedSlot?.type === slot.type
                              ? 'border-orange bg-gradient-to-br from-orange/30 to-orange/10 shadow-lg shadow-orange/30 scale-105'
                              : 'border-white/10 bg-white/5 hover:border-orange/50 hover:bg-white/10'
                          }`}
                          disabled={!slot.available}
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
                            <MapPin className={`w-4 h-4 ${!slot.available ? 'text-red-500/50' : 'text-orange'}`} />
                            <p className={`text-xs font-semibold leading-tight ${!slot.available ? 'text-red-400/70' : 'text-white'}`}>{slot.date}</p>
                            <p className={`text-xs leading-tight ${!slot.available ? 'text-red-400/60' : 'text-white/70'}`}>{slot.time}</p>
                            <p className={`text-xs ${!slot.available ? 'text-red-400/60' : 'text-white/50'}`}>
                              {!slot.available ? 'Fully Booked' : 'Etihad Towers, Abu Dhabi'}
                            </p>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Location for Offline */}
                    {selectedSlot?.type === 'offline' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                      >
                        <div className="rounded-xl overflow-hidden border border-white/10">
                          <div className="relative w-full aspect-video">
                            <Image
                              src="/etihad-towers.jpg"
                              alt="The Orange Code at Etihad Towers"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4 bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10 border-t border-white/10">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                              <div className="text-left">
                                <p className="text-white font-semibold text-sm mb-1">The Orange Code at Etihad Towers</p>
                                <p className="text-white/70 text-xs leading-relaxed">
                                  Etihad Towers<br />
                                  Tower 3, Floor 36,<br />
                                  Abu Dhabi,<br />
                                  United Arab Emirates
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
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

        {/* Tailormade Courses Section */}
        <section className="py-12 md:py-16 relative border-t border-white/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-orange/10 via-azure-blue/10 to-orange/10 rounded-2xl p-8 md:p-10 border border-orange/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <Sparkle className="w-8 h-8 text-orange" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-white">
                      Need a Tailormade Course or Different Time?
                    </h2>
                    <p className="text-white/80 text-lg leading-relaxed mb-4">
                      We understand that schedules can be challenging and that every organization and individual has unique needs. If you require a custom masterclass tailored to specific topics, industries, or learning objectives, or if you need a different time slot than what's available, we're here to work with you to find the perfect solution.
                    </p>
                    <p className="text-white/70 text-base">
                      Contact us at{' '}
                      <a 
                        href="mailto:contact@theorangecode.com" 
                        className="text-orange hover:text-orange/80 transition-colors font-semibold"
                      >
                        contact@theorangecode.com
                      </a>
                    </p>
                  </div>
                </div>

                {showTailormadeForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <form onSubmit={handleTailormadeSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="tailormade-name" className="block text-white font-semibold mb-2 text-sm">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="tailormade-name"
                            name="name"
                            value={tailormadeFormData.name}
                            onChange={handleTailormadeFormChange}
                            required
                            className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label htmlFor="tailormade-email" className="block text-white font-semibold mb-2 text-sm">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="tailormade-email"
                            name="email"
                            value={tailormadeFormData.email}
                            onChange={handleTailormadeFormChange}
                            required
                            className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="tailormade-phone" className="block text-white font-semibold mb-2 text-sm">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="tailormade-phone"
                          name="phone"
                          value={tailormadeFormData.phone}
                          onChange={handleTailormadeFormChange}
                          className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-azure-blue/50 focus:ring-2 focus:ring-azure-blue/20 transition-all"
                          placeholder="+971 50 123 4567"
                        />
                      </div>

                      <div>
                        <label htmlFor="tailormade-message" className="block text-white font-semibold mb-2 text-sm">
                          Tell Us About Your Needs *
                        </label>
                        <textarea
                          id="tailormade-message"
                          name="message"
                          value={tailormadeFormData.message}
                          onChange={handleTailormadeFormChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-primary-dark/50 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-orange/50 focus:ring-2 focus:ring-orange/20 transition-all resize-none"
                          placeholder="Describe the topics, industries, or learning objectives you'd like us to tailor a course for..."
                        />
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          type="submit"
                          disabled={isSubmittingTailormade}
                          className="flex-1 cta-button-glow px-6 py-3 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group flex items-center justify-center gap-2"
                          whileHover={{ scale: isSubmittingTailormade ? 1 : 1.02 }}
                          whileTap={{ scale: isSubmittingTailormade ? 1 : 0.98 }}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {isSubmittingTailormade ? (
                              <>
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                  <Send className="w-4 h-4" />
                                </motion.div>
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Request
                                <Send className="w-4 h-4" />
                              </>
                            )}
                          </span>
                        </motion.button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowTailormadeForm(false)
                            setTailormadeFormData({ name: '', email: '', phone: '', message: '' })
                            setTailormadeStatusMessage(null)
                          }}
                          className="px-6 py-3 bg-white/5 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/10 transition-all duration-300"
                        >
                          Cancel
                        </button>
                      </div>

                      {tailormadeStatusMessage && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`mt-4 text-sm ${
                            tailormadeStatusMessage.includes('Thank you')
                              ? 'text-green-400'
                              : 'text-red-400'
                          }`}
                        >
                          {tailormadeStatusMessage}
                        </motion.p>
                      )}
                    </form>
                  </motion.div>
                )}
              </div>
            </motion.div>
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
              className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(1, 1, 30, 0.98) 0%, rgba(255, 145, 77, 0.15) 25%, rgba(0, 212, 255, 0.15) 75%, rgba(1, 1, 30, 0.98) 100%)',
                borderTop: '2px solid rgba(255, 145, 77, 0.4)',
                boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 145, 77, 0.2), 0 0 80px rgba(0, 212, 255, 0.15)'
              }}
            >
              <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 max-w-7xl mx-auto">
                  {/* Selection Summary */}
                  <div className="flex-1 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange rounded-full animate-pulse"></div>
                      <span className="text-white/90 font-semibold">{selectedMasterclassData.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange font-bold">
                      <span>{selectedMasterclassData.price} د.إ</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-white/70">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedSlot.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span>{selectedSlot.time}</span>
                    </div>
                    {selectedSlot.type === 'offline' && (
                      <div className="hidden sm:flex items-center gap-2 text-white/70">
                        <MapPin className="w-4 h-4" />
                        <span>Etihad Towers, Abu Dhabi</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Checkout Button */}
                  <motion.button
                    onClick={handleBookNow}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 145, 77, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="cta-button-glow w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 text-white font-bold text-base sm:text-lg rounded-xl relative overflow-hidden group flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                    <span className="relative z-10">Secure Your Spot</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </motion.main>

      <ModernFooter />
    </div>
    </>
  )
}
