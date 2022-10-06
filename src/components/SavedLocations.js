import React, { useCallback, useEffect, useState } from 'react'
import {auth,db} from '../firebase'
import{collection,getDocs} from 'firebase/firestore'
import {useAuth} from '../Context/AuthContext'
import {useDatabase} from '../Context/DatabaseContext'
import {Link} from 'react-router-dom'
import {useSidebar} from '../Context/SidebarContext'

function SavedLocations() {
  const [savedlocations,setSavedlocations] = useState([])
  const {currentUser} = useAuth()
  const {savedLocations,setSavedLocations} = useDatabase()
  const {hideSidebar} = useSidebar()
  const [fetched,setFetched] = useState(false)

  const getAllSavedLocations = useCallback(async () => {
    // if(!fetched){
    try{
      setSavedlocations(perv=>[])
    const querySnapshot = await getDocs(collection(db, `${currentUser.uid}`));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setSavedlocations(prev=>[...new Set([...prev,doc.data()])])
    })
    setFetched(prev=>true);
  }catch(err){
    // console.log(err);
    // setFetched(prev=>false);
  } 
// }
  },[savedLocations])

  useEffect(()=>{
    // setFetched(prev=>false)
    getAllSavedLocations();
    // setSavedLocations(prev=> savedlocations)
  },[getAllSavedLocations,savedLocations])

  async function removeSidebar(){
    await hideSidebar();
  }

  return (
    <ul className='savedlocations-list' style={{display: 'flex',marginTop:'1em', position:'relative' ,flexDirection:'row', flexWrap: 'wrap', width:'fit-content',gap:'0.5em', maxHeight:'60vh',overflowY:'scroll'}}>
    {savedlocations.length > 0 ? savedlocations.map(location=><Link key={location.cityId} onClick={removeSidebar} style={{width:'fit-content',}} className='more-detail-link' to={location.url}>{location.cityName}</Link>) : <p style={{padding:'0.5em 0.2em',fontSize:'0.9em',borderTop:'0.5px solid gray', opacity:0.8}}>No saved locations yet.</p>}
    </ul>
  )
}

export default SavedLocations