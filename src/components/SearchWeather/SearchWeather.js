import React,{useState,useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import './SearchWeather.css'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Chart from '../Chart/Chart';
import { useAuth } from '../../Context/AuthContext';
import {auth, db} from '../../firebase'
import { setDoc,doc, getDoc } from 'firebase/firestore';
import { useDatabase } from '../../Context/DatabaseContext';

export default function SearchWeather ({weatherData,city,state,country}) {
  const [saved,setSaved] = useState(false);
  const {currentUser,setAlert,uid} = useAuth()
  const {addLocation,removeLocation, savedLocations, setSavedLocations} = useDatabase()
  const flagUrl = "https://countryflagsapi.com/svg/" + country.toLowerCase().split(' ').join('%20');

  const AddLocation = async () => {
    console.log('adding');
    try{
      addLocation();
    }
    catch(err){
      console.log(err);
    }
    setSaved(prev=>true)
    setSavedLocations(prev=>!prev)
  }

  const RemoveLocation = async () => {
    console.log('removing');
    try{
      removeLocation();
    }
    catch(err){
      console.log(err);
    }
    setSaved(prev=>false)
    setSavedLocations(prev=>!prev)
  }
  
  const getSavedLocations = useCallback( async() => {
    console.table(city)
    // const docRef = doc(db, `${currentUser?.uid}`,city);
    const docRef = doc(db, `${uid}`,city);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setSaved(prev=>true)
      // setSavedLocations(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      setSaved(prev=>false)
      console.log("No such document!");
    }
},[city])
  
useEffect(()=>{
    getSavedLocations()
  },[getSavedLocations])

  
  return (
    <div className='search-weather padding'>
      <div className='weather-detail-head flex-row' style={{'backgroundImage':`linear-gradient(180deg, rgba(1, 1, 1,0.2),rgba(1, 1, 1,0.8)),url(${flagUrl})`,'backgroundRepeat':'no-repeat','backgroundPosition':'center','backgroundSize':'cover'}}>
        <div className='place-detail'>
          <h1 id='city-name'>{city} 
          </h1>
          <div className='subtitles'>
            <p className='subtitle subtitle1'>{state}</p>
            <p className='subtitle subtitle1'>{country}</p>
          </div>
        </div>
        <div className='place-weather-detail'>
          <h1 id='temp'>{weatherData.Temperature.Metric.Value}°{weatherData.Temperature.Metric.Unit}</h1>
          <div className='subtitles'>
          <p className='subtitle subtitle2'>{weatherData.WeatherText}</p>
          <p className='subtitle subtitle2'>{weatherData.RealFeelTemperatureShade.Metric.Phrase}</p>
          </div>
        </div>
        {currentUser &&  <div className='bookmark'>
          {saved ? <BookmarkIcon sx={{'fontSize':25}} onClick={RemoveLocation}/> : <BookmarkAddOutlinedIcon sx={{'fontSize':25}} onClick={AddLocation}/>}
          </div>}
      </div>
      <div>
        <div className='flex-row condition-head'>
          <h2>Today's Overview</h2>
          <Link className='flex-row condition-head more-detail-link' to={"more-details"}>More Details<OpenInNewOutlinedIcon/></Link>
        </div>
        <ul className='weather-detail-list flex-row'>
          <li>
            <p className='weather-subhead'>Wind Speed</p>
            <div className='weather-card flex-row'>
              <AirIcon sx={{'font-size':50}} className='weather-icon'/>
              <div className='weather-detail'>
                <h1 className='weather-val'>{weatherData.Wind.Speed.Metric.Value} {weatherData.Wind.Speed.Metric.Unit}<NorthOutlinedIcon className='weather-icon' sx={{'fontSize':40,'transform':`rotateZ(${weatherData.Wind.Direction.Degrees}deg)`}}/></h1>
              </div>
            </div>
          </li>
          <li>
            <p className='weather-subhead'>Visibility</p>
            <div className='weather-card flex-row'>
              <VisibilityIcon sx={{'font-size':50}} className='weather-icon'/>
              <div className='weather-detail'>
                <h1 className='weather-val'>{weatherData.Visibility.Metric.Value} {weatherData.Visibility.Metric.Unit}</h1>
              </div>
            </div>
          </li>
          <li>
            <p className='weather-subhead'>Precipitation</p>
            <div className='weather-card flex-row'>
              <GrainOutlinedIcon sx={{'font-size':50}} className='weather-icon'/>
              <div className='weather-detail'>
                <h1 className='weather-val'>{weatherData.Precip1hr.Metric.Value} {weatherData.Precip1hr.Metric.Unit}</h1>
              </div>
            </div>
          </li>
          <li>
            <p className='weather-subhead'>Pressure</p>
            <div className='weather-card flex-row'>
              <WaterIcon sx={{'font-size':50}} className='weather-icon'/>
              <div className='weather-detail'>
                <h1 className='weather-val'>{weatherData.Pressure.Metric.Value} {weatherData.Pressure.Metric.Unit}</h1>
              </div>
            </div>
          </li>
          <li>
            <p className='weather-subhead'>UV Index</p>
            <div className='weather-card flex-row'>
              <WbSunnyOutlinedIcon sx={{'font-size':50}} className='weather-icon'/>
              <div className='weather-detail'>
                <h1 className='weather-val'>{weatherData.UVIndex} {weatherData.UVIndex !== 0 && <ArrowDropUpOutlinedIcon sx={{'font-size':50}} className={weatherData.UVIndexText === 'Low' ? 'low' : 'high'}/>}</h1>
              </div>
              
            </div>
          </li>
          <li>
            <p className='weather-subhead'>Cloud Cover</p>
            <div className='weather-card flex-row'>
              <CloudIcon sx={{'font-size':50}} className='weather-icon'/>
              <div className='weather-detail'>
                <h1 className='weather-val'>{weatherData.CloudCover} %</h1>
              </div>
              
            </div>
          </li>
          <li>
            <p className='weather-subhead'>Relative Humidity</p>
            <div className='weather-card flex-row'>
              <OpacityOutlinedIcon sx={{'font-size':50}} className='weather-icon'/>
              <div className='weather-detail'>
                <h1 className='weather-val'>{weatherData.RelativeHumidity}%</h1>
              </div>
              
            </div>
          </li>
          <li>
            <p className='weather-subhead'>Precipitation Summary</p>
            <div className='weather-card flex-row'>
                <Chart values={weatherData.PrecipitationSummary}/>
              {/* <div className='weather-detail'>
              </div> */}
              
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

