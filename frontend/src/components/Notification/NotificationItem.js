import React from 'react'
import { Link } from 'react-router-dom'
import user from './user.png'
export default function NotificationItem(props) {
    return (
        <> 
            <div className="notify_item">
                <div className="notify_details">
                    <span>{props.notif.title}</span>
                        <div className="notify_sub_details">
                            <Link to={`/answers/${props.notif.qstn._id}`} className="notify_qstn_title">{ props.notif.qstn.title}</Link>
                            {props.notif.new?<> <label className="new_notify">New</label> </>:""}
                        </div>
                </div>
                <div className="notify_img">
                    <img src={props.notif.user_profile?props.notif.user_profile:user} alt="" />
                </div>
            </div>
        </>
    )
}
