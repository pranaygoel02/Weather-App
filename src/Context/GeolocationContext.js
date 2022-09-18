import React, {useContext, useState} from 'react'
import axios from 'axios';
const GeolocationContext = React.createContext()

export function GeolocationProvider({children}){
    const [allowed,setAllowed] = useState(false);
    const [coords,setCoords] = useState({})
    const [userCoords, setUserCoords] = useState()
    const [userPos,setUserPos] = useState()
    const [weatherData,setUserWeatherData] = useState()

    const apikey = 'XMUYtoZGyj4nn6oqiFvdadAtS8hKS9b6'
    const url1 =`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&details=true&q=${coords.lat},${coords.lon}`
    console.log('url',url1);
    const url2 = `http://dataservice.accuweather.com/currentconditions/v1/`
    const query = `?details=true&apikey=${apikey}`

    async function getUserLocation(){
        console.log('getting user location');
        await axios.get(url1).then(res=>res.data).then(data=>{
            console.log(data);
            setUserPos(prev=>data)})
    }
    
    function Geolocate(){
        console.log('geolocationg');
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(position => 
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude 
                })
            )    
        }
        else{
            console.log('not available');
        }
        setAllowed(true)
    }
    console.log('coords: ',coords);
    
    async function getUserWeather(){
        await axios.get(`${url2}${userPos.Key}${query}`).then(res=>res.data).then(data => {
                setUserWeatherData(data[0])
                console.log(weatherData);
                console.log('data[0]',data[0]);
            })
    }

    const value = {
        Geolocate,
        allowed,
        setAllowed,
        coords,
        getUserLocation,
        userPos,
        getUserWeather,
        weatherData
    }

    return(
        <GeolocationContext.Provider value={value}>
        {children}
        </GeolocationContext.Provider>
    )
}

export function useGeolocation(){
    return(useContext(GeolocationContext))
}

