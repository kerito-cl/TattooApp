import React from 'react'
import { motion } from 'framer-motion'
import backgroundImage from '../assets/regImage.png' // Optional: Replace with a tattoo-related image

const About = () => {
  return (
    <div className="bg-black pt-28 px-4 md:px-16 lg:px-24 xl:px-32 flex flex-col gap-12 text-gray-800"
            >


      {/* HERO IMAGE SECTION */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/2">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold mb-4 text-white"
          >
            Where Art Meets Skin
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-base md:text-lg leading-relaxed"
          >
            Our platform connects you with top tattoo artists from around the world. Whether you're looking for bold traditional, fine-line minimalism, or full-body custom work, we're here to make your ink journey seamless and inspiring.
          </motion.p>
        </div>
        <motion.img 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={backgroundImage}
          alt="tattoo-about-hero"
          className="rounded-xl shadow-lg w-full h-full lg:w-1/2 object-cover max-h-[500px]"
        />
      </div>

      {/* MISSION SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-6 md:p-10 rounded-xl shadow"
      >
        <h2 className="text-2xl text-white font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          We're on a mission to make high-quality tattooing more accessible, transparent, and empowering. By bringing artists and clients together through a curated, easy-to-use booking experience, we help stories come to life — one design at a time.
        </p>
      </motion.div>

      {/* TEAM SECTION */}
      <div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold mb-6 text-white"
        >
          Meet the Creators
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Camila Rivera', role: 'Founder & Tattoo Enthusiast' },
            { name: 'Leo Mäkinen', role: 'Lead UX Designer' },
            { name: 'Sara Nakamura', role: 'Artist Community Manager' },
          ].map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="p-5 rounded-xl shadow border"
            >
              <div className="w-20 h-20 bg-gray-300 rounded-full mb-3" />
              <h3 className="text-white text-lg font-medium">{member.name}</h3>
              <p className="text-gray-200 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
