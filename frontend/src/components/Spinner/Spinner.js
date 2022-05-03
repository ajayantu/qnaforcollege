import React from 'react'
import './Spinner.css'
import logo from './loading3.gif'
export default function Spinner() {
  return (
    <>
        <div className="spinner_container">
            <img src={logo} style={{width:"32px"}} alt="" />
        </div> 
    </>
  )
}
