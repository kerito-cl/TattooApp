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
                const updateSearchedCities = [...prevSearchedCities, destination];
                if (updateSearchedCities.length > 3){
                    updateSearchedCities.shift();
                }
                return updateSearchedCities;
            })
        
    }

  return (
     <form
      onSubmit={onSearch}
      className="bg-white text-gray-700 mt-10 rounded-2xl shadow-md px-6 py-6 flex flex-col md:flex-row items-stretch gap-4 max-w-4xl mx-auto"
    >
      {/* City Input */}
      <div className="flex-1">
        <label htmlFor="destinationInput" className="text-sm font-medium flex items-center gap-2">
          <img src={assets.calenderIcon} alt="" className="h-4" />
          City
        </label>
        <input
          onChange={(e) => setDestination(e.target.value)}
          value={destination}
          list="destinations"
          id="destinationInput"
          type="text"
          placeholder="Where do you want to get inked?"
          required
          className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition"
        />
        <datalist id="destinations">
          {cities.map((city, index) => (
            <option value={city} key={index} />
          ))}
        </datalist>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-lg bg-black hover:bg-gray-900 transition text-white px-6 py-3 text-sm font-medium max-md:w-full"
      >
        <img src={assets.searchIcon} alt="search icon" className="h-5" />
        <span>Find Artists</span>
      </button>
    </form>

  )
}

export default ArtistSearchForm;
