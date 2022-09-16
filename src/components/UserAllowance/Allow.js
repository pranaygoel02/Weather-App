import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web'
import './Allow.css'

const Allow = ({setAllowed,getLocation}) => {

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
            <button id='allow-btn' onClick={()=>{
              setAllowed(true)
              getLocation()
              }}>Allow Location</button>
            <div id='animation' ref={LocationRef}></div>
          </div>
        </div>
      )
}

export default Allow