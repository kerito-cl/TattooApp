import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {assets } from '../assets/assets'
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast';
import { Skull, Brush, Camera, Fan, Circle, Palette } from "lucide-react";

const styleIcons = {
  "Black & Grey": <Palette />,
  "Neo-Traditional": <Brush />,
  "Realism": <Camera />,
  "Japanese": <Fan />,
  "Minimalist": <Circle />,
  "Horror": <Skull />,
};


const ArtistDetails = () => {
    const {id} = useParams();
    const {artists, getToken, axios, navigate} = useAppContext();
    const [artist, setArtist] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [styles, setStyles] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);

    const checkAvailability = async () => {
    try {
        if (!date || !startTime || !endTime) {
            toast.error('Please select date and time slot');
            return;
        }
        if (startTime >= endTime) {
            toast.error('Start time must be before end time');
            return;
        }
        const { data } = await axios.post(`/api/bookings/check-availability`, {
            artist: id,
            date,
            startTime,
            endTime,
        });
        if (data.success) {
            if (data.isAvailable) {
                setIsAvailable(true);
                toast.success('Artist is Available');
            } else {
                setIsAvailable(false);
                toast.error('Artist is not Available');
            }
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!isAvailable) {
            return checkAvailability();
        }
        try {
            const { data } = await axios.post(`/api/bookings/book`, {
                artist: id,
                date,
                startTime,
                endTime,
                paymentMethod: 'Pay At The Studio',
            }, {
                headers: { Authorization: `Bearer ${await getToken()}` },
            });

            if (data.success) {
                toast.success(data.message);
                navigate('/my-bookings');
                scrollTo(0, 0);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
};



    useEffect(() => {
        const foundArtist = artists.find(artist => artist._id === id)
        foundArtist && setArtist(foundArtist)
        foundArtist && setMainImage(foundArtist.images[0])

    },[artists])


  return artist && (

    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
        {/*artist details*/}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-sans'>{artist.name} <span className='font-sans text-sm'>{artist.studio.name} Studio</span></h1>
        </div >
        {/*artist rating*/}
        <div className='flex items-center gap-1 mt-2'>
            <StarRating/>
            <p className='ml-2'> 200+ reviews</p>
        </div>
        {/*artist address*/}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <img src={assets.locationIcon} alt="location-icon" />
            <span>{artist.studio.address}</span>
        </div>
        {/*artist images*/}
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
            <div className='lg:w-1/2 w-full'>
                <img src={mainImage} alt="Artist Image" className='w-full rounded-xl shadow-lg object-cover'/>
            </div>
            <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                {artist.images.map((image,index) => (
                    <img onClick={() => setMainImage(image)}
                    key={index} src={image} alt="Artist Image" 
                    className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`}/>
                ))}
            </div>
        </div>
        {/*Artist Highlights */}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='flex flex-col'>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                    {artist.styles.map((item, index)=> (
                        <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'> 
                        {styleIcons[item]}
                            <p className='text-xs'>{item}</p>
                        </div>
                    ) )}
                </div>
            </div>
            {/*artist price */}
            <p className='text-2xl font-medium'>$ {artist.pricePerHour}/ hour</p>
        </div>
            {/* timeslot form*/}
            <form onSubmit={onSubmitHandler}
            className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white
            shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
            
            <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                <div className='flex flex-col'>
                    <label htmlFor='date' className='font-medium'>Date</label>
                    <input onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]}
                        type="date" id='date' required
                        className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' />
                </div>

                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

                <div className='flex flex-col'>
                    <label htmlFor='startTime' className='font-medium'>Start Time</label>
                    <input onChange={(e) => setStartTime(e.target.value)}
                        type="time" id='startTime' required
                        className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' />
                </div>

                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>

                <div className='flex flex-col'>
                    <label htmlFor='endTime' className='font-medium'>End Time</label>
                    <input onChange={(e) => setEndTime(e.target.value)}
                        type="time" id='endTime' required
                        className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' />
                </div>
            </div>

    <button type='submit' className='bg-purple-600 hover:bg-primary-dull active:scale-95 transition-all
        text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
        {isAvailable ? "Book Now" : "Check Availability"}
    </button>
    </form>
            {/*Hosted by */}

            <div className='flex flex-col item-start gap-4 mt-5'>
                <div className='flex gap-4'>
                    <img src={artist.studio.owner.image} alt='Host' className='h-14 w-14 md:h-18 md:w-18 rounded-full'/>
                    <div>
                        <p className='text-lg md:text-xl'>Hosted by {artist.studio.name}</p>
                        <div className='flex items-center mt-1'>
                            <StarRating/>
                            <p className='ml-2'>200+ reviews</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className='px-6 py-2.5 mt-6 rounded text-white bg-purple-600 
            hover:bg-primary-dull transition-all cursor-pointer'>Contact Now</button>


    </div>
  )
}

export default ArtistDetails
