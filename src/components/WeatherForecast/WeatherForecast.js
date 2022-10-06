import React, {useRef,useEffect,useState} from 'react'
import Lottie from 'lottie-web'
import './WeatherForecast.css'
import Typewriter from 'typewriter-effect';
import {useAuth} from '../../Context/AuthContext'
import {Link} from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';

const WeatherForecast = () => {
  const WeatherRef = useRef()
  const {currentUser} = useAuth();
  const [opened, setOpened] = useState(true)
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

useEffect(()=>{
  setTimeout(()=>{
    setOpened(prev=>false)
  },1800)
},[])
  

  return (
    <div className='weather flex-row padding'>
      <h1 id='title'>Check <Typewriter
  options={{
    strings: ['live weather '],
    autoStart: true,
    loop: true,
  }}
/> of any place at a go.</h1>
      {(!currentUser && !opened) && 
      <div className='modal' style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',gap:'0.5em',background:'white', padding:'2em 1.5em',color:'black',borderRadius:'1.5em',position:'fixed',bottom:16,zIndex:1,margin:'1em'}}>
        <h2>Hello!</h2>
        <p>You can now save locations to look at its weather conditions instantly!</p>
        <h3>Sign up/Login to avail the functionality!</h3>
        <div style={{display: 'flex',gap:'1em',width:'100%',alignItems:'center',justifyContent:'center',padding:'1em'}}>
        <Link onClick={()=>setOpened(prev=>!prev)} style={{width:'100%',padding:'0.5em 0em'}} className='more-detail-link' to={"/signup"}>Sign up</Link>
        <Link onClick={()=>setOpened(prev=>!prev)} style={{width:'100%',padding:'0.5em 0em',background:'transparent',color:'blue',outline:'1px solid blue'}} className='more-detail-link' to={"/login"}>Login</Link>
        </div>
        <CloseIcon onClick={()=>setOpened(prev=>!prev)} style={{position:'absolute',top:16,right:16, cursor:'pointer'}}/>
      </div>}
    </div>
  )
}

export default WeatherForecast