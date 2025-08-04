import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeaturedStudios from '../components/FeaturedStudios'
import NewsLetter from '../components/NewsLetter'
import backgroundImage from '../assets/tattoo_studio_bg.png'  // ✅ Add your generated image here

const Home = () => {
  return (
    <>
      <Hero/>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24
                    bg-gradient-to-b from-transparent to-gray-950" />
    <div 
      className='transition-opacity relative min-h-screen pt-28 px-4 md:px-16 lg:px-24 xl:px-32 bg-cover bg-center'
      style={{ backgroundImage: `url(${backgroundImage})` }}>
         <div className="pointer-events-none absolute top-0 left-0 right-0 h-24
                  bg-gradient-to-t from-transparent to-gray-950" />

      <FeaturedStudios/>
      <NewsLetter/>
    </div>
    </>
  )
}

export default Home
