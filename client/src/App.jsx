import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ArtistReg from './pages/ArtistRegistrarion';
import {useAppContext} from './context/AppContext'


function App() {
    const isArtistPath = useLocation().pathname.includes("artist");
    const {showArtistReg} = useAppContext();



  return (
      <div>
         <Toaster/>
      {!isArtistPath && <Navbar />}
      {showArtistReg && <ArtistReg />}
      {false && <ArtistReg/>}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/home'} element={<Home/>} />
        </Routes>
        </div>
        <Footer/>
      </div>
  )
}

export default App
