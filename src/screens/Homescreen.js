import React, {useCallback, useEffect, useState, useMemo} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import Dashboard from '../components/Dashboard/Dashboard'
import CurrentWeather from '../components/CurrentWeather/CurrentWeather'
import Geolocate from '../utils/Geolocate'
import {FetchWeatherData} from '../utils/FetchWeatherData'
import Allow from '../components/UserAllowance/Allow'
import Footer from '../components/Footer/footer'


const Homescreen = () => {
	const [allowed,setAllowed] = useState(false);
	const [UserCoords,setUserCoords] = useState({lat:'',lon:''});
	const [geoposition,setGeoposition] = useState()
	const [unit,setUnit] = useState('Metric');


const setCoords = (coords) => {
	setUserCoords(prev=>coords)
}

const getLocation = useCallback(()=>{
		console.log('geolocationg');
		setAllowed(true)
		const {coords} = Geolocate();
		setCoords(coords);
},[allowed])

useEffect(()=>{
	if(allowed) getLocation();
},[allowed])



	return (
		<>
		<div className='app-container'>
			<Sidebar/>
			<Dashboard/>
			{allowed ? <CurrentWeather coords={UserCoords}/> : <Allow getLocation={getLocation}/>}
		</div>
		{/* <Footer/> */}
		</>
	)
}

export default Homescreen