import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import SearchWeather from '../components/SearchWeather/SearchWeather';
import { useDatabase } from '../Context/DatabaseContext';


export default function CurrentConditions(){
    const {id,city,state,country} = useParams();
    const [weatherData,setWeatherData] = useState()
    const {setLocationKey,setLocationName,locationKey,setUrl} = useDatabase()
    setLocationKey(prev=>id)
    setLocationName(prev=>city)
    setUrl(prev=>`/${id}/${city}/${state}/${country}`)
    console.log('current loccation Key: ',locationKey);
    const apikey = 'xErnIMP3GoEWY79vsV0Q0e0fuvhRDiun';
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${id}?details=true&apikey=${apikey}`
    
    useEffect(()=>{
        const getWeatherData = async () =>{
            
        axios.get(url).then(res=>res.data).then(data => {
            setWeatherData(data[0])
            console.log(weatherData);
            console.log('data[0]',data[0]);
        })
    }
    getWeatherData()
    },[id])
    return (
        <>
            {weatherData && <SearchWeather  weatherData={weatherData} city={city} state={state} country={country}/>}
        </>
    )
}
