import React,{useContext,useEffect} from 'react'
import questionContext from "../../context/Question"
import Profile from './Profile';

export default function ProfileFetcher() {
  const { fetchProfile,setProfile,profile } = useContext(questionContext);
  useEffect(()=>{
    fetchProfile();
    // eslint-disable-next-line
    return ()=>{
      setProfile(null)
    }
},[])
  return (
    <>
      {profile && <Profile profile={profile} />}
    </>
  )
}
