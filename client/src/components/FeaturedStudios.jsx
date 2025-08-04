import React from 'react'
import StudioCard from './StudioCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import {useAppContext} from '../context/AppContext'


const text =  'Discover our best tattoo-artists around the world'
const FeaturedStudios = () => {

  const {artists, navigate} = useAppContext();
  console.log(artists);

  return artists.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24
    bg-slate-50 py-20'>
      <Title title='Featured Studios' subTitle={text}/>
        <div className='flex flex-wrap items-center justify-center gap-6
        mt-20'>
            {artists.slice(0, 4).map((artist, index)=>(
                <StudioCard key={artist._id} artist={artist} index={index}/>
            ))}
        </div>

        <button onClick={()=> {navigate('/artists'); scrollTo(0,0)}}
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
          View All Studios
        </button>
      
    </div>
  )
}

export default FeaturedStudios
