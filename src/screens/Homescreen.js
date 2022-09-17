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

  

  return (
    <>
    <div className='app-container'>
      <Sidebar/>
      <Dashboard/>
      {allowed ? <CurrentWeather coords={UserCoords}/> : <Allow getLocation={getLocation}/>}
    </div>
    <Footer/>
    </>
  )
}

export default Homescreen