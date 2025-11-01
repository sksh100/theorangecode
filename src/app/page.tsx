'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ModernFooter } from '@/components/ModernFooter'
import { ArrowRight, Clock, Mail } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-dark">
      {/* Coming Soon Hero Section */}
      <section className="hero-section">
        <div className="hero-content pt-12">

          <motion.div 
            className="glass-card mt-4 relative overflow-visible py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Logo in bottom left corner of glass box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-0 left-0 z-20"
            >
              <Image 
                src="/coming-soon/logo-1.png" 
                alt="The Orange Code Logo" 
                width={400} 
                height={400}
                className="w-auto h-auto max-w-[400px]"
                priority
              />
            </motion.div>
            <h1 className="text-6xl font-bold mb-6 leading-tight tracking-tight text-center whitespace-nowrap" style={{ color: '#ffffff' }}>
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #ff914d 0%, #00d4ff 50%, #0099ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                }}
              >
                Coming Soon
              </span>
            </h1>
            
            <motion.p 
              className="hero-subtitle font-sofia text-2xl text-white mb-12 font-normal text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Transforming cultural barriers into bridges of trust through refined knowledge and authentic presence.
            </motion.p>
            
            <motion.div 
              className="countdown-section mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="event-info inline-flex flex-col items-center gap-4 p-8 px-12 bg-bright-blue/10 border border-light-blue/30 rounded-2xl backdrop-blur-[10px]">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-azure-blue" />
                  <span className="date-label font-sofia text-sm text-white/70 uppercase tracking-wider font-medium">
                    Launch Date
                  </span>
                </div>
                <span className="date-value font-sofia text-3xl text-gradient-primary font-bold">
                  November 8, 2025
                </span>
              </div>
            </motion.div>

            <motion.div 
              className="cta-section mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4 px-8 py-4 bg-gradient-primary rounded-full cursor-pointer hover:shadow-glow transition-all duration-300 group">
                  <Mail className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold text-lg">Notify Me When Launch</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <p className="text-white/70 text-sm font-medium">
                  Be the first to know when we go live
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 border border-azure-blue/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-40 h-40 border border-orange/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </section>

      {/* Info Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="glass-card text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-gradient-azure rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Coming November 2025</h3>
              <p className="text-white/80">
                Mark your calendar for our exclusive launch event
              </p>
            </motion.div>

            <motion.div
              className="glass-card text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-gradient-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Stay Updated</h3>
              <p className="text-white/80">
                Get notified when we launch and receive exclusive early access
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <ModernFooter hideQuickLinks={true} />
    </div>
  )
}
