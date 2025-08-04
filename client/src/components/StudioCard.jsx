import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const StudioCard = ({ artist, index }) => {
  return (
    <Link 
      to={`/studios/${artist._id}`} 
      onClick={() => scrollTo(0, 0)}
      key={artist._id}
      className='relative w-full max-w-72 rounded-2xl overflow-hidden 
      bg-gray-900 text-gray-100 shadow-lg hover:scale-[1.01] transition-transform duration-200 group'
    >
      <img 
        src={artist.images[0]} 
        alt={`${artist.studio.name} cover`} 
        className='w-full h-48 object-cover group-hover:brightness-90 transition-all duration-200'
      />

      {index % 2 === 0 && (
        <p className='absolute top-3 left-3 px-3 py-1 text-xs bg-red-600 text-white 
        font-semibold rounded-full shadow-md'>
          Featured Ink Master
        </p>
      )}

      <div className='p-4'>
        <div className='flex items-center justify-between mb-2'>
          <p className='text-lg font-semibold text-white'>
            {artist.name}
          </p>
          <p className='text-lg font-semibold text-white'>
            {artist.studio.name} Studio
          </p>
          <div className='flex items-center gap-1 text-sm text-yellow-400'>
            <img src={assets.starIconFilled} alt='star-icon' className='w-4 h-4' />
            4.5
          </div>
        </div>

        <div className='flex items-center gap-1 text-sm text-gray-400 mb-1'>
          <img src={assets.locationIcon} alt='location-icon' className='w-4 h-4' />
          <span>{artist.studio.address}</span>
        </div>

        {/* Optional: Add style or specialties here */}
        {/* <p className='text-xs text-gray-400 mb-3'>Black & Grey • Realism • Japanese</p> */}

        <div className='flex items-center justify-between mt-4'>
          <p>
            <span className='text-lg text-white'>${artist.pricePerHour}</span>
            <span className='text-sm text-gray-400'> / hour</span>
          </p>
          <button className='px-4 py-2 text-sm font-medium border border-gray-600 
          rounded-md hover:bg-gray-800 transition-colors duration-200'>
            Book a Session
          </button>
        </div>
      </div>
    </Link>
  )
}

export default StudioCard
