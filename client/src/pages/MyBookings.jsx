import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import {assets } from '../assets/assets'
import {useAppContext} from '../context/AppContext'
import toast from 'react-hot-toast'

const text = "Manage your past, current and upcoming tattoo reservations in one place."

const MyBookings = () => {


    const { axios, getToken, user } = useAppContext();
    const [bookings, setBookings] = useState([]);

    const fetchUserBookings = async () => {
        try {
            const {data} = await axios.get(`/api/bookings/user`, 
                {headers: {Authorization: `Bearer ${await getToken()}`}})
                if (data.success){
                    setBookings(data.bookings)
                }
                else{
                    toast.error(data.message)
                }
        } catch (error) {
        }
    }
    useEffect(() => 
    {
        if (user) {
            fetchUserBookings()
        }
    },[user])

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
        <Title title='My Bookings' subTitle={text} align='left'/>
        <div className='max-w-6xl mt-8 w-full text-gray-800'>
            <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300
            font-medium text-base py-3'>
                <div className='w-1/3'>Hotels</div>
                <div className='w-1/3'>Date & Timing</div>
                <div className='w-1/3'> Payment</div>
            </div>
                {bookings.map((booking)=> (
                <div key={booking._id} className='grid grid-cols1 md:grid-cols-[3fr_2fr_1fr] w-full border-b
                border-gray-300 py-6 first:border-t'>
                    {/*Hotel details */}
                    <div className='flex flex-col md:flex-row'>
                        <img src={booking.artist.images[0]} alt="studio-img" className='min-md:w-44 rounded shadow object-cover'/>
                    <div className='flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4'>
                        <p className='font-sans text-2xl'>{booking.studio.name}
                        <span className='font-inter text-sm'> ({booking.artist.roomType})</span>
                        </p>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                        <img src={assets.locationIcon} alt="location-icon"/>
                        <span> {booking.studio.address}</span>
                        </div>
                        <div className='flex items-center gap-1 text-sm text-gray-500'>
                        <img src={assets.guestsIcon} alt="guests-icon"/>
                        <span>Guests:  {booking.guests}</span>
                        </div>
                        <p className='text-base'>Total: ${booking.totalPrice}</p>
                    </div>
                    </div>
                    {/*Date & timings*/}
                    <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
                        <div>
                            <p>Date</p>
                            <p className='text-gray-500 text-smV'>
                                {new Date(booking.date).toDateString()}
                            </p>
                        </div>
                        <div>
                            <p>From:</p>
                            <p className='text-sm text-shadow-inherit'>
                                {booking.startTime}
                            </p>
                        </div>
                        <div>
                            <p>To:</p>
                            <p className='text-sm text-inherit'>
                                {booking.endTime}
                            </p>
                        </div>

                    </div>
                    {/*Paymenet status*/}
                    <div className='flex flex-col items-start justify-center pt-3'>
                        <div className='flex items-center gap-2'>
                            <div className={`h-3 w-3 rounded-full ${booking.isPaid ? 
                                "bg-green-500" : "bg-red-500"}`}>
                            </div>
                            <p className={`text-sm ${booking.isPaid ? 
                                "text-green-500" : "text-red-500"}`}>{booking.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>
                        {!booking.isPaid && (
                            <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400
                            rounded-full hover:bg-gray-50 transition-all cursor-pointer'>Pay Now</button>
                        )}


                    </div>

                </div>
            ))}
        </div>
    </div>
  )
}

export default MyBookings
