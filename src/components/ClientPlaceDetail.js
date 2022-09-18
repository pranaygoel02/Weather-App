// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import UserWeather from './UserWeather/UserWeather'
// const ClientPlaceDetail = ({time}) => {
//   console.log(userLocation);
//   return (
//     <div className='user-place-detail padding'>
//       <div className='flex-row user-place-detail'>
//       {userLocation.EnglishName && 
//       <div>
//         <h2>{userLocation.LocalizedName}</h2>
//         <p>{userLocation.AdministrativeArea.EnglishName}, {userLocation.Country.EnglishName}</p>
//       </div>}
//       <div>
//         <p>{time}</p>
//         <p>Lat: {Number(coords.lat).toFixed(2)}</p>
//         <p>Lon: {Number(coords.lon).toFixed(2)}</p>
//       </div>
//       </div>
//       {userLocation && <UserWeather userLocation={userLocation} country={userLocation.Country.EnglishName}/>}
//     </div>
//   )
// }

// export default ClientPlaceDetail