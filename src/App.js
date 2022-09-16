import React from 'react'
import {Route, Routes} from 'react-router-dom'
import './index.css';
import Homescreen from './screens/Homescreen';
import News from './components/News/News';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp'
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import SearchWeather from './components/SearchWeather/SearchWeather';
import CurrentConditions from './utils/CurrentConditions';
import { AuthProvider } from './Context/AuthContext';
import Alert from './components/Alert'
const App = () => {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Homescreen/>}>
        <Route exact index element={<WeatherForecast/>}/>
        <Route path='/:id/:city/:state/:country' element={<CurrentConditions/>}/>
        <Route path="news" element={<News/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    <Alert/>
    </AuthProvider>
  )
}

export default App