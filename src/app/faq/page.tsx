'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Phone, Mail, MessageCircle, Calendar, Globe, Shield, Award, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  icon: React.ReactNode
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'What makes Your Luxury Agent different from other cultural training programs?',
      answer: 'We are certified by the Washington School of Protocol and trusted by embassies worldwide. Our programs combine refined knowledge of Emirati customs with authentic presence training, offering fast-track transformation in just 4 weeks. Unlike generic programs, we provide personalized cultural intelligence specifically designed for the UAE and broader Middle East region.',
      category: 'general',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: '2',
      question: 'How long does the transformation program take?',
      answer: 'Our signature programs are designed for fast-track transformation in just 4 weeks. This includes intensive cultural intelligence training, protocol mastery, and practical application sessions. The program is structured to fit into your busy schedule while ensuring maximum impact.',
      category: 'programs',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: '3',
      question: 'What cultural aspects do you cover for UAE expats?',
      answer: 'We cover Islamic etiquette, modesty codes, hospitality rituals, Arabic phrases, and the art of building lasting friendships with Emiratis. Our program helps you break isolation and thrive with cultural confidence, understanding both traditional values and modern UAE society.',
      category: 'cultural',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: '4',
      question: 'Do you offer business protocol training for the Middle East?',
      answer: 'Yes! Our "Doing Business in the Middle East" program covers trust-building, negotiation rhythms, gifting protocols, attire guidelines, and majlis etiquette. We prepare executives and entrepreneurs for success in UAE, Saudi Arabia, Qatar, and other GCC countries.',
      category: 'business',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: '5',
      question: 'What is included in the "Born to Lead" program?',
      answer: 'This program refines how you think, speak, move, and lead. It covers table manners, royal protocols, body language, tone of voice, and setting boundaries. The journey transforms ambition into authentic presence, preparing you for leadership roles in any cultural context.',
      category: 'programs',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: '6',
      question: 'How do I book a consultation session?',
      answer: 'You can book a consultation through our website, contact us directly at +971 56 909 1701, or email info@yourluxuryagent.com. We offer both in-person sessions in Abu Dhabi and virtual consultations for international clients.',
      category: 'booking',
      icon: <Phone className="w-5 h-5" />
    },
    {
      id: '7',
      question: 'What are your payment terms and refund policy?',
      answer: 'We require a 50% deposit upon booking confirmation, with the remaining balance due 7 days before program commencement. All prices include 5% VAT. Our refund policy allows 100% refund (minus 5% processing fee) for cancellations 14+ days before start, with decreasing percentages for closer cancellations.',
      category: 'payment',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: '8',
      question: 'Do you provide materials and resources after the program?',
      answer: 'Yes, all participants receive comprehensive materials including cultural guides, protocol checklists, Arabic phrase books, and ongoing access to our digital resource library. We also provide 3 months of follow-up support to ensure successful implementation.',
      category: 'programs',
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      id: '9',
      question: 'Can you help with specific cultural situations or challenges?',
      answer: 'Absolutely! Our cultural guidance covers specific scenarios like business meetings, social gatherings, religious observances, and family interactions. We provide practical solutions for real-world situations you\'ll encounter in the UAE and broader Middle East.',
      category: 'cultural',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: '10',
      question: 'What languages do you conduct sessions in?',
      answer: 'Our primary language is English, but we also offer sessions in Arabic for native speakers. All our trainers are bilingual and understand the nuances of both languages in cultural contexts. We can accommodate specific language preferences based on your needs.',
      category: 'general',
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: '11',
      question: 'Do you offer group training for companies?',
      answer: 'Yes, we provide corporate training programs tailored for teams and organizations. These include group sessions, team-building exercises, and customized content for specific industries. We can accommodate groups of various sizes and provide on-site training at your location.',
      category: 'business',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: '12',
      question: 'What is your success rate and client satisfaction?',
      answer: 'We maintain a 98% client satisfaction rate with over 500 successful transformations. Our clients include embassy staff, international executives, and expat families who have successfully integrated into UAE society and advanced their careers through our programs.',
      category: 'general',
      icon: <Award className="w-5 h-5" />
    }
  ]

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'general', name: 'General', icon: <Award className="w-4 h-4" /> },
    { id: 'programs', name: 'Programs', icon: <Calendar className="w-4 h-4" /> },
    { id: 'cultural', name: 'Cultural', icon: <Globe className="w-4 h-4" /> },
    { id: 'business', name: 'Business', icon: <Users className="w-4 h-4" /> },
    { id: 'booking', name: 'Booking', icon: <Phone className="w-4 h-4" /> },
    { id: 'payment', name: 'Payment', icon: <Award className="w-4 h-4" /> }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === selectedCategory)

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="min-h-screen bg-primary-dark">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="grid-pattern-animated" />
        </div>
        <motion.div 
          className="absolute w-48 h-48 bg-gradient-radial from-orange/10 to-transparent top-1/4 left-1/4 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-32 h-32 bg-gradient-radial from-bright-blue/10 to-transparent bottom-1/4 right-1/4 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-orange hover:text-bright-blue transition-colors mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div 
            className="flex items-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-orange/20 to-bright-blue/20 rounded-3xl flex items-center justify-center">
              <HelpCircle className="w-10 h-10 text-orange" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Frequently Asked Questions</h1>
              <p className="text-white/70 text-xl">Find answers to common questions about our luxury cultural intelligence programs</p>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-orange/20 to-bright-blue/20 border-orange/40 text-white'
                      : 'bg-white/5 border-white/20 text-white/70 hover:border-orange/40 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  <span className="text-sm font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Items */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <motion.button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange/20 to-bright-blue/20 rounded-xl flex items-center justify-center text-orange">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-white/60" />
                  </motion.div>
                </motion.button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openItems.includes(index) ? 'auto' : 0,
                    opacity: openItems.includes(index) ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className="pl-14">
                      <p className="text-white/80 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-orange/10 to-bright-blue/10 border border-orange/30 rounded-3xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-white/80 mb-6">Our luxury agent team is here to help you with personalized guidance</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:+971569091701"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange to-bright-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                  Call Us: +971 56 909 1701
                </motion.a>
                <motion.a
                  href="mailto:info@yourluxuryagent.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
