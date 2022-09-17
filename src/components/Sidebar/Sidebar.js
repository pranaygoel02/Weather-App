import React,{useRef, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Sidebar.css'
import {navLinks} from '../../utils/navlinks'
import CloseIcon from '@mui/icons-material/Close';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '../../Context/AuthContext';
import { useSidebar } from '../../Context/SidebarContext';


const Sidebar = () => {
  const sidebarRef = useRef();
  const closeIconRef = useRef();
  // const [user,setUser] = useState(false);
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth()
  const {openSidebar,hideSidebar,sidebarState} = useSidebar()
  console.log('currentUser: ',currentUser);

  async function removeSidebar(){
    await hideSidebar();
  }

  useEffect(()=>{
    sidebarState ? sidebarRef.current.classList.add('showSidebar') : sidebarRef.current.classList.remove('showSidebar');
  },[sidebarState])

  return (
        <div ref={sidebarRef} className='sidebar-container'>
          <div ref={closeIconRef} id='close-sidebar'>
            <CloseIcon fontSize="large" onClick={removeSidebar}/>
          </div>
          <div className='navigation'>
            <div id='brand' className='flex-row padding'>
              <img id='brand-icon'/>
              <h1 id='brand-label'>Currently.in</h1>
            </div>
            <div className='nav-links padding'>
              {navLinks.links.map(link =>{
                return(
                <div className='nav-link'>
                  {link.title === 'Weather' ? <NightsStayIcon/>:
                  <NewspaperIcon/>}
                  <Link onClick={removeSidebar} className='link' to={"/"+link.route}>{link.title}</Link>
                </div>
                )
              })}
            </div>
          </div>
          <div className='settings padding'>
          {!currentUser && 
          // (navLinks.system.map(link =>{
          //       return(
          //       <div>
          //         <Link onClick={link.title === 'Logout' ? handleLogout : hideSidebar} className='link' to={"/"+link.route}>{link.title}</Link>
          //       </div>
          //       )
          //     }))
          //   :
            <div className='nav-link'>
                <LoginIcon/>
                  <Link onClick={removeSidebar}  className='link' to={"/"+navLinks.login.route}>{navLinks.login.title}</Link>
                </div>
            }
          </div>
        </div>
  )
}

export default Sidebar;