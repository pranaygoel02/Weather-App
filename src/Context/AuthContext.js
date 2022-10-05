import React, {useContext,useState,useEffect} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../firebase'




const AuthContext = React.createContext()

export function useAuth(){
    return(useContext(AuthContext))
}

export function AuthProvider ({children}){
    const [currentUser,setCurrentUser] = useState(null)
    const [alert,setAlert] = useState({
        open: false,
        message: '',
        type: 'sucesss'
    })
    
    const [photoUrl,setPhotoUrl] = useState('')
    const [uid,setUid] = useState(null)

    async function logout () {
        await auth.signOut()
        console.log('logged out');

    }

    const SetUser = (data) => {
        setCurrentUser(data)
    }

    async function signup(email,password){
        try{
            await createUserWithEmailAndPassword(auth,email,password).then(res=>res.user).then(data=>{
                // setCurrentUser(data)
                console.log(data)
            })
            // console.log(currentUser);

        }
        catch(error){
            alert(error)
        }
    }
    async function login({email,password}){
        console.log('email: ',email,' pass: ',password);
        try{
            await signInWithEmailAndPassword(auth,email,password).then(res=>res.user).then(data=>{
                console.log('logging in');
                // console.log(data)
                // SetUser(data);
                setCurrentUser(data)
            })
            console.log('currentUser: ',currentUser);

        }
        catch(error){
            alert(error)
        }
    }

    useEffect(()=>{
       const unsubscribe =  auth.onAuthStateChanged(user=>{
           setCurrentUser(user)

        })
        return unsubscribe
    },[])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        alert,
        setAlert,
        setPhotoUrl,
        photoUrl,
        uid,setUid
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}