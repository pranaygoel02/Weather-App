import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import SearchWeather from '../components/SearchWeather/SearchWeather';
import { useDatabase } from '../Context/DatabaseContext';


export default function CurrentConditions(){
    const {id,city,state,country} = useParams();
    const [weatherData,setWeatherData] = useState()
    const {setLocationKey,setLocationName,locationKey} = useDatabase()
    setLocationKey(prev=>id)
    setLocationName(prev=>city)
    console.log('current loccation Key: ',locationKey);
    const apikey = 'XMUYtoZGyj4nn6oqiFvdadAtS8hKS9b6';
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${id}?details=true&apikey=${apikey}`
    useEffect(()=>{
        axios.get(url).then(res=>res.data).then(data => {
            setWeatherData(data[0])
            console.log(weatherData);
            console.log('data[0]',data[0]);
        })
    },[id])
    return (
        <>
            {weatherData && <SearchWeather weatherData={weatherData} city={city} state={state} country={country}/>}
        </>
    )
}
