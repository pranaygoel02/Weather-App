import React,{useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '../Alert';


const Login = () => {
  // const [error,setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const {login, currentUser, setAlert} = useAuth()
  const {setAlert} = useAuth()
  const auth = getAuth();
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setCredentials({...credentials,[e.target.name]: e.target.value})
  }
  function handleSubmit(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {

        const user = userCredential.user;
        console.log(user);
        setAlert({
          open: true,
          message: `Welcome ${user.email}`,
          type: 'success'
        })
        navigate("/")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }

  return (
    <>
    <div className='back-btn' onClick={()=>navigate(-1)}>
    <ArrowBackIcon color='primary' />
    <p className='link'>Back</p>
    </div>
    <div className='login'>
      <div id='login-left'>
      <div className='brand flex-row'>
      <img id='brand-icon'/>
      <h1 id='brand-label'>Currently.in</h1>
      </div>
      </div>
      <div id='login-right'>
      <h1 className='brand'>Login</h1>
      <div className='form-wrapper'>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-element'>
          <label htmlFor='email'>Email</label>
          <input className='form-input' name='email' onChange={handleChange} type={'email'} ref={emailRef}></input>
        </div>
        <div className='form-element'>
          <label htmlFor='password'>Password</label>
          <input className='form-input' onChange={handleChange} name='password' type={'password'} ref={passwordRef}></input>
        </div>
        <button className='form-btn' disabled={loading} type='submit'>LOGIN</button>
      </form>
      </div>
      <p>Don't have an account? <Link to={"/signup"}>Sign Up</Link> here.</p>
    </div>
    </div>
    </>
  )
}

export default Login