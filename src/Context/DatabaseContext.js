import React,{useContext,useState} from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext'
import {doc,setDoc} from '@firebase/firestore'

const DatabaseContext = React.createContext()

export function DatabaseProvider({children}){
    const {currentUser,savedLocations,setAlert} = useAuth()
    const [locationKey,setLocationKey] = useState()
    const [locationName,setLocationName] = useState()

    const addLocation = async ()=>{
        const LocationRef = doc(db,"savedLocations",currentUser.uid)
        try{
            console.log('saving location');
            await setDoc(LocationRef,
                {
                    Locations: savedLocations? [...savedLocations,{key: locationKey,name: locationName}] : [{key: locationKey,name: locationName}]
                });
                setAlert({
                    open:true,
                    message:'Location added to your collection.',
                    type:'success'
                })
        }catch(error){
            setAlert({
                open: 'true',
                message:'Could not add location to collection.',
                type:'error'
            })
        }
    }
    function removeLocation(){

    }

    const values = {
        addLocation,
        removeLocation,
        setLocationKey,
        setLocationName,
        locationName,
        locationKey
    }
    return(
        <DatabaseContext.Provider value={values}>
            {children}
        </DatabaseContext.Provider>
    )
}

export function useDatabase(){
    return(useContext(DatabaseContext))
}