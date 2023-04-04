import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Mainpage() {
    const navigate = useNavigate();
    useEffect(()=>{
      navigate("/questions/1")
      // eslint-disable-next-line
    },[])
  return (
    <div></div>
  )
}
