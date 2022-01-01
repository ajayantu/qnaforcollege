import React from 'react'
import parse from 'html-react-parser'
import './Answers.css'
export default function AnswerItem(props) {
    return (
        <div className="answer dpm ans-item" >
            {parse(props.ans.answer)}
        </div>
    )
}
