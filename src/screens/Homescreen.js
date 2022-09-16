import React, {useCallback, useEffect, useState} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import Dashboard from '../components/Dashboard/Dashboard'
import CurrentWeather from '../components/CurrentWeather/CurrentWeather'
import Geolocate from '../utils/Geolocate'
import {FetchWeatherData} from '../utils/FetchWeatherData'
import Allow from '../components/UserAllowance/Allow'
import Footer from '../components/Footer/footer'


const Homescreen = () => {
  const [sidebar, setSidebar] = useState(false);
  const [allowed,setAllowed] = useState(false);
  const [UserCoords,setUserCoords] = useState('');
  const [geoposition,setGeoposition] = useState()
  const [unit,setUnit] = useState('Metric');


  
  const getLocation = useCallback( () => {
    console.log('geolocationg');
    setAllowed(prev=>true);
    const {coords} = Geolocate(); 
    setUserCoords(prev=>coords);
  }, []) 

  console.log(UserCoords);

  useEffect(()=>{
    if(allowed) getLocation();
  },[getLocation])
  // if(UserCoords !== ''){
  //   setAllowed(true);
  // }

  const toggleSidebar = ()=>{
    setSidebar(prev => !prev);
  }

  return (
    <>
    <div className='app-container'>
      <Sidebar sidebarState={sidebar}/>
      <Dashboard openSidebar = {toggleSidebar} />
      {allowed ? <CurrentWeather coords={UserCoords}/> : <Allow getLocation={getLocation} setAllowed={setAllowed}/>}
    </div>
    <Footer/>
    </>
  )
}

export default Homescreen