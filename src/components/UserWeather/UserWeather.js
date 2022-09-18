import React,{useState,useEffect, useCallback} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import AirIcon from '@mui/icons-material/Air';
import WaterIcon from '@mui/icons-material/Water';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import './UserWeather.css'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloudIcon from '@mui/icons-material/Cloud';
import OpacityOutlinedIcon from '@mui/icons-material/OpacityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Chart from '../Chart/Chart';

export default function UserWeather ({userLocation,country}) {
  const [saved,setSaved] = useState(false);
  const [weatherData,setUserWeatherData] = useState()

  const apikey = 'XMUYtoZGyj4nn6oqiFvdadAtS8hKS9b6';
  const url = `http://dataservice.accuweather.com/currentconditions/v1/`
  const query = `?details=true&apikey=${apikey}`

  const flagUrl = "https://countryflagsapi.com/svg/" + country.toLowerCase().split(' ').join('%20');
  console.log(flagUrl);
  
  const getWeatherData = useCallback(async () => {
    await axios.get(`${url}${userLocation.Key}${query}`).then(res=>res.data).then(data => {
        setUserWeatherData(data[0])
        console.log(weatherData);
        console.log('data[0]',data[0]);
    })
  },[weatherData]);

  useEffect(()=>{
      if(userLocation) getWeatherData();
    },[getWeatherData])

console.log(weatherData);

  const BookMark = () => {
    setSaved(prev => !prev);
  }

  return (
    <>
    {weatherData && 
    <div className='search-weather'>
    <div className='weather-detail-head flex-row' >
      <div className='place-weather-detail'>
        <h1 id='temp'>{weatherData.Temperature.Metric.Value}°{weatherData.Temperature.Metric.Unit}</h1>
        <div className='subtitles'>
        <p className='subtitle subtitle2'>{weatherData.WeatherText}</p>
        <p className='subtitle subtitle2'>{weatherData.RealFeelTemperatureShade.Metric.Phrase}</p>
        </div>
      </div>
      <div className='bookmark'>
        {saved ? <BookmarkIcon sx={{'fontSize':25}} onClick={BookMark}/> : <BookmarkAddOutlinedIcon sx={{'fontSize':25}} onClick={BookMark}/>}
        </div>
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
      </ul>
    </div>
  </div>
    }
    </>
    
  )
}

