import React from 'react'
import { motion } from 'framer-motion'
import ArtistSearchForm from './ArtistSearchForm'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.9,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: 'easeOut' }
  },
}

const Hero = () => {
  return (
    <motion.div
      className='flex flex-col items-start justify-center px-6 
      md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/tattooHero.png")] bg-no-repeat
      bg-cover bg-center h-screen'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p 
      className='bg-white/10 text-white tracking-wide uppercase text-sm font-semibold px-4 py-1 border border-white/30 rounded-sm mt-20 backdrop-blur-md'
        variants={itemVariants}
      >
        Ink Your Story
      </motion.p>

      <motion.p 
        className='font-serif text-2xl md:text-5xl md:text-[46px] md:leading-[46px] max-w-xl mt-4' 
        variants={itemVariants}
      >
        Find the right artist, book with ease, and wear your story proudly.
      </motion.p>

      <ArtistSearchForm/>
      <motion.div variants={itemVariants} className="w-full mt-8">
      </motion.div>
    </motion.div>
  )
}

export default Hero
