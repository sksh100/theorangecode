'use client'

import { motion } from 'framer-motion'
import { Quote, Shield } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
}

export function TestimonialCarousel() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

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
      content: 'I\'m very thankful. Understanding the culture around me changed everything. It brought calm into my marriage, clarity into my daily life and a sense of belonging I didn\'t know I could feel. I understand my husband\'s world so much better now and I\'m genuinely grateful for how much lighter and more connected life here feels after what I\'ve learned.',
      rating: 5
    },
    {
      id: 3,
      name: 'Sophie Turner',
      role: 'British Expat Living in Dubai',
      company: '',
      content: 'I signed up for the first masterclass of the culture code out of pure curiosity. I wanted to understand the culture I was living in and hoped to learn a few basics. The Cultural Foundations Masterclass and the Masterclass dedicated to Expatriates gave me so much more. I finally understood the values that shape life in the UAE and the meaning behind the way people communicate here. It made me feel more at home and more connected to the country. I see the culture with new appreciation and I no longer feel like an outsider.',
      rating: 5
    },
    {
      id: 4,
      name: 'M. D.',
      role: 'United Nations Programme Officer',
      company: '',
      content: 'Coming from France and working in the UN, I thought I understood multicultural dynamics, but the Gulf has its own way of communicating. This training gave me the clarity and confidence to navigate it with real respect and ease.',
      rating: 5
    },
    {
      id: 5,
      name: 'Dutch Operations Lead',
      role: 'Operations Lead',
      company: 'Ballast Nedam',
      content: 'I am from The Netherlands and when I started working in this amazing country I did thing The Dutch Way. I had a lot of stress and didn\'t know why things were not going effortlesly just like back in The Netherlands. I kept comparing and tried to find solutions that were all around defining our KPI\'s better but I just couldn\'t get the results I aimed for. Then I came across this and the \'Orange\' in the name attracted me. Did around 15 private coaching sessions and man o man what a difference. I couldn\'t have come up with this on my own. Thank you!',
      rating: 5
    },
    {
      id: 6,
      name: 'Dmitry P.',
      role: '',
      company: 'Russian Business Conglomerate',
      content: 'Coming from Russia, I was used to giving feedback very directly axaxa. But in the Gulf, I realised that the same honesty can feel too sharp. This training helped me see how my communication comes across and how I can adjust here and there. The awareness it gave me is honestly the most valuable part. Great job! This is something many people overlook and nobody fills the gap my compliments!',
      rating: 5
    },
    {
      id: 7,
      name: 'Francesca Morelli',
      role: 'Italian Expat Living in the UAE for 5+ Years',
      company: '',
      content: 'I have been living in the Gulf already for more than five years because of my husband\'s work, but honestly I never had the possibility to understand the culture in such a complete way. Many things I was feeling but could not explain. This training finally put all the pieces together. Now I understand why people communicate in certain ways, how respect is shown here and what I was sometimes misunderstanding. I feel much more connected to others and the country. For me this experience was really precious.',
      rating: 5
    },
    {
      id: 8,
      name: 'David Mitchell',
      role: 'American Business Man',
      company: '',
      content: 'As an American working in the Gulf, I thought being direct and transparent would always be seen as professional. I quickly learned that here it can come across very differently. The Masterclasses helped me understand the cultural expectations around communication, relationships, and respect in a way no book or YouTube video ever could. I finally get why people respond the way they do and how small adjustments on my side make a huge difference. It\'s made my work relationships smoother & faster and honestly much more enjoyable.',
      rating: 5
    },
    {
      id: 9,
      name: 'Ahmed Al M.',
      role: 'Emirati Professonial',
      company: '',
      content: 'I\'m really grateful that someone took the time to help others understand our country, our heritage, and our values in such a professional way. I honestly hope people practice what they learn and share this knowledge, so we continue to respect each other. It\'s inspiring and motivating. Wishing you all the success, inshallah.',
      rating: 5
    }
  ]

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  useEffect(() => {
    if (!marqueeRef.current) return

    const marqueeContent = marqueeRef.current
    const firstCard = marqueeContent.querySelector('.testimonial-card') as HTMLElement
    
    if (!firstCard) return

    // Calculate the width needed to reset (half of total width since we duplicated)
    const cardWidth = firstCard.offsetWidth
    const gap = 32 // 2rem gap between cards
    const totalWidth = (cardWidth + gap) * testimonials.length

    // GSAP infinite marquee animation
    animationRef.current = gsap.to(marqueeContent, {
      x: -totalWidth,
      duration: testimonials.length * 8, // 8 seconds per testimonial for slow, smooth motion
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth)
      }
    })

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [testimonials.length])

  const handleMouseEnter = () => {
    if (animationRef.current) {
      animationRef.current.pause()
    }
  }

  const handleMouseLeave = () => {
    if (animationRef.current) {
      animationRef.current.resume()
    }
  }

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-primary-dark overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-azure-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Several clients, marked with a shield, prefer to remain anonymous because of NDA requirements, but still offered to share their experience. We are truly thankful for every participant who chooses to tell us how the masterclasses shaped their understanding of the culture. Here is a small selection.
            </p>
          </motion.div>
        </motion.div>

        {/* Testimonials Marquee */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="overflow-hidden">
            <div 
              ref={marqueeRef}
              className="flex gap-8"
              style={{ willChange: 'transform' }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className="testimonial-card flex-shrink-0 w-[400px] glass-card p-6 md:p-8 flex flex-col relative cursor-pointer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  whileHover={{ 
                    y: -12,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {/* NDA Indicator - For anonymous testimonials */}
                  {(testimonial.id === 1 || testimonial.id === 4 || testimonial.id === 6) && (
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
                      <span key={i} className="text-orange text-base">★</span>
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
          </div>
        </div>
      </div>
    </section>
  )
}
