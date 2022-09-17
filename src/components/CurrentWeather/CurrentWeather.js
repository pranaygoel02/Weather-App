import React, { useEffect, useState,useCallback } from 'react'
import ClientPlaceDetail from '../ClientPlaceDetail';
import axios from 'axios';
import './CurrentWeather.css';

const CurrentWeather = ({coords}) => {
  const [dateObj,setDateObj] = useState(new Date());
  const [time, setTime] = useState(dateObj.toLocaleTimeString());
  const [userPos,setUserPos] = useState()
  const apikey = 'XMUYtoZGyj4nn6oqiFvdadAtS8hKS9b6'
  console.log('coords1',coords);
  console.log('coordslat',coords.lat);
  console.log('coordslon',coords.lon);
  const url =`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&details=true`
  // console.log('url',url);

  // const getGeoposition = useCallback(
  //   ,
  //   [coords.lat,coords.lon]
  // )
  
  console.log('userPos',userPos);

  useEffect(()=>{
    // getGeoposition()
    console.log('getting geoposition');
      if(coords.lat && coords.lon) fetch(`${url}&q=${coords.lat},${coords.lon}`).then(res=>res.data).then(data=>{
        console.log(data);
        setUserPos(prev=>data)})
  },[coords.lat,coords.lon])
  
  setInterval(() => {
    setDateObj(prev => new Date());
  }, 1000);
  
   useEffect(()=>{
    setTime(prev => dateObj.toLocaleTimeString());
   },[dateObj]);

  return (
    <div className='weather-container'>
      <div>
        {userPos && <ClientPlaceDetail time={time} coords={coords} userLocation={userPos}/>}
      </div>
    </div>
  )
}

export default CurrentWeather