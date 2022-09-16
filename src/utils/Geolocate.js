import { useState } from "react"

export default function Geolocate(){
    const coords = {
        lat: '',
        lon: ''
    }

    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(position => {
            coords.lat = position.coords.latitude;
            coords.lon = position.coords.longitude;
        })
    }
    else{
        console.log('not available');
    }
  
    return {coords}
}