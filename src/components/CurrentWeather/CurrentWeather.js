import React, { useEffect, useState,useCallback } from 'react'
import ClientPlaceDetail from '../ClientPlaceDetail';
import UserWeather from '../UserWeather/UserWeather';
import axios from 'axios';
import './CurrentWeather.css';
import { useGeolocation } from '../../Context/GeolocationContext';

const CurrentWeather = () => {
  const {userPos,coords,getUserLocation} = useGeolocation()
  const [dateObj,setDateObj] = useState(new Date());
  const [time, setTime] = useState(dateObj.toLocaleTimeString());
 
  setInterval(() => {
    setDateObj(prev => new Date());
  }, 1000);
  
   useEffect(()=>{
    setTime(prev => dateObj.toLocaleTimeString());
   },[dateObj]);

   useEffect(()=>{
    getUserLocation()
   },[coords])

  return (
    <div className='weather-container'>
      <div>
        {userPos && <UserWeather time={time}/>}
      </div>
    </div>
  )
}

export default CurrentWeather