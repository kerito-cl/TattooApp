import React from 'react'
import { assets } from '../assets/assets'
import Title from './Title'

const text = "Join our newsletter to discover new tattoo trends, exclusive artist features, and behind-the-ink stories."

const NewsLetter = () => {
  return (
    <section className="flex flex-col items-center rounded-2xl px-4 py-16 mx-4 lg:mx-auto bg-transparent text-white shadow-md">
      
      <Title 
        title="Stay Inkspired" 
        subTitle={text} 
        font="font-extrabold" 
      />

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full max-w-xl">
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="bg-white/5 backdrop-blur border border-gray-700 text-sm text-white placeholder-gray-400 px-4 py-2.5 w-full rounded-md outline-none focus:ring-2 focus:ring-red-600 transition-all" 
        />

        <button 
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-2.5 rounded-md transition-all group"
        >
          Subscribe
          <img 
            src={assets.arrowIcon} 
            alt="arrow-icon" 
            className='w-4 invert group-hover:translate-x-1 transition-transform duration-200'
          />
        </button>
      </div>

      <p className="text-gray-500 mt-6 text-xs text-center max-w-md">
        By subscribing, you agree to our Privacy Policy and consent to receive email updates.
      </p>
    </section>
  )
}

export default NewsLetter
