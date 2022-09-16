import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import React,{useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import '../Login/Login.css'


const SignUp = () => {
  const [error,setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {signup,setAlert} = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault();
    if(passwordRef.current.value !== confirmPasswordRef.current.value){
      setAlert({
        open:true,
        message: 'Passwords do not match',
        type: 'error'
      })
      return (setError('Passwords do not match'))
    }
    try{
      setError('')
      setLoading(true)
      await signup(emailRef.current.value,passwordRef.current.value);
      setAlert({
        open:true,
        message: 'Signed Up',
        type: 'success'
      })
      navigate("/login")
    }
    catch{
      setError('Failed to create Account')
      setAlert({
        open: true,
        message: 'Falied to create Account',
        type: 'info'
      })
    }
    setLoading(false)
  }

  return (
    <>
    <div className='back-btn' onClick={()=>navigate(-1)}>
    <ArrowBackIcon color='primary' />
    <p className='link'>Back</p>
    </div>
    
    <div className='login'>
      <div id='login-left'>
      <h1>Sign Up</h1>
      </div>
      <div id='login-right'>
      {/* {error && alert(error)} */}
      <div className='form-wrapper'>

      <form onSubmit={handleSubmit} className='form'>
        <div className='form-element'>
          <label className='form-label' htmlFor='email'>Email</label>
          <input className='form-input' name='email' type={'email'} ref={emailRef}></input>
        </div>
        <div className='form-element'>
          <label className='form-label' htmlFor='password'>Password</label>
          <input className='form-input' name='password' type={'password'} ref={passwordRef}></input>
        </div>
        <div className='form-element'>
          <label className='form-label' htmlFor='confirm-password'>Confirm Password</label>
          <input className='form-input' name='confirm-password' type={'password'} ref={confirmPasswordRef}></input>
        </div>
        <button className='form-btn' disabled={loading} type='submit'>Sign Up</button>
      </form>
      </div>
      <p>Have an account? <Link to={"/login"}>Login</Link> instead.</p>
      </div>
    </div>
    </>
  )
}

export default SignUp