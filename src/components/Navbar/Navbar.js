import React,{useEffect, useRef, useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import UserSearch from '../../utils/UserSearch'
import SearchResults from '../SearchResults/SearchResults';
import { handleSearchInput } from '../SearchResults/SearchResults';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '../Avatar'
import { useAuth } from '../../Context/AuthContext';

const Navbar = ({openSidebar}) => {
  const [query,setQuery] = useState('');
  const [value,setValue] = useState('');
  const [show,setShow] = useState(false);
  const [searches, setSearches] = useState([]) 
  const { currentUser } = useAuth()
  
  const SetQuery = (e) => {
    setQuery(e.target.value);
    console.log('query: ',query);
  }
  const SetSearchValue = () => {
    setValue(query);
    setShow(true);
    console.log('value: ',value);
  }
  
  const {cities} = UserSearch(value);
    console.log(cities);
    // setSearches(cities);
    // setShow(false);
  

  const [dateObj,setDateObj] = useState(new Date());
  const [date,setDate] =useState('');
  const [month,setMonth] = useState(''); 
  const [year,setYear] = useState('');
  const [day,setDay] = useState('');
  const [shortMonth,setShortMonth] = useState('');
  const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  const month_names_short=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  useEffect(()=>{
    setDateObj(prev=>new Date());  
  },[date])

  useEffect(()=>{
    setDate(prev=>dateObj.getDate());
    setMonth(prev=>monthNames[dateObj.getMonth()]);
    setYear(prev=>dateObj.getFullYear());
    setDay(prev=>days[dateObj.getDay()]);
    setShortMonth(prev=>month_names_short[dateObj.getMonth()]);
  },[dateObj])

  return (
      <div className='navbar'>
        <div className='date'>
          <h1>{month} {year}</h1>
          <p>{day}, {shortMonth} {date}, {year}</p>
        </div>
        <div className='flex-row nav-top'>
            <div className='searchbar' style={{"position":"relative"}}>
              <input type="text" value={query} onChange={SetQuery} placeholder='Search City...'></input>
              <div className='search-btn'>
                <SearchIcon onClick={SetSearchValue}/>
              </div>
              <SearchResults cities={cities} value={value} show={show}/>
            </div>
          {currentUser && <Avatar/>}
          <MenuIcon onClick={openSidebar} id='show-sidebar' sx={{fontSize: 40 }}/>
        </div>
      </div>
  )
}

export default Navbar