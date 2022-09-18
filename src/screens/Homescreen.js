import React, {useCallback, useEffect, useState, useMemo} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import Dashboard from '../components/Dashboard/Dashboard'
import CurrentWeather from '../components/CurrentWeather/CurrentWeather'
import { useGeolocation } from '../Context/GeolocationContext'
import Allow from '../components/UserAllowance/Allow'

const Homescreen = () => {
	const {allowed,userPos} = useGeolocation()
	return (
		<>
		<div className='app-container'>
			<Sidebar/>
			<Dashboard/>
			{allowed ? <CurrentWeather/> : <Allow/>}
		</div>
		</>
	)
}

export default Homescreen