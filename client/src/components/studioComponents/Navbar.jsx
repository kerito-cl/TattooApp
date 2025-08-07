import React from 'react'
import {assets} from '../../assets/assets'
import { UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/BookInk.png'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all'>
        <Link to='/'>
            <img src={logo} alt="logo" className='max-w-20 max-h-15 invert'/>

        </Link>
        <UserButton/>
    </div>
  )
}

export default Navbar
