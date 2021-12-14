import React from 'react'
import "./YourAnswer.css"
export default function YourAnswerItem(props) {
    return (
        <>
            <div className="user-ans-qstn dpm">
                <a href={`/answers/${props.ansQstnId}`} className="qstn_title">{props.ansQstn.title}</a>
                <br /><br />
                {props.ansQstn.description}
            </div>
        </>
    )
}
