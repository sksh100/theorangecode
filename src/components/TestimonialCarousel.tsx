'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
}

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Executive Director',
      company: 'Global Tech Solutions',
      content: 'The Orange Code transformed how our team communicates in the UAE. The cultural insights we gained have been invaluable for building authentic relationships with our Emirati partners. This program is essential for anyone serious about business in the Gulf.',
      rating: 5
    },
    {
      id: 2,
      name: 'James Anderson',
      role: 'Regional Manager',
      company: 'International Finance Corp',
      content: 'I\'ve attended many cultural training programs, but The Orange Code stands out. The practical approach and deep understanding of GCC business culture helped me navigate complex negotiations with confidence. Highly recommended!',
      rating: 5
    },
    {
      id: 3,
      name: 'Emma Thompson',
      role: 'Founder & CEO',
      company: 'Dubai Ventures',
      content: 'As an expat entrepreneur, understanding cultural nuances was crucial for my success. The Orange Code provided exactly what I needed - real, actionable insights that helped me build trust and grow my business in the UAE.',
      rating: 5
    },
    {
      id: 4,
      name: 'Michael Chen',
      role: 'Senior Consultant',
      company: 'Strategic Partners Group',
      content: 'The depth of knowledge and practical application in The Orange Code program is exceptional. It\'s not just theory - it\'s real-world wisdom that immediately improved my interactions and business outcomes in the region.',
      rating: 5
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-azure-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="w-2 h-2 bg-orange rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            />
            <span className="text-azure-blue font-semibold text-sm uppercase tracking-wider">
              Success Stories
            </span>
            <motion.div 
              className="w-2 h-2 bg-azure-blue rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            What Our{' '}
            <motion.span 
              className="bg-gradient-to-r from-orange via-azure-blue to-orange bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.5,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              viewport={{ once: true }}
            >
              Clients Say
            </motion.span>
          </motion.h2>
          <motion.p 
            className="text-white/70 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            Real experiences from professionals who transformed their cultural intelligence
          </motion.p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1,
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="glass-card p-8 md:p-12"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange/20 to-azure-blue/20 rounded-full flex items-center justify-center">
                    <Quote className="w-8 h-8 text-orange" />
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-center mb-8">
                  <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-light italic mb-6">
                    "{testimonials[currentIndex].content}"
                  </p>
                </blockquote>

                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                    >
                      <span className="text-orange text-2xl">★</span>
                    </motion.div>
                  ))}
                </div>

                {/* Author Info */}
                <div className="text-center">
                  <h4 className="text-white text-xl md:text-2xl font-bold mb-2">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-white/70 text-base md:text-lg">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-azure-blue/20 to-orange/20 border border-azure-blue/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-azure-blue/60 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              type="button"
            >
              <ChevronLeft className="w-6 h-6 pointer-events-none" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-azure-blue w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  type="button"
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-azure-blue/20 to-orange/20 border border-azure-blue/40 backdrop-blur-sm flex items-center justify-center text-white hover:border-azure-blue/60 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)" }}
              whileTap={{ scale: 0.9 }}
              type="button"
            >
              <ChevronRight className="w-6 h-6 pointer-events-none" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

