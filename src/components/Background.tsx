'use client'

import { motion } from 'framer-motion'

export function Background() {
  return (
    <div className="background fixed top-0 left-0 w-full h-full -z-10 bg-gradient-secondary">
      <motion.div 
        className="gradient-orb orb-1"
        animate={{
          y: [0, -30, 20, 0],
          rotate: [0, 120, 240, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="gradient-orb orb-2"
        animate={{
          y: [0, -30, 20, 0],
          rotate: [0, 120, 240, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -7,
        }}
      />
      
      <motion.div 
        className="gradient-orb orb-3"
        animate={{
          y: [0, -30, 20, 0],
          rotate: [0, 120, 240, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -14,
        }}
      />
      
      <motion.div 
        className="particles"
        animate={{
          y: [0, -200],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}
