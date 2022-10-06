import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import React,{useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import '../Login/Login.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
  const [error,setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass,setShowPass] = useState(false)
  const [showCPass,setShowCPass] = useState(false)
  const {signup,setAlert} = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault();
    if(passwordRef.current.value !== confirmPasswordRef.current.value){
      setAlert({
        open:'true',
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
        open:'true',
        message: `Signed Up! Welcome ${emailRef.current.value}`,
        type: 'success'
      })
      navigate("/")
    }
    catch(err){
      setError('Failed to create Account')
      setAlert({
        open: 'true',
        message: `Account with ${emailRef.current.value} already exists.`,
        type: 'info'
      })
    }
    setLoading(false)
  }

  return (
    <>
    <div className='back-btn' onClick={()=>navigate(-1)}>
    <ArrowBackIcon color='primary' />
    <p aria-disabled={true} style={{color: 'white'}} className='link'>Back</p>
    </div>
    
    <div className='login'>
      <div id='login-left'>
      </div>
      <div  id='login-right'>
      {/* {error && alert(error)} */}
      <h1  style={{marginBottom: '0.5em'}}>Sign Up</h1>
      <div className='form-wrapper'>

      <form onSubmit={handleSubmit} className='form'>
        <div className='form-element'>
          <label className='form-label' htmlFor='email'>Email</label>
          <input className='form-input' name='email' type={'email'} ref={emailRef}></input>
        </div>
        <div className='form-element'>
          <label htmlFor='password'>Password</label>
          <input className='form-input' name='password'  type={showPass ? 'text' : 'password'} ref={passwordRef}></input>
          {showPass ? <VisibilityIcon onClick={()=>setShowPass(prev=>!prev)}/> : <VisibilityOffIcon onClick={()=>setShowPass(prev=>!prev)}/>}
        </div>
        <div className='form-element'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input className='form-input' name='confirm-password'  type={showCPass ? 'text' : 'password'} ref={confirmPasswordRef}></input>
          {showCPass ? <VisibilityIcon onClick={()=>setShowCPass(prev=>!prev)}/> : <VisibilityOffIcon onClick={()=>setShowCPass(prev=>!prev)}/>}
        </div>
        {/* <div className='form-element'>
          <label className='form-label' htmlFor='confirm-password'>Confirm Password</label>
          <input className='form-input' name='confirm-password' type={'password'} ref={confirmPasswordRef}></input>
        </div> */}
        <button className='form-btn' disabled={loading} type='submit'>SIGN UP</button>
      </form>
      </div>
      <p>Have an account? <Link to={"/login"}>Login</Link> instead.</p>
      </div>
    </div>
    </>
  )
}

export default SignUp