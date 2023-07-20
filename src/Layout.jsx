import React from 'react'
import Navsub1 from './Navsub1'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
      <Navsub1 />
      <Outlet />
    </div>
  )
}

export default Layout
