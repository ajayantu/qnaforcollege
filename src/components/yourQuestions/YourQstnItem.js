import React from 'react'
import "./YourQstn.css"
export default function YourQstnItem(props) {
    return (
        <>
            <div className="user-question dpm">
                <a href={`/answers/${props.qstnId}`} className="qstn_title">{props.qstn.title}</a>
                <br /><br />
                {props.qstn.description}
            </div>
        </>
    )
}
