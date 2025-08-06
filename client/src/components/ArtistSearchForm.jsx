import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import {useAppContext} from '../context/AppContext'

const ArtistSearchForm = () => {

    const {navigate, getToken, axios, setSearchedCities} = useAppContext();
    const [destination, setDestination] = useState("");

    const onSearch = async (e) => {
        e.preventDefault();
        navigate(`/artists?destination=${destination}`)
        //call api to save recent searched city

        await axios.post(`/api/user/store-recent-search`, {recentSearchedCity:destination}, 
            {headers: {Authorization: `Bearer ${await getToken()}`}})
        
            // add destination to SearchedCities max 3 recent searched cities
            setSearchedCities((prevSearchedCities) => {
                console.log(prevSearchedCities)
                const updateSearchedCities = [...prevSearchedCities, destination];
                if (updateSearchedCities.length > 3){
                    updateSearchedCities.shift();
                }
                return updateSearchedCities;
            })
        
    }

  return (

     <form onSubmit={onSearch} className='bg-white text-gray-500 mt-8 rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    <img src="src/assets/calendarIcon.svg" alt="" className='h-4'/>
                    <label htmlFor="destinationInput">City</label>
                </div>
                <input onChange={e=> setDestination(e.target.value)} value={destination}
                list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 
                text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'>
                    {cities.map((city, index) => (
                        <option value={city} key={index} />
                    ))}
                </datalist>
            </div>
            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                    <img src="src/assets/searchIcon.svg" alt='searchIcon' className='h-7'/>
                <span>Search</span>
            </button>
        </form>
  )
}

export default ArtistSearchForm;
