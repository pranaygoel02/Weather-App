import React,{useContext,useState} from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext'
import {doc,setDoc, deleteDoc} from 'firebase/firestore'

const DatabaseContext = React.createContext()

export function DatabaseProvider({children}){
    const {currentUser,setAlert} = useAuth()
    const [locationKey,setLocationKey] = useState()
    const [locationName,setLocationName] = useState()
    const [url, setUrl] = useState('')
    console.log(locationKey,locationName,url);
    const [savedLocations,setSavedLocations] = useState([])
   
    async function addLocation (){
        console.log('adding');
        try {
            console.log('saved locs: ', savedLocations);
            const docRef = await setDoc(doc(db, `${currentUser.uid}`,locationName), {
                cityName: locationName,
              cityId: locationKey,
              url: url
            },{
                merge: true
            });
            // console.log("Document written with ID: ", docRef.id);
            setAlert({
                open:'true',
                message:`${locationName} addded to your collection.`,
                type:'success'
            })
          } catch (e) {
            console.error("Error adding document: ", e.message);
            setAlert({
                open: 'true',
                message:`Could not add ${locationName} to your collection.`,
                type:'error'
            })
          }
    }
    async function removeLocation(){
        try {
            const docRef = await deleteDoc(doc(db, `${currentUser.uid}`,locationName))
            // console.log("Document written with ID: ", docRef.id);
            setAlert({
                open:'true',
                message:`${locationName} removed from your collection.`,
                type:'success'
            })
          } catch (e) {
            console.error("Error adding document: ", e.message);
            setAlert({
                open: 'true',
                message:`Could not remove ${locationName} from collection.`,
                type:'error'
            })
          }
    }

    const value = {
        addLocation,
        removeLocation,
        setLocationKey,
        setLocationName,
        locationName,
        locationKey,
        url,
        setUrl,
        savedLocations,
        setSavedLocations,
    }
    return(
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}

export function useDatabase(){
    return(useContext(DatabaseContext))
}