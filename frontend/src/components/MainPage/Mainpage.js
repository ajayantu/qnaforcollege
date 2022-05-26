import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Mainpage() {
    const navigate = useNavigate();
    navigate("/questions/1")
  return (
    <>
    </>
  )
}
