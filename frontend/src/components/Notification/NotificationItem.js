import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import user from './user.png'
import questionContext from "../../context/Question"

export default function NotificationItem(props) {
    const { darkmode } = useContext(questionContext);

    return (
        <> 
            { props.notif.qstn &&
            <div className={`notify_item ${darkmode && 'bg-dark'}`}>
                <div className="notify_details">
                    <span className={`${darkmode && 'subtitle-dark'}`}>{props.notif.title}</span>
                        <div className="notify_sub_details">
                            <Link to={`/answers/${props.notif.qstn._id}`} className={`notify_qstn_title ${darkmode && 'title-dark'}`}>{ props.notif.qstn.title}</Link>
                            {props.notif.new?<> <label className="new_notify">New</label> </>:""}
                        </div>
                </div>
                <div className="notify_img">
                    <img src={props.notif.user_profile?props.notif.user_profile:user} alt="" />
                </div>
            </div>
            }
        </>
    )
}
