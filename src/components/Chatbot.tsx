'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Phone, Mail, Calendar, Globe, ArrowRight } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatbotProps {
  onWhatsAppRedirect?: () => void
}

export function Chatbot({ onWhatsAppRedirect }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! Nice to meet you! I'm YOUR Luxury Agent. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    { icon: <Phone className="w-4 h-4" />, text: "Book a Consultation", action: "consultation" },
    { icon: <Mail className="w-4 h-4" />, text: "Get Program Info", action: "programs" },
    { icon: <Calendar className="w-4 h-4" />, text: "Schedule Training", action: "training" },
    { icon: <Globe className="w-4 h-4" />, text: "Cultural Guidance", action: "cultural" }
  ]

  const automatedResponses: { [key: string]: string } = {
    consultation: "I'd be happy to help you book a consultation! Our luxury cultural intelligence sessions are tailored to your specific needs. Would you like to schedule a call with our expert team?",
    programs: "We offer three signature programs: 'Born to Lead' for leadership excellence, 'Program for UAE Expats' for cultural integration, and 'Doing Business in the Middle East' for business success. Which interests you most?",
    training: "Our training programs are designed for fast-track transformation in just 4 weeks. We cover protocol training, cultural intelligence, and luxury lifestyle consulting. When would you like to start?",
    cultural: "Our cultural guidance covers Emirati customs, Islamic etiquette, business protocols, and social integration. We're certified by the Washington School of Protocol and trusted by embassies worldwide.",
    default: "Thank you for your message! For detailed assistance, I can connect you directly with our luxury agent team via WhatsApp. Would you like me to do that?"
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = automatedResponses[text.toLowerCase()] || automatedResponses.default
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "971501234567" // UAE number
    const message = encodeURIComponent("Hello! I'm interested in Your Luxury Agent services. Can you help me?")
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
    onWhatsAppRedirect?.()
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-orange to-bright-blue rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: [
            "0 10px 30px rgba(255, 145, 77, 0.3)",
            "0 15px 40px rgba(255, 145, 77, 0.5)",
            "0 10px 30px rgba(255, 145, 77, 0.3)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="text-xs text-white font-bold">1</span>
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 h-[600px] bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-orange to-bright-blue p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">YOUR Luxury Agent</h3>
                    <p className="text-xs opacity-90">Online now</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto min-h-0 mb-8">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                        message.isUser
                          ? 'bg-gradient-to-r from-orange to-bright-blue text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-2xl text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-3 border-t border-gray-200 mb-12">
              <div className="space-y-1.5 mb-7">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="w-full flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange/10 to-bright-blue/10 border border-orange/20 rounded-lg text-xs text-gray-700 hover:from-orange/20 hover:to-bright-blue/20 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-shrink-0">
                      {action.icon}
                    </div>
                    <span className="text-left font-medium">{action.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-transparent"
                />
                <motion.button
                  onClick={() => handleSendMessage(inputValue)}
                  className="px-3 py-2 bg-gradient-to-r from-orange to-bright-blue text-white rounded-lg hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              
              {/* WhatsApp Redirect Button */}
              <motion.button
                onClick={handleWhatsAppRedirect}
                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4" />
                Continue on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
