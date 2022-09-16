import React, {useRef, useEffect, useState  } from 'react'
import Lottie from 'lottie-web'
import './Contact.css'
import axios from 'axios'
import { CircularProgress } from '@mui/material';


export default function Contact() {
    const contactLottieRef = useRef(null);
    const formRef = useRef();
    const form_btnRef = useRef();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [sub,setSub] = useState('');
    const [msg,setMsg] = useState('');
    const [sendingMail, setSendingMail] = useState(false);
    const [emailSent,setEmailSent] = useState(false);
    const [form,setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    function handleName(e){
        console.log(e.target.value);
        setName(e.target.value);
    }
    function handleEmail(e){
        console.log(e.target.value);
        setEmail(e.target.value);
    }
    function handleSub(e){
        console.log(e.target.value);
        setSub(e.target.value);
    }
    function handleMsg(e){
        console.log(e.target.value);
        setMsg(e.target.value);
    }
    
    useEffect(()=>{
        if(emailSent===true){
            form_btnRef.current.style.background = "green";
        }
        else{
            form_btnRef.current.style.background = "linear-gradient(132deg, rgb(176, 34, 165) 0%, rgb(130, 24, 136) 34%, rgb(26, 159, 186) 100%)";
        }
    },[emailSent])

    function handleSubmit(e){
        setSendingMail(true);
        axios.post("/sendEmail",form)
        .then(res => {
            setEmailSent(true);
            resetForm();
            setSendingMail(false);
                setTimeout(()=> {
                    setEmailSent(false)
                },2000);
        })
        .catch(error => {
            console.log("Error. Can't send mail.");
        })
        e.preventDefault();
    }

    function resetForm(){
        setName('');
        setEmail('');
        setSub('');
        setMsg('');
    }

    useEffect(()=>{
        setForm({
            fullName: name,
            emailId: email,
            subject: sub,
            message: msg
        })
    },[name,email,sub,msg])

    useEffect(() => {
      const instance = Lottie.loadAnimation({
        container: contactLottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('../images/lottie/contact.json')
      })
      return () => instance.destroy();
    }, [])
    
  return (
    <div className='contact wrapper'>
        <header>
            <div ref={contactLottieRef} className='background' id='contact-left'></div>
        </header>
        <div id='contact-right'>
            <div ref={formRef} className='form-wrapper'>
                <h1>Leave a Message!</h1>
                <form className='form' autoComplete='none' onSubmit={handleSubmit}>
                    <div className='form-element'>
                        {/* <label className='form-label'>Name</label> */}
                        <input className='form-input' name='name' value={name} onChange={handleName} required type={'text'} placeholder={'Full Name'} autoFocus autoComplete='none'></input>
                    </div>
                    <div className='form-element'>
                        {/* <label className='form-label'>Email</label> */}
                        <input className='form-input' name='email' value={email} onChange={handleEmail} required type={'email'} placeholder={'Email'}  autoComplete='none'></input>
                    </div>
                    <div className='form-element'>
                        {/* <label className='form-label'>Subject</label> */}
                        <input className='form-input' name='subject' value={sub} onChange={handleSub} required type={'text'} placeholder={'Subject'}  autoComplete='none'></input>
                    </div>
                    <div className='form-element'>
                        {/* <label className='form-label'>Message</label> */}
                        <textarea className='form-input' name='message' value={msg} onChange={handleMsg} required placeholder='Your Message Here...'  autoComplete='none'></textarea>
                    </div>
                    {sendingMail ? <div style={{"display":"flex","alignItems":"center","justifyContent":"center"}}><CircularProgress color='secondary'/></div> : <input ref={form_btnRef} className='form-btn link' type={'submit'} value={emailSent ?'MESSAGE SENT' :'SEND MESSAGE'}></input>}
                </form>
            </div>
        </div>
    </div>
  )
}
