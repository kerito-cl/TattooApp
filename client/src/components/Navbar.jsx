import { useClerk, UserButton } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const BookIcon = () => (
  <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Artists', path: '/artists' },
    { name: 'About', path: '/about' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openSignIn } = useClerk();
  const location = useLocation();
  const { user, navigate, isStudio, setShowStudioReg } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 
        ${isScrolled ? 'bg-black/60 backdrop-blur-lg shadow-md py-3 md:py-4' : 'py-4 md:py-6'} text-white`}
    >
      <Link to="/">
        <motion.img
          initial={false}
          animate={{ scale: isScrolled ? 0.85 : 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          src={assets.logo}
          alt="logo"
          className="h-20"
        />
      </Link>

      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a key={i} href={link.path} className="group flex flex-col gap-0.5 text-white">
            {link.name}
            <div className="bg-white h-0.5 w-0 group-hover:w-full transition-all duration-300" />
          </a>
        ))}
        {user && (
          <button
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-white transition-all hover:bg-gray-800"
            onClick={() => (isStudio ? navigate('/studios') : setShowStudioReg(true))}
          >
            {isStudio ? 'Dashboard' : 'Register Your Studio'}
          </button>
        )}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <img src={assets.searchIcon} alt="search" className="h-9 transition-colors duration-500" />
        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button onClick={openSignIn} className="border hover:bg-gray-800 text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 cursor-pointer">
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} className="h-4 transition-colors duration-500" />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed top-0 left-0 w-full h-screen bg-black text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-white z-50"
          >
            <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
              <img src={assets.closeIcon} alt="close-menu" className="h-6.5 invert" />
            </button>

            {navLinks.map((link, i) => (
              <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </a>
            ))}

            {user && (
              <button
                className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all hover:bg-gray-800"
                onClick={() => (isStudio ? navigate('/studios') : setShowStudioReg(true))}
              >
                {isStudio ? 'Dashboard' : 'Register Your Studio'}
              </button>
            )}

            {!user && (
              <button onClick={openSignIn} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2.5 rounded-full transition-all duration-500">
                Login
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
