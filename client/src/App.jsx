import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StudioReg from './pages/StudioRegistration';
import {useAppContext} from './context/AppContext'
import Layout from './pages/studio/Layout';
import Dashboard from './pages/studio/Dashboard';
import AddArtist from './pages/studio/AddArtist';
import AllArtists from './pages/AllArtists';
import ArtistDetails from './pages/ArtistDetails';
import MyBookings from './pages/MyBookings';
import ListArtists from './pages/studio/ListArtists';
import About from './pages/About';


function App() {
    const isStudioPath = useLocation().pathname.includes("studio");
    const {showStudioReg} = useAppContext();



  return (
      <div>
         <Toaster/>
      {!isStudioPath && <Navbar />}
      {showStudioReg && <StudioReg />}
      {false && <StudioReg/>}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/home'} element={<Home/>} />
          <Route path={'/about'} element={<About/>} />
          <Route path={'/artists'} element={<AllArtists/>} />
          <Route path={'/artists/:id'} element={<ArtistDetails/>} />
          <Route path='/my-bookings' element={<MyBookings/>} />
            <Route path='/studios' element={<Layout/>}>
            <Route index element={<Dashboard/>} />
            <Route path='/studios/add-artist' element={<AddArtist/>}/>
            <Route path='/studios/list-artist' element={<ListArtists/>}/>
          </Route>
        </Routes>
        </div>
        <Footer/>
      </div>
  )
}

export default App
