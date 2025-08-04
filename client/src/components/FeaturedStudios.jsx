import React from 'react'
import StudioCard from './StudioCard'
import Title from './Title'
import { useAppContext } from '../context/AppContext'

const text = 'Explore top-rated tattoo artists from around the world and book your next masterpiece'

const FeaturedStudios = () => {
  const { artists, navigate } = useAppContext();

  return artists.length > 0 && (
    <section className='flex flex-col items-center px-6 md:px-16 lg:px-24 py-20 
      bg-transparent text-white'>
     <Title 
        title='Featured Studios' 
        subTitle={text} 
        font='font-extrabold' 
        /> 

      <div className='flex flex-wrap items-center justify-center gap-6 mt-16 max-w-screen-xl w-full'>
        {artists.slice(0, 4).map((artist, index) => (
          <StudioCard key={artist._id} artist={artist} index={index} />
        ))}
      </div>

      <button 
        onClick={() => {
          navigate('/artists');
          scrollTo(0, 0);
        }}
        className='mt-16 px-6 py-2 text-sm font-semibold border border-gray-600 
        rounded-md bg-gray-800 hover:bg-gray-700 transition-all duration-200'
      >
        View All Studios
      </button>
    </section>
  )
}

export default FeaturedStudios
