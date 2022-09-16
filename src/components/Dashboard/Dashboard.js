import React,{ useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Dashboard.css'

const Dashboard = ({openSidebar}) => {
  const OutletRef = useRef();

  return (
    <div className='dashboard padding'>
    <Navbar openSidebar = {openSidebar}/>
    <Outlet ref={OutletRef}/>
    </div>
  )
}

export default Dashboard