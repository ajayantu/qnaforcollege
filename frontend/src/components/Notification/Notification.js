import React,{ useContext } from 'react'
import questionContext from "../../context/Question"
import NotificationItem from './NotificationItem';
import './Notify.css'
export default function Notification() {
    const { notify,isLogin } = useContext(questionContext);
    return (
        <>
            {isLogin && 
                <div className="notify_container">
                {
                    notify.length>0?notify.map((notif)=>{
                        return <NotificationItem key={notif._id} notif={notif}  />
                    }):<div className='no_notify'>No Notifications</div>
                }
                </div>
            }
        </>
    )
}
