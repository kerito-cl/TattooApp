import React from 'react'
import { assets } from '../assets/assets'
import bookLogo from "../assets/BookInk.png"

const Footer = () => {
  return (
    <footer className='bg-black text-gray-400 pt-12 px-6 md:px-16 lg:px-24 xl:px-32'>
      <div className='flex flex-wrap justify-between gap-12 md:gap-6'>

        {/* Logo & About */}
        <div className='max-w-80'>
          <img src={bookLogo} alt="logo" className='mb-4 h-14 md:h-20' />
          <p className='text-sm leading-relaxed'>
            Discover the world’s most exceptional tattoo studios — from renowned artists to hidden gems, all in one place.
          </p>
          <div className='flex items-center gap-4 mt-5'>
            <img src={assets.instagramIcon} alt="Instagram" className='w-5 hover:opacity-80 cursor-pointer' />
            <img src={assets.facebookIcon} alt="Facebook" className='w-5 hover:opacity-80 cursor-pointer' />
            <img src={assets.twitterIcon} alt="Twitter" className='w-5 hover:opacity-80 cursor-pointer' />
            <img src={assets.linkendinIcon} alt="LinkedIn" className='w-5 hover:opacity-80 cursor-pointer' />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-base font-semibold text-white'>COMPANY</p>
          <ul className='mt-4 flex flex-col gap-2 text-sm'>
            <li><a href="#" className='hover:text-white transition'>About</a></li>
            <li><a href="#" className='hover:text-white transition'>Careers</a></li>
            <li><a href="#" className='hover:text-white transition'>Press</a></li>
            <li><a href="#" className='hover:text-white transition'>Blog</a></li>
            <li><a href="#" className='hover:text-white transition'>Partners</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <p className='text-base font-semibold text-white'>SUPPORT</p>
          <ul className='mt-4 flex flex-col gap-2 text-sm'>
            <li><a href="#" className='hover:text-white transition'>Help Center</a></li>
            <li><a href="#" className='hover:text-white transition'>Safety Info</a></li>
            <li><a href="#" className='hover:text-white transition'>Cancellations</a></li>
            <li><a href="#" className='hover:text-white transition'>Contact Us</a></li>
            <li><a href="#" className='hover:text-white transition'>Accessibility</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className='max-w-80'>
          <p className='text-base font-semibold text-white'>STAY INKED</p>
          <p className='mt-3 text-sm'>
            Subscribe for tattoo inspiration and exclusive offers.
          </p>
          <div className='flex items-center mt-4'>
            <input 
              type="text" 
              placeholder='Your email' 
              className='bg-gray-800 text-white text-sm rounded-l px-3 h-9 border border-gray-700 outline-none placeholder-gray-500'
            />
            <button className='bg-red-600 h-9 w-9 flex items-center justify-center rounded-r hover:bg-red-500'>
              <img src={assets.arrowIcon} alt="submit" className='w-4 invert' />
            </button>
          </div>
        </div>
      </div>

      <hr className='border-gray-700 mt-12' />

      {/* Bottom Bar */}
      <div className='flex flex-col md:flex-row gap-3 items-center justify-between py-6 text-sm text-gray-500'>
        <p>© {new Date().getFullYear()} Kero's Booking. All rights reserved.</p>
        <ul className='flex items-center gap-4'>
          <li><a href="#" className='hover:text-white'>Privacy</a></li>
          <li><a href="#" className='hover:text-white'>Terms</a></li>
          <li><a href="#" className='hover:text-white'>Sitemap</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
