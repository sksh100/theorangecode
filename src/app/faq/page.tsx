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
      question: 'What makes The Orange Code different from other Masterclasses?',
      answer: 'The Orange Code offers an experience that goes far beyond standard cultural training. Our programs are designed specifically for the realities of the UAE and the wider GCC. We blend cultural intelligence, leadership psychology, behaviour science, and region specific insights to help clients strengthen confidence, communication, and emotional awareness.\n\nEach session is crafted to bring immediate clarity and practical behavioural shifts that enhance the way clients live, work, and build relationships in the Emirates.',
      category: 'general',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: '2',
      question: 'How long do the Masterclasses take?',
      answer: 'Our signature Masterclasses are designed to fit into a busy lifestyle. They run for 3 hours and deliver strong value in a short time.\n\nOne to one coaching can be scheduled according to the client\'s needs and availability.',
      category: 'masterclasses',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: '3',
      question: 'What cultural aspects do you cover for UAE expats?',
      answer: 'Our Foundations Masterclass includes the core cultural elements needed to feel confident and grounded in the UAE. We cover Islamic etiquette, modesty guidelines, hospitality rituals, communication styles, national identity, essential Arabic greetings, and the subtle social rules that shape daily life in the Emirates.\n\nClients also learn how to connect respectfully with Emiratis, navigate multicultural environments, and avoid common misunderstandings.',
      category: 'cultural',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: '4',
      question: 'Do you offer business protocol training for the Middle East?',
      answer: 'Yes. Our business protocol Masterclass prepares executives, leaders, and teams to operate effectively in the UAE and GCC.\n\nWe cover trust building, negotiation styles, gifting etiquette, attire expectations, meeting behaviour, majlis etiquette, power distance awareness, and culturally aligned communication.\n\nClients who wish to explore deeper topics can continue in personalised private sessions.',
      category: 'business',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: '5',
      question: 'What is included in the leadership and presence development program?',
      answer: 'This Masterclass refines the way you think, speak, behave, and lead.\n\nWe cover etiquette, royal and diplomatic protocols, posture and body language, tone of voice, boundaries, emotional regulation, and self presentation.\n\nClients learn to communicate with authority while maintaining calm, courtesy, and cultural awareness. The program builds a presence that matches the expectations of modern leadership within the UAE and beyond.',
      category: 'masterclasses',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: '6',
      question: 'How do I book a consultation session?',
      answer: 'You can book directly through our website or contact us at:\n\ncontact@theorangecode.com or masterclasses@theorangecode.com\n\nWe offer in person sessions in Abu Dhabi and online sessions for international clients. Our team can assist you in choosing the right program based on your goals and lifestyle.',
      category: 'booking',
      icon: <Phone className="w-5 h-5" />
    },
    {
      id: '7',
      question: 'What are your payment terms and refund policy?',
      answer: 'Payment is required in full before the Masterclass begins. This confirms your place and allows us to prepare your personalised materials and assessments.\n\nRefunds are considered when learning goals are not met and the client can provide clear and reasonable grounds for dissatisfaction.\n\nWhenever possible we resolve concerns through communication, additional support, or session adjustments. Because our Masterclasses include structured preparation, refunds are limited to cases where no resolution is possible.\n\nOur approach is built on fairness, transparency, and mutual respect.',
      category: 'payment',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: '8',
      question: 'Do you provide materials and resources after the program?',
      answer: 'Yes. Clients receive an Orange Code Cultural Intelligence Guide and a workbook.\n\nWe also offer follow up support to help you apply the new skills correctly in daily life.',
      category: 'masterclasses',
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      id: '9',
      question: 'Can you help with specific cultural situations or challenges?',
      answer: 'Yes. We offer private consultations for sensitive or personal situations.\n\nWe support clients with real world challenges such as business meetings, majlis invitations, social events, workplace dynamics, national celebrations, and family related cultural situations in the UAE, Saudi Arabia, Qatar, Oman, and Bahrain.\n\nGuidance is clear, practical, and tailored to help you respond with confidence and cultural sensitivity.',
      category: 'cultural',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: '10',
      question: 'What languages do you conduct sessions in?',
      answer: 'Our Core Masterclasses are delivered in English. Dutch support is available for Dutch speakers.\n\nIf a client prefers another language, we can arrange a certified translator or interpreter upon request.',
      category: 'general',
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      id: '11',
      question: 'Do you offer group training for companies?',
      answer: 'Yes. We offer Masterclasses to companies, government entities, leadership teams, and multicultural groups.\n\nPrograms include interactive sessions, practical applications, and tailored modules for specific industries.\n\nSessions can be delivered on site or online. For corporate enquiries please contact contact@theorangecode.com.',
      category: 'business',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: '12',
      question: 'What is your success rate and client satisfaction?',
      answer: 'We maintain a strong satisfaction rate across all Masterclasses. Our clients include embassy staff, executives, entrepreneurs, and expat families from around the world.\n\nMany describe the experience as transformative because it increases clarity, confidence, and cultural alignment both professionally and personally.\n\nOur mission is to deliver measurable growth and long term cultural intelligence.',
      category: 'general',
      icon: <Award className="w-5 h-5" />
    }
  ]

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'general', name: 'General', icon: <Award className="w-4 h-4" /> },
    { id: 'masterclasses', name: 'Masterclasses', icon: <Calendar className="w-4 h-4" /> },
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
              <p className="text-white/70 text-xl">Find answers to common questions about our luxury cultural intelligence masterclasses</p>
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
              <p className="text-white/80 mb-6">Our Orange Code team is here to help you with personalized guidance</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:+971568786106"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange to-bright-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5" />
                  Call Us: +971 56 878 6106
                </motion.a>
                <motion.a
                  href="mailto:contact@theorangecode.com"
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
