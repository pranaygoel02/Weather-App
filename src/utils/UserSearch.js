import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function UserSearch(value){
    const [cities,setCities] = useState([])    
    const apikey = 'UgFnRFLEqTAdfjCKuzriZgCAkiijEijN';
    const url = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${value}`
    useEffect(()=>{
        setCities([])
        fetch(url).then(res=>res.json()).then(data => {
            data?.map(city=>{
                setCities(prev =>[...prev,{key: city.Key, name: city.LocalizedName, state: city.AdministrativeArea.LocalizedName, country: city.Country.LocalizedName}])
            })
            // console.log(data);
        })
    },[value])
    return {cities}
}
