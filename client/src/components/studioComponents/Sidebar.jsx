import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const sideBarLinks = [
    {name: "Dashboard", path: "/studios", icon: assets.dashboardIcon},
    {name: "Add Artist", path: "/studios/add-artist", icon: assets.addIcon},
    {name: "List Artists", path: "/studios/list-artist", icon: assets.listIcon},
  ]
  return (
    <div className='md:w-64 w-16 border-r h-full text-base border-gray-300 pt-3 flex flex-col transition-all duration-300'>
     {sideBarLinks.map((item, index) => (
        <NavLink to={item.path} key={index} end='/studio' className={({isActive}) =>
          `flext items-center py-3 px-4 md:px-8 gap-3 ${isActive ? "border-r-4 md:boder-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600" 
    : "hover:bg-gray-100/90 border-white text-gray-700"}`}>
      <img src={item.icon} alt={item.name} className='min-h-6 min-w-6' />
      <p className='md:block hidden text-center'>{item.name}</p>
    </NavLink>
     ))} 
    </div>
  )
}

export default Sidebar
