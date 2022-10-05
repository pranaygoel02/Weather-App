import React,{useRef, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import './Login.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '../Alert';
import GoogleButton from 'react-google-button'


const Login = () => {
  // const [error,setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const {login, currentUser, setAlert} = useAuth()
  const {setAlert,setPhotoUrl,uid,setUid} = useAuth()
  const auth = getAuth();
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const googleProvider = new GoogleAuthProvider()

  function signInWithGoogle(){
    signInWithPopup(auth,googleProvider).then(res=>{
      setAlert({
        open:true,
        message: `Welcome ${res.user.email}`,
        type: 'success'
      })
      setPhotoUrl(prev=>`${res.user.photoURL}`)
      setUid(prev=>res.user.uid)
      navigate(-1)
    }).catch(error=>{
      setAlert({
        open: true,
        message:'Something went wrong!',
        type:'error'
      })
    })
  }
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
        console.log('ID: ',user.uid);
        setUid(prev=>user.uid)
        navigate(-1)

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
    <p style={{color: 'white'}} className='link'>Back</p>
    </div>
    <div className='login'>
      <div id='login-left'>
      <div className='brand flex-row'>
      <img id='brand-icon'/>
      {/* <h1 id='brand-label'>Currently.in</h1> */}
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
      <p>OR</p>
      <GoogleButton style={{'width': '100%','outline': 'none'}} onClick={signInWithGoogle}/>
      </div>
      <p>Don't have an account? <Link to={"/signup"}>Sign Up</Link> here.</p>
    </div>
    </div>
    </>
  )
}

export default Login