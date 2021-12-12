import React from 'react'

import './QuestionItem.css'

export default function QuestionItem(props) {
    return (
        <div className="question dpm">
            <div className="user">
                <div className="user_icon"><i className="fas fa-user"></i></div>
                <div className="username"><a href={`/user/${props.qstn.user._id}`}>{props.qstn.user.username}</a></div>
            </div>

            <a href={`/answers/${props.qstnId}`} className="qstn_title">{props.qstn.title}</a>
            <br /><br />
            {props.qstn.description}
        </div>
    )
}
