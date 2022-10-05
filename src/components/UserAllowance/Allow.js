import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web'
import './Allow.css'
import { useGeolocation } from '../../Context/GeolocationContext'

const Allow = () => {
  const {Geolocate,setAllowed} = useGeolocation()
  const LocationRef = useRef(null);
  useEffect(() => {
    const instance = Lottie.loadAnimation({
      container: LocationRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../images/allow.json')
    })
    return () => instance.destroy();
  }, [])

    return (
        <div className='weather-container padding allow-container'>
          <div className='lottie'>
            <button id='allow-btn' onClick={
              Geolocate
              }>Allow Location</button>
            <div id='animation' ref={LocationRef}></div>
          </div>
        </div>
      )
}

export default Allow