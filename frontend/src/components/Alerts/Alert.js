import React,{useContext} from 'react'
import './Alert.css'
import questionContext from "../../context/Question"

export default function Alert() {
    const { alert,setAlert } = useContext(questionContext);
    const handleAlertClose = ()=>{
        setAlert(false)
    }
  return (
    <>
        {alert.active && <div className={`alert_container ${alert.type?alert.type===2?"green_alert":"red_alert":"red_alert"}`}>
            <div className="alert_details">
                <span>{alert.msg}</span>
                <i className="fas fa-times alert_close" onClick={handleAlertClose}></i>
            </div>
        </div>}
    </>
  )
}

