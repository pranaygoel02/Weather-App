import React,{ useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Dashboard.css'


const Dashboard = () => {
  const OutletRef = useRef();
  
  return (
    <div className='dashboard '>
    <Navbar/>
    <Outlet ref={OutletRef}/>
    
    </div>
  )
}

export default Dashboard