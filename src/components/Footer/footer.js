import React from 'react'
import {Link} from 'react-router-dom'
import './footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Socials from '../social links/socials'

export default function footer() {
  return (
    <div id='footer-container' className='container'>
        <div>
        <Socials/>
        <p>&copy; Pranay Goel, 2022</p>
        </div>
        <div className='footer-links'>
            <p><Link className='footer-link' to="/">Home</Link></p>
            <p><Link className='footer-link' to="/news">News</Link></p>
        </div>
    </div>
  )
}
