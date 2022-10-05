import React,{useEffect, useState,useRef} from 'react'
import { Link } from 'react-router-dom';
import './SearchResult.css'


const SearchResults = ({cities,value,show}) => {  
  const searchlistRef = useRef(); 
  const [loading,setLoading] = useState(true);
  // console.log(show);
  useEffect(()=>{
    if(cities.length >= 0 && show) {searchlistRef.current.classList.add('showSearchList');}
  },[cities])

  const hideResults = () => {
    searchlistRef.current.classList.remove('showSearchList');
  }

  return (
    <ul ref={searchlistRef} className='search-list'>
        {cities.length>0 ? cities.map(city => {
            return(
                <li className='search-item' onClick={hideResults}><Link id='search-link' to = {`/${city.key}/${city.name}/${city.state}/${city.country}`}>{city.name}, {city.state}, {city.country}</Link></li>
            )
        }): <p>No results found.</p>}
    </ul>
  )
}

export default SearchResults
