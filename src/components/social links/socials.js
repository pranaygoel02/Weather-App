import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './socials.css'

export default function socials() {
  return (
    <ul className='social-links'>
          <a href='https://www.instagram.com/pranay_goel__/' target="blank_"><InstagramIcon sx={{fontSize: 30}}/></a>
          <a href='https://twitter.com/pranay_goel__' target="blank_"><TwitterIcon sx={{fontSize: 30}}/></a>
          <a href='https://www.linkedin.com/in/pranay-goel-01023a1b1/' target="blank_"><LinkedInIcon sx={{fontSize: 30}}/></a>
          <a href='https://github.com/pranaygoel02' target="blank_"><GitHubIcon sx={{fontSize: 30}}/></a>
    </ul>
  )
}
