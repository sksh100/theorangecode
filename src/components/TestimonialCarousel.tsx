'use client'

import { motion } from 'framer-motion'
import { Quote, Shield } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
}

export function TestimonialCarousel() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Regional Project Lead',
      role: 'Dutch Construction Leader Managing Major Projects in the Gulf Region',
      company: '',
      content: 'Working in the Gulf taught me that what feels natural in my own culture doesn\'t always land the same here. Once I understood the unspoken expectations and subtle ways people build trust, my whole approach shifted. I feel more grounded, more respectful and far more effective in every conversation I have.',
      rating: 5
    },
    {
      id: 2,
      name: 'Ciara K. Al-J.',
      role: 'Irish professional married to an Emirati',
      company: '',
      content: 'Understanding the culture around me changed everything. It brought calm into my marriage, clarity into my daily life and a sense of belonging I didn\'t know I could feel. I understand my husband\'s world so much better now and I\'m genuinely grateful for how much lighter and more connected life here feels after what I\'ve learned.',
      rating: 5
    },
    {
      id: 3,
      name: 'Sophie Turner',
      role: 'British Expat Living in Dubai',
      company: '',
      content: 'I joined The Orange Code out of pure curiosity. I wanted to understand the culture I was living in and hoped to learn a few basics. The Cultural Foundations Workshop and the Workshop dedicated to Expatriates gave me so much more. I finally understood the values that shape life in the UAE and the meaning behind the way people communicate here. It made me feel more at home and more connected to the country. I see the culture with new appreciation and I no longer feel like an outsider.',
      rating: 5
    },
    {
      id: 4,
      name: 'Michael Chen',
      role: 'Senior Consultant',
      company: 'Strategic Partners Group',
      content: 'The depth of knowledge and practical application in The Orange Code program is exceptional. It\'s not just theory - it\'s real-world wisdom that immediately improved my interactions and business outcomes in the region.',
      rating: 5
    },
    {
      id: 5,
      name: 'Dutch Operations Lead',
      role: 'Operations Lead',
      company: 'Ballast Nedam',
      content: 'Coming from a Dutch background I assumed honesty and directness created trust. In the Gulf this sometimes sounded too blunt. The Orange Code helped me adapt my communication to the UAE and Saudi ecosystem. I learned how warmth and respect shape business here. The results were immediate. Our projects moved faster and partnerships became effortless.',
      rating: 5
    }
  ]

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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 md:mb-10"
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
          <motion.div 
            className="text-white/70 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            viewport={{ once: true }}
          >
            <p className="mb-4">
              Honest reflections from the people who walked this journey with us.
            </p>
            <p>
              Several clients, marked with a shield, prefer to remain anonymous because of NDA requirements, but still offered to share their experience. We are truly thankful for every participant who chooses to tell us how the workshops shaped their understanding of the culture. Here is a small selection.
            </p>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid - All 5 on One Page */}
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
          {/* Grid Container - 3 testimonials per row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                viewport={{ once: true }}
                className="glass-card p-6 md:p-8 h-full flex flex-col relative"
              >
                {/* NDA Indicator - Only for first testimonial */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="w-6 h-6 bg-orange/20 rounded-full flex items-center justify-center border border-orange/40 backdrop-blur-sm">
                      <Shield className="w-3.5 h-3.5 text-orange" />
                    </div>
                  </div>
                )}
                
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange/20 to-azure-blue/20 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-orange" />
                  </div>
                </div>

                {/* Testimonial Content */}
                <blockquote className="flex-grow mb-4">
                  <p className="text-white text-sm md:text-base leading-relaxed font-light italic mb-3">
                    "{testimonial.content}"
                  </p>
                </blockquote>

                {/* Rating Stars */}
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1, type: "spring" }}
                      viewport={{ once: true }}
                    >
                      <span className="text-orange text-base">★</span>
                    </motion.div>
                  ))}
                </div>

                {/* Author Info */}
                <div className="text-center mt-auto">
                  <h4 className="text-white text-base md:text-lg font-bold mb-1">
                    {testimonial.name}
                  </h4>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-white/70 text-xs md:text-sm">
                      {testimonial.role && testimonial.company 
                        ? `${testimonial.role} at ${testimonial.company}`
                        : testimonial.role || testimonial.company
                      }
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

