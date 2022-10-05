import React, {useRef,useEffect} from 'react'
import Lottie from 'lottie-web'
import './WeatherForecast.css'
import Typewriter from 'typewriter-effect';


const WeatherForecast = () => {
  const WeatherRef = useRef()
  // useEffect(() => {
  //   const instance = Lottie.loadAnimation({
  //     container: WeatherRef.current,
  //     renderer: 'svg',
  //     loop: true,
  //     autoplay: true,
  //     animationData: require('../../images/weather1.json')
  //   })
  //   return () => instance.destroy();
  // }, [])

  return (
    <div className='weather flex-row padding'>
      <h1 id='title'>Check <Typewriter
  options={{
    strings: ['live weather '],
    autoStart: true,
    loop: true,
  }}
/> of any place at a go.</h1>
      
    </div>
  )
}

export default WeatherForecast