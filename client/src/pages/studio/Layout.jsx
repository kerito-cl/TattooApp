import React, { useEffect } from 'react'
import Navbar from '../../components/studioComponents/Navbar'
import Sidebar from '../../components/studioComponents/Sidebar'
import { Outlet } from 'react-router-dom'
import {useAppContext} from '../../context/AppContext'

const Layout = () => {

  const {isStudio, navigate} = useAppContext();

  useEffect(() => {
    if(!isStudio){
      navigate('/')
    }
  },[isStudio])

  return (
    <div className='flex flex-col h-screen'>
      <Navbar/>
      <div className='flex h-full'>
        <Sidebar/>
        <div className='flex-1 p-4 pt-10 md:px-10 h-full '>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout
