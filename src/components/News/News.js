import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const News = () => {
  const navigate = useNavigate()
  return (
    <div style={{'height': '100vh', 'alignItems':'center',flexDirection:'column', 'display':'flex', 'justifyContent':'center'}}>
      <h1 style={{'color' : 'white'}}>      Oops 404 Not Found!      </h1>
      <p className='flex-row condition-head more-detail-link' style={{cursor: 'pointer'}} onClick={()=>navigate(-1)}>Go Back</p>
    </div>
  )
}

export default News

