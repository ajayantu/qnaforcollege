import React,{ useContext } from 'react'
import questionContext from "../../context/Question"
import NotificationItem from './NotificationItem';
import './Notify.css'
export default function Notification() {
    const { notify } = useContext(questionContext);
    return (
        <>
            <div className="notify_container">
                {notify.length===0?"No new Notification...":notify.map((notif)=>{
                    return <NotificationItem key={notif._id} notif={notif}  />
                })}
            </div>
        </>
    )
}
