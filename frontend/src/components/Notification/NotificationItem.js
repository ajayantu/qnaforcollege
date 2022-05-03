import React from 'react'

export default function NotificationItem(props) {
    return (
        <> 
            <div className="notify_item">
                {props.notif.title} <br />
                <b><a href={`/answers/${props.notif.qstn._id}`}>{ props.notif.qstn.title}</a></b>{props.notif.new?<> <span className="new_notify">New</span> </>:""}
            </div>
        </>
    )
}
